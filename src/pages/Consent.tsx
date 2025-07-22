import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, LucideLoaderCircle} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/shared/Header";
import { Toaster, toast } from "react-hot-toast";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_REDIRECT_URI,
  API_BASE_URL,
  GOOGLE_SCOPES,
} from "@/components/shared/Constants";
import NotFound from "./NotFound";

function capitalize(word) {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

const Consent = () => {
  const { username } = useParams();
  const [openAppleModal, setOpenAppleModal] = useState(false);
  const [openGoogleModal, setOpenGoogleModal] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });
  const [profileUser, setProfileUser] = useState(null); 
  const [loggedInUser, setLoggedInUser] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
        }
      }
    };

    handleOAuthRedirect();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (username) {
        try {
          const res = await fetch(`${API_BASE_URL}/api/v1/profile/${username}`);
          if (res.ok) {
            const data = await res.json();
            setProfileUser(data);
          } else {
            setError(true);
          }
        } catch (err) {
          console.error("Error fetching profile data:", err);
          setError(true);
        } finally {
          setLoading(false);
        }
      }
    };

    const localUser = JSON.parse(localStorage.getItem("user")) || null;
    setLoggedInUser(localUser);

    fetchUserData();
  }, [username]);

  const getGoogleCalendarToken = () => {
    if (!profileUser?.id) {
      toast.error("Artist profile not found.", {
        style: { background: "red", color: "white" },
      });
      return;
    }

    const payload = {
      user_id: profileUser.id,
      first_name: formData.first_name,
      last_name: formData.last_name,
    };

    const encodedState = btoa(JSON.stringify(payload));

    const params = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: GOOGLE_REDIRECT_URI,
      response_type: "code",
      scope: GOOGLE_SCOPES,
      include_granted_scopes: "true",
      access_type: "offline",
      prompt: "consent",
      state: encodedState,
    });

    window.location.href = `https://accounts.google.com/o/oauth2/auth?${params.toString()}`;
  };

  const handleAppleCalendarSubmit = async () => {
    if (!formData.email || !formData.password) {
      toast.error("Email and password are required", {
        style: { background: "red", color: "white" },
      });
      return;
    }

    if (!profileUser?.id) {
      toast.error("Artist profile not found.", {
        style: { background: "red", color: "white" },
      });
      return;
    }

    try {
      const appleHash = btoa(formData.email + ":" + formData.password);
      const res = await fetch(`${API_BASE_URL}/api/v1/follow`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apple_hash: appleHash,
          artist: profileUser.id,
          email: formData.email,
          first_name: formData.first_name,
          last_name: formData.last_name,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        toast.success("Successfully added to Apple Calendar!", {
          style: { background: "green", color: "white" },
        });
      } else {
        toast.error(result.message || "Failed to add to Apple Calendar", {
          style: { background: "red", color: "white" },
        });
      }
    } catch (error) {
      console.error("Error adding to Apple Calendar:", error);
      toast.error("Something went wrong. Please try again.", {
        style: { background: "red", color: "white" },
      });
    }

    setOpenAppleModal(false);
    setFormData({ email: "", password: "", first_name: "", last_name: "" });
  };

  const handleGoogleCalendarSubmit = () => {
    if (!formData.first_name) {
      toast.error("First name is required", {
        style: { background: "red", color: "white" },
      });
      return;
    }

    getGoogleCalendarToken();
    setOpenGoogleModal(false);
    setFormData({ email: "", password: "", first_name: "", last_name: "" });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
       <LucideLoaderCircle/>
      </div>
    );
  }

  if (error || !profileUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <NotFound/>
      </div>
    );
  }

  const fullName = `${capitalize(profileUser.first_name)} ${capitalize(profileUser.last_name)}`.trim();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex flex-col">
      <Header variant="simple" />
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex-1 flex justify-center items-center px-4">
        <Card className="w-full max-w-sm bg-white border border-border shadow-xl">
          <CardContent className="p-10 text-center">
            <div className="mb-8">
              <Avatar className="w-32 h-32 mx-auto mb-4 ring-2 ring-muted">
                <AvatarImage
                  src={profileUser.profile_picture || "/placeholder.svg"}
                  alt={fullName || "Profile"}
                />
                <AvatarFallback className="text-2xl font-semibold bg-muted text-foreground">
                  {profileUser.first_name?.charAt(0) || "U"}
                  {profileUser.last_name?.charAt(0) || ""}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {fullName || "User"}
              </h2>
              <p className="text-muted-foreground font-medium">
                @{profileUser.username || "username"}
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <Button
                onClick={() => setOpenGoogleModal(true)}
                className="w-full bg-brand-orange hover:bg-brand-orange font-semibold py-4 rounded-lg shadow hover:shadow-md transition-all duration-200"
                size="lg"
              >
                <img src="/g.webp" className="w-4 h-4"></img>
                Add to Google Calendar
              </Button>

              <Button
                onClick={() => setOpenAppleModal(true)}
                className="w-full bg-muted text-foreground font-semibold py-4 rounded-lg shadow bg-black text-white hover:bg-black transition-all duration-200"
                size="lg"
                variant="secondary"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Add to Apple Calendar
              </Button>

              {/* <Button
                // onClick={() => setOpenAppleModal(true)}
                className="w-full bg-gradient-to-r from-[#C9FF57] to-[#b6ea4d] text-black hover:from-[#b6ea4d] hover:to-[#c9ff57] font-semibold py-4 rounded-lg shadow hover:shadow-md transition-all duration-200"
                size="lg"
                variant="secondary"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Add to Microsoft 365
              </Button> */}
            </div>

            <div className="text-center space-y-3">
              <p className="text-sm text-muted-foreground">
                You'll be asked for calendar permission
              </p>
              <p className="text-xs text-muted-foreground font-medium">
                You're about to add this artist's events to your calendar. You can revoke anytime.
              </p>
              <p className="text-xs text-muted-foreground pt-4 font-medium opacity-80">
                Powered by Calendure
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog.Root open={openGoogleModal} onOpenChange={setOpenGoogleModal}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-lg p-6 shadow-lg">
            <Dialog.Title className="text-xl font-semibold">Google Calendar Info</Dialog.Title>
            <Dialog.Description className="text-sm text-muted-foreground mb-4">
              Enter your name to connect with Google Calendar
            </Dialog.Description>

            <div className="space-y-4">
              <div>
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  id="last_name"
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Dialog.Close asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.Close>
              <Button onClick={handleGoogleCalendarSubmit} className="bg-[#C9FF57] hover:bg-[#b6ea4d] text-black">
                Connect
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <Dialog.Root open={openAppleModal} onOpenChange={setOpenAppleModal}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-lg p-6 shadow-lg">
            <Dialog.Title className="text-xl font-semibold">Apple Calendar Login</Dialog.Title>
            <Dialog.Description className="text-sm text-muted-foreground mb-4">
              Enter your Apple ID credentials to connect with Apple Calendar
            </Dialog.Description>

            <div className="space-y-4">
              <div>
                <Label htmlFor="apple-first_name">First Name</Label>
                <Input
                  id="apple-first_name"
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="apple-last_name">Last Name</Label>
                <Input
                  id="apple-last_name"
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="apple-email">Apple ID</Label>
                <Input
                  id="apple-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="apple-password">App Password</Label>
                <Input
                  id="apple-password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <div className="text-sm text-blue-600 mt-4 mb-6">
              Don't have an app password?{" "}
              <a
                href="https://support.apple.com/en-us/102654"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-blue-800"
              >
                Follow this link for App-Specific password.
              </a>
            </div>

            <div className="flex justify-end gap-2">
              <Dialog.Close asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.Close>
              <Button onClick={handleAppleCalendarSubmit} className="bg-[#C9FF57] hover:bg-[#b6ea4d] text-black">
                Connect
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default Consent;
