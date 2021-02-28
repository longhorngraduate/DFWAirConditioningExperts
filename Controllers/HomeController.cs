using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;

namespace DFWAirConditioningExperts.Controllers
{
    public class HomeController : Controller
    {
        //------------------------- HOME PAGES -------------------------
        [AllowAnonymous]
        [Compress]
        public ActionResult Index()
        {
            ViewBag.Title = "AC Repair - Get 24 hour AC Repair and Installation | DFW AC Experts";
            return View();
        }

        [AllowAnonymous]
        [Compress]
        public ActionResult AireAcondicionadoReparacion()
        {
            ViewBag.Title = "Aire Acondicionado Reparacion e Instalacion: 24 horas al dia y barato";
            return View();
        }
        //------------------------- end of HOME PAGES -------------------------

        //------------------------- PROMO CODE -------------------------
        [AllowAnonymous]
        [Compress]
        public ActionResult PromoCode()
        {
            ViewBag.Title = "Promo Code - Get 24 hour AC Repair and Installation | DFW AC Experts";
            return View();
        }

        [AllowAnonymous]
        [Compress]
        public ActionResult PromoCodeSuccess()
        {
            ViewBag.Title = "Promo Code - Get 24 hour AC Repair and Installation | DFW AC Experts";
            return View();
        }

        [AllowAnonymous]
        [Compress]
        public ActionResult CodigoPromocional()
        {
            ViewBag.Title = "Aire Acondicionado Reparacion e Instalacion: Codigo Promocional";
            return View();
        }

        [AllowAnonymous]
        [Compress]
        public ActionResult CodigoPromocionalExito()
        {
            ViewBag.Title = "Aire Acondicionado Reparacion e Instalacion: Codigo Promocional";
            return View();
        }
        //------------------------- end of PROMO CODE -------------------------

        //------------------------- end of FAQ -------------------------
        //[AllowAnonymous]
        //public ActionResult ACRepairFAQ()
        //{
        //    ViewBag.Title = "Aire Acondicionado Reparacion e Instalacion: 24 horas al dia y barato";
        //    return View();
        //}
        //------------------------- end of FAQ -------------------------



        // ------------------------- HELPER -------------------------
        [HttpPost]
        [AllowAnonymous]
        public ActionResult Send(string name, string preferredmethod, string phone, string email, string message)
        {
            MailMessage mailMessage = new MailMessage();
            mailMessage.From = new MailAddress("Support@DFWAirConditioningExperts.com");
            SetRecipients(mailMessage);//.To
            mailMessage.IsBodyHtml = true;
            mailMessage.Subject = "DFW Air Conditioning Experts - CONTACT US";
            mailMessage.Body = "<table>" +
                "<tr><td style='font-weight: bold;'>Name</td><td>" + name + "</td></tr>" +
                "<tr><td style='font-weight: bold;'>Preferred Method</td><td>" + preferredmethod + "</td></tr>" +
                "<tr><td style='font-weight: bold;'>Phone</td><td>" + phone + "</td></tr>" +
                "<tr><td style='font-weight: bold;'>Email</td><td>" + email + "</td></tr>" +
                "<tr><td style='font-weight: bold;'>Message</td><td>" + message + "</td></tr></table>";
            SmtpClient smtpClient = new SmtpClient();

            try
            {
                smtpClient.Send(mailMessage);
            }
            catch (Exception)
            {
                return Content("Error");
            }

            return Content("OK");
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult GetPromoCode(string name, string preferredmethod, string phone, string email, string message)
        {
            MailMessage mailMessage = new MailMessage();
            mailMessage.From = new MailAddress("Support@DFWAirConditioningExperts.com");
            SetRecipients(mailMessage);//.To
            mailMessage.IsBodyHtml = true;
            mailMessage.Subject = "DFW Air Conditioning Experts - PROMO CODE";
            mailMessage.Body = "<table>" +
                "<tr><td style='font-weight: bold;'>Name</td><td>" + name + "</td></tr>" +
                "<tr><td style='font-weight: bold;'>Preferred Method</td><td>" + preferredmethod + "</td></tr>" +
                "<tr><td style='font-weight: bold;'>Phone</td><td>" + phone + "</td></tr>" +
                "<tr><td style='font-weight: bold;'>Email</td><td>" + email + "</td></tr>" +
                "<tr><td style='font-weight: bold;'>Message</td><td>" + message + "</td></tr></table>";
            SmtpClient smtpClient = new SmtpClient();

            try
            {
                smtpClient.Send(mailMessage);
            }
            catch (Exception)
            {
                return Content("Error");
            }

            return Content("OK");
        }
        

        private void SetRecipients(MailMessage mailMessage)
        {
            string emails_str = System.Web.Configuration.WebConfigurationManager.AppSettings["OurEmails"];
            emails_str = emails_str.Replace(" ", "");
            emails_str = emails_str.Replace(",", ";");
            List<string> emails_list = emails_str.Split(';').ToList<string>();
            foreach (string iEmail in emails_list)
            {
                mailMessage.To.Add(new MailAddress(iEmail));
            }
        }
        // ------------------------- end of HELPER -------------------------
    }
}