import { useState, useEffect } from "react";
import { useAuth } from "../App";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Search,
  MapPin,
  Users,
  Clock,
  Shield,
  Bell,
  ArrowRight,
  Camera,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthenticated, logout } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Fetch all items from the API
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);

        const API_BASE_URL = import.meta.env.VITE_API_URL;
        // console.log("Final API_BASE_URL:", API_BASE_URL);

        const response = await axios.get(`${API_BASE_URL}/api/items`);
        setItems(response.data);
        setError("");
      } catch (err) {
        console.error("Error fetching items:", err);
        setError("Failed to load items. Please try again later.");
        // Fallback to static data if API fails
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const features = [
    {
      icon: MapPin,
      title: "Location-Based Search",
      description:
        "Find items based on where they were lost or found on campus",
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description:
        "Get notified when items matching your description are reported",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description:
        "Your personal information is protected with end-to-end encryption",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Help fellow students and staff find their lost belongings",
    },
  ];

  // Calculate stats from items data
  const stats = [
    {
      number: items.length.toString(),
      label: "Total Items",
      color: "text-blue-600",
    },
    {
      number: items.filter((item) => item.type === "FOUND").length.toString(),
      label: "Found Items",
      color: "text-green-600",
    },
    {
      number: items.filter((item) => item.type === "LOST").length.toString(),
      label: "Lost Items",
      color: "text-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        {/*the background transparency is comming from "bg-white/80". less value for opacity will result in a more transparent background */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-xl flex items-center justify-center">
                <Search className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Lost & Found
                </h1>
                <p className="text-xs text-muted-foreground">
                  Campus Community
                </p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                to="/search"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                Search Items
              </Link>
              <Link
                to="/report-lost"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                Report Lost
              </Link>
              <Link
                to="/report-found"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                Report Found
              </Link>
              <Link
                to="/my-items"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                My Items
              </Link>
            </nav>
            <div className="flex items-center space-x-3">
              {isAuthenticated ? (
                <Button size="sm" onClick={logout}>
                  Logout
                </Button>
              ) : (
                <>
                  <Link to="/signin">
                    <Button size="sm">Sign In</Button>
                  </Link>
                  <Link to="/signup">
                    <Button size="sm">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Lost Something?
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                We'll Help You To Find It
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Our campus community comes together to help reunite you with your
              lost belongings. Join thousands of students and staff in our lost
              & found network.
            </p>
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search for lost items (e.g., iPhone, wallet, keys...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-32 py-4 text-lg rounded-2xl border-2 border-blue-100 focus:border-blue-500 shadow-lg"
                />
                <Button
                  type="submit"
                  size="lg"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-xl"
                  disabled={!searchQuery.trim()}
                >
                  Search
                </Button>
              </div>
            </form>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="border-red-600 text-red-600 hover:bg-red-50 rounded-xl px-8"
              >
                <Link to="/report-lost">
                  <Tag className="w-5 h-5 mr-2" />
                  Report Lost Item
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="border-green-600 text-green-600 hover:bg-green-50 rounded-xl px-8"
              >
                <Link to="/report-found">
                  <Camera className="w-5 h-5 mr-2" />
                  Report Found Item
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-4xl font-bold ${stat.color} mb-2`}>
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Items */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Recent Items
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Check out the latest lost and found items reported by our
              community members.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading items...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{error}</p>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="rounded-xl"
              >
                Try Again
              </Button>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No items found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {items.slice(0, 10).map((item) => (
                <Link to={`/items/${item.id}`} key={item.id}>
                  <Card className="hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden hover:scale-[1.02] group cursor-pointer">
                    <div className="relative">
                      <img
                        src={item.imageUrl || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-48 object-cover group-hover:brightness-105 transition-all"
                        onError={(e) => {
                          e.target.src = "/placeholder.svg";
                        }}
                      />
                      <Badge
                        className={`absolute top-3 right-3 ${
                          item.type === "LOST"
                            ? "bg-red-100 text-red-700 group-hover:bg-red-200"
                            : "bg-green-100 text-green-700 group-hover:bg-green-200"
                        }`}
                      >
                        {item.type}
                      </Badge>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        <div className="flex items-center text-gray-500 mb-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          {item.location}
                        </div>
                        <div className="flex items-center text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          {new Date(item.date).toLocaleDateString()}
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0 flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {item.category}
                      </Badge>
                      <span className="text-blue-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                        View Details
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-gradient-to-r from-blue-500 to-green-500 text-white hover:opacity-90 px-6"
            >
              <Link to="/search" className="flex items-center">
                <Search className="w-6 h-10 mr-2" />
                View All Items
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We've built the most comprehensive and user-friendly lost & found
              system for our campus community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center p-6 rounded-2xl border-0 shadow-lg bg-white/80 backdrop-blur-sm"
              >
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h3 className="text-4xl font-bold mb-6">Ready to Get Started?</h3>
            <p className="text-xl mb-8 text-blue-100">
              Join our community today and help make our campus a better place
              for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="rounded-xl px-8 py-4 text-lg"
              >
                Create Account
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 rounded-xl px-8 py-4 text-lg"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                  <Search className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg">Lost & Found</span>
              </div>
              <p className="text-gray-400 text-sm">
                Helping our campus community reunite with their lost belongings.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link
                    to="/search"
                    className="hover:text-white transition-colors"
                  >
                    Search Items
                  </Link>
                </li>
                <li>
                  <Link
                    to="/report-lost"
                    className="hover:text-white transition-colors"
                  >
                    Report Lost
                  </Link>
                </li>
                <li>
                  <Link
                    to="/report-found"
                    className="hover:text-white transition-colors"
                  >
                    Report Found
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    My Account
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Guidelines
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 Lost & Found System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
