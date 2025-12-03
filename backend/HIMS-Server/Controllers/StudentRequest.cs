using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace HIMS_Server.Models
{
    // DTO used by API model binding - public properties so ASP.NET can validate them.
    public class StudentRequest
    {
        [Required(ErrorMessage = "Name is required")]
        [RegularExpression(@"^(?!\s*$)(?!0$).+", ErrorMessage = "Name cannot be empty or '0'")]
        [StringLength(200)]
        public string? Name { get; set; }

        [Required(ErrorMessage = "Student code is required")]
        [RegularExpression(@"^(?!\s*$)(?!0$).+", ErrorMessage = "Student code cannot be empty or '0'")]
        [StringLength(50)]
        public string? Code { get; set; }

        [EmailAddress(ErrorMessage = "Invalid email address")]
        public string? Email { get; set; }

        [Phone(ErrorMessage = "Invalid phone number")]
        public string? Phone { get; set; }

        // Nested complex type validated via DataAnnotations on AddressRequest
        public List<AddressRequest>? Addresses { get; set; }
    }

    public class AddressRequest
    {
        [Required(ErrorMessage = "Street is required")]
        [StringLength(200)]
        public string? Street { get; set; }

        [StringLength(100)]
        public string? City { get; set; }

        [StringLength(100)]
        public string? State { get; set; }

        [StringLength(20)]
        public string? ZipCode { get; set; }

        [RegularExpression(@"^(Permanent|Temporary)?$", ErrorMessage = "AddressType must be 'Permanent' or 'Temporary'")]
        public string? AddressType { get; set; }
    }
}