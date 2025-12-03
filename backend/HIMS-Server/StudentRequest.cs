

using System.Collections.Generic;

namespace HIMS_Server.Models
{
    public class StudentRequest
    {
        public string? Name { get; set; }
        public string? Code { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public List<AddressRequest> Addresses { get; set; } = new List<AddressRequest>();
    }

    public class AddressRequest
    {
        public string? Street { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? ZipCode { get; set; }
        public string? AddressType { get; set; }
    }
}
