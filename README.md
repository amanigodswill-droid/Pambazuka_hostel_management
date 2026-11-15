# Pambazuka Hostel Management System

## 1. Project Overview

**Pambazuka Hostel Management System** is a web-based application designed to help students find and book affordable accommodation around Eldoret, Kenya.

The system provides a platform where students can explore available hostels, view accommodation details, make booking requests and manage their bookings. Hostel owners can also manage their hostel listings and respond to student booking requests.

The application consists of a React frontend and a Django REST Framework backend.

## 2. Project Objectives

- Make it easier for students to find affordable hostels.
- Allow students to view hostel information before booking.
- Provide an online hostel booking process.
- Allow hostel owners to manage their hostel listings.
- Improve communication and management of hostel booking requests.

## 3. Main Features

### Student Features
- User registration and login.
- Student profile management.
- Browse available hostels.
- Search and filter hostels by location, gender and room type.
- View detailed hostel information, images and amenities.
- Add hostels to favourites.
- Book a preferred hostel.
- Select room type and move-in date.
- Submit student and payment reference details.
- View booking receipts.
- View and manage personal bookings.
- Password recovery functionality.

### Hostel Owner Features
- Owner registration and login.
- Owner dashboard.
- Add new hostel listings.
- View existing hostel listings.
- Update hostel information.
- Delete hostel listings.
- View student booking requests.
- Approve or reject booking requests.

### Booking and Payment Information
The booking form collects student details, hostel selection, room preferences and payment information.

Supported payment options:
- M-Pesa
- Bank transfer

Students submit the relevant M-Pesa transaction code or bank payment reference. Booking and payment confirmation remain subject to verification.

## 4. Technologies Used

### Frontend
- React.js
- Vite
- JavaScript
- HTML5
- CSS3
- React Router
- React Toastify

### Backend
- Python
- Django
- Django REST Framework
- Django REST Framework Token Authentication
- SQLite for local development

### Development Tools
- Visual Studio Code
- Git
- GitHub
- Git Bash
- Postman / API testing tools

## 5. Project Structure

```text
Pambazuka_hostel_management/
│
├── backend/
│   └── Pambazuka_hostel_management/
│       ├── Pambazuka_hostel_management/
│       ├── hostels/
│       │   ├── migrations/
│       │   ├── models.py
│       │   ├── views.py
│       │   ├── serializers.py
│       │   └── user_serializer.py
│       ├── media/
│       ├── manage.py
│       └── requirements.txt
│
├── frontend/
│   └── Pambazuka_hostel_management_frontend/
│       ├── public/
│       ├── src/
│       │   ├── assets/
│       │   ├── components/
│       │   ├── context/
│       │   ├── data/
│       │   ├── pages/
│       │   ├── styles/
│       │   ├── App.jsx
│       │   └── api.js
│       ├── package.json
│       └── vite.config.js
│
└── README.md
```

## 6. Application Pages

The application includes the following pages:

| Page | Description |
|---|---|
| Home | Introduces the platform and available hostels |
| About | Provides information about Pambazuka |
| Contact | Provides contact information |
| Hostels | Displays and filters hostel listings |
| Hostel Details | Displays detailed hostel information |
| Favorites | Displays saved hostels |
| Register | Creates a new user account |
| Login | Authenticates registered users |
| Booking | Allows students to submit booking requests |
| My Bookings | Displays a student's bookings |
| Profile | Allows users to manage their profiles |
| Owner Dashboard | Provides hostel management tools |
| My Hostels | Allows owners to manage their listings |
| Forgot Password | Initiates password recovery |
| Reset Password | Allows users to reset their passwords |

## 7. Installation and Setup

### Prerequisites

Ensure that the following are installed:

- Python 3.10 or later
- Node.js and npm
- Git

### A. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd Pambazuka_hostel_management
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with the actual GitHub repository URL.

### B. Backend Setup

Open a terminal and navigate to the backend:

```bash
cd backend/Pambazuka_hostel_management
```

Create a virtual environment:

```bash
python -m venv .venv
```

Activate it on Windows Git Bash:

```bash
source .venv/Scripts/activate
```

Install the backend dependencies:

```bash
pip install -r requirements.txt
```

Apply database migrations:

```bash
python manage.py migrate
```

Start the Django development server:

```bash
python manage.py runserver
```

The backend will be available at:

`http://127.0.0.1:8000/`

### C. Frontend Setup

Open another terminal and navigate to the frontend:

```bash
cd frontend/Pambazuka_hostel_management_frontend
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

`http://localhost:5173/`

Keep both development servers running while using the application.

## 8. API Information

The backend provides REST API endpoints for communication with the React frontend.

The main API prefix is:

`/api/hostels/`

Some of the main endpoints include:

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/hostels/` | Retrieve hostel listings |
| GET | `/api/hostels/<id>/` | Retrieve hostel details |
| POST | `/api/hostels/register/` | Register a user |
| POST | `/api/hostels/login/` | Authenticate a user |
| POST | `/api/hostels/bookings/` | Create a booking |

Additional endpoints support hostel management, profiles, booking management and password recovery.

## 9. Authentication

The application uses token-based authentication through Django REST Framework.

After a successful login, the backend returns an authentication token. The frontend stores this token and uses it when making requests to protected API endpoints.

Protected requests use the following authorization header:

```text
Authorization: Token YOUR_AUTH_TOKEN
```

Access to protected features depends on the user's authentication status and role.

## 10. Database

The backend uses Django's ORM to manage application data.

The database stores information relating to:

- User accounts.
- Hostel listings.
- Hostel owners.
- Student booking requests.
- Booking and payment references.

SQLite is used for local development. Production deployment should use a properly configured production database.

## 11. User Interface and Design

The frontend uses React components and CSS to provide a responsive user interface.

The design uses a consistent colour palette:

- Deep teal: `#153D3B`
- Teal: `#174541`
- Warm cream: `#FFFAF2`
- Sage: `#F0F4ED`
- Copper: `#B4774D`
- White: `#FFFFFF`

The interface is designed to be simple, accessible and easy to navigate on different screen sizes.

## 12. Future Improvements

Possible future improvements include:

- Integration with a payment gateway for automatic payment verification.
- Email and SMS notifications for booking updates.
- Improved hostel availability tracking.
- More advanced search and filtering.
- Enhanced reporting for hostel owners.
- Further deployment and performance improvements.

## 13. Project Purpose

Pambazuka Hostel Management System was developed as an academic software development project to demonstrate the practical application of frontend development, backend development, REST APIs, database management, authentication and CRUD operations.

The project aims to provide a practical solution to the challenge students face when searching for suitable and affordable accommodation.

---

**Project Name:** Pambazuka Hostel Management System

**Frontend:** React.js

**Backend:** Django REST Framework

**Project Type:** Student Hostel Management and Booking System
