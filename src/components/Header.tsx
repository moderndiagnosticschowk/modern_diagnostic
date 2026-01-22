import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, MapPin, Clock, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    user,
    isAdmin,
    signOut
  } = useAuth();
  const navItems = [{
    name: "Home",
    href: "#home"
  }, {
    name: "About",
    href: "#about"
  }, {
    name: "Services",
    href: "#services"
  }, {
    name: "Rates",
    href: "#rates"
  }, {
    name: "Contact",
    href: "#contact"
  }];
  return <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      {/* Top Info Bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 text-xs md:text-sm">
            <div className="flex items-center gap-1 md:gap-2">
              <Phone className="h-3 w-3 md:h-4 md:w-4" />
              <span className="whitespace-nowrap">0522-4071707</span>
            </div>
            <div className="hidden sm:flex items-center gap-1 md:gap-2">
              <MapPin className="h-3 w-3 md:h-4 md:w-4" />
              <span className="whitespace-nowrap">Chowk, Lucknow</span>
            </div>
            <div className="flex items-center gap-1 md:gap-2">
              <Clock className="h-3 w-3 md:h-4 md:w-4" />
              <span className="whitespace-nowrap hidden sm:inline">Mon-Sat: 8:00 AM - 8:00 PM</span>
              <span className="whitespace-nowrap sm:hidden">Mon-Sat: 8AM-8PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-base md:text-lg">M</span>
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-foreground">Modern Diagnostic Center</h1>
              <p className="text-xs md:text-sm text-muted-foreground hidden sm:block">Trusted Healthcare Since 1997</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(item => <a key={item.name} href={item.href} className="text-foreground hover:text-primary transition-colors font-medium">
                {item.name}
              </a>)}
            
            {user ? <div className="flex items-center space-x-2">
                {isAdmin && <Link to="/admin">
                    <Button variant="outline" size="sm">
                      <Shield className="w-4 h-4 mr-2" />
                      Admin Panel
                    </Button>
                  </Link>}
                <Button variant="outline" size="sm" onClick={() => signOut()}>
                  Sign Out
                </Button>
              </div> : <Link to="/auth">
                <Button variant="outline" size="sm">
                  Admin Login
                </Button>
              </Link>}
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && <div className="md:hidden mt-4 pb-4 border-t border-border">
            <div className="flex flex-col space-y-4 pt-4">
              {navItems.map(item => <a key={item.name} href={item.href} className="text-foreground hover:text-primary transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
                  {item.name}
                </a>)}
              
              <div className="pt-2 border-t border-border">
                {user ? <div className="flex flex-col space-y-2">
                    {isAdmin && <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="outline" className="w-full">
                          <Shield className="w-4 h-4 mr-2" />
                          Admin Panel
                        </Button>
                      </Link>}
                    <Button variant="outline" className="w-full" onClick={() => {signOut(); setIsMenuOpen(false);}}>
                      Sign Out
                    </Button>
                  </div> : <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Admin Login
                    </Button>
                  </Link>}
              </div>
            </div>
          </div>}
      </nav>
    </header>;
};
export default Header;