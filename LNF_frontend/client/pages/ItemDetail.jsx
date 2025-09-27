import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  User,
  Phone,
  Mail,
  Tag,
  Clock,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        const API_BASE_URL =
          import.meta.env.VITE_API_URL || "http://localhost:8088";
        const response = await axios.get(`${API_BASE_URL}/api/items/${id}`);
        setItem(response.data);
        setError("");
      } catch (err) {
        console.error("Error fetching item:", err);
        setError("Failed to load item details. Please try again later.");
        setItem(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchItem();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading item details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="rounded-xl"
            >
              Try Again
            </Button>
            <div className="mt-4">
              <Button asChild variant="outline">
                <Link to="/">Return to Homepage</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Item not found.</p>
            <Button asChild variant="outline">
              <Link to="/">Return to Homepage</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-xl flex items-center justify-center">
                <Tag className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Lost & Found
                </h1>
                <p className="text-xs text-muted-foreground">Item Details</p>
              </div>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link to="/" className="flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-6">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <Link to="/" className="hover:text-blue-600">
                Home
              </Link>
              <span>/</span>
              <Link to="/search" className="hover:text-blue-600">
                All Items
              </Link>
              <span>/</span>
              <span className="text-gray-900">{item.title}</span>
            </nav>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Item Image */}
            <div>
              <Card className="rounded-2xl overflow-hidden">
                <div className="relative">
                  <img
                    src={item.imageUrl || "/LNF_image.jpg"}
                    alt={item.title}
                    className="w-full h-96 object-cover"
                    onError={(e) => {
                      e.target.src = "/LNF_image.jpg";
                    }}
                  />
                  <Badge
                    className={`absolute top-4 right-4 ${
                      item.type === "LOST"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {item.type}
                  </Badge>
                </div>
              </Card>
            </div>

            {/* Item Details */}
            <div className="space-y-6">
              {/* Title and Category */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {item.title}
                </h1>
                <Badge variant="outline" className="text-sm">
                  {item.category}
                </Badge>
              </div>

              {/* Description */}
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg">Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>

              {/* Location and Date */}
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg">Location & Date</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-900">Location</p>
                      <p className="text-gray-600">{item.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-900">Date</p>
                      <p className="text-gray-600">
                        {new Date(item.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {item.user && (
                    <>
                      <div className="flex items-center space-x-3">
                        <User className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-medium text-gray-900">
                            Reported by
                          </p>
                          <p className="text-gray-600">{item.user.username}</p>
                        </div>
                      </div>
                      {item.user.email && (
                        <div className="flex items-center space-x-3">
                          <Mail className="w-5 h-5 text-gray-500" />
                          <div>
                            <p className="font-medium text-gray-900">Email</p>
                            <p className="text-gray-600">{item.user.email}</p>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-900">
                        Contact Number
                      </p>
                      <p className="text-gray-600">{item.contactInfo}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-700 rounded-xl py-3 flex items-center justify-center"
                  onClick={() => {
                    // Copy contact info to clipboard
                    navigator.clipboard.writeText(item.contactInfo);
                    alert("Contact information copied to clipboard!");
                  }}
                >
                  Copy Contact Info
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 rounded-xl py-3 flex items-center justify-center"
                  onClick={() => {
                    // Share functionality
                    if (navigator.share) {
                      navigator.share({
                        title: `${item.title} - ${item.type}`,
                        text: `Check out this ${item.type.toLowerCase()} item: ${item.title}`,
                        url: window.location.href,
                      });
                    } else {
                      // Fallback: copy URL to clipboard
                      navigator.clipboard.writeText(window.location.href);
                      alert("Link copied to clipboard!");
                    }
                  }}
                >
                  Share Item
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
