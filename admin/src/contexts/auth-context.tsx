import { createContext } from "react";

interface AuthUser {
  name: string;
  email: string;
  token: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<AuthUser | null>(() => {
//     try {
//       const stored = sessionStorage.getItem("portfolio-admin-user");
//       return stored ? JSON.parse(stored) : null;
//     } catch {
//       return null;
//     }
//   });

//   const login = (u: AuthUser) => {
//     setUser(u);
//     sessionStorage.setItem("portfolio-admin-user", JSON.stringify(u));
//   };

//   const logout = () => {
//     setUser(null);
//     sessionStorage.removeItem("portfolio-admin-user");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }
