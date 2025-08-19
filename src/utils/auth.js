import API_URL from "./constants";
// console.log("API_URL", API_URL);

export const registerAction = async (data) => {
  const { name, email, password, role, url } = data;
  // console.log("name", name);
  // console.log("email", email);
  // console.log("password", password);
  // console.log("role", role);
  // console.log("url", url);
  try {
    const response = await fetch(`${API_URL}/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Asegrate de que la capitalización de 'Content-Type' sea aceptada por tu servidor
      },
      body: JSON.stringify({ name, email, password, role, url }),
    });

    const res = await response.json();
    // console.log("Registration response:", res);

    if (!response.ok) {
      // Return the error response instead of throwing, so the component can handle it properly
      return res;
    }

    return res;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error; // Rethrow the error so it can be caught by the caller
  }
};

//login and get token
export const authorize = (email, password) => {
  return fetch(`${API_URL}/users/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};

export const refreshToken = () => {
  return fetch(`${API_URL}/medicos/refreshToken`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};

export const authorizeMedico = (username, password) => {
  const response = fetch(`${API_URL}/medicos/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  return response;
};

// comprueba el token la validez del token
export const checkToken = async (token) => {
  // console.log(token);
  if (!token) {
    return { status: "error", message: "No token provided" };
  }

  try {
    const response = await fetch(`${API_URL}/users/verifyToken`, {
      method: "GET", // GET es común para verificar tokens
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Asegúrate de que la capitalización de 'Authorization' sea aceptada por tu servidor
      },
    });

    if (!response.ok) {
      // Handle different HTTP status codes
      if (response.status === 401) {
        return { status: "error", message: "Token expired or invalid" };
      } else if (response.status === 404) {
        return {
          status: "error",
          message: "Endpoint not found - backend may not have /users/me route",
        };
      } else if (response.status === 500) {
        return {
          status: "error",
          message: "Server error - check backend logs",
        };
      } else {
        return { status: "error", message: `HTTP error: ${response.status}` };
      }
    }

    const data = await response.json();
    return data; // Retorna la respuesta del servidor
  } catch (error) {
    console.error("Token verification error:", error);

    // Handle network errors vs other errors
    if (error.message.includes("fetch")) {
      return {
        status: "error",
        message: "Network error - unable to reach server",
      };
    }

    return { status: "error", message: "Token verification failed" };
  }
};

// Forgot password
export const forgotPassword = async (email) => {
  try {
    const response = await fetch(`${API_URL}/users/forgot-password`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    return await response.json();
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    throw error;
  }
};

// Reset password
export const resetPassword = async (token, newPassword) => {
  try {
    const response = await fetch(`${API_URL}/users/reset-password`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, newPassword }),
    });

    return await response.json();
  } catch (error) {
    console.error("Error in resetPassword:", error);
    throw error;
  }
};

// Get current user
export const getCurrentUser = async (token) => {
  try {
    const response = await fetch(`${API_URL}/users/verifyToken`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    throw error;
  }
};
