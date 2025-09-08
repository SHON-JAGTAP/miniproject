import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/turf_portal_logo.png";
import { useAuth } from "../../context/AuthContext";
import {
  FaCaretDown,
  FaUser,
  FaEdit,
  FaLock,
  FaClipboardList,
  FaSignOutAlt,
  FaPlusCircle,
} from "react-icons/fa";

const Navbar = () => {
  const [showQuickLinksDropdown, setShowQuickLinksDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  // Utility: closes both dropdowns when clicked outside
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      setShowProfileDropdown(false);
      setShowQuickLinksDropdown(false);
    };
    if (showProfileDropdown || showQuickLinksDropdown) {
      window.addEventListener("click", handleClickOutside);
      return () => window.removeEventListener("click", handleClickOutside);
    }
  }, [showProfileDropdown, showQuickLinksDropdown]);

  // Styles
  const navLinkBase =
    "flex items-center px-4 py-2 h-12 transition-colors duration-200 rounded-md font-medium text-base focus:outline-none";
  const navLinkActive =
    "text-blue-700 bg-blue-50 shadow font-semibold";
  const navLinkInactive =
    "text-gray-700 hover:text-blue-600 hover:bg-blue-50";

  // Special style for "Book Now" CTA
  const bookNowStyle =
    "flex items-center px-6 py-2 h-12 bg-gradient-to-r from-blue-600 to-green-500 text-white font-bold rounded-full shadow-lg hover:scale-105 hover:from-blue-700 hover:to-green-600 transition-all duration-300 border-2 border-blue-600";

  // Navbar
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-black/60 via-blue-900/10 to-black/60 backdrop-blur-md shadow-lg border-b border-white/10">
      {/* 🔶 Top Alert Bar */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-1 px-4 flex justify-between items-center text-sm font-semibold tracking-wide">
        <span>🔥 Book now & get 20% OFF!</span>
        <span>📞 +91 1234567890</span>
      </div>

      {/* 🔷 Main Navbar */}
      <div className="container mx-auto px-4 py-2 flex flex-wrap justify-between items-center gap-2">
        {/* Logo + Brand */}
        <NavLink to="/" className="flex items-center gap-3 select-none">
          <img src={logo} alt="TurfBooking Logo" className="h-10 w-auto drop-shadow-md" />
          <h1 className="text-2xl font-extrabold text-blue-700 tracking-wide font-heading">
            Turf<span className="text-green-500 drop-shadow-sm">Booking</span>
          </h1>
        </NavLink>

        {/* Links */}
        <nav className="flex-1 flex justify-end items-center">
        <ul className="flex items-center gap-1 md:gap-3 lg:gap-6">
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blogs"
              className={({ isActive }) =>
                `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
              }
            >
              Blogs
            </NavLink>
          </li>
          {user && (
            <li>
              <NavLink
                to="/places"
                className={({ isActive }) =>
                  `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
                }
              >
                Best Turf
              </NavLink>
            </li>
          )}

          {/* Quick Links Dropdown */}
          {user && (
            <li className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowQuickLinksDropdown((v) => !v);
                  setShowProfileDropdown(false);
                }}
                className={`${navLinkBase} ${navLinkInactive} gap-1`}
              >
                Quick Links
                <FaCaretDown className={`ml-1 transition-transform duration-200 ${showQuickLinksDropdown ? "rotate-180" : ""}`} />
              </button>
              {showQuickLinksDropdown && (
                <ul
                  onClick={e => e.stopPropagation()}
                  className="absolute top-full right-0 mt-2 bg-white border rounded-lg shadow-xl w-44 z-40 animate-fade-in"
                >
                  <li>
                    <NavLink to="/contact" className="block px-4 py-3 hover:bg-blue-50 text-gray-700">
                      Contact Turf
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/faq" className="block px-4 py-3 hover:bg-blue-50 text-gray-700">
                      FAQ on Turf
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>
          )}

          {/* Auth Links */}
          {!user && (
            <>
              <li>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive} text-blue-600`
                  }
                >
                  Signup
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/signin"
                  className={({ isActive }) =>
                    `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive} text-blue-600`
                  }
                >
                  Signin
                </NavLink>
              </li>
            </>
          )}

          {/* Profile Dropdown */}
          {user && (
            <li className="relative">
              <button
                onClick={e => {
                  e.stopPropagation();
                  setShowProfileDropdown((v) => !v);
                  setShowQuickLinksDropdown(false);
                }}
                className="flex items-center gap-2 px-3 py-2 h-12 text-gray-700 hover:text-blue-700 hover:bg-blue-50 transition rounded-full focus:outline-none"
              >
                <FaUser className="text-xl" />
                <FaCaretDown className={`transition-transform duration-200 ${showProfileDropdown ? "rotate-180" : ""}`} />
              </button>
              {showProfileDropdown && (
                <ul
                  onClick={e => e.stopPropagation()}
                  className="absolute right-0 mt-2 w-56 bg-white text-base text-gray-800 shadow-2xl rounded-lg z-50 border animate-fade-in"
                >
                  <li>
                    <NavLink
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-3 hover:bg-blue-50"
                    >
                      <FaUser className="text-purple-700" />
                      View Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/profile/edit"
                      className="flex items-center gap-2 px-4 py-3 hover:bg-blue-50"
                    >
                      <FaEdit className="text-orange-500" />
                      Edit Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/profile/change-password"
                      className="flex items-center gap-2 px-4 py-3 hover:bg-blue-50"
                    >
                      <FaLock className="text-yellow-600" />
                      Change Password
                    </NavLink>
                  </li>
                  {user?.role === "user" && (
                    <li>
                      <NavLink
                        to="/dashboard-user"
                        className="flex items-center gap-2 px-4 py-3 hover:bg-blue-50"
                      >
                        <FaClipboardList className="text-indigo-600" />
                        My Dashboard
                      </NavLink>
                    </li>
                  )}
                  {user?.role === "owner" && (
                    <>
                      <li>
                        <NavLink
                          to="/dashboard-owner"
                          className="flex items-center gap-2 px-4 py-3 hover:bg-blue-50"
                        >
                          <FaClipboardList className="text-indigo-600" />
                          Owner Panel
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/add-turf"
                          className="flex items-center gap-2 px-4 py-3 hover:bg-blue-50"
                        >
                          <FaPlusCircle className="text-green-600" />
                          Add Turf
                        </NavLink>
                      </li>
                    </>
                  )}
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 w-full text-left"
                    >
                      <FaSignOutAlt /> Log Out
                    </button>
                  </li>
                </ul>
              )}
            </li>
          )}

          {/* Book Now Button */}
          {user && (
            <li>
              <NavLink to="/booking" className={bookNowStyle}>
                <span className="mr-2 text-white">Book Now</span>
                <svg width="24" height="22" fill="none" viewBox="0 0 24 24" className="inline-block">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </NavLink>
            </li>
          )}
        </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;