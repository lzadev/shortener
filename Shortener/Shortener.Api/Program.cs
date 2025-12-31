using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shortener.Api;
using Shortener.Api.Entities;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();

builder.AddNpgsqlDbContext<ApplicationDbContext>("shorter-db");

builder.AddRedisClient(connectionName: "redis");

builder.Services.AddSignalR();

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

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

app.UseCors("AllowFrontend");

app.UseHttpsRedirection();

app.MapGet("/", async (ApplicationDbContext context) =>
{
    return await context.ShortUrls.ToListAsync();
})
.WithName("GetShortenerUrl");

app.MapGet("/{code}", async (string code, ApplicationDbContext context, IConnectionMultiplexer connectionMux) =>
{
    var key = code.ToLower();

    var cache = connectionMux.GetDatabase();

    var cachedShortUrl = await cache.StringGetAsync(key);

    if (cachedShortUrl.HasValue)
    {
        var shortUrlDto = JsonSerializer.Deserialize<ShortUrl>(
            Encoding.UTF8.GetString(cachedShortUrl!)
        );

        await InsertHistory(context, shortUrlDto!.Id);

        return Results.Redirect(shortUrlDto!.LongUrl);
    }

    var shortUrl = await context.ShortUrls
                        .FirstOrDefaultAsync(x => x.Code.ToLower() == key);

    if (shortUrl is null)
        return Results.NotFound();

    var json = JsonSerializer.Serialize(shortUrl);

    await cache.StringSetAsync(key, json, TimeSpan.FromDays(1));

    await InsertHistory(context, shortUrl.Id);

    return Results.Redirect(shortUrl.LongUrl);
})
.WithName("GetShortenerUrlByCode");


app.MapGet("/shortener/{code}/visits", async (string code, ApplicationDbContext context) =>
{
    var visits = await context.ShortUrlHistories
        .Where(h => h.ShortUrl.Code.ToLower() == code.ToLower())
        .CountAsync();

    return Results.Ok(visits);
});

app.MapPost("/shortener", async ([FromBody] CreateShortUrlDto dto, ApplicationDbContext context) =>
{
    var code = await GetCode(context);

    var shortUrl = new ShortUrl
    {
        LongUrl = dto.LongUrl,
        Code = code
    };

    context.ShortUrls.Add(shortUrl);
    await context.SaveChangesAsync();

    var response = shortUrl.ToDto();

    return Results.Created($"{response.ShortUrl}", response);

}).WithName("CreateShortenerUrl");

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

static async Task<string> GetCode(ApplicationDbContext context)
{
    string code;
    do
    {
        code = GenerateCode();
    } while (await context.ShortUrls.AnyAsync(x => x.Code == code));
    return code;
}

static string GenerateCode(int length = 6)
{
    const string chars = "abcdefghijklmnopqrstuvwxyz123456789";
    var random = new Random();
    return new string(Enumerable.Repeat(chars, length)
        .Select(s => s[random.Next(s.Length)]).ToArray());
}

app.Run();

