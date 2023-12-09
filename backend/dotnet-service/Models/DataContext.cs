using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace dotnet_service.Models;

public partial class DataContext : DbContext
{
    public DataContext()
    {
    }

    public DataContext(DbContextOptions<DataContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Experience> Experiences { get; set; }

    public virtual DbSet<Profile> Profiles { get; set; }

    public virtual DbSet<Skill> Skills { get; set; }

    public virtual DbSet<Study> Studies { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseNpgsql("Host=insightful.c2jcb19jmxan.eu-north-1.rds.amazonaws.com;Username=postgres;Password=12345678;Database=initial_db");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Experience>(entity =>
        {
            entity.HasKey(e => e.ExperienceId).HasName("experience_pkey");

            entity.ToTable("experience");

            entity.Property(e => e.ExperienceId).HasColumnName("experience_id");
            entity.Property(e => e.Company)
                .HasMaxLength(255)
                .HasColumnName("company");
            entity.Property(e => e.EndDate)
                .HasColumnType("timestamp(6) without time zone")
                .HasColumnName("end_date");
            entity.Property(e => e.ExperienceUserId).HasColumnName("experience_user_id");
            entity.Property(e => e.Position)
                .HasMaxLength(255)
                .HasColumnName("position");
            entity.Property(e => e.StartDate)
                .HasColumnType("timestamp(6) without time zone")
                .HasColumnName("start_date");

            entity.HasOne(d => d.ExperienceUser).WithMany(p => p.Experiences)
                .HasForeignKey(d => d.ExperienceUserId)
                .HasConstraintName("fkmckgvyg3xvqgfmib0d088iv3d");
        });

        modelBuilder.Entity<Profile>(entity =>
        {
            entity.HasKey(e => e.ProfileId).HasName("profile_pkey");

            entity.ToTable("profile");

            entity.Property(e => e.ProfileId).HasColumnName("profile_id");
            entity.Property(e => e.CurrentTitle)
                .HasMaxLength(255)
                .HasColumnName("current_title");
            entity.Property(e => e.CurrentWorkplace)
                .HasMaxLength(255)
                .HasColumnName("current_workplace");
        });

        modelBuilder.Entity<Skill>(entity =>
        {
            entity.HasKey(e => e.SkillId).HasName("skill_pkey");

            entity.ToTable("skill");

            entity.Property(e => e.SkillId).HasColumnName("skill_id");
            entity.Property(e => e.SkillName)
                .HasMaxLength(255)
                .HasColumnName("skill_name");
            entity.Property(e => e.UserSkillId).HasColumnName("user_skill_id");

            entity.HasOne(d => d.UserSkill).WithMany(p => p.Skills)
                .HasForeignKey(d => d.UserSkillId)
                .HasConstraintName("fkdkwyxgsarecesb4fl4uy9cjdv");
        });

        modelBuilder.Entity<Study>(entity =>
        {
            entity.HasKey(e => e.StudyId).HasName("study_pkey");

            entity.ToTable("study");

            entity.Property(e => e.StudyId).HasColumnName("study_id");
            entity.Property(e => e.Degree)
                .HasMaxLength(255)
                .HasColumnName("degree");
            entity.Property(e => e.EndDate)
                .HasColumnType("timestamp(6) without time zone")
                .HasColumnName("end_date");
            entity.Property(e => e.StartDate)
                .HasColumnType("timestamp(6) without time zone")
                .HasColumnName("start_date");
            entity.Property(e => e.StudyLocation)
                .HasMaxLength(255)
                .HasColumnName("study_location");
            entity.Property(e => e.StudyUserId).HasColumnName("study_user_id");

            entity.HasOne(d => d.StudyUser).WithMany(p => p.Studies)
                .HasForeignKey(d => d.StudyUserId)
                .HasConstraintName("fk2q9tiqmhv971rxqehuyeqipxj");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("user_pkey");

            entity.ToTable("user");

            entity.HasIndex(e => e.Email, "uk_ob8kqyqqgmefl0aco34akdtpe").IsUnique();

            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .HasColumnName("email");
            entity.Property(e => e.FullBlindness).HasColumnName("full_blindness");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.PartialBlindness).HasColumnName("partial_blindness");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .HasColumnName("password");
            entity.Property(e => e.ProfileId).HasColumnName("profile_id");
            entity.Property(e => e.UserType)
                .HasMaxLength(255)
                .HasColumnName("user_type");

            entity.HasOne(d => d.Profile).WithMany(p => p.Users)
                .HasForeignKey(d => d.ProfileId)
                .HasConstraintName("fkw7a9mgwbcdd9t3ttjs21t3cm");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
