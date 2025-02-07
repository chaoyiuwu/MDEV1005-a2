import '@mantine/core/styles.css'
//import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import AuthProvider from './contexts/AuthProvider.tsx'
import Dashboard from './pages/Dashboard/dashboard'
import PrivateRoute from './route/PrivateRoute'
import Login from './pages/Login/login'
import SignUp from './pages/SignUp/signup'
import Landing from './pages/Landing/landing.tsx'
import { MantineProvider,MantineColorsTuple,createTheme } from '@mantine/core'

const magentaColorScheme: MantineColorsTuple = [
  '#ffe9f6',
  '#ffd1e6',
  '#faa1c9',
  '#f66eab',
  '#f24391',
  '#f02981',
  '#f01879',
  '#d60867',
  '#c0005c',
  '#a9004f'
];

const theme = createTheme({
  colors: {
    magentaColorScheme,
  }
});

function App() {
    return ( 
        <MantineProvider theme={theme}>
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
