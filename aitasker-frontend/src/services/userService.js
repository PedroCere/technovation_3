const API_BASE_URL = "http://localhost:8081/api/user";

export async function getUserProfile() {
  const response = await fetch(`${API_BASE_URL}/profile`);
  if (!response.ok) throw new Error("Failed to fetch user profile");
  return await response.json();
}

export async function updateUserProfile(profileData) {
  const response = await fetch(`${API_BASE_URL}/profile`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profileData),
  });
  if (!response.ok) throw new Error("Failed to update user profile");
  return await response.json();
}

export async function uploadUserPhoto(photoFile) {
  const formData = new FormData();
  formData.append("photo", photoFile);
  const response = await fetch(`${API_BASE_URL}/upload-photo`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) throw new Error("Failed to upload photo");
  return await response.json();
}

export async function getUserPreferences() {
  const response = await fetch(`${API_BASE_URL}/preferences`);
  if (!response.ok) throw new Error("Failed to fetch user preferences");
  return await response.json();
}

export async function updateUserPreferences(preferencesData) {
  const response = await fetch(`${API_BASE_URL}/preferences`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(preferencesData),
  });
  if (!response.ok) throw new Error("Failed to update user preferences");
  return await response.json();
}

export async function getUserStats() {
  const response = await fetch(`${API_BASE_URL}/stats`);
  if (!response.ok) throw new Error("Failed to fetch user stats");
  return await response.json();
}
