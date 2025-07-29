import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Send, Info } from "lucide-react";
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
    borderColor: state.isFocused ? "#000000FF" : "#e5e7eb",
    boxShadow: state.isFocused ? "0 0 0 2px rgba(0,0,0)" : "none",
    borderRadius: "0.5rem",
    minHeight: "2.75rem",
    fontSize: "0.875rem",
    transition: "all 0.2s ease",
    "&:hover": { borderColor: "#000000FF" },
  }),
  multiValue: (base: any) => ({
    ...base,
    backgroundColor: "#000000FF",
    borderRadius: "0.375rem",
    padding: "0 0.25rem",
  }),
  multiValueLabel: (base: any) => ({
    ...base,
    color: "#FFFFFFFF",
    fontWeight: 500,
  }),
  multiValueRemove: (base: any) => ({
    ...base,
    color: "#BDBDBDFF",
    ":hover": { backgroundColor: "#FFFFFFFF", color: "#064e3b" },
  }),
  menu: (base: any) => ({ ...base, borderRadius: "0.5rem", zIndex: 20 }),
};

const getTodayDate = (): string => new Date().toISOString().split("T")[0];

const formatDate = (dateStr: string) => {
  if (!dateStr) return "Not set";
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(dateStr).toLocaleDateString("en-US", options);
};

const formatTime = (timeStr: string) => {
  if (!timeStr) return "";
  const [hour, minute] = timeStr.split(":");
  const date = new Date();
  date.setHours(Number(hour), Number(minute));
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
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
  Url: string;
}

interface FollowerOption {
  value: string;
  label: string;
}

const CreateEvent = () => {
  const [sidebarOpen, _] = useState(true);
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
    Url: "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  const [followers, setFollowers] = useState<FollowerOption[]>([]);
  const [selectedFollowers, setSelectedFollowers] = useState<FollowerOption[]>(
    []
  );

  const userData = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (userData?.followers?.length) {
      setFollowers(
        userData.followers.map((f: any) => ({
          value: f.username,
          label: `${f.first_name} ${f.last_name}`.trim() || f.username,
        }))
      );
    }
  }, [userData]);

  const handleInputChange = (field: keyof EventData, value: string) =>
    setEventData((prev) => ({ ...prev, [field]: value }));

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.value;
    if (selected < getTodayDate()) {
      toast.error("Cannot create an event in past dates.");
      handleInputChange("startDate", "");
    } else {
      handleInputChange("startDate", selected);
      if (eventData.endDate && eventData.endDate < selected)
        handleInputChange("endDate", "");
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.value;
    if (selected && selected < eventData.startDate) {
      toast.error("End date cannot be before start date.");
      handleInputChange("endDate", "");
    } else handleInputChange("endDate", selected);
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.value;
    if (selected && eventData.startTime && selected < eventData.startTime) {
      toast.error("End time cannot be before start time.");
      handleInputChange("endTime", "");
    } else handleInputChange("endTime", selected);
  };

  const handleCreateEvent = async () => {
    const token = localStorage.getItem("token");
    if (!eventData.startDate)
      return toast.error("Please provide a start date.");

    const startDateTime = new Date(
      `${eventData.startDate}T${eventData.startTime || "12:00"}:00`
    );
    if (startDateTime < new Date())
      return toast.error("You cannot create an event in the past.");

    let endDateTime: Date | null = null;
    if (eventData.endDate) {
      endDateTime = new Date(
        `${eventData.endDate}T${eventData.endTime || "23:59"}:00`
      );
      if (endDateTime < startDateTime)
        return toast.error("End date/time cannot be before start.");
    } else if (eventData.endTime) {
      endDateTime = new Date(`${eventData.startDate}T${eventData.endTime}:00`);
    }

    const payload = {
      title: eventData.title,
      description: eventData.description,
      time: startDateTime.toISOString(),
      end_time: endDateTime?.toISOString() || null,
      location: eventData.location || "Online",
      external_url: eventData.Url || "",
      category: "EVENT",
      duration: "",
      business: userData?.id || 1,
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
    } catch (err: any) {
      toast.error(err.message || "Event creation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-gray-50/30 flex flex-col">
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white/80 px-4 sm:px-8 py-4 sm:py-6 sticky top-0 z-10 border-b border-gray-200/50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <Link to="/dashboard/events">
                <Button variant="ghost" size="sm" className="w-full sm:w-auto">
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back to Events
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Create Event</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Set up a new calendar marketing event.
                </p>
              </div>
            </div>
            <Button
              onClick={handleCreateEvent}
              disabled={loading}
              className="bg-brand-green text-white font-semibold shadow-md hover:bg-orange-600 w-full sm:w-auto"
            >
              <Send className="h-4 w-4 mr-2" />{" "}
              {loading ? "Creating..." : "Create"}
            </Button>
          </div>
        </header>

        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">Event Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>Event Name *</Label>
                    <Input
                      className="w-full"
                      value={eventData.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <Label>Description</Label>
                    <textarea
                      className="w-full min-h-[100px] px-3 py-2 border rounded-xl focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                      value={eventData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                    />
                  </div>

                  {followers.length > 0 && (
                    <div>
                      <Label>Tag Followers</Label>
                      <Select
                        isMulti
                        options={followers}
                        value={selectedFollowers}
                        onChange={(s) =>
                          setSelectedFollowers(s as FollowerOption[])
                        }
                        components={animatedComponents}
                        placeholder="Select followers..."
                        styles={customSelectStyles}
                        className="mt-2"
                      />
                    </div>
                  )}

                  <div>
                    <Label>URL</Label>
                    <Input
                      className="w-full"
                      value={eventData.Url}
                      onChange={(e) => handleInputChange("Url", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label>Event Date *</Label>
                      <Input
                        className="w-full"
                        type="date"
                        min={getTodayDate()}
                        value={eventData.startDate}
                        onChange={handleStartDateChange}
                      />
                    </div>
                    <div>
                      <Label>Start Time</Label>
                      <Input
                        className="w-full"
                        type="time"
                        value={eventData.startTime}
                        onChange={(e) =>
                          handleInputChange("startTime", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <TooltipProvider>
                    <div className="flex flex-col">
                      <div className="flex justify-end">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-5 w-5 text-red-600 cursor-pointer" />
                          </TooltipTrigger>
                          <TooltipContent className="text-sm max-w-xs">
                            If end date or end time is not set, the event will
                            be marked as an all-day event.
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="end-date">End Date</Label>
                          <Input
                            id="end-date"
                            type="date"
                            className="w-full"
                            min={eventData.startDate || getTodayDate()}
                            value={eventData.endDate}
                            onChange={handleEndDateChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="end-time">End Time</Label>
                          <Input
                            id="end-time"
                            type="time"
                            className="w-full"
                            value={eventData.endTime}
                            onChange={handleEndTimeChange}
                          />
                        </div>
                      </div>
                    </div>
                  </TooltipProvider>

                  <div>
                    <Label>Location</Label>
                    <Input
                      className="w-full"
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
              <Card className="border-0 shadow-lg w-max">
                <CardHeader className="flex items-center">
                  <CardTitle>Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                    <h3 className="font-semibold">
                      {eventData.title || "Event Name"}
                    </h3>
                    <p className="text-[14px]">
                      {eventData.description || "Event description here..."}
                    </p>
                    <p className="text-[14px]">
                      <strong>Start:</strong> {formatDate(eventData.startDate)}{" "}
                      {formatTime(eventData.startTime)}
                    </p>
                    <p className="text-[14px]">
                      <strong>End:</strong>{" "}
                      {formatDate(eventData.endDate || eventData.startDate)}{" "}
                      {formatTime(eventData.endTime)}
                    </p>
                    <p className="text-[14px]">
                      {eventData.location || "Location not set"}
                    </p>
                    <p className="text-[14px]">
                      {eventData.Url || "URL not set"}
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
