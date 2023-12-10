using BookMySeatApi.Repositories;
using dotnet_service.Data;
using dotnet_service.Models;
using dotnet_service.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace dotnet_service.Repositories
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await _context.Users.ToListAsync();
        }
    }
}
