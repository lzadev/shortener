using Microsoft.EntityFrameworkCore;
using Shortener.Api.Entities;

namespace Shortener.Api;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
    public DbSet<ShortUrl> ShortUrls { get; set; }
    public DbSet<ShortUrlHistory> ShortUrlHistories { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<ShortUrl>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.Code).IsUnique();
            entity.Property(e => e.LongUrl).IsRequired();
            entity.Property(e => e.Code).IsRequired();
        });
    }
}