using System.Web;
using System.Web.Optimization;

namespace DFWAirConditioningExperts
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            ScriptBundle scriptBundle = new ScriptBundle("~/bundles/alljs");
            string[] scriptArray =
            {
                "~/Scripts/jquery.validate*",
                      "~/Scripts/flickity.js",
                      "~/Scripts/jqBootstrapValidation.js",
                      "~/Scripts/jquery-1.11.0.js",
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/elfsight.js",
                      "~/Scripts/toastr.js"
            };
            scriptBundle.Include(scriptArray);
            bundles.Add(scriptBundle);


            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));


            bundles.Add(new StyleBundle("~/Content/allcss").Include(
                      "~/Content/site.css",
                      "~/Content/googleapis.css",
                      "~/Content/bootstrap.css",
                      "~/Content/font-awesome.css",
                      "~/Content/animate.css",
                      "~/Content/flickity.css",
                      "~/Content/toastr.css",
                      "~/Content/templatemo_misc.css",
                      "~/Content/templatemo_style.css"));

            BundleTable.EnableOptimizations = true;
        }
    }
}
