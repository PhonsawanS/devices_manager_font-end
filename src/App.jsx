import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './page/LoginPage';
import RegisterPage from './page/RegisterPage';
import DevicePage from './page/DevicePage';
import HomePage from './page/HomePage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route
          path="/device"
          element={
            <PrivateRoute>
              <DevicePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
