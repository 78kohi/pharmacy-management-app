const BASE_URL = "http://localhost:5000/api";

// Medicine APIs
export const medicineApi = {
  getAllMedicines: async () => {
    const response = await fetch(`${BASE_URL}/medicines`);
    return response.json();
  },

  addMedicine: async (medicineData) => {
    const response = await fetch(`${BASE_URL}/medicines`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(medicineData),
    });
    return response.json();
  },

  updateMedicine: async (_id, medicineData) => {
    const response = await fetch(`${BASE_URL}/medicines`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        id: _id,
        ...medicineData
      }),
    });
    return response.json();
  },

  deleteMedicine: async (_id) => {
    const response = await fetch(`${BASE_URL}/medicines`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ id: _id }),
    });
    return response.json();
  }
};

// Auth APIs
export const authApi = {
  login: async (credentials) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    return response.json();
  },
  register: async (userData) => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    return response.json();
  }
};
