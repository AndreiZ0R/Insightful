using dotnet_service.Models;

namespace dotnet_service.DTOs
{
    public class UserProfileDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string VisionStatus { get; set; }
        public string Title { get; set; }
        public string Workplace { get; set; }
        public List<Experience> Experiences { get; set; }
        public List<Study> Studies { get; set; }
        public DateTime BirthDate { get; set; }
        public string PhoneNumber { get; set; }
    }
}