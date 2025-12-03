Student Management System

 Overview

This project is a **Student Management System** built with **Angular** for the frontend and **ASP.NET Core (.NET)** for the backend.
It demonstrates a **full-stack CRUD application** where users can manage students and their addresses (permanent and temporary).

---

## Features

* Add, edit, and delete students
* Store multiple addresses for each student (Permanent & Temporary)
* Form validations in Angular (name, code, email, phone)
* REST API built using ASP.NET Core Web API
* Database operations with **Entity Framework Core**
* Client-server communication using **JSON over HTTP**


## Tech Stack

* **Frontend:** Angular, TypeScript, HTML, CSS
* **Backend:** ASP.NET Core Web API, C#
* **Database:** SQL Server (with Entity Framework Core ORM)
* **Tools:** Visual Studio, VS Code, GitHub, Postman

---

## Project Structure

```
/Frontend/         --> Angular application
/Backend/          --> ASP.NET Core Web API project
/Database/         --> SQL scripts (tables, sample data)
/Docs/             --> Documentation and diagrams
.gitignore         --> Ignore unnecessary files
README.md          --> Project documentation
```

---

## Setup Instructions

### Backend (ASP.NET Core)

1. Open the `.sln` file in **Visual Studio**.
2. Restore NuGet packages.
3. Update `appsettings.json` with your SQL Server connection string:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=YOUR_SERVER;Database=StudentDB;Trusted_Connection=True;"
}
```

4. Run database migrations:

```bash
dotnet ef database update
```

5. Run the project (F5 or `dotnet run`) — the API will start at `https://localhost:7145/api`.

### Frontend (Angular)

1. Navigate to the Angular folder:

```bash
cd Frontend
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
ng serve
```

4. Open in browser: `http://localhost:4200`

---

## API Endpoints

| Method | Endpoint             | Description                |
| ------ | -------------------- | -------------------------- |
| GET    | /api/StudentAPI      | Get all students           |
| POST   | /api/StudentAPI      | Add a new student          |
| PUT    | /api/StudentAPI/{id} | Update an existing student |
| DELETE | /api/StudentAPI/{id} | Delete a student           |

**Request & Response** use **JSON format**.

---

## Screenshots
<img width="960" height="504" alt="image" src="https://github.com/user-attachments/assets/9f38bfdf-a19b-4643-abde-f8c7d75734b7" />

<img width="1920" height="1008" alt="Screenshot 2025-12-01 174101" src="https://github.com/user-attachments/assets/e46ab9fe-d904-4a21-a5c3-c9658941ba25" />




## Author

**Aashish BK**
Dhangadhi, Nepal
GitHub: [https://github.com/Mrcharlee](https://github.com/Mrcharlee)
