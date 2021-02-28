using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DFWAirConditioningExperts.Controllers
{
    public class ErrorController : Controller
    {
        [AllowAnonymous]
        public ActionResult Sorry()
        {
            //ViewBag.Title = "Error";

            return View();
        }
    }
}
