import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Sidebar from './components/sidebar';
import "./vendor/fontawesome-free/css/all.min.css";
import "./css/sb-admin-2.min.css";
import Dashboard from './components/dashboard';
import RestaurantDetails from "./components/viewRestaurant/restaurantDetails"
import Location from './components/location';
import LoginComponent from './components/Login';
import Register from './components/register';
import Question from './addRestaurant/addRestaurant';
import Rating from './components/rating';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={ <Dashboard/>}/>
          <Route path="/" element={<LoginComponent/>}/>
          <Route path="/signup" element={<Register/>}/>
          <Route path="/resdetails/:id" element={ <RestaurantDetails/>}/>
          <Route path="/locationfilter" element={ <Location/>}/>
          <Route path="/ratingfilter" element={ <Rating/>}/>
          <Route path="/addrestaurant" element={<Question/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

