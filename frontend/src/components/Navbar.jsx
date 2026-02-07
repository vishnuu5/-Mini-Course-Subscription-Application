import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Menu, X, User, LogOut } from "lucide-react";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/auth");
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-primary text-white shadow-xl sticky top-0 z-50 border-b border-white/10 backdrop-blur-md bg-opacity-95">
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl sm:text-3xl font-bold flex items-center gap-3 sm:gap-4 hover:opacity-90 transition-all duration-300 group"
          >
            <span className="bg-white/20 p-2 sm:p-3 rounded-xl group-hover:bg-white/30 transition-colors text-xl sm:text-2xl shadow-sm">
              📚
            </span>
            <span className="tracking-tight">EduHub</span>
          </Link>
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:bg-white/10 font-semibold text-base sm:text-lg transition-all duration-300 hover:text-white/90"
              >
                Explore
              </Link>
              <Link
                to="/my-courses"
                className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:bg-white/10 font-semibold text-base sm:text-lg transition-all duration-300 hover:text-white/90"
              >
                My Courses
              </Link>
            </div>

            <div className="flex items-center gap-6 pl-6 border-l border-white/20">
              <div className="flex flex-col text-right">
                <span className="text-sm sm:text-base font-bold leading-tight block">
                  {user?.name || "Guest User"}
                </span>
                <span className="text-xs sm:text-sm text-blue-100/80 leading-tight block mt-1 hidden xl:block">
                  {user?.email}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="bg-white text-primary px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold text-sm sm:text-base hover:bg-gray-50 hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md active:scale-95 whitespace-nowrap"
              >
                <span className="hidden sm:inline">Logout</span>
                <LogOut className="w-4 h-4 sm:hidden" />
              </button>
            </div>
          </div>

          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-white/20">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-2">
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl hover:bg-white/10 font-semibold text-lg transition-all duration-300 hover:text-white/90 flex items-center gap-3"
                >
                  Explore
                </Link>
                <Link
                  to="/my-courses"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl hover:bg-white/10 font-semibold text-lg transition-all duration-300 hover:text-white/90 flex items-center gap-3"
                >
                  My Courses
                </Link>
              </div>
              <div className="border-t border-white/20 pt-4">
                <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl mb-4">
                  <User className="w-5 h-5 text-blue-200" />
                  <div className="flex-1">
                    <div className="font-semibold text-sm">
                      {user?.name || "Guest User"}
                    </div>
                    <div className="text-xs text-blue-100/70">
                      {user?.email}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 bg-white text-primary rounded-xl font-bold hover:bg-gray-50 hover:shadow-lg transition-all duration-300 shadow-md flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
