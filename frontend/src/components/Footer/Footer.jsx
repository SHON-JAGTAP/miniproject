import React from "react";
import { Link } from "react-router-dom";
import FooterLogo from "../../assets/turf_portal_logo.png";
import TurfVid from "../../assets/video/footer.mp4";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt,
} from "react-icons/fa";

const FooterLinks = [
  { title: "Home", link: "/" },
  { title: "About", link: "/about" },
  { title: "Places", link: "/places" },
  { title: "Blogs", link: "/blogs" },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden text-white">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={TurfVid} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Footer content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-white">
        {/* Logo + Description */}
        <div>
          <img src={FooterLogo} alt="Logo" className="h-14 mb-3" />
          <p className="text-sm leading-relaxed drop-shadow-sm">
            Your one-stop portal to explore the best sports turfs in town.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-3 drop-shadow-sm">Quick Links</h2>
          <ul className="space-y-2">
            {FooterLinks.map((item, index) => (
              <li key={index}>
                <Link to={item.link} className="hover:underline text-sm drop-shadow-sm">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-lg font-semibold mb-3 drop-shadow-sm">Contact</h2>
          <p className="flex items-center gap-2 text-sm mb-2 drop-shadow-sm">
            <FaLocationArrow /> Satara, Maharashtra, India
          </p>
          <p className="flex items-center gap-2 text-sm mb-4 drop-shadow-sm">
            <FaMobileAlt /> +91 1234567890
          </p>

          <div className="flex gap-4 text-xl drop-shadow-md">
            <a href="#" className="hover:text-blue-400">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-pink-400">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-blue-600">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
