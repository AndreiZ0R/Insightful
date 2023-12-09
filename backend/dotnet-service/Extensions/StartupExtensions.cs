using BookMySeatApi.Repositories.Interfaces;
using BookMySeatApi.Repositories;
using dotnet_service.Models;
using dotnet_service.Repositories.Interfaces;
using dotnet_service.Repositories;
using Microsoft.EntityFrameworkCore;
using static dotnet_service.Commons.CommonConstants;
using dotnet_service.Mappings;

namespace dotnet_service.Extensions
{
    public static class StartupExtensions
    {
        public static void AddHttpClientServices(this IServiceCollection services)
        {
            // Configure and add HttpClient service 
            services.AddHttpClient("SpringBootApi", client =>
            {
                client.BaseAddress = new Uri("192.168.35.228:8080");
                client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/xml"));
                client.Timeout = TimeSpan.FromSeconds(Time.FiveSeconds);
                // Default request headers, timeout, etc#
            })
                .ConfigurePrimaryHttpMessageHandler(() =>
                {
                    return new HttpClientHandler
                    {
                        // The following line is insecure as it trusts all SSL certificates
                        // Used only for development 
                        ServerCertificateCustomValidationCallback = (sender, cert, chain, SslPolicyErrors) => true
                    };
                });

            // Here it can be add more HttpClients or other services if needed
        }

        public static IServiceCollection AddDataContext(this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<DataContext>(options =>
            {
                options.UseNpgsql(config.GetConnectionString("DefaultConnection"));
            });
            return services;
        }
        public static IServiceCollection AddMappingProfiles(this IServiceCollection services)
        {
            services.AddAutoMapper(typeof(UserMappings));
            return services;
        }

        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.AddScoped<IUserRepository, UserRepository>();
            return services;
        }
    }
}