# Student Management System

![GitHub repo size](https://img.shields.io/github/repo-size/Mrcharlee/Student-Management-?style=flat-square)
![GitHub contributors](https://img.shields.io/github/contributors/Mrcharlee/Student-Management-?style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/Mrcharlee/Student-Management-?style=flat-square)
![GitHub license](https://img.shields.io/github/license/Mrcharlee/Student-Management-?style=flat-square)

---

## Table of Contents

* [Overview](#overview)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Setup](#setup)
* [Folder Structure](#folder-structure)
* [Screenshots](#screenshots)
* [Architecture](#architecture)
* [License](#license)
* [Author](#author)

---

## Overview

A full-stack Student Management System built with **.NET backend** and **Angular frontend**.
It allows users to manage student records and addresses with a clean separation of frontend and backend logic.

---

## Features

* Add, update, delete, and view student records
* Angular frontend with responsive UI
* ASP.NET Core Web API backend
* SQL Server database integration
* Easy to set up and extend

---

## Tech Stack

* **Backend:** .NET 6 / ASP.NET Core, C#
* **Frontend:** Angular 21, TypeScript, HTML/CSS
* **Database:** SQL Server
* **ORM:** Entity Framework Core
* **Version Control:** Git + GitHub

---

## Setup

### Backend

1. Open `backend/HIMS-Server` in Visual Studio.
2. Restore NuGet packages.
3. Update `appsettings.json` with your database connection string.
4. Run the project (`F5`) to start the API.

### Frontend

1. Open `frontend` folder in VS Code.
2. Install dependencies:

```bash
npm install
```

3. Start Angular app:

```bash
ng serve
```

4. Navigate to `http://localhost:4200` in your browser.

---

## Folder Structure

```
Student-Management/
├── backend/
│   └── HIMS-Server/       # .NET backend project
├── frontend/
│   └── src/               # Angular frontend
├── README.md
```

---

## Screenshots

![Dashboard](https://github.com/user-attachments/assets/d8a65fe3-b913-4d5b-9c67-e15374b80960)
![Student Form](https://github.com/user-attachments/assets/c5ac1881-6296-48ed-a247-9fe42ac847f9)

---

## Architecture

```
          [ Angular Frontend ]
                  |
                  | HTTP / JSON
                  v
        [ ASP.NET Core Web API ]
                  |
                  | Entity Framework Core
                  v
            [ SQL Server Database ]
```

---

## License

📜 This project is open-source and free to modify.

---

## Author

**Aashish BK**
GitHub: [https://github.com/Mrcharlee](https://github.com/Mrcharlee)
