import { User } from 'firebase/auth';

export interface LoginFormValues {
    email: string;
    password: string;
}

export interface UserFormValues {
    email: string;
    password: string;
    displayName: string;
}

export interface AuthUser {
    email: string | null;
    displayName: string | null;
    uid: string | null;
}

export interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}