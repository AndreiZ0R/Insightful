using AutoMapper;
using dotnet_service.DTOs;
using dotnet_service.Errors;
using dotnet_service.Models;
using dotnet_service.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace dotnet_service.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IProfileRepository _profileRepository;
        private readonly IMapper _mapper;

        public UserController(IUserRepository repo, IProfileRepository profileRepository, IMapper mapper)
        {
            _userRepository = repo;
            _profileRepository = profileRepository;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(long id)
        {
            var user = await _userRepository.GetById(id);
            if (user == null)
            {
                throw new UserNotFoundException(id);
            }
            return Ok(_mapper.Map<UserDto>(user));
        }

        [HttpGet("profile/{userId}")]
        public async Task<IActionResult> GetUserProfile(long userId)
        {
            var user = await _userRepository.GetById(userId);
            if (user == null)
            {
                throw new UserNotFoundException(userId);
            }

            var userProfile = await _profileRepository.GetUserProfile(userId);
            if(userProfile == null)
            {
                throw new UserProfileNotFoundException(userId);
            }
            return Ok(_mapper.Map<UserProfileDto>(userProfile));
        }

        [HttpPost("register")]
        public async Task<IActionResult> AddUser([FromBody] UserDto user)
        {
            if (user != null)
            {
                var newUser = _mapper.Map<User>(user);
                await _userRepository.Add(newUser);
                return Created(nameof(GetUserById), _mapper.Map<UserDto>(newUser));
            }
            return BadRequest();
        }
    }
}
