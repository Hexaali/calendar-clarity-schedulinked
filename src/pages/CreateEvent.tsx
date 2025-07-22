import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Home,
  Calendar,
  Users,
  ArrowLeft,
  ChevronDown,
  Send,
  Info,
} from "lucide-react";
import { API_BASE_URL } from "@/components/shared/Constants";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const animatedComponents = makeAnimated();
const customSelectStyles = {
  control: (base: any, state: any) => ({
    ...base,
    backgroundColor: "#f9fafb",
    borderColor: state.isFocused ? "#22c55e" : "#e5e7eb",
    boxShadow: state.isFocused ? "0 0 0 2px rgba(34,197,94,0.4)" : "none",
    borderRadius: "0.5rem",
    minHeight: "2.75rem",
    fontSize: "0.875rem",
    transition: "all 0.2s ease",
    "&:hover": {
      borderColor: "#22c55e",
    },
  }),
  multiValue: (base: any) => ({
    ...base,
    backgroundColor: "#dcfce7",
    borderRadius: "0.375rem",
    padding: "0 0.25rem",
  }),
  multiValueLabel: (base: any) => ({
    ...base,
    color: "#065f46",
    fontWeight: 500,
  }),
  multiValueRemove: (base: any) => ({
    ...base,
    color: "#065f46",
    ":hover": {
      backgroundColor: "#bbf7d0",
      color: "#064e3b",
    },
  }),
  menu: (base: any) => ({
    ...base,
    borderRadius: "0.5rem",
    zIndex: 20,
  }),
};

const getTodayDate = (): string => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

interface EventData {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  location: string;
  timezone: string;
}

interface FollowerOption {
  value: string;
  label: string;
}

const CreateEvent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [eventData, setEventData] = useState<EventData>({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    location: "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  const [followers, setFollowers] = useState<FollowerOption[]>([]);
  const [selectedFollowers, setSelectedFollowers] = useState<FollowerOption[]>(
    []
  );
  const [showEndDateTooltip, setShowEndDateTooltip] = useState(false);
  const [showEndTimeTooltip, setShowEndTimeTooltip] = useState(false);

  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const fullName = userData?.full_name || "Unknown User";
  const username = userData?.username || "unknown@example.com";

  const getInitials = (name: string): string =>
    name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
      : "U";

  const initials = getInitials(fullName);

  const navigationItems = [
    { title: "Dashboard", icon: Home, href: "/dashboard" },
    { title: "My Events", icon: Calendar, href: "/dashboard/events" },
    { title: "Subscribers", icon: Users, href: "/dashboard/subscribers" },
  ];

  useEffect(() => {
    if (userData?.followers?.length > 0) {
      const formatted = userData.followers.map((f: any) => ({
        value: f.username,
        label: `${f.first_name} ${f.last_name}`.trim() || f.username,
      }));
      setFollowers(formatted);
    }
  }, [userData]);

  const handleInputChange = (field: keyof EventData, value: string) => {
    setEventData((prev) => ({ ...prev, [field]: value }));
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    const today = getTodayDate();

    if (selectedDate < today) {
      toast.error("Cannot create an event in past dates.");
      handleInputChange("startDate", "");
    } else {
      handleInputChange("startDate", selectedDate);

      if (eventData.endDate && eventData.endDate < selectedDate) {
        handleInputChange("endDate", "");
      }
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;

    if (selectedDate && selectedDate < eventData.startDate) {
      toast.error("End date cannot be before start date.");
      handleInputChange("endDate", "");
    } else {
      handleInputChange("endDate", selectedDate);
    }
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedTime = e.target.value;

    if (
      selectedTime &&
      eventData.startTime &&
      selectedTime < eventData.startTime
    ) {
      toast.error("End time cannot be before start time.");
      handleInputChange("endTime", "");
    } else {
      handleInputChange("endTime", selectedTime);
    }
  };

  const handleCreateEvent = async () => {
    const token = localStorage.getItem("token");
    const businessId = userData?.id || 1;

    if (!eventData.startDate) {
      toast.error("Please provide a start date.");
      return;
    }

   const startDateTime = new Date(
  `${eventData.startDate}T${eventData.startTime || "12:00"}:00`
);
    const now = new Date();

    if (startDateTime < now) {
      toast.error("You cannot create an event in the past.");
      return;
    }

    let endDateTime = null;
    if (eventData.endDate) {
      endDateTime = new Date(
        `${eventData.endDate}T${eventData.endTime || "23:59"}:00`
      );
      if (endDateTime < startDateTime) {
        toast.error("End date/time cannot be before start date/time.");
        return;
      }
    } else if (eventData.endTime) {
      endDateTime = new Date(`${eventData.startDate}T${eventData.endTime}:00`);
    }

    const payload = {
      title: eventData.title,
      description: eventData.description,
      time: startDateTime.toISOString(),
      end_time: endDateTime?.toISOString() || null,
      location: eventData.location || "Online",
      external_url: "",
      category: "EVENT",
      duration: "",
      business: businessId,
      timezone: eventData.timezone,
      followers: selectedFollowers.map((f) => f.value),
    };

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/v1/event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to create event");
      await res.json();

      toast.success("Event created successfully!");
      navigate("/dashboard/events");
    } catch (err) {
      console.error("Event creation error:", err);
      toast.error(
        err instanceof Error ? err.message : "Event creation failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-gray-50/30 flex">
      <aside
        className={`${
          sidebarOpen ? "w-72" : "w-20"
        } bg-white border-r border-gray-200 shadow-lg transition-all duration-300 flex flex-col`}
      >
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="" alt={fullName} />
              <AvatarFallback className="bg-brand-green text-white font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-base font-semibold text-foreground truncate">
                  {fullName}
                </p>
                <p className="text-sm text-muted-foreground truncate">
                  {username}
                </p>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2"
            >
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  sidebarOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </Button>
          </div>
        </div>
        <nav className="flex-1 px-4 py-6">
          {navigationItems.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              className={`group flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all duration-200 ${
                window.location.pathname === item.href
                  ? "bg-gray-100 text-foreground shadow-sm"
                  : "text-gray-600 hover:text-foreground hover:bg-gray-50"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {sidebarOpen && (
                <span className="text-sm font-medium flex-1">{item.title}</span>
              )}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="bg-white/80 px-8 py-6 sticky top-0 z-10 border-b border-gray-200/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/dashboard/events">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Events
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold">Create Event</h1>
                <p className="text-muted-foreground mt-1">
                  Set up a new calendar marketing event.
                </p>
              </div>
            </div>
            <Button
              onClick={handleCreateEvent}
              disabled={loading}
              className="bg-brand-green text-white font-semibold shadow-md hover:bg-orange-600"
            >
              <Send className="h-4 w-4 mr-2" />
              {loading ? "Creating..." : "Create"}
            </Button>
          </div>
        </header>

        <div className="p-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">Event Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>Event Name *</Label>
                    <Input
                      value={eventData.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <textarea
                      value={eventData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      className="w-full min-h-[100px] rounded-md border px-3 py-2"
                    />
                  </div>
                  {followers.length > 0 && (
                    <div>
                      <Label>Tag Followers</Label>
                      <Select
                        isMulti
                        options={followers}
                        value={selectedFollowers}
                        onChange={(selected) =>
                          setSelectedFollowers(selected as FollowerOption[])
                        }
                        components={animatedComponents}
                        placeholder="Select followers by name..."
                        styles={customSelectStyles}
                        className="mt-2"
                        classNamePrefix="react-select"
                      />
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Event Date *</Label>
                      <Input
                        type="date"
                        min={getTodayDate()}
                        value={eventData.startDate}
                        onChange={handleStartDateChange}
                      />
                    </div>
                    <div>
                      <Label>Start Time</Label>
                      <Input
                        type="time"
                        value={eventData.startTime}
                        onChange={(e) =>
                          handleInputChange("startTime", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="flex items-center gap-2">
                              End Date
                            </Label>
                            <Input
                              type="date"
                              min={eventData.startDate || getTodayDate()}
                              value={eventData.endDate}
                              onChange={handleEndDateChange}
                            />
                          </div>
                          <div>
                            <Label className="flex items-center gap-2">
                              End Time
                            </Label>
                            <Input
                              type="time"
                              value={eventData.endTime}
                              onChange={handleEndTimeChange}
                            />
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        align="center"
                        className="max-w-sm text-sm text-black"
                      >
                        End date and time are optional. If not provided, the
                        event will be treated as an all-day single-day event.
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <div>
                    <Label>Location</Label>
                    <Input
                      value={eventData.location}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3>{eventData.title || "Event Name"}</h3>
                    <p>
                      {eventData.description || "Event description here..."}
                    </p>
                    <p>
                      Start: {eventData.startDate || "Not set"}{" "}
                      {eventData.startTime || ""}
                    </p>
                    <p>
                      End:{" "}
                      {eventData.endDate || eventData.startDate || "Not set"}{" "}
                      {eventData.endTime || ""}
                    </p>
                    <p>{eventData.location || "Location not set"}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {!eventData.endDate && !eventData.endTime
                        ? "This will be an all-day event"
                        : !eventData.endTime
                        ? "This will be an all-day event"
                        : "This is a timed event"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateEvent;
