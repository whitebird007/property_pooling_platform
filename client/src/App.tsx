import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";

// Public Pages
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import Education from "./pages/Education";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

// Investor Pages
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import Marketplace from "./pages/Marketplace";
import KYC from "./pages/KYC";
import Wallet from "./pages/Wallet";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProperties from "./pages/admin/AdminProperties";
import AdminInvestors from "./pages/admin/AdminInvestors";
import AdminKYC from "./pages/admin/AdminKYC";
import PropertyManagement from "./pages/admin/PropertyManagement";
import SalesTraining from "./pages/admin/SalesTraining";

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={Home} />
      <Route path="/properties" component={Properties} />
      <Route path="/properties/:id" component={PropertyDetail} />
      <Route path="/education" component={Education} />
      <Route path="/about" component={About} />
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={Login} />
      
      {/* Investor Routes */}
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/marketplace" component={Marketplace} />
      <Route path="/kyc" component={KYC} />
      <Route path="/wallet" component={Wallet} />
      
      {/* Admin Routes */}
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/properties" component={AdminProperties} />
      <Route path="/admin/investors" component={AdminInvestors} />
      <Route path="/admin/kyc" component={AdminKYC} />
      <Route path="/admin/property-management/:id" component={PropertyManagement} />
      <Route path="/admin/sales-training" component={SalesTraining} />
      
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
