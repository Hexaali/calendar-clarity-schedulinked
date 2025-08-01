import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Calendar } from "lucide-react";
import { toast } from "react-hot-toast";
import { API_BASE_URL } from "@/components/shared/Constants";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Event {
  id: number;
  title: string;
  time: string;
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found. Please log in again.");

      const res = await fetch(`${API_BASE_URL}/api/v1/event`, {
        headers: { Authorization: `Token ${token}` },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Failed to fetch events");
      }

      const data = await res.json();
      setEvents(data);
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const processedEvents = events.map((event) => {
    const eventDate = new Date(event.time);
    const now = new Date();
    const isSameDay = eventDate.toDateString() === now.toDateString();
    let status = "Upcoming";
    if (isSameDay) status = "Ongoing";
    else if (eventDate < now) status = "Passed";
    return {
      id: event.id,
      title: event.title,
      status,
      date: eventDate.toLocaleDateString(),
      time: eventDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  });

  const filteredEvents = processedEvents.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalEvents = processedEvents.length;
  const ongoingEvents = processedEvents.filter((e) => e.status === "Ongoing").length;
  const upcomingEvents = processedEvents.filter((e) => e.status === "Upcoming").length;
  const passedEvents = processedEvents.filter((e) => e.status === "Passed").length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Upcoming":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "Ongoing":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "Passed":
        return "bg-red-300 text-gray-100 hover:bg-red-300";
      default:
        return "bg-gray-100 text-gray-600 hover:bg-gray-200";
    }
  };

  return (
    <DashboardLayout
      headerTitle="My Events"
      headerSubtitle="Manage your calendar marketing campaigns and events."
      headerAction={
        <Link to="/dashboard/create-event">
          <Button className="bg-brand-green hover:bg-brand-green text-white font-semibold shadow-md text-sm sm:text-base">
            <Plus className="h-4 w-4 mr-2" />
            Create Event
          </Button>
        </Link>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Total Events", value: totalEvents },
          { label: "Ongoing Events", value: ongoingEvents },
          { label: "Upcoming", value: upcomingEvents },
          { label: "Passed", value: passedEvents },
        ].map((stat, i) => (
          <Card key={i} className="shadow-lg">
            <CardContent className="p-4 sm:p-6 flex items-center justify-between">
              <div>
                <p className="text-sm sm:text-base text-black">{stat.label}</p>
                <p className="text-xl sm:text-2xl text-black font-bold">{stat.value}</p>
              </div>
              <Calendar className="h-6 sm:h-8 w-6 sm:w-8 text-brand-green" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-lg bg-white/50 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="text-lg sm:text-xl font-semibold">All Events</CardTitle>
          <p className="text-muted-foreground mt-1 text-xs sm:text-sm">
            Search and manage your events
          </p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-4">
            <input
              type="text"
              placeholder="Search events"
              className="w-full max-w-md border border-gray-200 rounded px-3 py-2 text-sm sm:text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {loading ? (
            <p className="p-4 text-sm">Loading events...</p>
          ) : error ? (
            <p className="p-4 text-sm text-red-500">{error}</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-black sm:text-base font-bold">Event</TableHead>
                    <TableHead className="text-black sm:text-base font-bold">Status</TableHead>
                    <TableHead className="text-black sm:text-base font-bold">
                      Date & Time
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEvents.map((event) => (
                    <TableRow key={event.id} className="hover:bg-gray-50/50">
                      <TableCell className="py-2 sm:py-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div
                            className={`w-2 sm:w-3 h-6 sm:h-8 rounded-full ${
                              event.status === "Upcoming"
                                ? "bg-green-200"
                                : event.status === "Ongoing"
                                ? "bg-yellow-200"
                                : "bg-red-200"
                            }`}
                          />
                          <span className="text-sm sm:text-base">{event.title}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-2 sm:py-4">
                        <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
                      </TableCell>
                      <TableCell className="py-2 sm:py-4">
                        <div className="flex flex-col sm:flex-row sm:gap-2">
                          <span className="text-sm sm:text-base">{event.date}</span>
                          <span className="text-xs sm:text-sm text-muted-foreground">
                            {event.time}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Events;
