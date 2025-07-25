/*
Part 1: Firebase Setup
Configure Firebase in Your Project:
Create a Firebase project in the Firebase console.
Add your eCommerce app to the Firebase project.
Install and configure the Firebase SDK in your app.
Enable Firebase Authentication and Firestore in the Firebase console.

Part 2: Firebase Authentication
User Registration:
Implement user registration with email and password using Firebase Authentication.
Automatically create a corresponding user document in the users collection in Firestore upon registration.
Login and Logout:
Allow users to log in with their email and password.
Add a logout feature to sign users out securely.

Part 3: User Management
Migrate CRUD Operations to Firestore:
Replace any existing CRUD operations for user data with Firestore. Required functionalities:
Create: Add a new user document to Firestore when a user registers.
Read: Fetch and display user profile information.
Update: Allow users to update their profile details, such as name and address.
Delete: Enable users to delete their account and all associated data from Firestore.

Part 4: Product Management
Replace FakeStore API:
Create a products collection in Firestore to store product details.
CRUD Operations for Products:
Fetch all products from the products collection to display in the store.
Add functionality for users to:
Create new products.
Update existing product details (e.g., price, description, stock).
Delete products from the store.

Part 5: Order Management
Create Orders:
When users place an order, save the details in an orders collection in Firestore.
Each order should include:
A reference to the user who placed the order.
Details of the products in the order (e.g., IDs, quantities, total price).
The order’s creation timestamp.

Order History:
Allow users to view a list of their past orders.
Fetch order history from the orders collection, displaying:
Order ID
Date of creation
Total price
Enable users to click on an order to see full details, including the list of products and the total cost.

GitHub Repository:
You are free to create another repository or update the existing Module 8 E-commerce repo.
Submission
Upon completing the project, submit your code, including all source code files, and the README.md file in your GitHub repository to Google Classroom.
*/

import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage/HomePage"
import { ProductProvider } from "./context/ProductContext"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { CartProvider } from "./context/CartContext"
import { AuthProvider } from "./context/AuthContext"
import CartPage from "./pages/CartPage/CartPage"
import Profile from "./pages/RegisterPages/Profile"
import Login from "./pages/RegisterPages/Login"
import Logout from "./pages/RegisterPages/Logout"
import Register from "./pages/RegisterPages/Register"
import AddUserForm from "./Store User/UserForm"
import DisplayUser from "./Store User/UserStore"
import AddProductForm from "./Store Product/ProductForm"
import DisplayProduct from "./Store Product/ProductStore"
import NavBar from "./components/NavBar/NavBar"


//Setting up Query Client for Query Client provider for axios API pull
function App() {
  const queryClient = new QueryClient()

  return (

    //Wrapping project with Query Client Provider for axios API pul
    <QueryClientProvider client={queryClient}>
      {/* Wrapping project with Product provider for global access to products array */}
      <AuthProvider>
        <ProductProvider>
          {/* Wrapping project with Cart provider for global access to products array */}
          <CartProvider>
            {/* Wrapping project with BrowserRouter for user Navigation */}
            <NavBar/>
            {/* Wrapping project with Navbar */}
              <BrowserRouter>
              {/* Wrapping each page in routes */}
              <Routes>
                {/* Using route for each page navigation */}
                <Route path="/" element={<HomePage/>}/>
                <Route path="/cart" element={<CartPage/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/logout" element={<Logout/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/createUser" element={<AddUserForm/>}/>
                <Route path="/showUsers" element={<DisplayUser/>}/>
                <Route path="/createProduct" element={<AddProductForm/>}/>
                <Route path="/showProducts" element={<DisplayProduct/>}/>
              </Routes>
              </BrowserRouter>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

// Sending app to main for project run
export default App
