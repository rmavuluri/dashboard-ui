import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppRoutes } from './routes';
import { PrivateRoute } from './components/auth/PrivateRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { StorageService } from './services/storageService';
import { AuthService } from './services/authService';
import { ThemeProvider } from './context/ThemeContext';

// Initialize storage and auth
StorageService.initialize();
AuthService.initialize();

function App() {

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            {AppRoutes}
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
