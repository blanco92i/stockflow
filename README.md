# StockFlow - Setup & Run Guide

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

---

## 🚀 BACKEND SETUP

### 1. Navigate to server folder
```bash
cd server
```

### 2. Create `.env` file
```
MONGODB_URI=mongodb://localhost:27017/stockflow
JWT_SECRET=your_jwt_secret_key_here_change_in_production
PORT=5000
NODE_ENV=development
```

**For MongoDB Atlas** (cloud):
```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/stockflow?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_here
PORT=5000
NODE_ENV=development
```

### 3. Start the backend server
```bash
npm run dev
```

The server will run on **http://localhost:5000**

---

## 🎨 FRONTEND SETUP

### 1. Navigate to client folder
```bash
cd client
```

### 2. Start the React development server
```bash
npm start
```

The app will open on **http://localhost:3000**

---

## 🔌 API ENDPOINTS

### Authentication
- **POST** `/api/auth/register` - Register new user
- **POST** `/api/auth/login` - Login user

### Products
- **POST** `/api/products` - Create product
- **GET** `/api/products` - Get all products
- **PUT** `/api/products/:id` - Update product
- **DELETE** `/api/products/:id` - Delete product

### Sales
- **POST** `/api/sales` - Create sale
- **GET** `/api/sales` - Get all sales

### Dashboard
- **GET** `/api/dashboard` - Get today's stats

---

## 📬 POSTMAN TEST ENDPOINTS

### 1. Register User
```
POST http://localhost:5000/api/auth/register
Body (JSON):
{
  "name": "John Doe",
  "phone": "08012345678",
  "password": "password123"
}
```

### 2. Login User
```
POST http://localhost:5000/api/auth/login
Body (JSON):
{
  "phone": "08012345678",
  "password": "password123"
}
Response: { "token": "..." }
Copy the token for authenticated requests
```

### 3. Create Product
```
POST http://localhost:5000/api/products
Headers:
Authorization: Bearer YOUR_TOKEN_HERE

Body (JSON):
{
  "name": "Rice",
  "purchasePrice": 5000,
  "sellingPrice": 7000,
  "stock": 50
}
```

### 4. Get All Products
```
GET http://localhost:5000/api/products
Headers:
Authorization: Bearer YOUR_TOKEN_HERE
```

### 5. Record Sale
```
POST http://localhost:5000/api/sales
Headers:
Authorization: Bearer YOUR_TOKEN_HERE

Body (JSON):
{
  "productId": "PRODUCT_ID_HERE",
  "quantity": 5
}
```

### 6. Get Dashboard Stats
```
GET http://localhost:5000/api/dashboard
Headers:
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## 📁 PROJECT STRUCTURE

```
stockFlow/
├── server/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── saleController.js
│   │   └── dashboardController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Sale.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── sales.js
│   │   └── dashboard.js
│   ├── middleware/
│   │   └── auth.js
│   ├── config/
│   │   └── db.js
│   ├── .env
│   ├── .gitignore
│   ├── server.js
│   └── package.json
│
└── client/
    ├── src/
    │   ├── pages/
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── Dashboard.js
    │   │   ├── Products.js
    │   │   └── Sales.js
    │   ├── components/
    │   │   └── Navbar.js
    │   ├── services/
    │   │   └── api.js
    │   ├── App.js
    │   └── index.js
    ├── public/
    │   └── index.html
    ├── .gitignore
    ├── package.json
    └── README.md
```

---

## 🎯 KEY FEATURES IMPLEMENTED

✅ User Registration & Login with JWT
✅ Product Management (CRUD)
✅ Sales Tracking & Stock Reduction
✅ Automatic Profit Calculation
✅ Daily Dashboard Stats
✅ Protected Routes
✅ Toast Notifications
✅ Responsive Design with Bootstrap
✅ Mobile-Friendly UI

---

## ⚠️ IMPORTANT NOTES

1. **MongoDB**: Make sure MongoDB is running locally or provide Atlas connection string
2. **JWT Secret**: Change the secret in production
3. **CORS**: Backend is configured to accept requests from localhost:3000
4. **Token**: Keep token in localStorage (secure in production with httpOnly cookies)

---

## 🐛 Troubleshooting

**"Cannot connect to MongoDB"**
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`

**"CORS Error"**
- Make sure backend is running on port 5000
- Frontend is running on port 3000

**"Token is not valid"**
- Logout and login again
- Clear localStorage if needed

---

## 📞 Support

For issues or questions, check the code comments or create an issue.

Happy selling! 🎉
