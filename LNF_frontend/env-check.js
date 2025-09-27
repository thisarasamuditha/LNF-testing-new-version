// Environment Variables Check Script
console.log("🔍 Checking Environment Variables...\n");

// Check if running in development or production
const isDev = import.meta.env.DEV;
const isProd = import.meta.env.PROD;

console.log(`Environment: ${isDev ? "Development" : "Production"}`);
console.log(`Mode: ${import.meta.env.MODE}\n`);

// Check API URL
const apiUrl = import.meta.env.VITE_API_URL;
console.log(`VITE_API_URL: ${apiUrl || "NOT SET"}`);

if (!apiUrl) {
  console.error("❌ VITE_API_URL is not set!");
  console.log("Add this to your .env file:");
  console.log("VITE_API_URL=https://lostfound-production-ef57.up.railway.app");
} else {
  console.log("✅ API URL is configured");
}

// Check other environment variables
const builderKey = import.meta.env.VITE_PUBLIC_BUILDER_KEY;
console.log(`VITE_PUBLIC_BUILDER_KEY: ${builderKey || "NOT SET"}`);

// Test API connection
if (apiUrl) {
  console.log("\n🌐 Testing API connection...");
  fetch(`${apiUrl}/api/items`)
    .then((response) => {
      if (response.ok) {
        console.log("✅ API connection successful!");
        return response.json();
      } else {
        console.error(`❌ API responded with status: ${response.status}`);
      }
    })
    .then((data) => {
      if (data) {
        console.log(`📊 Found ${data.length} items in database`);
      }
    })
    .catch((error) => {
      console.error("❌ API connection failed:", error.message);
      console.log("Check if your Railway backend is running");
    });
}

console.log("\n📚 For deployment help, see VERCEL_DEPLOYMENT.md");

export default {};
