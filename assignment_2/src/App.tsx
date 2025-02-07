import '@mantine/core/styles.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import AuthProvider from './contexts/AuthProvider.tsx'
import Dashboard from './pages/Dashboard/dashboard'
import PrivateRoute from './route/PrivateRoute'
import Login from './pages/Login/login'
import SignUp from './pages/SignUp/signup'
import Landing from './pages/Landing/landing.tsx'
import { MantineProvider } from '@mantine/core'


function App() {
    return ( 
        <MantineProvider>
        <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Landing />}/>
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
        </MantineProvider>
    )
}

export default App
