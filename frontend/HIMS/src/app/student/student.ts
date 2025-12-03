export interface StudentRequest {
  Name: string;      // PascalCase
  Code: string;      // PascalCase
  Email: string;     // PascalCase
  Phone: string;     // PascalCase
  Addresses: AddressRequest[];  // PascalCase - Changed from any[] to AddressRequest[]
}

// ADD this interface
export interface AddressRequest {
  Street: string;      // PascalCase
  City: string;        // PascalCase
  State: string;       // PascalCase
  ZipCode: string;     // PascalCase
  AddressType: string; // PascalCase
}