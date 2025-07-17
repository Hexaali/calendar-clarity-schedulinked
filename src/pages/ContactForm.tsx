import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  FormEvent,
} from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import Header from "@/components/shared/Header";
import FooterSection from "@/components/index/FooterSection";
import { API_BASE_URL } from "@/components/shared/Constants";

declare global {
  interface Window {
    turnstile?: any;
  }
}

const TURNSTILE_SITE_KEY = "0x4AAAAAAA9xBvthQa3E106P";

interface FormData {
  name: string;
  email: string;
  contact: string;
  message: string;
  captchaToken?: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    contact: "",
    message: "",
    captchaToken: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const captchaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const renderCaptcha = () => {
      if (window.turnstile && captchaRef.current) {
        window.turnstile.render(captchaRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          callback: (token: string) => {
            setFormData((prev) => ({ ...prev, captchaToken: token }));
          },
          theme: "light",
        });
      }
    };

    const interval = setInterval(() => {
      if (window.turnstile) {
        renderCaptcha();
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]:
        id === "name"
          ? value.replace(/[^A-Za-z\s]/g, "").slice(0, 25)
          : id === "contact"
          ? value.replace(/\D/g, "")
          : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, email, message, captchaToken } = formData;

    if (!name || !email || !message) {
      toast.error("Name, email, and message are required.");
      return;
    }

    if (!captchaToken) {
      toast.error("Please complete the CAPTCHA.");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Form submitted successfully!");
        setFormData({
          name: "",
          email: "",
          contact: "",
          message: "",
          captchaToken: "",
        });

        if (captchaRef.current && window.turnstile) {
          window.turnstile.render(captchaRef.current, {
            sitekey: "0x4AAAAAABlXI8chOAIicWnQ",
            callback: (token: string) => {
              setFormData((prev) => ({ ...prev, captchaToken: token }));
            },
            theme: "auto",
          });
        }
      } else {
        toast.error(result.message || "Submission failed.");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header variant="full" />
      <section className="min-h-screen bg-background p-4 flex items-center justify-center">
        <div className="w-full sm:w-2/3 bg-white dark:bg-black p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-left pb-5 text-primary">
            Ready To Get Started?
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              id="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              maxLength={25}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="email"
              id="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="tel"
              id="contact"
              placeholder="Phone Number (Optional)"
              value={formData.contact}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              id="message"
              placeholder="Let us know what’s on your mind..."
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="mb-4" ref={captchaRef}></div>

            <Button
              className="bg-[#B6EA4D] text-black hover:bg-[#99ca37]"
              type="submit"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </div>
      </section>
      <FooterSection />
    </div>
  );
};

export default ContactForm;
