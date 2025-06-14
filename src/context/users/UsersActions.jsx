import users from "../../api/users";

// Fetch users
export const getUsers = async () => {
  try {
    const response = await users.get("/api/v1/users");
    return response;
  } catch (error) {
    console.error("Failed to fetch users:", error.message);
    throw error;
  }
};

// Delete a user
export const deleteUser = async (id) => {
  if (!id) {
    throw new Error("User ID is required for deletion.");
  }

  try {
    const response = await users.delete(`/api/v1/users/${id}`);
    return response;
  } catch (error) {
    console.error(`Failed to delete user with ID ${id}:`, error.message);
    throw error;
  }
};

// Update a user
export const updateUser = async (id, updatedUser) => {
  if (!id) {
    throw new Error("User ID is required for updating.");
  }
  if (!updatedUser || typeof updatedUser !== "object") {
    throw new Error("Valid user data is required for updating.");
  }

  try {
    const response = await users.put(`/api/v1/users/${id}`, updatedUser);
    return response;
  } catch (error) {
    console.error(`Failed to update user with ID ${id}:`, error.message);
    throw error;
  }
};

// Create a user
export const createUser = async (newUser) => {
  if (!newUser || typeof newUser !== "object") {
    throw new Error("Valid user data is required for creating a new user.");
  }

  try {
    const response = await users.post("/api/v1/users", newUser);
    return response.data;
  } catch (error) {
    console.error("Failed to create user:", error.message);
    throw error;
  }
};
