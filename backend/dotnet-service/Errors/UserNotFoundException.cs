using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace dotnet_service.Errors;

public class UserNotFoundException : Exception, IExceptionDetails
{
    public long UserId { get; set; }

    public UserNotFoundException(long userId) : base(string.Format("User with id {0} not found", userId))
    {
        UserId = userId;
    }

    public ProblemDetails GetDetails()
    {
        return new ProblemDetails
        {
            Status = (int)HttpStatusCode.NotFound,
            Type = "not-found-error",
            Title = "User not found error",
            Detail = this.Message
        };
    }
}