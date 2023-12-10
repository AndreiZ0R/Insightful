using dotnet_service.Models;
using Microsoft.EntityFrameworkCore;

namespace dotnet_service.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Profile> Profiles { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<Study> Studies { get; set; }
        public DbSet<Experience> Experiences { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasOne(u => u.Profile)
                .WithOne()
                .HasForeignKey<User>(u => u.ProfileId);

            modelBuilder.Entity<Profile>()
                .HasMany(p => p.Studies)
                .WithOne()
                .HasForeignKey(s => s.StudyUserId);

            modelBuilder.Entity<Profile>()
                .HasMany(p => p.Experiences)
                .WithOne()
                .HasForeignKey(e => e.ExperienceUserId);

            modelBuilder.Entity<Experience>()
                .HasMany(e => e.Skills)
                .WithOne()
                .HasForeignKey(s => s.UserSkillId);
        }
    }
}