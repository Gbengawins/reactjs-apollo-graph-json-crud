import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/shared/Layout';
import AllEmployees from './pages/shared/AllEmployees';
import AddEmployee from './pages/AddEmployee';


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AllEmployees />} />
        <Route path="/add-employee" element={<AddEmployee />} />
      </Routes>
    </Layout>
  );
}

export default App;
