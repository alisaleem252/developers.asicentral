using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace developer_asi.Controllers
{
    public class EspUpdatesController : Controller
    {
        //
        // GET: /EspUpdates/

        public ActionResult Setup()
        {
            return View();
        }

        public ActionResult API()
        {
            return View();
        }

        public ActionResult DataDefinition()
        {
            return View();
        }

        public ActionResult Lookup()
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

        public ActionResult GetProduct()
        {
            return View("~/Views/EspUpdates/1/get/product/id/index.cshtml");
        }

        public ActionResult PostProduct()
        {
            return View("~/Views/EspUpdates/1/post/product/id/index.cshtml");
        }
    }
}
