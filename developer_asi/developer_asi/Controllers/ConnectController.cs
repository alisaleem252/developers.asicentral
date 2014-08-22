using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace developer_asi.Controllers
{
    public class ConnectController : Controller
    {
        //
        // GET: /Connect/

        public ActionResult API()
        {
            return View();
        }

        public ActionResult Auth()
        {
            return View();
        }

        public ActionResult ErrorCode()
        {
            return View();
        }

        public ActionResult Console()
        {
            return View();
        }

        public ActionResult GetCreditReport()
        {
            return View("~/Views/Connect/1/get/creditreport/id/index.cshtml");
        }

        public ActionResult GetCreditSummary()
        {
            return View("~/Views/Connect/1/get/creditsummary/id/index.cshtml");
        }
    }
}
