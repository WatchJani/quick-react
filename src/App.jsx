import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Register from './pages/register';
import Login from './pages/login'
import RoleList from "./pages/role"
import ReportList from "./pages/report"
import Project from "./pages/project"
import Material from "./pages/materials"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/role" element={<RoleList />} />
        <Route path="/report" element={<ReportList />} />
        <Route path="/project/:id" element={<Project />} />
        <Route path="/material" element={<Material />} />
      </Routes>
    </Router>
  )
}

export default App