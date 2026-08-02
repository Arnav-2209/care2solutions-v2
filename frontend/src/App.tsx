import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import AdminDashboard from './pages/AdminDashboard';
import EfficientRevenueCyclePage from './pages/resources/EfficientRevenueCyclePage';
import PreAppointmentChecklistPage from './pages/resources/PreAppointmentChecklistPage';
import AppointmentSchedulingPage from './pages/resources/AppointmentSchedulingPage';
import './App.css';

function AppLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/resources/efficient-revenue-cycle" element={<EfficientRevenueCyclePage />} />
        <Route path="/resources/pre-appointment-checklist" element={<PreAppointmentChecklistPage />} />
        <Route path="/resources/appointment-scheduling" element={<AppointmentSchedulingPage />} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
