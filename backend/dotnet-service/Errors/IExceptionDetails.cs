using Microsoft.AspNetCore.Mvc;

namespace dotnet_service.Errors;

public interface IExceptionDetails
{
    ProblemDetails GetDetails();
}