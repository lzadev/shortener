using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Shortener.Api.Migrations
{
    /// <inheritdoc />
    public partial class UpdateEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Url",
                table: "ShortUrls",
                newName: "ShortenUrl");

            migrationBuilder.RenameColumn(
                name: "Code",
                table: "ShortUrls",
                newName: "LongUrl");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ShortenUrl",
                table: "ShortUrls",
                newName: "Url");

            migrationBuilder.RenameColumn(
                name: "LongUrl",
                table: "ShortUrls",
                newName: "Code");
        }
    }
}
