using System;
using System.Collections.Generic;

namespace dotnet_service.Models;

public partial class Skill
{
    public long SkillId { get; set; }

    public string? SkillName { get; set; }

    public long? UserSkillId { get; set; }

    public virtual Experience? UserSkill { get; set; }
}
