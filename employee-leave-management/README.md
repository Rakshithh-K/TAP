# Employee Leave Management System

A comprehensive full-stack web application for managing employee leave requests with role-based access control, built with React and Node.js.

![Employee Leave Management](https://img.shields.io/badge/Status-Complete-green)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![React](https://img.shields.io/badge/React-18+-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green)

## 🚀 Features

### Employee Features
- ✅ Secure registration and authentication
- ✅ Apply for different leave types (Sick, Casual, Vacation)
- ✅ View personal leave requests with real-time status tracking
- ✅ Monitor leave balance (Sick: 10, Casual: 5, Vacation: 5 days)
- ✅ Cancel pending requests
- ✅ Personal dashboard with comprehensive statistics
- ✅ Profile management

### Manager Features
- ✅ Secure manager authentication
- ✅ View all employee leave requests
- ✅ Approve or reject leave requests with comments
- ✅ View complete team leave history
- ✅ Advanced analytics dashboard
- ✅ Filter and search functionality

## 🛠️ Tech Stack

**Backend:**
- Node.js + Express.js
- MongoDB with Mongoose ODM
- JWT Authentication
- bcryptjs for password hashing
- CORS enabled

**Frontend:**
- React 18 with Hooks
- Zustand for state management
- React Router for navigation
- Tailwind CSS for styling
- Axios for API calls
- Vite for build tooling

## 📋 Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (employee/manager),
  leaveBalance: {
    sickLeave: Number (default: 10),
    casualLeave: Number (default: 5),
    vacation: Number (default: 5)
  },
  createdAt: Date,
  updatedAt: Date
}
```

### LeaveRequests Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  leaveType: String (sick/casual/vacation),
  startDate: Date,
  endDate: Date,
  totalDays: Number,
  reason: String,
  status: String (pending/approved/rejected),
  managerComment: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile

### Leave Management (Employee)
- `POST /api/leaves` - Apply for leave
- `GET /api/leaves/my-requests` - Get personal leave requests
- `DELETE /api/leaves/:id` - Cancel pending request
- `GET /api/leaves/balance` - Get current leave balance

### Leave Management (Manager)
- `GET /api/leaves/all` - Get all employee requests
- `GET /api/leaves/pending` - Get pending requests only
- `PUT /api/leaves/:id/approve` - Approve leave request
- `PUT /api/leaves/:id/reject` - Reject leave request

### Dashboard Analytics
- `GET /api/dashboard/employee` - Employee statistics
- `GET /api/dashboard/manager` - Manager team statistics

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   Create a `.env` file in the backend directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/employee_leave_db
   JWT_SECRET=your_super_secret_jwt_key_here
   PORT=5001
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   
   Server will run on `http://localhost:5001`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   
   Application will run on `http://localhost:3000`

## 🖥️ Application Structure

```
employee-leave-management/
├── backend/
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Authentication & authorization
│   │   ├── models/          # MongoDB models
│   │   ├── routes/          # API routes
│   │   └── server.js        # Express server setup
│   ├── .env                 # Environment variables
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # Application pages
│   │   ├── store/           # Zustand state management
│   │   ├── utils/           # API utilities
│   │   └── App.jsx          # Main application component
│   └── package.json
└── README.md
```

## 🔐 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcryptjs for secure password storage
- **Role-based Access Control** - Employee and Manager role separation
- **Input Validation** - Server-side validation and sanitization
- **CORS Configuration** - Cross-origin resource sharing setup
- **Protected Routes** - Frontend and backend route protection

## 🚦 Getting Started

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd employee-leave-management
   ```

2. **Set up MongoDB:**
   - Install MongoDB locally or create MongoDB Atlas account
   - Update connection string in backend `.env` file

3. **Install and run backend:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

4. **Install and run frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

5. **Create test accounts:**
   - Register as employee: Any email with role 'employee'
   - Register as manager: Any email with role 'manager'

## 📱 Usage Examples

### Employee Workflow
1. Register/Login with employee role
2. View dashboard with leave balance
3. Apply for leave with dates and reason
4. Monitor request status in "My Requests"
5. Cancel pending requests if needed

### Manager Workflow
1. Login with manager role
2. View team statistics on dashboard
3. Review pending requests
4. Approve/reject with comments
5. Monitor team leave patterns in "All Requests"

## 🎯 Key Features Implemented

- **Responsive Design** - Works on desktop and mobile devices
- **Real-time Updates** - Instant status updates for leave requests
- **Leave Balance Management** - Automatic balance deduction on approval
- **Comprehensive Dashboard** - Analytics for both employees and managers
- **Error Handling** - Proper error messages and validation
- **Loading States** - User-friendly loading indicators

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔧 Troubleshooting

### Common Issues

1. **Port already in use:**
   ```bash
   # Kill process using port 5001
   taskkill /PID <process_id> /F
   ```

2. **MongoDB connection error:**
   - Ensure MongoDB is running
   - Check connection string in `.env` file

3. **Authentication issues:**
   - Clear browser localStorage
   - Check JWT_SECRET in backend `.env`

### Development Tips

- Use browser developer tools to debug API calls
- Check console logs for detailed error messages
- Ensure both frontend and backend servers are running
- Verify MongoDB connection before testing

---

**Built with ❤️ for efficient employee leave management**

For support or questions, please open an issue in the repository.