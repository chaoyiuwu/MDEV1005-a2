import { useState, useEffect } from "react";
import { User, onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from "../firebase/BaseConfig";
import AuthContext from "./AuthContext";

// a component to wrap the app in so that the rest of the app can access the auth state
export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, user => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
