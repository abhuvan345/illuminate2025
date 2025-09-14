import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-card ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        

        <div className="border-t border-border/50 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2025 BMS College of Engineering. All rights reserved.
          </p>
          <p><Link
              to="https://illuminatw-2025.netlify.app/admin"
              className="text-muted-foreground hover:text-primary transition-colors p-2"
            >
              Admin
            </Link></p>
          <p className="text-muted-foreground text-sm mt-2 md:mt-0">
            Designed by --  
            <Link
              to="https://www.linkedin.com/in/bhuvan-a-50739a23b/"
              className="text-muted-foreground hover:text-primary transition-colors p-2"
            >
              Bhuvan A
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;