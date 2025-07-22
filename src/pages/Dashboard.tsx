// src/pages/Dashboard.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Users, Calendar } from "lucide-react";
import { toast } from "react-hot-toast";

import { API_BASE_URL } from "@/components/shared/Constants";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { getNavigationItems } from "@/components/shared/Navigation";
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
      status: status,
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
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "Ongoing":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "Passed":
        return "bg-red-400 text-gray-100 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-600 hover:bg-gray-200";
    }
  };

  return (
    <DashboardLayout
      headerTitle="Dashboard"
      headerSubtitle="Welcome back! Here's what's happening with your events."
      headerAction={
        <Link to="/dashboard/create-event">
          <Button className="bg-brand-green text-white hover:bg-brand-green font-semibold shadow-md">
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
            <Card
              key={metric.title}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50/50"
            >
              <CardContent className="p-6 flex flex-row items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-black">{metric.title}</p>
                  <p className={`text-3xl font-bold ${metric.color}`}>{metric.value}</p>
                </div>
                <div className="p-2 rounded-lg">
                  <IconComponent className="h-10 w-10 text-brand-green" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border-0 shadow-lg bg-white/50 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="text-xl font-semibold">Recent Events</CardTitle>
          <p className="text-muted-foreground mt-1">Manage your events</p>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <p className="p-4">Loading events...</p>
          ) : error ? (
            <p className="p-4 text-red-500">{error}</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-gray-100">
                  <TableHead>Event</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {processedEvents.map((event) => (
                  <TableRow
                    key={event.id}
                    className="hover:bg-gray-50/50 transition-colors border-gray-100"
                  >
                    <TableCell className="font-medium py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-8 rounded-full ${
                            event.status === "Upcoming"
                              ? "bg-green-500"
                              : event.status === "Ongoing"
                              ? "bg-yellow-500"
                              : "bg-gray-500"
                          }`}
                        />
                        {event.name}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge className={`transition-colors ${getStatusColor(event.status)}`}>
                        {event.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4">{event.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Dashboard;
