using BookMySeatApi.Repositories;
using dotnet_service.Data;
using dotnet_service.Models;
using dotnet_service.Models.UserProfile;
using dotnet_service.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using static dotnet_service.Commons.CommonConstants;

namespace dotnet_service.Repositories
{
    public class ProfileRepository : GenericRepository<Profile>, IProfileRepository
    {
        private readonly DataContext _context;

        public ProfileRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public async Task<UserProfile?> GetUserProfile(long userId)
        {
            var user = await _context.Users
                .Include(user => user.Profile).FirstOrDefaultAsync(u => u.UserId == userId);
            var profile = _context.Profiles.FirstOrDefaultAsync(p => p.ProfileId == user.ProfileId);
            var exps = _context.Experiences;
            var ski = _context.Skills;
            var stud = _context.Studies;
            return profile != null ? await BuildUserProfile(user, profile.Result) : null;
        }

        private Task<UserProfile?> BuildUserProfile(User user, Profile profile)
        {
            UserProfile userProfile = new();

            if (user.Profile != null)
            {

                var visionStatus = VisionStatus.NotSpecified;
                if (user.FullBlindness)
                {
                    visionStatus = VisionStatus.FullBlindness;
                }
                else if (user.PartialBlindness)
                {
                    visionStatus = VisionStatus.PartialBlindness;
                }

                userProfile = new UserProfile
                {
                    Name = user.Name,
                    Email = user.Email,
                    VisionStatus = visionStatus,
                    Title = profile?.CurrentTitle ?? string.Empty,
                    Workplace = profile?.CurrentWorkplace ?? string.Empty,
                    Experiences = profile?.Experiences.ToList(),
                    Studies = profile?.Studies.ToList(),
                    BirthDate = user.BirthDate,
                    PhoneNumber = user.PhoneNumber
                };
            }
            return Task.FromResult<UserProfile?>(userProfile);
        }
    }
}