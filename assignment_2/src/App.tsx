import { Route, Routes } from 'react-router'
import './App.css'
import Dashboard from './pages/Dashboard/dashboard'

function App() {
    return (
        <Routes>
            <Route index element={<Dashboard />} />
        </Routes>
    )
}

export default App
