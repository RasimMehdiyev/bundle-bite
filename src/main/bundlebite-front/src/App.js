import './App.css';
import {Routes, Route} from 'react-router-dom';
import Homepage from './pages/Homepage.jsx';
import SuppliersPage from './pages/SuppliersPage.jsx';
import HeaderComponent from "./components/HeaderComponent.jsx";
import AuthenticationPage from './pages/AuthenticationPage.jsx';
import PrivateRoute from './PrivateRoute.js';


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
                    
                    <Route path="/suppliers" element={<SuppliersPage />} />
                  </Route>
                  <Route path="/" element={<Homepage />} />
                </Routes>
            </>
  )
}

export default App;
