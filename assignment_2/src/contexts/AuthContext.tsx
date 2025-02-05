import { createContext } from 'react';
import { AuthContextType } from '../interfaces/interface';

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;