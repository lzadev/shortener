using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shortener.Api;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();


builder.AddNpgsqlDbContext<ApplicationDbContext>("shorter-db");

builder.AddRedisClient(connectionName: "redis");

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

    var database = connectionMux.GetDatabase();

    var cachedShortUrl = await database.StringGetAsync(key);

    if (cachedShortUrl.HasValue)
        return Results.Redirect(cachedShortUrl!);

    var shortUrl = await context.ShortUrls.FirstOrDefaultAsync(x => x.Code.ToLower() == key);

    if (shortUrl is not null)
        await database.StringSetAsync(key, shortUrl.Url, TimeSpan.FromDays(1));

    return shortUrl is not null ? Results.Redirect(shortUrl.Url) : Results.NotFound();
})
.WithName("GetShortenerUrlByCode");

app.Run();