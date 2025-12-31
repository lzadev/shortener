using Microsoft.EntityFrameworkCore;
using Shortener.Api.Entities;

namespace Shortener.Api;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
    public DbSet<ShortUrl> ShortUrls { get; set; }
    public DbSet<ShortUrlHistory> ShortUrlHistories { get; set; }
}