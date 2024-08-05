import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold flex items-center">
          <Home className="mr-2" />
          Domain Navigational Tool
        </Link>
        <div>
          <Link to="/" className="hover:underline">Home</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
