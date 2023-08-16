import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import EmployeeProvider from './contexts/EmployeeContext'

import './App.css'
import { EmployeesList } from './components/EmployeesList'
import { EmployeeDetail } from './components/EmployeeDetail';

function App() {

  return (
    <div style={{
      display: 'grid', gap: '6rem', marginTop: '3.7rem', justifyContent: 'center'
    }}>
      <EmployeeProvider>
        <Router>
          <Routes>
            <Route path='/' element={<EmployeesList />} />
            <Route path="/employee/:id" element={<EmployeeDetail />} />
          </Routes>
        </Router>
      </EmployeeProvider>
    </div>
  )
}

export default App
