using System.Web;
using System.Web.Mvc;
using System.IO.Compression;

namespace DFWAirConditioningExperts
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
            filters.Add(new AuthorizeAttribute());
        }
    }

    public class CompressAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {

            var _encodingsAccepted = filterContext.HttpContext.Request.Headers["Accept-Encoding"];
            if (string.IsNullOrEmpty(_encodingsAccepted)) return;

            _encodingsAccepted = _encodingsAccepted.ToLowerInvariant();
            var _response = filterContext.HttpContext.Response;

            if (_encodingsAccepted.Contains("gzip") || _encodingsAccepted.Contains("GZIP"))
            {
                _response.AppendHeader("Content-encoding", "gzip");
                _response.Filter = new GZipStream(_response.Filter, CompressionMode.Compress);
            }
            else if (_encodingsAccepted.Contains("deflate") || _encodingsAccepted.Contains("DEFLATE"))
            {
                _response.AppendHeader("Content-encoding", "deflate");
                _response.Filter = new DeflateStream(_response.Filter, CompressionMode.Compress);
            }
        }
    }
}
