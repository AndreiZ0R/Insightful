using dotnet_service.Extensions;
using dotnet_service.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Services added to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// HttpClient service from SpringBoot 
builder.Services.AddHttpClientServices();

// Other services
builder.Services.AddDataContext(builder.Configuration);
builder.Services.AddMappingProfiles();
builder.Services.AddRepositories();
builder.Services.AddMiddlewareServices();

var app = builder.Build();

// HTTP configuration request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
}

app.UseHttpsRedirection();
app.UseMiddleware<ErrorHandlerMiddleware>();
app.UseAuthorization();
app.MapControllers();
app.Run();
