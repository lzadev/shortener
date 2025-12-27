using Microsoft.EntityFrameworkCore;
using Shortener.Api.Entities;

namespace Shortener.Api;

internal class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
    public DbSet<ShortUrl> ShortUrls { get; set; }
}
