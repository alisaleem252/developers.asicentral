using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace developer_asi.Controllers
{
    public class SmartlinkController : Controller
    {
        //
        // GET: /Smartlink/

        public ActionResult Setup()
        {
            return View("~/Views/Smartlink/Auth.cshtml");
            
        }

        public ActionResult Auth()
        {
            return View();
        }

        public ActionResult API()
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
        public ActionResult GetListbyDimension()
        {
            return View("~/Views/smartlink/1/get/lists/auto_complete/dimension/index.cshtml");
        }
        public ActionResult GetNews()
        {
            return View("~/Views/smartlink/1/get/lists/news/index.cshtml");
        }
        public ActionResult GetNewsbyID()
        {
            return View("~/Views/smartlink/1/get/lists/news/id/index.cshtml");
        }
        public ActionResult GetProducts()
        {
            return View("~/Views/smartlink/1/get/products/search/index.cshtml");
        }
        public ActionResult GetProductbyID()
        {
            return View("~/Views/smartlink/1/get/products/id/index.cshtml");
        }
        public ActionResult GetSuppliers()
        {
            return View("~/Views/smartlink/1/get/suppliers/search/index.cshtml");
        }
        public ActionResult GetSupplierbyID()
        {
            return View("~/Views/smartlink/1/get/suppliers/id/index.cshtml");
        }
        public ActionResult GetDecorators()
        {
            return View("~/Views/smartlink/1/get/decorators/search/index.cshtml");
        }
        public ActionResult GetDecoratorbyID()
        {
            return View("~/Views/smartlink/1/get/decorators/id/index.cshtml");
        }
        public ActionResult GetMediabyID()
        {
            return View("~/Views/smartlink/1/get/media/id/index.cshtml");
        }
    }
}
