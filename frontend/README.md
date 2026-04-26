# 🐾 PetCare Pro - Clinic Dashboard

Welcome to the **PetCare Pro** Frontend! This is a modern, high-performance web application designed for veterinary clinics to seamlessly manage pet records, feeding schedules, owners, and medical appointments.

Built with an emphasis on a premium, glassmorphism-inspired UI and buttery-smooth animations, this application provides an exceptional user experience for clinic staff.

## ✨ Features

- **🔒 Secure Login Portal:** A beautiful glassmorphism authentication screen.
- **📊 Comprehensive Dashboard:** Get a bird's-eye view of clinic statistics, upcoming appointments, and critical health alerts.
- **🐶 Pet Directory (`/pets`):** Easily search, filter, and add new pets. View detailed profiles including breed, age, and health history.
- **👥 Owner Management (`/owners`):** Track owner contact information, linked pets, and communication preferences with built-in search.
- **🍖 Smart Feeding Schedules (`/feeding-schedule`):** 
  - Track and log daily feeding routines.
  - Set custom feeding schedules per pet.
  - Smart status indicators (e.g., "Fed Today").
- **🏥 Medical Records & Vaccinations (`/vaccinations`):** A dedicated health log to track past and upcoming vaccinations with smart search.
- **📅 Clinic Appointments (`/appointments`):** Manage and track "Vet Visits" and medical consultations.
- **🛠 Support Center (`/support`):** An interactive FAQ accordion and quick links to IT/Customer support.

## 🛠 Technology Stack

This application is powered by modern web technologies:
- **Core:** [React 18](https://react.dev/) + [Vite](https://vitejs.dev/) for lightning-fast HMR and building.
- **Routing:** `react-router-dom` for seamless SPA navigation.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) combined with custom CSS for glassmorphism effects and design tokens.
- **Animations:** [Framer Motion](https://www.framer.com/motion/) for fluid page transitions, hover effects, and micro-interactions.
- **Icons:** [Lucide React](https://lucide.dev/) for crisp, scalable vector iconography (including our custom-composed logo!).
- **API Communication:** `axios` configured to communicate with the Spring Boot backend.
- **Utilities:** `date-fns` for robust date formatting.

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js installed and the **Spring Boot Backend** running locally on port `8081` (connected to your MySQL database).

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd e:\PetCareSystem\frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to the URL provided by Vite (usually `http://localhost:5175` or `5173`).

## 🎨 Design Philosophy

PetCare Pro prioritizes **Visual Excellence** and **Dynamic Interactivity**:
- **Color Palette:** Warm, welcoming oranges (`#ea580c`) contrasted with deep, professional slates.
- **Glassmorphism:** Frosted glass effects on cards and modals (`backdrop-blur-md`) to create a sense of depth.
- **Micro-animations:** Elements respond to user input with subtle scales, pulses, and layout transitions to feel alive and responsive.
