namespace dotnet_service.DTOs
{
    public class UserDto
    {
        public bool FullBlindness { get; set; }
        public string? Name { get; set; }
        public bool PartialBlindness { get; set; }
        public string? UserType { get; set; }
        public string? Email { get; set; }
        public DateTime? BirthDate { get; set; }
        public string? PhoneNumber { get; set; }
    }
}
