using AutoMapper;
using dotnet_service.DTOs;
using dotnet_service.Models;
using dotnet_service.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace dotnet_service.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserController(IUserRepository repo, IMapper mapper)
        {
            _userRepository = repo;
            _mapper = mapper;
        }


        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userRepository.GetAll();
            if (users == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<IList<UserDto>>(users));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(long id)
        {
            var user = await _userRepository.GetById(id);
            return Ok(_mapper.Map<UserDto>(user));
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
