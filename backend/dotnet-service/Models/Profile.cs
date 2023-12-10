namespace dotnet_service.Models;

public partial class Profile
{
    public long ProfileId { get; set; }
    public string CurrentTitle { get; set; }
    public string CurrentWorkplace { get; set; }
    public virtual ICollection<Study> Studies { get; set; }
    public virtual ICollection<Experience> Experiences { get; set; }
}