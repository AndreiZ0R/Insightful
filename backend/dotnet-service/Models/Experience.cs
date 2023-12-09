using System;
using System.Collections.Generic;

namespace dotnet_service.Models;

public partial class Experience
{
    public long ExperienceId { get; set; }

    public string? Company { get; set; }

    public DateTime? EndDate { get; set; }

    public long? ExperienceUserId { get; set; }

    public string? Position { get; set; }

    public DateTime? StartDate { get; set; }

    public virtual Profile? ExperienceUser { get; set; }

    public virtual ICollection<Skill> Skills { get; } = new List<Skill>();
}
