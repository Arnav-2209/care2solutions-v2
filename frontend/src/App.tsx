import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import EfficientRevenueCyclePage from './pages/resources/EfficientRevenueCyclePage';
import PreAppointmentChecklistPage from './pages/resources/PreAppointmentChecklistPage';
import AppointmentSchedulingPage from './pages/resources/AppointmentSchedulingPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/resources/efficient-revenue-cycle" element={<EfficientRevenueCyclePage />} />
        <Route path="/resources/pre-appointment-checklist" element={<PreAppointmentChecklistPage />} />
        <Route path="/resources/appointment-scheduling" element={<AppointmentSchedulingPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
