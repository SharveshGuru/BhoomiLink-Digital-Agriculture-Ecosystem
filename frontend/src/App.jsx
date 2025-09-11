import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import VehicleListings from "./pages/VehicleListing";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./AuthProvider";
import Profile from "./pages/Profile";
import ManageVehicles from "./pages/ManageVechicle";
import RawMaterials from "./pages/RawMaterials";
import ManageRawMaterials from "./pages/ManageRawMaterials";
import RawMaterialsOrders from "./pages/RawMaterialsOrders";
import Products from "./pages/Products";
import ManageProducts from "./pages/ManageProducts";
import ProductOrder from "./pages/ProductOrder";


function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-white text-gray-800">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/vehiclelisting" element={<VehicleListings/>}/>
                <Route path="/vehiclelisting/manage" element={<ManageVehicles/>} />
                <Route path="/rawmaterials" element={<RawMaterials />} />
                <Route path="/rawmaterials/manage" element={<ManageRawMaterials />} />
                <Route path="/marketplace" element={<Products />} />
                <Route path="/marketplace/manage" element={<ManageProducts />} />
                <Route path="/rawmaterials/orders" element={<RawMaterialsOrders />} />
                <Route path="/product/orders" element={<ProductOrder/>} />
              </Route>
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
