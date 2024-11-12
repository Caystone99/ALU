# Alumunite User Management Dashboard

This is a frontend engineering assessment project for Alumunite. The application is a user management dashboard built with Next.js, showcasing a simple interface for displaying, adding, updating, and deleting user profiles. It uses Zustand for state management and mock JSON data for initial user profiles.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Setup Instructions](#setup-instructions)


## Project Overview

The dashboard allows users to:
- View a list of user profiles
- Add new users
- Update existing users
- Delete users

## Features

1. **User Interface**:
   - A landing page that lists user profiles, displaying the following fields:
     - Name
     - Email
     - Role (Admin, User, or Guest)
     - Status (Active/Inactive)
     - Profile photo
   - A navigation bar with links to "Home," "Add User," and "Manage Users".
   - Responsive design for desktop and mobile.

2. **User Interaction**:
   - Form for adding a new user with fields for name, email, role, status (toggle for Active/Inactive), and profile photo upload.
   - Form validation for email format and required fields.
   - Editable fields for updating user details.

3. **Data Management**:
   - Initial data populated from a JSON file (`/public/mockProfiles.json`) simulating user profile data.
   - Zustand for local state management.
   - State persistence across sessions using `zustand/middleware` with local storage.

4. **Styling**:
   - Consistent design theme achieved with Tailwind CSS.
   - Responsive layouts to ensure usability on various screen sizes.

5. **Code Quality**:
   - Modular code structure with reusable components.
   - TypeScript for type safety.
   - Well-documented components and functions.

## Setup Instructions

To run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/alu.git
   cd alu

2. **Run the development server**:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

