import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthModule from "./modules/auth";
import InvestmentModule from "./modules/investment";
import { UserProvider } from "./contexts/UserContext";
import { InvestmentProvider } from "./contexts/InvestmentContext";
import Layout from "./components/Layout";

const ProtectedRoute = ({ children }: any) => {
  const isLoggedIn = localStorage.getItem("token");

  if (isLoggedIn) {
    return <Layout>{children}</Layout>;
  }

  return <Navigate to="/auth" />;
};

const App: React.FC = () => {
  return (
    <UserProvider>
      <InvestmentProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <InvestmentModule />
                </ProtectedRoute>
              }
            />
            <Route
              path="/investment"
              element={
                <ProtectedRoute>
                  <InvestmentModule />
                </ProtectedRoute>
              }
            />
            <Route path="/auth" element={<AuthModule />} />
          </Routes>
        </Router>
      </InvestmentProvider>
    </UserProvider>
  );
};

export default App;
