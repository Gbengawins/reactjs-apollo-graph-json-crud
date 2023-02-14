import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/shared/Layout';
import AllEmployees from './pages/shared/AllEmployees';
import AddEmployee from './pages/AddEmployee';
import EditEmployee from "./pages/EditEmployee";


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AllEmployees />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/edit-employee/:id" element={<EditEmployee />} />
      </Routes>
    </Layout>
  );
}

export default App;
