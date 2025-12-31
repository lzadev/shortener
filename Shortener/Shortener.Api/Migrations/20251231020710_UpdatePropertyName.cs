using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Shortener.Api.Migrations
{
    /// <inheritdoc />
    public partial class UpdatePropertyName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ShortenUrl",
                table: "ShortUrls",
                newName: "Code");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Code",
                table: "ShortUrls",
                newName: "ShortenUrl");
        }
    }
}
