// Simple test to check API connectivity
const API_BASE_URL = "http://localhost:8080";

console.log("Testing API connectivity to:", API_BASE_URL);

fetch(`${API_BASE_URL}/api/items`)
  .then((response) => {
    console.log("Response status:", response.status);
    console.log("Response ok:", response.ok);
    return response.json();
  })
  .then((data) => {
    console.log("API Response:", data);
    console.log("Number of items:", data.length);
  })
  .catch((error) => {
    console.error("API Error:", error);
  });
