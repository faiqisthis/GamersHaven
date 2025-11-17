# GameVault

GameVault is a full-stack e-commerce platform for gaming gear, consoles, and accessories. Built with React, Vite, Node.js, Express, and MongoDB.

## Features

- User authentication (register, login, logout)
- Product catalog (consoles, games, accessories)
- Shopping cart & checkout
- Order management (user & admin)
- Admin dashboard (manage products, users, orders)
- Data visualization (charts for sales, users, products)
- Responsive UI with Tailwind CSS & DaisyUI
- Image upload for products
- Secure backend (rate limiting, sanitization, helmet, CORS)
- Email notifications (password reset, etc.)

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, DaisyUI, Chart.js
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Other:** Stripe (payments), Nodemailer (emails)

## Project Structure
backend/
controllers/ # API logic (auth, products, orders, stripe, users)
middleware/ # Express middlewares
models/ # Mongoose schemas
routes/ # API route definitions
utils/ # Utility functions (error handling, email)
public/ # Static files (uploads, docs)
server.js # Express app entry point
db.js # MongoDB connection
seeder.js # Data seeding script

src/
api/ # Axios API wrappers
assets/ # Images and static assets
components/ # Reusable React components
context/ # React Context for state management
pages/ # Route-based pages (Home, Admin, Product, etc.)
utils/ # Frontend utilities (image upload)
App.jsx # Main app component
main.jsx # React entry point
index.css # Global styles

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB

### Setup

1. **Clone the repo:**
   ```sh
   git clone https://github.com/faiqisthis/gamershaven.git
   cd gamershaven

2. **Backend:**
  Configure .env in backend/ (see .env.example)
  Install dependencies:
  cd backend
  npm install
  Seed database (optional):
  node seeder.js -i
  Start server:
  npm start

3. **Frontend:**
  Install dependencies:
  npm install
  Start dev server:
  npm run dev

4.**Access the app:**
Frontend: http://localhost:3000
Backend API: http://localhost:8000
