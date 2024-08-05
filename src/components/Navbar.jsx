import { Link } from "react-router-dom";
import { Home, User } from "lucide-react";

const Navbar = () => {
  // For demonstration purposes, we're using a hardcoded user ID.
  // In a real application, you'd get this from your authentication system.
  const userId = 1;

  return (
    <nav className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold flex items-center">
          <Home className="mr-2" />
          Domain Navigational Tool
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to={`/user/${userId}`} className="hover:underline flex items-center">
            <User className="mr-1" size={18} />
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
