import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Search,
  Filter,
  MapPin,
  Calendar,
  ArrowRight,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import axios from "axios";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");

  // Fetch all items from the API

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const API_BASE_URL =
          import.meta.env.VITE_API_URL || "http://localhost:8080";
        console.log("Search API_BASE_URL:", API_BASE_URL);
        console.log("Search making request to:", `${API_BASE_URL}/api/items`);
        const response = await axios.get(`${API_BASE_URL}/api/items`);
        setItems(response.data);
        setError("");
      } catch (err) {
        console.error("Error fetching items:", err);
        setError("Failed to load items. Please try again later.");
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Handle search query changes
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      setSearchParams({ q: query });
    } else {
      setSearchParams({});
    }
  };

  // Filter items based on search criteria
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory || item.category === selectedCategory;
    const matchesType = !selectedType || item.type === selectedType;

    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100">
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
                <p className="text-xs text-muted-foreground">Search Items</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Search Header */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Search All Items
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Search through all lost and found items with advanced filters
            </p>
          </div>

          {/* Search and Filter Interface */}
          <Card className="mb-8 rounded-2xl">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search for items by title, description, or location..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="pl-12 py-4 text-lg rounded-xl"
                  />
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category Filter
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full rounded-xl border-gray-300"
                    >
                      <option value="">All Categories</option>
                      <option value="ELECTRONICS">ELECTRONICS</option>
                      <option value="DOCUMENTS">DOCUMENTS</option>
                      <option value="ACCESSORIES">ACCESSORIES</option>
                      <option value="CLOTHING">CLOTHING</option>
                      <option value="KEYS">KEYS</option>
                      <option value="BOOKS">BOOKS</option>
                      <option value="OTHERS">OTHERS</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type Filter
                    </label>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full rounded-xl border-gray-300"
                    >
                      <option value="">All Types</option>
                      <option value="LOST">LOST</option>
                      <option value="FOUND">FOUND</option>
                    </select>
                  </div>
                </div>

                {/* Results Count */}
                <div className="text-sm text-gray-600">
                  Showing {filteredItems.length} of {items.length} items
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Items Display */}
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
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">
                {searchQuery || selectedCategory || selectedType
                  ? "No items match your search criteria."
                  : "No items found."}
              </p>
              {(searchQuery || selectedCategory || selectedType) && (
                <Button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("");
                    setSelectedType("");
                  }}
                  variant="outline"
                  className="rounded-xl"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <Link to={`/items/${item.id}`} key={item.id}>
                  <Card className="hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden hover:scale-[1.02] group cursor-pointer">
                    <div className="relative">
                      <img
                        src={item.imageUrl || "/LNF_image.jpg"}
                        alt={item.title}
                        className="w-full h-53 object-cover group-hover:brightness-105 transition-all"
                        onError={(e) => {
                          e.target.src = "/LNF_image.jpg";
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

          {/* Return to Homepage */}
          <div className="text-center mt-8">
            <Button asChild variant="outline" className="rounded-xl">
              <Link to="/">Return to Homepage</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
