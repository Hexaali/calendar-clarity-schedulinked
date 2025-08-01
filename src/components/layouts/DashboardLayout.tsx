import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getNavigationItems } from "@/components/shared/Navigation";
import LogoutButton from "@/components/shared/LogoutButton";

const DashboardLayout = ({
  children,
  headerTitle,
  headerSubtitle,
  headerAction,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const userData = JSON.parse(localStorage.getItem("user"));
  const fullName = userData?.full_name || "Unknown User";
  const username = userData?.username || "unknown@example.com";
  const followers = userData?.followers ?? [];

  const getInitials = (name) =>
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const initials = getInitials(fullName);
  const navigationItems = getNavigationItems(followers);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-gray-50/30 flex flex-col md:flex-row relative">
      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center justify-between p-4 border-b bg-white sticky top-0 z-30">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        >
          <Menu className="h-6 w-6" />
        </Button>
        <div className="flex items-center gap-2">
          <div className="block md:hidden">{headerAction}</div>
          <div className="block md:hidden">
            <LogoutButton />
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed md:hidden z-40 inset-y-0 left-0 bg-white border-r shadow-lg transition-transform duration-300
          ${
            mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } w-20 flex flex-col`}
      >
        <div className="p-4 border-b flex justify-center">
          <Avatar className="h-10 w-10">
            <AvatarImage src="" alt={fullName} />
            <AvatarFallback className="bg-brand-green text-white font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>
        <nav className="flex-1 px-2 py-4">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.title}
                to={item.href}
                className={`flex justify-center items-center px-3 py-3 rounded-xl mb-2
                  ${
                    isActive
                      ? "bg-gray-100 text-black font-medium"
                      : "text-black hover:bg-gray-50"
                  }`}
              >
                <item.icon className="h-5 w-5" />
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex ${
          sidebarOpen ? "w-72" : "w-20"
        } bg-white border-r shadow-lg transition-all duration-300 flex-col`}
      >
        <div className="p-6 border-b">
          <div className="flex items-center gap-3 mt-5">
            <Avatar className="h-10 w-10">
              <AvatarImage src="" alt={fullName} />
              <AvatarFallback className="bg-brand-green text-white font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            {sidebarOpen && (
              <div className="flex-1">
                <p className="font-semibold truncate">{fullName}</p>
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
                  sidebarOpen ? "rotate-180" : ""
                }`}
              />
            </Button>
          </div>
        </div>
        <nav className="flex-1 px-4 py-6">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.title}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-2 ${
                  isActive
                    ? "bg-gray-100 text-black font-medium"
                    : "text-black hover:bg-gray-50"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {sidebarOpen && <span className="text-sm">{item.title}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white/80 backdrop-blur-sm border-b px-4 sm:px-8 py-4 sm:py-6 sticky top-0 z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-black">
              {headerTitle}
            </h1>
            <p className="text-sm sm:text-base text-brand-grey mt-1">
              {headerSubtitle}
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 sm:gap-4">
            {headerAction}
            <LogoutButton />
          </div>
        </header>

        <div className="p-4 sm:p-8">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
