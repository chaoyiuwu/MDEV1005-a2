import { useContext } from "react"
import AuthContext from "./AuthContext"

// a custom hook that exposes the auth context for components to use e.g. get current user
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
};

export default useAuth