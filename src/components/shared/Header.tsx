
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BrandLogo,BrandText} from "@/components/shared/Constants"

interface HeaderProps {
  variant?: "full" | "simple";
}

const Header = ({ variant = "full" }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-20 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center justify-center gap-2">
          {BrandLogo}
          {BrandText}
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="/#how" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
            How It Works
          </a>
          <a href="/#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
            Pricing
          </a>
          <Button asChild className="bg-brand-orange hover:bg-brand-green hover:text-white text-white rounded-lg font-semibold " >
            <Link to="/auth">Get Started</Link>
          </Button>
        </nav>
        
        {/* Mobile Menu Button */}
        <button className="md:hidden " onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur">
          <nav className="container flex flex-col space-y-4 px-4 py-6">
            <a href="/#how" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </a>
            <a href="/#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>

            <Button asChild className="bg-white text-foreground hover:bg-muted font-semibold shadow-sm w-fit mb-1" variant="outline">
              <Link to="/auth">Get Started</Link>
            </Button>
           
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
