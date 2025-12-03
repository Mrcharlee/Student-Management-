using HIMS_Server.Models;
using Microsoft.EntityFrameworkCore;
using System;

public class StudentDbContext : DbContext
{
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("Data Source=DESKTOP-789DRGB\\SQLEXPRESS;Initial Catalog=StudentDBKMC;Integrated Security=True;Trust Server Certificate=True");

        // ADD THESE LINES FOR DEBUGGING:
        optionsBuilder.EnableSensitiveDataLogging();
        optionsBuilder.LogTo(Console.WriteLine, Microsoft.Extensions.Logging.LogLevel.Information);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Student>().ToTable("tblStudent");
        modelBuilder.Entity<Address>().ToTable("tblAddress");

        // Configure relationship
        modelBuilder.Entity<Student>()
            .HasMany(s => s.Addresses)
            .WithOne(a => a.Student)
            .HasForeignKey(a => a.StudentId)
            .OnDelete(DeleteBehavior.Cascade);
    }

    public DbSet<Student> Students { get; set; }
    public DbSet<Address> Addresses { get; set; }
}