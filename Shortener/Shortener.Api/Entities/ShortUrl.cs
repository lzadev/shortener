namespace Shortener.Api.Entities;

internal class ShortUrl
{
    public int Id { get; set; }
    public required string Url { get; set; }
    public required string Code { get; set; }
}