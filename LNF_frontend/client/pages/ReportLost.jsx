// React and library imports
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Tag, Camera, MapPin, Calendar } from "lucide-react"; // Icon components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Main component for the Report Lost Item page
export default function ReportLostPage() {
  // State for form fields
  const [form, setForm] = useState({
    title: "", // Item title
    description: "", // Item description
    category: "", // Item category
    location: "", // Where it was lost
    date: "", // Date lost
    type: "LOST", // Type: LOST or FOUND
    contactInfo: "", // Contact info
    imageFile: null, // Image file
  });
  // State for submit button loading
  const [submitting, setSubmitting] = useState(false);
  // State to show success message after submit
  const [success, setSuccess] = useState(false);
  // State for error messages
  const [error, setError] = useState("");

  // Handle input changes for all fields
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile") {
      setForm((prev) => ({ ...prev, imageFile: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (
      !form.title ||
      !form.description ||
      !form.category ||
      !form.location ||
      !form.date ||
      !form.type ||
      !form.contactInfo
    ) {
      setError("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);

    try {
      const userStr = localStorage.getItem("user");
      let user = null;
      try {
        user = userStr ? JSON.parse(userStr) : null;
      } catch (e) {
        user = null;
      }

      // Prepare FormData for multipart request
      const formData = new FormData();
      const itemRequest = {
        title: form.title,
        description: form.description,
        category: form.category,
        location: form.location,
        date: form.date,
        type: form.type,
        contactInfo: form.contactInfo,
        user: user
          ? {
              id: user.id || 19,
              username: user.username,
              email: user.email || "sam@example.com",
              contactInfo: form.contactInfo,
            }
          : {
              id: 19,
              username: "sam",
              email: "sam@example.com",
              contactInfo: form.contactInfo,
            },
      };
      formData.append(
        "request",
        new Blob([JSON.stringify(itemRequest)], { type: "application/json" }),
      );
      if (form.imageFile) {
        formData.append("imageFile", form.imageFile);
      }

      let config = { headers: { "Content-Type": "multipart/form-data" } };

      const API_BASE_URL =
        import.meta.env.VITE_API_URL || "http://localhost:8088";
      try {
        await axios.post(`${API_BASE_URL}/api/items`, formData, config);
        setSuccess(true);
      } catch (err) {
        throw err.response?.data?.message
          ? new Error(err.response.data.message)
          : err;
      }
    } catch (err) {
      setError(err.message || "Failed to submit lost item");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    // Main page background
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      {/* Header section with logo and title */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-red-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Logo icon */}
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex items-center justify-center">
                <Tag className="w-6 h-6 text-white" />
              </div>
              <div>
                {/* App title */}
                <h1 className="text-xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                  Lost & Found
                </h1>
                {/* Subtitle */}
                <p className="text-xs text-muted-foreground">
                  Report Lost Item
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main card with form or success message */}
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto rounded-2xl">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold text-gray-900 mb-4">
              Report a Lost Item
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Show success message if form submitted, else show form */}
            {success ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold mb-2 text-green-700">
                  Report Submitted!
                </h2>
                <p className="text-gray-600 mb-6">
                  Thank you for reporting your lost item. Our team and community
                  will help you find it as soon as possible.
                </p>
                {/* Button to return to homepage */}
                <Button asChild variant="outline">
                  <Link to="/">Return to Homepage</Link>
                </Button>
              </div>
            ) : (
              // Lost item report form
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Item Title field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Item Title <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="title"
                    placeholder="e.g., Black Wallet"
                    value={form.title}
                    onChange={handleChange}
                    className="rounded-xl"
                    required
                  />
                </div>

                {/* Category field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="rounded-xl w-full border-gray-300"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="ELECTRONICS">ELECTRONICS</option>
                    <option value="DOCUMENTS">DOCUMENTS</option>
                    <option value="ACCESSORIES">ACCESSORIES</option>
                    <option value="CLOTHING">CLOTHING</option>
                    <option value="KEYS">KEYS</option>
                    <option value="BOOKS">BOOKS</option>
                    <option value="OTHERS">OTHERS</option>
                  </select>
                </div>

                {/* Description field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    name="description"
                    placeholder="Provide detailed description of your lost item..."
                    value={form.description}
                    onChange={handleChange}
                    className="rounded-xl"
                    rows={4}
                    required
                  />
                </div>

                {/* Location, Date, and Type fields in a grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Location Lost field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location Lost <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        name="location"
                        placeholder="Central Library"
                        value={form.location}
                        onChange={handleChange}
                        className="pl-10 rounded-xl"
                        required
                      />
                    </div>
                  </div>

                  {/* Date Lost field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date Lost <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        name="date"
                        type="date"
                        value={form.date}
                        onChange={handleChange}
                        className="pl-10 rounded-xl"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Info field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Info <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="contactInfo"
                    placeholder="e.g., 0771234567"
                    value={form.contactInfo}
                    onChange={handleChange}
                    className="rounded-xl"
                    required
                  />
                </div>

                {/* Image Upload field (optional) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Image (Optional)
                  </label>
                  <Input
                    name="imageFile"
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    className="rounded-xl"
                  />
                </div>

                {/* Error message if validation fails */}
                {error && (
                  <div className="text-red-600 text-sm text-center">
                    {error}
                  </div>
                )}

                {/* Submit button */}
                <Button
                  className="w-full bg-red-600 hover:bg-red-700 rounded-xl py-3"
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Submit Lost Item Report"}
                </Button>

                {/* Return to Homepage button always visible */}
                <div className="text-center mt-4">
                  <Button asChild variant="outline">
                    <Link to="/">Return to Homepage</Link>
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
