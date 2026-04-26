# Pet Care & Health Tracker

A comprehensive, end-to-end web application for tracking pet health, managing feeding schedules, and booking vet appointments. 
Built using **Java 17, Spring Boot 3, and MySQL** for the backend and **React + Vite + Tailwind CSS** for the frontend.

## Features
- **Dynamic Dashboard**: Overview of system stats, feeding reminders, and upcoming appointments.
- **Pet Directory**: Add and manage pets using an Object-Oriented model (Inheritance: Dog, Cat, Bird).
- **Health Tracking**: Log vaccinations and vet visits, generating a chronological timeline.
- **Feeding Schedules**: Check whether pets have been fed today and trigger a feeding action.
- **Appointment Scheduling**: Book vet appointments with built-in conflict checking.

## Architecture
- **Backend**: Spring Boot REST API strictly adhering to OOP rules, global exception handling, and JPA mapping with joined inheritance.
- **Frontend**: A modern, dark-themed responsive React application with glassmorphism UI elements.

## Prerequisites
- Java 17
- Node.js 18+
- MySQL 8+
- Maven

## How to Run Backend
1. Ensure your local MySQL instance is running on port `3306`.
2. Create a database named `petcare`.
3. Open `backend/src/main/resources/application.properties` and replace `YOUR_PASSWORD` with your MySQL root password.
4. Navigate to the `backend` directory.
5. Run the application:
   ```bash
   mvn spring-boot:run
   ```
   *Note: On the first run, the `DataInitializer` will automatically seed the database with sample data.*

## How to Run Frontend
1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Access the application at `http://localhost:5173`.

## API Endpoints List

### Owners
- `POST /api/owners` → Register owner
- `GET /api/owners` → List all owners

### Pets
- `POST /api/pets` → Add pet
- `GET /api/owners/{ownerId}/pets` → Get all pets for an owner
- `GET /api/pets` → List all pets with health status
- `GET /api/pets/{id}` → Get pet details
- `DELETE /api/pets/{id}` → Remove pet
- `POST /api/pets/{id}/feed` → Feed a pet (Throws AlreadyFeedException if fed today)
- `GET /api/pets/feeding-reminders` → Return pets not fed today

### Health Records & Appointments
- `POST /api/health-records` → Add vaccination or vet visit record
- `GET /api/pets/{id}/health-records` → Get full health history for a pet
- `POST /api/appointments` → Schedule vet appointment (Throws AppointmentConflictException on time clash)
- `GET /api/appointments` → List all appointments
