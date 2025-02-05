import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router"
import './index.css'
import App from './App.tsx'
import AuthProvider from './contexts/AuthProvider.tsx'
import Dashboard from './pages/Dashboard/dashboard'
import PrivateRoute from './route/PrivateRoute'
import Login from './pages/Login/login'
import SignUp from './pages/SignUp/signup'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />}/>
                    <Route path="login" element={<Login />}/>
                    <Route path="signup" element={<SignUp />}/>
                    <Route path="dashboard" element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    </StrictMode>,
)
