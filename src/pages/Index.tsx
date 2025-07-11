import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import HeroSection from "@/components/index/HeroSection";
import HowItWorksSection from "@/components/index/HowItWorksSection";
import PricingSection from "@/components/index/PricingSection";
import FooterSection from "@/components/index/FooterSection";
import Header from "@/components/shared/Header";
import { API_BASE_URL } from "@/components/shared/Constants";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleOAuthRedirect = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      const state = urlParams.get("state");

      if (code && state) {
        try {
          const decoded = atob(state);
          const payload = JSON.parse(decoded);

          const cleanUrl = window.location.origin + window.location.pathname;
          window.history.replaceState({}, document.title, cleanUrl);

          const res = await fetch(`${API_BASE_URL}/api/v1/follow`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              artist: payload.user_id,
              first_name: payload.first_name,
              last_name: payload.last_name,
              google_token: code,
            }),
          });

          const result = await res.json();
          if (res.ok) {
            toast.success("Successfully added to Google Calendar!", {
              style: { background: "green", color: "white" },
            });
          } else {
            toast.error(result.message || "Failed to add to Google Calendar", {
              style: { background: "red", color: "white" },
            });
          }
        } catch (error) {
          console.error("Error handling Google OAuth redirect:", error);
          toast.error(
            "Something went wrong during Google Calendar connection.",
            {
              style: { background: "red", color: "white" },
            }
          );
        }
      }
    };

    handleOAuthRedirect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-center" reverseOrder={false} />
      <Header variant="full" />
      <HeroSection />
      <HowItWorksSection />
      <PricingSection />
      <FooterSection />
    </div>
  );
};

export default Index;
