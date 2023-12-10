using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Text.Json;

namespace dotnet_service.Middleware
{
    public class ErrorHandlerMiddleware : IMiddleware
    {
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
            }
            catch (Exception exception)
            {
                var response = context.Response;
                response.ContentType = "application/json";

                ProblemDetails error;

                switch (exception)
                {
                    case UserNotFoundException ex:
                        error = ex.GetDetails();
                        break;
                    case UserProfileNotFoundException ex:
                        error = ex.GetDetails();
                        break;
                    default:
                        error = new ProblemDetails();
                        error.Status = (int)HttpStatusCode.InternalServerError;
                        break;
                }

                var result = JsonSerializer.Serialize(error);
                context.Response.StatusCode = error.Status.GetValueOrDefault((int)HttpStatusCode.InternalServerError);
                await response.WriteAsync(result);
            }
        }

    }
}
