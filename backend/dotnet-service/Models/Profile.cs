using System;
using System.Collections.Generic;

namespace dotnet_service.Models;

public partial class Profile
{
    public long ProfileId { get; set; }

    public string? CurrentTitle { get; set; }

    public string? CurrentWorkplace { get; set; }

    public virtual ICollection<Experience> Experiences { get; } = new List<Experience>();

    public virtual ICollection<Study> Studies { get; } = new List<Study>();

    public virtual ICollection<User> Users { get; } = new List<User>();
}
