namespace dotnet_service.Models;

public partial class User
{
    public long UserId { get; set; }
    public string Name { get; set; }
    public string Password { get; set; }
    public string Email { get; set; }
    public string UserType { get; set; }
    public bool PartialBlindness { get; set; }
    public bool FullBlindness { get; set; }
    public string PhoneNumber { get; set; }
    public DateTime BirthDate { get; set; }
    public long? ProfileId { get; set; }
    public virtual Profile Profile { get; set; }
}