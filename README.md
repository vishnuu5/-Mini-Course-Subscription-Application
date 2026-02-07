# Mini Course Subscription Application

A full-stack web application for a mini course subscription platform with user authentication, course browsing, and subscription management with mock payment processing.

## Tech Stack

- **Frontend:** Vite, React.js, JavaScript, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT Token-based
- **Styling:** Responsive Design (Mobile, Tablet, Desktop)

## Features

### Core Features
User Authentication (Login/Signup with mock data)
Course Listing with at least 5 courses
Course Detail Page with subscription logic
Free Course Subscription (instant)
Paid Course Subscription with Promo Code Validation
My Courses Page - View all subscribed courses
Promo Code: `BFSALE25` gives 50% discount
**Mock Payment Processing** - Simulated payment gateway with success/failure states
Payment Status Indicators - Real-time payment processing feedback
Transaction ID Generation - Unique payment identifiers for each transaction
Mock Payment Processing (no real payments)
Responsive Design (Mobile, Tablet, Desktop)

### Bonus Features
Toast Notifications (Success/Error messages)
Loading States and Skeletons
Better Promo Validation UX
Error Boundary Pages
Course Images
Protected Routes with Auth Middleware
Display Original vs Discounted Price
User Session Management

### Optional Features
Course search and filtering
Course categories
User ratings and reviews
Course content preview
Email notifications
Dark mode toggle
Admin dashboard for course management

---

**Git Clone**
```bash
https://github.com/vishnuu5/-Mini-Course-Subscription-Application.git
```

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud - MongoDB Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to Backend folder:**
```bash
cd Backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create .env file:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mini-course-db
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
```

4. **Run Backend Server:**
```bash
npm start
# Server runs on http://localhost:5000
```

### Frontend Setup

1. **Navigate to Frontend folder:**
```bash
cd Frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create .env.local file:**
```env
VITE_API_URL=http://localhost:5000
```

4. **Start Development Server:**
```bash
npm run dev
# Frontend runs on http://localhost:5173
```

## Demo User Credentials

Use these to test the application:

```bash
Email: user1@example.com
Password: password123

Email: user2@example.com
Password: password123

Email: demo@example.com
Password: password123
```

---

## Bonus Features Implemented

**Toast Notifications** - Success/error messages for all user actions
**Loading States** - Loading indicators while data is being fetched
**Error Handling** - Error boundaries and error display
**Responsive Design** - Mobile, tablet, and desktop support
**Course Images** - Thumbnail images for courses
**Protected Routes** - Authentication middleware
**Promo Code Display** - Shows original vs discounted price
**User Sessions** - Token-based session management
**Demo Credentials** - Pre-loaded demo accounts for easy testing

---

## Deployment

### Backend Deployment (Heroku/Railway/Render)

1. Push to GitHub
2. Connect to deployment service
3. Set environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`
4. Deploy

### Frontend Deployment (Vercel/Netlify)

1. Push to GitHub
2. Connect to Vercel/Netlify
3. Set environment variable:
   - `VITE_API_URL=https://your-backend-url.com`
4. Deploy

---

## API Documentation

### Authentication Endpoints

- `POST /api/auth/signup` - Create new user
- `POST /api/auth/login` - Login user

### Course Endpoints

- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get single course

### Subscription Endpoints

- `POST /api/subscriptions/subscribe` - Subscribe to course
- `GET /api/subscriptions/my-courses` - Get user's courses

---

## Troubleshooting

**CORS Issues:**
- Make sure backend CORS is configured correctly
- Check `VITE_API_URL` in frontend `.env`

**MongoDB Connection:**
- Ensure MongoDB is running
- Check `MONGODB_URI` in backend `.env`

**Token Issues:**
- Clear localStorage and login again
- Check JWT_SECRET matches in backend

---

## License

MIT License

---

