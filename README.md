# FitNovaX - Premium Fitness & Learning Platform

A comprehensive, full-stack fitness and learning platform that bridges the gap between expert trainers and fitness enthusiasts. FitNovaX solves the problem of finding, booking, and managing fitness classes by providing a centralized hub where users can seamlessly discover classes, participate in a thriving community, and seamlessly subscribe to premium content. Target users include fitness enthusiasts looking for guided classes, and professional trainers seeking a platform to host and monetize their expertise.

## Live Website
[Live Website Link Here] <!-- Replace with your deployment URL, e.g., https://fitnovax.vercel.app -->

## Screenshots
<!-- Add your project screenshots below -->
> **Note:** Replace the placeholder image links with your actual screenshot paths or URLs.

![Home Page](/path-to-your-image/home-screenshot.png)
*Home Page Showcase*

![Class Booking](/path-to-your-image/classes-screenshot.png)
*Class Booking Interface*

![User Dashboard](/path-to-your-image/dashboard-screenshot.png)
*Role-Based Dashboard*

![Community Forum](/path-to-your-image/forum-screenshot.png)
*Community Forum and Discussions*

## Admin Credentials
**Email:** `admin@example.com` <!-- Replace with actual admin credentials -->
**Password:** `admin123` <!-- Replace with actual admin password -->

## Key Features

### Authentication Features
* Users can securely register, log in, and log out using email or Google authentication.
* Users can manage and view their personal profiles securely.

### Student/User Features
* Users can browse a wide variety of fitness classes and view detailed information.
* Users can save their favorite classes for quick access and tracking.
* Users can easily book fitness classes they are interested in.
* Users can access a personalized dashboard to track all currently booked classes.
* Users can submit a detailed application to become an official trainer on the platform.

### Instructor Features
* Trainers can easily create, publish, and manage new fitness classes.
* Trainers can track their class enrollments and booking statistics.
* Trainers can create community forum posts to engage with their students and the community.

### Admin Features
* Administrators can oversee and manage all registered users on the platform.
* Administrators can review, approve, or reject incoming trainer applications.
* Administrators can manage all active trainers and their permissions.
* Administrators can monitor all financial transactions and class subscriptions.
* Administrators can manage all classes across the platform to ensure quality.
* Administrators can moderate community forum posts and ensure a safe environment.

### Payment & Subscription Features
* Users can securely pay for class subscriptions via an integrated seamless checkout experience.
* Users gain instant access to class bookings immediately upon successful payment confirmation.

### Community/Forum Features
* Users can actively participate in community forum discussions.
* Users can interact with posts created by trainers and other community members.
* Users can like or dislike forum posts to highlight valuable content.
* Users can leave comments on forum posts and reply to existing comments for deep discussions.

### Dashboard Features
* Users, Trainers, and Admins are provided with dedicated, role-specific dashboards tailored to their unique needs.
* Dashboard provides intuitive navigation to efficiently manage classes, favorites, applications, and community interactions.

## Project Structure
```text
ASSESSMENT-PH-A10/
│
├── backend/                   # Express.js Backend Application
│   ├── .env                   # Backend Environment Variables
│   ├── index.js               # Main Application Entry Point & API Routes
│   ├── udate.js               # Database Utility Scripts
│   └── package.json           # Backend Dependencies
│
└── fontrend/                  # Next.js Frontend Application
    ├── .env                   # Frontend Environment Variables
    ├── next.config.mjs        # Next.js Configuration
    ├── package.json           # Frontend Dependencies
    └── src/
        ├── app/               # Next.js App Router (Pages & Layouts)
        │   ├── (dashboard)/   # Role-based Dashboards (Admin, Trainer, User)
        │   ├── (main)/        # Public Pages (Classes, Forum, Profile, Auth)
        │   ├── api/           # Frontend API & Next Auth Configuration
        │   └── globals.css    # Global Styling
        ├── Components/        # Reusable React UI Components
        ├── Hooks/             # Custom React Hooks
        ├── lib/               # Utility Functions and Library Configurations
        └── Shared/            # Shared layouts, headers, and footers
```

## Technology Stack

| Category | Technology |
| :--- | :--- |
| **Frontend Framework** | Next.js, React |
| **Backend Framework** | Node.js, Express |
| **Database** | MongoDB |
| **Authentication** | better-auth (with mongo-adapter), Google OAuth |
| **Payment Gateway** | Stripe |
| **Styling** | Tailwind CSS |
| **UI Components** | HeroUI (`@heroui/react`), Lucide React, React Icons |
| **Animations & Charts** | Framer Motion, Recharts, React CountUp |

## Database Collections

* **`user`**: Manages user profiles, role assignments (user, trainer, admin), and secure authentication details.
* **`trainerAddClass`**: Stores the details of all fitness classes offered, including descriptions, categories, booking capacities, and approval status.
* **`forumCollection`**: Stores community-driven forum posts, including voting metrics (likes/dislikes) and comment statistics.
* **`applyTrainer`**: Manages the application workflow for users requesting to become platform trainers.
* **`favorites-collection`**: Maintains user-specific lists of saved or favorite fitness classes.
* **`subscription`**: Records payment transactions, Stripe session details, and user class bookings.
* **`commentCollection`**: Facilitates the community forum by storing user comments and nested replies linked to specific forum posts.

## API Overview

| Endpoint Purpose | Access Level | Main Functionality |
| :--- | :--- | :--- |
| `/api/public/all-class` | Public | Fetches all approved classes with optional search and category filters. |
| `/api/public/class-limit` | Public | Fetches top trending/booked classes to highlight on the home page. |
| `/api/user/booked-classes/:userId` | Authenticated | Retrieves all active class bookings for a specific user. |
| `/subscription` | Public / Auth | Processes Stripe payments and securely records the class subscription. |
| `/api/favorites` | Authenticated | Allows users to save or remove classes from their personalized favorites list. |
| `/api/community/forum` | Public | Retrieves a paginated list of community forum discussions. |
| `/api/forum/vote/:id` | Authenticated | Records and manages user likes and dislikes on forum posts. |
| `/api/forum/comment` | Authenticated | Enables users to add comments or threaded replies to forum discussions. |
| `/api/admin/users/booking-counts`| Admin | Retrieves system-wide, aggregated booking analytics for the administrative dashboard. |

## Security Features

* **Authentication Validation**: Robust authentication flow managed securely via `better-auth`.
* **Token Verification**: Uses JSON Web Key Sets (JWKS) and custom `verifyToken` middleware to validate requests against authorized user sessions.
* **Role-Based Protection**: Specific middleware (`adminVerify`, `trainerVerify`, `userVerify`) strictly limits backend route access based on the user's role.
* **Route Protection**: The Next.js frontend implements robust route guards preventing users from accessing unauthorized dashboards or pages.
* **Payment Integrity**: Validates checkout sessions before finalizing database class booking modifications to prevent fraudulent access.
* **Data Consistency**: Ensures necessary query parameters and relationships (like classId and userId) are present before mutating database collections.

## Project Highlights

* **Built a scalable full-stack learning platform** capable of serving students, trainers, and administrators with tailored experiences.
* **Implemented secure authentication and role-based access control** across the entire stack, ensuring data privacy and correct permission hierarchies.
* **Developed real-time user engagement features**, including threaded forum comments, post voting, and interactive community interactions.
* **Integrated seamless payment and subscription management** using Stripe, providing a frictionless checkout process for class bookings.
* **Designed responsive and accessible user interfaces** utilizing modern aesthetic libraries like Tailwind CSS, HeroUI, and Framer Motion for premium micro-interactions.

## Challenges Solved

* **Complex Aggregation for Dashboard Analytics:** Solved performance bottlenecks by implementing efficient MongoDB aggregation pipelines that calculate system-wide user booking counts and transform them into optimized data structures for the admin dashboard.
* **Threaded Nested Comments Architecture:** Engineered a recursive parent-child relationship schema within MongoDB to support infinite threaded replies on community forum posts, while ensuring parent post statistics remain synchronized.
* **Concurrency in Class Bookings:** Resolved potential race conditions when multiple users book the same class simultaneously by utilizing atomic `$inc` operations in MongoDB to strictly manage maximum class capacities.
* **Full-Stack Role-Based Access Control (RBAC):** Architected a cohesive RBAC system that synchronously applies protection rules across Next.js frontend routes and Express backend API middleware.

## Future Improvements

* Introduce real-time push notifications for class approvals, forum replies, and successful transactions using WebSockets.
* Integrate a live video conferencing solution directly into the platform for remote and virtual fitness sessions.
* Develop a robust review and rating system allowing users to provide feedback on completed classes and trainers.
* Provide trainers with advanced analytics dashboards to visualize their class performance, engagement metrics, and revenue over time.

## Installation Guide

Follow these steps to run the project locally.

### 1. Clone the repository
```bash
git clone <repository-url>
cd ASSESSMENT-PH-A10
```

### 2. Install Dependencies

**For Frontend:**
```bash
cd fontrend
npm install
```

**For Backend:**
```bash
cd backend
npm install
```

### 3. Environment Variables

Create a `.env` file in both the `fontrend` and `backend` directories and add the necessary environment variables (refer to the Environment Variables section below).

### 4. Run the Application

**Run Backend (from `backend` directory):**
```bash
npm run server
```
*Backend will start on `http://localhost:8000`*

**Run Frontend (from `fontrend` directory):**
```bash
npm run dev
```
*Frontend will start on `http://localhost:3000`*

## Environment Variables

### Frontend (`fontrend/.env`)
```env
BETTER_AUTH_URL=http://localhost:3000
baseURL=http://localhost:3000
BETTER_AUTH_SECRET=your_auth_secret_here

MONGO_DB_URI=your_mongodb_uri_here
NEXT_PUBLIC_URL=http://localhost:8000

NEXT_PUBLIC_IMGBB_KEY=your_imgbb_key_here

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

TOP_ADMIN_USER_ID=your_admin_user_id
NEXT_PUBLIC_TOP_ADMIN_USER_ID=your_admin_user_id

STRIPE_SECRET_KEY=your_stripe_secret_key_here
```

### Backend (`backend/.env`)
```env
PORT=8000
MONGODB_URI=your_mongodb_uri_here
CLIENT_URL=https://fitnovax.vercel.app
```
