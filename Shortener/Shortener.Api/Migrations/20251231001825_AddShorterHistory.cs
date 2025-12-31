using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Shortener.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddShorterHistory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ShortUrlHistories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ShortUrlId = table.Column<int>(type: "integer", nullable: false),
                    AccessedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShortUrlHistories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ShortUrlHistories_ShortUrls_ShortUrlId",
                        column: x => x.ShortUrlId,
                        principalTable: "ShortUrls",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ShortUrlHistories_ShortUrlId",
                table: "ShortUrlHistories",
                column: "ShortUrlId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ShortUrlHistories");
        }
    }
}
