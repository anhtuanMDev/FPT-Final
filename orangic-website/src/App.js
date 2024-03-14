import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import ReportFoods from '../src/components/anhtuan/errors/ReportFoods.jsx';
import ReportRestaurants from '../src/components/anhtuan/errors/ReportRestaurants.jsx';
import ReportUsers from './components/anhtuan/errors/ReportUsers.jsx';
import Foods from './components/anhtuan/information/Foods.jsx';
import Restaurants from './components/anhtuan/information/Restaurants.jsx';
import Users from './components/anhtuan/information/Users.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/informations/users" element={<Users/>} />
        <Route path="/informations/restaurants" element={<Restaurants/>} />
        <Route path="/informations/foods" element={<Foods/>} />
        <Route path="/errors/report-users" element={<ReportUsers/>} />
        <Route path="/errors/report-restaurants" element={<ReportRestaurants/>} />
        <Route path="/errors/report-foods" element={<ReportFoods/>} />
      </Routes>
    </Router>
  );
}

export default App;
