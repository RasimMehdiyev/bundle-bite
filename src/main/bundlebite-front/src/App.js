import './App.css';
import {Routes, Route} from 'react-router-dom';
import Homepage from './pages/Homepage.jsx';
import SuppliersPage from './pages/SuppliersPage.jsx';
import HeaderComponent from "./components/HeaderComponent.jsx";
import AuthenticationPage from './pages/AuthenticationPage.jsx';
import OrdersPage from './pages/OrdersPage.jsx';
import PrivateRoute from './PrivateRoute.js';
import ManagerRoute from './ManagerRoute.js';
import AllUsers from './pages/AllUsers.jsx';
import AllOrders from './pages/AllOrders.jsx';


const App = () =>{
  return (
            <>
                <HeaderComponent />
                <Routes>
                  {/* Public Routes */}
                    <Route path="/login" element={<AuthenticationPage />} />
                    <Route path="/signup" element={<AuthenticationPage />} />
                    <Route path="/" element={<Homepage />} />
                  {/* Private Routes */}
                  <Route element={<PrivateRoute/>}>
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/suppliers" element={<SuppliersPage />} />
                  </Route>
                  <Route element={<ManagerRoute/>}>
                    <Route path="/all-orders" element={<AllOrders />} />
                    <Route path="/all-users" element={<AllUsers />} />
                  </Route>
                  <Route path="/" element={<Homepage />} />
                  <Route path="*" element={<Homepage />} />
                </Routes>
            </>
  )
}

export default App;
