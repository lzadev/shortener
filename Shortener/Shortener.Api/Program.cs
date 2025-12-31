using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shortener.Api;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();


builder.AddNpgsqlDbContext<ApplicationDbContext>("shorter-db");

builder.AddRedisClient(connectionName: "redis");

builder.Services.AddSignalR();

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

app.MapDefaultEndpoints();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.MapGet("/shortener", async (ApplicationDbContext context) =>
{
    return await context.ShortUrls.ToListAsync();
})
.WithName("GetShortenerUrl");

app.MapGet("/shortener/{code}", async (string code, ApplicationDbContext context, IConnectionMultiplexer connectionMux) =>
{
    var key = code.ToLower();

    var cache = connectionMux.GetDatabase();

    var cachedShortUrl = await cache.StringGetAsync(key);

    if (cachedShortUrl.HasValue)
    {
        var shortUrlDto = JsonSerializer.Deserialize<ShortUrlDto>(
            Encoding.UTF8.GetString(cachedShortUrl!)
        );

        await InsertHistory(context, shortUrlDto!.Id);

        return Results.Redirect(shortUrlDto!.Url);
    }

    var shortUrl = await context.ShortUrls
                        .Where(x => x.Code.ToLower() == key)
                        .Select(x => new ShortUrlDto(x.Id, x.Url))
                        .FirstOrDefaultAsync();

    if (shortUrl is null)
        return Results.NotFound();


    var json = JsonSerializer.Serialize(shortUrl);

    await cache.StringSetAsync(key, json, TimeSpan.FromDays(1));

    await InsertHistory(context, shortUrl.Id);

    return Results.Redirect(shortUrl.Url);
})
.WithName("GetShortenerUrlByCode");

static async Task InsertHistory(ApplicationDbContext context, int shortUrlId)
{
    var history = new ShortUrlHistory
    {
        ShortUrlId = shortUrlId,
        AccessedAt = DateTime.UtcNow
    };
    context.ShortUrlHistories.Add(history);
    await context.SaveChangesAsync();
}

app.Run();

