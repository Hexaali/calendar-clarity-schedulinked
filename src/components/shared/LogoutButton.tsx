import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!token) return null;

  return (
    <Button
      className="flex items-center gap-2 text-sm bg-[#B81717] text-white hover:bg-[#B81717] focus:outline-none focus-visible:ring-0"
      onClick={handleLogout}
    >
      <LogOut className="h-5 w-5" />
      <span>Logout</span>
    </Button>
  );
};

export default LogoutButton;
