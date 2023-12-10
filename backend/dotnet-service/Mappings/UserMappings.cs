using dotnet_service.DTOs;
using dotnet_service.Models;
using AutoMapper;
using dotnet_service.Models.UserProfile;

namespace dotnet_service.Mappings;

public class UserMappings : AutoMapper.Profile
{
    public UserMappings()
    {
        // Source -> Target
        CreateMap<User, UserDto>();
        CreateMap<UserDto, User>();
        CreateMap<UserProfileDto, UserProfile>();
        CreateMap<UserProfile, UserProfileDto>();
    }
}
