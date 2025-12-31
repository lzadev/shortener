using Microsoft.EntityFrameworkCore;
using Shortener.Api;
using System.Diagnostics;

namespace Shortener.MigrationService;

public class Worker(
    IServiceProvider serviceProvider,
    IHostApplicationLifetime hostApplicationLifetime) : BackgroundService
{
    public const string ActivitySourceName = "Migrations";
    private static readonly ActivitySource s_activitySource = new(ActivitySourceName);

    protected override async Task ExecuteAsync(
        CancellationToken cancellationToken)
    {
        using var activity = s_activitySource.StartActivity(
            "Migrating database", ActivityKind.Client);

        try
        {
            using var scope = serviceProvider.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

            await RunMigrationAsync(dbContext, cancellationToken);
            await InsertBulkShortUrlsAsync(dbContext, cancellationToken);
        }
        catch (Exception ex)
        {
            activity?.AddException(ex);
            throw;
        }

        hostApplicationLifetime.StopApplication();
    }

    private static async Task RunMigrationAsync(
                 ApplicationDbContext dbContext, CancellationToken cancellationToken)
    {
        var strategy = dbContext.Database.CreateExecutionStrategy();
        await strategy.ExecuteAsync(async () =>
        {
            await dbContext.Database.MigrateAsync(cancellationToken);
        });
    }

    private static async Task InsertBulkShortUrlsAsync(
        ApplicationDbContext dbContext, CancellationToken cancellationToken)
    {

        if (dbContext.ShortUrls.Any())
        {
            return;
            // dbContext.ShortUrlHistories.ExecuteDelete();
            // dbContext.ShortUrls.ExecuteDelete();
            // await dbContext.SaveChangesAsync(cancellationToken);
        }


        const int totalRecords = 100_000;
        const int batchSize = 5_000;

        var strategy = dbContext.Database.CreateExecutionStrategy();

        var generatedCodes = new HashSet<string>(StringComparer.Ordinal);


        await strategy.ExecuteAsync(async () =>
        {
            for (int i = 0; i < totalRecords; i += batchSize)
            {
                var batch = new List<Api.Entities.ShortUrl>(batchSize);
                for (int j = 0; j < batchSize && (i + j) < totalRecords; j++)
                {
                    string shortCode;
                    do
                    {
                        shortCode = GenerateRandomShortCode(6);
                    } while (!generatedCodes.Add(shortCode));

                    batch.Add(new Api.Entities.ShortUrl
                    {
                        LongUrl = "https://blog.pragmaticengineer.com/a-philosophy-of-software-design-review/",
                        Code = shortCode
                        //CreatedAt = DateTime.UtcNow
                    });
                }

                await using var transaction = await dbContext.Database
                    .BeginTransactionAsync(cancellationToken);

                dbContext.ShortUrls.AddRange(batch);
                await dbContext.SaveChangesAsync(cancellationToken);
                await transaction.CommitAsync(cancellationToken);
            }
        });
    }

    private static string GenerateRandomShortCode(int length)
    {
        const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var random = new Random();
        var code = new char[length];
        for (int i = 0; i < length; i++)
        {
            code[i] = chars[random.Next(chars.Length)];
        }
        return new string(code);
    }
}
