import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Register from './pages/register';
import Login from './pages/login'
import RoleList from "./pages/role.jsx"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/role" element={<RoleList />} />
      </Routes>
    </Router>
  )
}

export default App