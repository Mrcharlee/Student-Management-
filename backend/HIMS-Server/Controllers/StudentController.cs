using HIMS_Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace HIMS_Server.Controllers
{
    public class StudentController : Controller
    {
        [HttpGet] 
        public IActionResult AddUI()
        {
            return View("AddStudent");
        }

        [HttpPost] 
        public IActionResult AddUI([FromBody] Student student)
        {
            if (!string.IsNullOrEmpty(student.Name))
            {
                student.Name = student.Name.ToUpper();
            }
            return Ok(student); //dataangular //REACT
        }

        public IActionResult Update()
        {
            return View();
        }
    }
}