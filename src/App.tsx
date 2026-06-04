import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AppRouter from "./router/AppRouter";
import { PERMISSIONS } from "./config/permissions";

export default function App() {
  const mockUserPermissions = [
    PERMISSIONS.SUPER_ADMIN
  ];

  return (
    <AuthProvider userPermissions={mockUserPermissions}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthProvider>
  );
}