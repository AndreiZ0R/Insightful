
using BookMySeatApi.Repositories.Interfaces;
using dotnet_service.Models;
using dotnet_service.Models.UserProfile;

namespace dotnet_service.Repositories.Interfaces
{
    /// <summary>
    /// This class provide access to Profile Repository
    /// </summary>
    public interface IProfileRepository : IGenericRepository<Profile>
    {
        /// <summary>
        /// Get user profile
        /// </summary>
        /// <param name="userId"></param>
        /// <returns>User profile</returns>
        Task<UserProfile?> GetUserProfile(long userId);
    }
}