import { Toaster } from "react-hot-toast";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/shared/PrivateRoute";

import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import Subscribers from "./pages/Subscribers";
import CreateEvent from "./pages/CreateEvent";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Consent from "./pages/Consent";
import PrivacyPolicy from "./pages/PrivayPolicy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            zIndex: 99999,
          },
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} /> {/* ✅ Privacy Policy route */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/events"
            element={
              <PrivateRoute>
                <Events />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/subscribers"
            element={
              <PrivateRoute>
                <Subscribers />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/create-event"
            element={
              <PrivateRoute>
                <CreateEvent />
              </PrivateRoute>
            }
          />
          <Route path="/:username" element={<Consent />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
