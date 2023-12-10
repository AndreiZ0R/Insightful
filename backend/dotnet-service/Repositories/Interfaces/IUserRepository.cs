using BookMySeatApi.Repositories.Interfaces;
using dotnet_service.Models;

namespace dotnet_service.Repositories.Interfaces
{
    /// <summary>
    /// This class provide access to User Repository
    /// </summary>
    public interface IUserRepository : IGenericRepository<User>
    {
    }
}
