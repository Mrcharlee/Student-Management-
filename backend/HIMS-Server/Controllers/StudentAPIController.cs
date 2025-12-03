using HIMS_Server.Models;
using HIMS_Server.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace HIMS_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentAPIController : ControllerBase
    {
        // GET: api/<StudentAPIController>
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                using (StudentDbContext db = new StudentDbContext())
                {
                    // INCLUDE addresses in the query
                    List<Student> students = db.Students
                        .Include(s => s.Addresses)  // Add this line
                        .ToList();

                    return Ok(students);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving students: {ex.Message}");
            }
        }
        // POST api/<StudentAPIController>
        [HttpPost]
        public IActionResult Post([FromBody] StudentRequest value)
        {
            try
            {
                // If model validation fails, [ApiController] will automatically return 400.
                // Null-safe normalization
                string nameStr = (value?.Name ?? string.Empty).ToUpperInvariant();
                value.Code = value.Code ?? "";
                value.Email = value.Email ?? "";
                value.Phone = value.Phone ?? "";

                // MINIMAL CHANGE: Add validation for "0" and empty values
                if (string.IsNullOrEmpty(nameStr) || nameStr == "0")
                {
                    return BadRequest("Name is required and cannot be '0'");
                }

                if (string.IsNullOrEmpty(value.Code) || value.Code == "0")
                {
                    return BadRequest("Student code is required and cannot be '0'");
                }

                using (StudentDbContext db = new StudentDbContext())
                {
                    // Create Student entity
                    var student = new Student
                    {
                        Name = nameStr,
                        Code = value.Code,
                        Email = value.Email,
                        Phone = value.Phone
                    };

                    // Add student first to get ID
                    db.Students.Add(student);
                    db.SaveChanges();

                    // Now add addresses
                    if (value.Addresses != null && value.Addresses.Any())
                    {
                        foreach (var addressReq in value.Addresses)
                        {
                            var address = new Address
                            {
                                Street = addressReq.Street ?? "",
                                City = addressReq.City ?? "",
                                State = addressReq.State ?? "",
                                ZipCode = addressReq.ZipCode ?? "",
                                AddressType = addressReq.AddressType ?? "",
                                StudentId = student.Id
                            };
                            db.Addresses.Add(address);
                        }
                        db.SaveChanges();
                    }

                    // Return success
                    return Ok(new { message = "Student added successfully", id = student.Id });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error adding student: {ex.Message}");
            }
        }

        // PUT api/<StudentAPIController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] StudentRequest value)
        {
            try
            {
                using (StudentDbContext db = new StudentDbContext())
                {
                    var existingStudent = db.Students
                        .Include(s => s.Addresses)
                        .FirstOrDefault(s => s.Id == id);

                    if (existingStudent == null)
                        return NotFound();

                    // Update basic properties
                    string nameStr = (value?.Name ?? string.Empty).ToUpperInvariant();
                    existingStudent.Name = nameStr;
                    existingStudent.Code = value.Code ?? "";
                    existingStudent.Email = value.Email ?? "";
                    existingStudent.Phone = value.Phone ?? "";

                    // Update addresses
                    if (value.Addresses != null && value.Addresses.Any())
                    {
                        // Remove existing addresses
                        db.Addresses.RemoveRange(existingStudent.Addresses);

                        // Add new addresses
                        foreach (var addressReq in value.Addresses)
                        {
                            var address = new Address
                            {
                                Street = addressReq.Street ?? "",
                                City = addressReq.City ?? "",
                                State = addressReq.State ?? "",
                                ZipCode = addressReq.ZipCode ?? "",
                                AddressType = addressReq.AddressType ?? "",
                                StudentId = id
                            };
                            db.Addresses.Add(address);
                        }
                    }

                    db.SaveChanges();
                    return Ok(new { message = "Student updated successfully" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error updating student: {ex.Message}");
            }
        }

        // DELETE api/<StudentAPIController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                using (StudentDbContext db = new StudentDbContext())
                {
                    var student = db.Students
                        .Include(s => s.Addresses)
                        .FirstOrDefault(s => s.Id == id);

                    if (student == null)
                        return NotFound();

                    // Addresses will be deleted automatically due to cascade delete
                    db.Students.Remove(student);
                    db.SaveChanges();

                    return Ok(new { message = "Student deleted successfully" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error deleting student: {ex.Message}");
            }
        }
    }
}