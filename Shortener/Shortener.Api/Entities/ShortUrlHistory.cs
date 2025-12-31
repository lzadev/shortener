using Shortener.Api.Entities;

public class ShortUrlHistory
{
    public int Id { get; set; }
    public required int ShortUrlId { get; set; }
    public required DateTime AccessedAt { get; set; }
    public ShortUrl ShortUrl { get; set; }
}