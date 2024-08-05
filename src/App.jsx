import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SupabaseAuthProvider } from "./integrations/supabase/auth";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import DomainDetailsPage from "./pages/DomainDetailsPage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";

const App = () => (
  <SupabaseAuthProvider>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Navbar />
          <main className="container mx-auto py-8 px-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/domain/:id" element={<DomainDetailsPage />} />
              <Route path="/user/:id" element={<UserPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </SupabaseAuthProvider>
);

export default App;
