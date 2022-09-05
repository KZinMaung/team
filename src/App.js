import './App.css';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import PrivateRoute from './routers/PrivateRoute';
import AuthRoute from './routers/AuthRoute';
import Admin from './pages/Admin';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/auth/login" />} />
        <Route path="/auth/login" element={<PrivateRoute><Login /></PrivateRoute>} />
        <Route path="/admin/*" element={<AuthRoute><Admin /></AuthRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
