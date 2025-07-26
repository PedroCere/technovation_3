const API_BASE_URL = "http://localhost:8081/api/auth";

export async function login(loginData) {
  console.log('Login called with:', loginData);
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }
  const data = await response.json();
  console.log('Login response data:', data);
  // No token storage since JWT auth is disabled
  return data;
}

export async function register(registerData) {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(registerData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Registration failed");
  }
  return await response.json();
}

// Helper to get auth token
export function getAuthToken() {
  // No token since JWT auth is disabled
  return null;
}
