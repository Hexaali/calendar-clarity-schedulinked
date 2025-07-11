// src/constants/getNavigationItems.js
import { Home, Calendar, Users } from "lucide-react";

export const getNavigationItems = (followers = []) => {
  return [
    {
      title: "Dashboard",
      icon: Home,
      href: "/dashboard",
    },
    {
      title: "My Events",
      icon: Calendar,
      href: "/dashboard/events",
    },
    ...(Array.isArray(followers) && followers.length > 0
      ? [
          {
            title: "Subscribers",
            icon: Users,
            href: "/dashboard/subscribers",
          },
        ]
      : []),
  ];
};
