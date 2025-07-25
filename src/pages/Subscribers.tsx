import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users } from "lucide-react";
import DashboardLayout from "@/components/layouts/DashboardLayout";

const Subscribers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [followers, setFollowers] = useState([]);

  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const fullName = userData?.full_name || "Unknown User";
  const username = userData?.username || "unknown@example.com";

  useEffect(() => {
    if (userData?.followers) {
      setFollowers(userData.followers);
    }
  }, []);

  const filteredFollowers = followers.filter((follower) => {
    const fullName = `${follower.first_name} ${follower.last_name}`.trim();
    return (
      fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      follower.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const renderFullName = (follower) => {
    const fullName = `${follower.first_name} ${follower.last_name}`.trim();
    return fullName !== "" ? fullName : follower.username;
  };

  const getInitials = (follower) => {
    const namePart = `${follower.first_name} ${follower.last_name}`.trim();
    return namePart
      ? namePart
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
      : follower.username[0].toUpperCase();
  };

  return (
    <DashboardLayout
      headerTitle="Subscribers"
      headerSubtitle="Manage your audience and subscriber segments." 
      headerAction="">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-black">
                  Total Subscribers
                </p>
                <p className="text-2xl font-bold">{followers.length}</p>
              </div>
              <Users className="h-8 w-8 text-brand-green" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-lg bg-white/50 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="text-xl font-semibold font-radion text-black">
            All Subscribers
          </CardTitle>
          <p className="text-muted-foreground mt-1">
            List of all your followers
          </p>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-100">
                <TableHead>Subscriber</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFollowers.map((follower, idx) => (
                <TableRow
                  key={idx}
                  className="hover:bg-gray-50/50 transition-colors border-gray-100"
                >
                  <TableCell className="font-medium py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="" />
                        <AvatarFallback>
                          {getInitials(follower)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{renderFullName(follower)}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 text-muted-foreground">
                    {follower.username}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Subscribers;
