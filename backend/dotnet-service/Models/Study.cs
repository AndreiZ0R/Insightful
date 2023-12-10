namespace dotnet_service.Models;

public partial class Study
{
    public long StudyId { get; set; }
    public long StudyUserId { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string Degree { get; set; }
    public string StudyLocation { get; set; }
}
