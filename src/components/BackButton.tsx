
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Only show the back button if we're not on the home page
  const isHomePage = location.pathname === "/" || location.pathname === "";
  
  if (isHomePage) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="fixed top-20 left-4 z-50 rounded-full bg-background/20 backdrop-blur hover:bg-background/40 transition-all duration-300"
      onClick={() => navigate(-1)}
      aria-label="Go back"
    >
      <ArrowLeft className="h-5 w-5" />
    </Button>
  );
};

export default BackButton;
