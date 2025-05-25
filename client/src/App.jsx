import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css"
import "./index.css"
import Home from './components/Home';
import Navbar from './components/Navbar';
import AddWord from './components/AddWord';
import Manage from './components/manage';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AddWord" element={<AddWord />} />
        <Route path="/Manage" element={<Manage />} />
       
      </Routes>
    </Router>
  );
}

export default App;
