import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Users, Calendar } from "lucide-react";
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

const Dashboard = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const followers = userData?.followers || [];

  const upcomingEventsCount = events.filter(
    (event) => new Date(event.time) > new Date()
  ).length;

  const processedEvents = events.map((event) => {
    const eventDate = new Date(event.time);
    const today = new Date();
    const isSameDay = eventDate.toDateString() === today.toDateString();

    let status = "";
    if (eventDate < today && !isSameDay) {
      status = "Passed";
    } else if (isSameDay) {
      status = "Ongoing";
    } else {
      status = "Upcoming";
    }

    return {
      id: event.id,
      name: event.title,
      date: eventDate.toLocaleDateString(),
      status,
    };
  });

  const metrics = [
    {
      title: "Total Subscribers",
      value: followers.length.toString(),
      color: "text-foreground",
      icon: Users,
    },
    {
      title: "Upcoming Events",
      value: upcomingEventsCount.toString(),
      color: "text-foreground",
      icon: Calendar,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Upcoming":
        return "bg-green-200 text-green-600 hover:bg-green-300";
      case "Ongoing":
        return "bg-yellow-300 text-yellow-800 hover:bg-yellow-300";
      case "Passed":
        return "bg-red-300 text-gray-100 hover:bg-red-300";
      default:
        return "bg-gray-200 text-gray-600 hover:bg-gray-300";
    }
  };

  return (
    <DashboardLayout
      headerTitle="Dashboard"
      headerSubtitle="Welcome back! Here's what's happening with your events."
      headerAction={
        <Link to="/dashboard/create-event">
          <Button className="bg-brand-green text-white hover:bg-brand-green font-semibold shadow-md text-sm sm:text-base">
            <Plus className="h-4 w-4 mr-2" />
            Create Event
          </Button>
        </Link>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric) => {
          const IconComponent = metric.icon;
          return (
            <Card key={metric.title} className="shadow-lg bg-gradient-to-br from-white to-gray-50/50">
              <CardContent className="p-4 sm:p-6 flex flex-row items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-black">{metric.title}</p>
                  <p className={`text-xl sm:text-2xl md:text-3xl font-bold ${metric.color}`}>
                    {metric.value}
                  </p>
                </div>
                <div className="p-2 rounded-lg">
                  <IconComponent className="h-8 sm:h-10 w-8 sm:w-10 text-brand-green" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="shadow-lg bg-white/50 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="text-lg sm:text-xl md:text-2xl font-semibold">
            Recent Events
          </CardTitle>
          <p className="text-muted-foreground mt-1 text-xs sm:text-sm">
            Manage your events
          </p>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <p className="p-4 text-sm">Loading events...</p>
          ) : error ? (
            <p className="p-4 text-sm text-red-500">{error}</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-100">
                    <TableHead className="text-sm text-black sm:text-base">Event</TableHead>
                    <TableHead className="text-sm text-black sm:text-base">Status</TableHead>
                    <TableHead className="text-sm text-black sm:text-base">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {processedEvents.map((event) => (
                    <TableRow key={event.id} className="hover:bg-gray-50/50 transition-colors">
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
                          <span className="text-sm sm:text-base">{event.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-2 sm:py-4">
                        <Badge className={getStatusColor(event.status)}>
                          {event.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-2 sm:py-4">
                        <span className="text-sm sm:text-base">{event.date}</span>
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

export default Dashboard;
