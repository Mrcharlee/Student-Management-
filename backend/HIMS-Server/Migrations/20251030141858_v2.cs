using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HIMS_Server.Migrations
{
    /// <inheritdoc />
    public partial class v2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Street",
                table: "tblAddress",
                newName: "Street2");

            migrationBuilder.AddColumn<string>(
                name: "Street1",
                table: "tblAddress",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Street1",
                table: "tblAddress");

            migrationBuilder.RenameColumn(
                name: "Street2",
                table: "tblAddress",
                newName: "Street");
        }
    }
}
