// Plan (pseudocode):
// 1. Silence CS8618 non-nullable warnings by allowing reference-type properties to be nullable where appropriate.
// 2. Keep the Addresses list initialized to an empty list to avoid null issues for collections.
// 3. Make the navigation property back to Student nullable and keep [JsonIgnore] attribute to avoid serialization/validation cycles.
// 4. Minimal, non-invasive changes: change string and Student properties to nullable (string? / Student?) so existing consumers are unaffected.

using System.Collections.Generic;

namespace HIMS_Server.Models
{
    public class Student
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Code { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public List<Address> Addresses { get; set; } = new List<Address>();
    }

    public class Address
    {
        public int Id { get; set; }
        public string? Street { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? ZipCode { get; set; }
        public string? AddressType { get; set; } // "Permanent" or "Temporary"
        public int StudentId { get; set; } // Foreign key

        // Prevent JSON cycles / validation issues; make navigation property nullable
        [System.Text.Json.Serialization.JsonIgnore]
        public Student? Student { get; set; }
    }
}