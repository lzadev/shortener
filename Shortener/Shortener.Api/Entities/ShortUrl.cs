namespace Shortener.Api.Entities;

public class ShortUrl
{
    public int Id { get; set; }
    public required string LongUrl { get; set; }
    public required string Code { get; set; }
    public List<ShortUrlHistory> AccessHistory { get; set; } = [];
}