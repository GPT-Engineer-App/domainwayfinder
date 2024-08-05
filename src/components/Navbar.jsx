import { Link } from "react-router-dom";
import { Home, User, LogIn, LogOut } from "lucide-react";
import { useSupabaseAuth } from "../integrations/supabase/auth";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { session, logout } = useSupabaseAuth();

  return (
    <nav className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold flex items-center">
          <Home className="mr-2" />
          Domain Navigational Tool
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          {session ? (
            <>
              <Link to={`/user/${session.user.id}`} className="hover:underline flex items-center">
                <User className="mr-1" size={18} />
                Profile
              </Link>
              <Button onClick={logout} variant="ghost" className="flex items-center">
                <LogOut className="mr-1" size={18} />
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login" className="hover:underline flex items-center">
              <LogIn className="mr-1" size={18} />
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
