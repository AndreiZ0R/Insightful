using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace dotnet_service.Errors
{
    public class UserProfileNotFoundException : Exception, IExceptionDetails
    {
        public long ProfileId { get; set; }

        public UserProfileNotFoundException(long profileId) : base(string.Format("User with id {0} not found profile", profileId))
        {
            ProfileId = profileId;
        }

        public ProblemDetails GetDetails()
        {
            return new ProblemDetails
            {
                Status = (int)HttpStatusCode.NotFound,
                Type = "not-found-error",
                Title = "Profile not found error",
                Detail = this.Message
            };
        }
    }
}
