namespace dotnet_service.Models;

public partial class Experience
{
    public long ExperienceId { get; set; }
    public long ExperienceUserId { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string Company { get; set; }
    public string Position { get; set; }
    public virtual ICollection<Skill> Skills { get; set; }
}
