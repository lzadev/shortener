using Shortener.Api.Entities;

internal static class ShortUrlMapper
{
    public static ShortUrlDto ToDto(this ShortUrl shortUrl)
    {
        var shortUrlValue = $"https://localhost:7153/{shortUrl.Code}";

        return new ShortUrlDto(shortUrlValue, shortUrl.LongUrl, shortUrl.Code);
    }
}