using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace HIMS_Server
{
    // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    public class BruteForceMiddleware
    {
        private readonly RequestDelegate _next;

        public BruteForceMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public Task Invoke(HttpContext httpContext)
        {
            //check 10sec
                return _next(httpContext);
        }
    }

    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class MiddlewareExtensions
    {
        public static IApplicationBuilder UseMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<BruteForceMiddleware>();
        }
    }
}
