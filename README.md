#!/bin/bash

# 🎉 **Installation Instructions (highlighted for emphasis)** 🎉

# 1. Navigate to the project folder:
#    **cd e-commerce-backend**

# 2. Install dependencies by running:
#    **npm install**

# 3. Set up your database connection in the .env file (ensure you have MySQL running on your local machine).

# 4. Run Prisma migrations to set up your database schema:
#    **npx prisma migrate dev --name create_product_table**
#    **npx prisma migrate dev --name create_user_and_order_tables**

# 5. After setting up your database, seed the database with sample data:
#    **npx prisma db seed**

# 6. Run the development server with:
#    **npm run dev**

# 7. Open your browser and go to http://localhost:3000 to see the app in action!

# 8. Create a `.env` file in the root directory and add the following variables:
#    DATABASE_URL="mysql://root:@localhost:3306/nextjs_ecommerce_db"
#    NEXTAUTH_SECRET=3d4f8e3b9d8c0db32a15bf8c9d60b99151799b649ff2fdf2f87c1234d1b2c3a5
#    ACCESS_TOKEN_SECRET=3d4f8e3b9d8c0db32a15bf8c9d60b99151799b649ff2fdf2f87c1234d1b2c3a5
#    REFRESH_TOKEN_SECRET=5a4c8d2d6e79342a7f6bd1ff742ac298da91a0fd1d5e0fcbad78eec7be2fe0ea


# 🎉 You're all set up! 🎉

# 🌟 Create a new Next.js project with your desired configurations
npx create-next-app e-commerce-backend

# 🎯 Navigate into the project folder
cd e-commerce-backend

# 📦 Install necessary packages for Prisma and NextAuth
npm install @prisma/client @next-auth/prisma-adapter next-auth
npm install prisma --save-dev

# 🛠️ Initialize Prisma
npx prisma init

# 🔧 Create migrations for the database schema (Products, Users, Orders)
npx prisma migrate dev --name create_product_table
npx prisma migrate dev --name create_user_and_order_tables

# 🔄 Reset migrations and generate Prisma client
npx prisma migrate reset
npx prisma migrate dev --name create_user_order_product_tables
npx prisma generate

# 🔌 Test the database connection
npx prisma db pull

# 💾 Seed the database with sample data
npx prisma db seed

# 📦 Install necessary dependencies for the app
npm install

# 🚀 Install Next.js latest version
npm install next@latest

# ✨ Add the necessary scripts to package.json
# Open package.json and add the following inside the "scripts" section:
# "scripts": {
#   "dev": "next dev",
#   "build": "next build",
#   "start": "next start"
# }

# 💻 Run the development server locally
npm run dev

# 🛠️ Install Bootstrap and uninstall Tailwind CSS (if needed)
npm install bootstrap
npm uninstall tailwindcss postcss

# 🚀 Front-end dependencies for React
npx create-next-app@latest .

# 📦 Install React and React-Dom dependencies
npm install react@18 react-dom@18
npm install react@18.3.1 react-dom@18.3.1

# 📦 Install other required dependencies for Redux and Axios
npm install axios react-redux @reduxjs/toolkit react-bootstrap bootstrap
npm install redux-persist

# 🔑 Install JWT and associated type packages
npm install jsonwebtoken
npm install --save-dev @types/jsonwebtoken
npm install --save-dev @types/bcryptjs

# 🔧 Apply the database migration for order details
npx prisma migrate dev --name add_order_details

# 🎉 Install React Toastify for toast notifications
npm install react-toastify

# ✅ Finished! Your development environment is set up!


Features and Technologies Used in the App 🎉
🚀 Technologies:

🛠️ Redux Toolkit: State management for seamless handling of application state.
🔐 JWT Authentication: Secure user authentication with access and refresh tokens.
💾 Redux Persist Storage: Persistent storage for cart items and user sessions.
🎨 Bootstrap: Modern UI styling for a responsive and clean design.
💻 Next.js 15: A full-stack framework for server-side rendering and API routes.
⚡ Thunk API: Efficient handling of asynchronous actions in Redux.

🛒 Features:

🛍️ Cart Management: Add, update, and remove items with persistent storage.
🔒 Authentication: Login and token-based security for user sessions.
⏳ Skeleton Loaders: Enhance user experience with smooth loading animations.
💸 Fake Payment Simulation: Mock payment gateway for testing transactions.
📣 React Toaster: Instant feedback for user actions (success, error notifications).

🎯 Additional Highlights:

🔁 Refresh Tokens: Ensure secure and seamless token refresh for long-lived sessions.
✅ Access Tokens: Manage secure and time-limited user access.
✨ Modern Frontend Styling: Built with responsiveness and user engagement in mind.
This app embodies a full-stack modern e-commerce solution, offering robust functionality with cutting-edge tools and technologies! 🌟




