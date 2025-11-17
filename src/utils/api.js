import API_URL from "./constants";

export async function signinUser(email, password) {
  const response = await fetch(`${API_URL}/users/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
}

export async function createUser(data) {
  // console.log("Data:", data);
  // console.log("API_URL:", API_URL);
  const response = await fetch(`${API_URL}/users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function updateUserStatus(userId, status, token) {
  // console.log("userId", userId);
  // console.log("status", status);
  // console.log("token", token);
  const response = await fetch(`${API_URL}/users/${userId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, status }),
  });
  return response.json();
}

export async function hasAdmin() {
  try {
    // console.log("Making request to:", `${API_URL}/users/check-admin`);
    const response = await fetch(`${API_URL}/users/check-admin`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // console.log("Response status:", response.status);
    // console.log("Response ok:", response.ok);

    if (!response.ok) {
      // console.log("check-admin endpoint failed, trying alternative method");
      // If the check-admin endpoint fails, try to get all users and check for admin
      return await checkAdminFromUsers();
    }

    const data = await response.json();
    // console.log("hasAdmin response data:", data);

    // Backend returns: { status: 'success', hasAdmin: boolean }
    if (data.status === "success" && data.hasAdmin !== undefined) {
      return { hasAdmin: data.hasAdmin };
    } else {
      // Fallback to alternative method if response structure is unexpected
      console.log("Unexpected response structure, trying alternative method");
      return await checkAdminFromUsers();
    }
  } catch (error) {
    console.error("Error al obtener el usuario por rol:", error);
    console.log("Trying alternative method due to error");
    // Fallback to checking users endpoint
    try {
      return await checkAdminFromUsers();
    } catch (fallbackError) {
      console.error("Fallback method also failed:", fallbackError);
      throw error;
    }
  }
}

// Alternative method to check for admin by getting all users
export async function checkAdminFromUsers() {
  try {
    console.log("Checking for admin using users endpoint");
    const usersResponse = await fetch(`${API_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!usersResponse.ok) {
      throw new Error(`HTTP error! status: ${usersResponse.status}`);
    }

    const response = await usersResponse.json();
    console.log("Users response:", response);

    // Backend returns: { status: 'success', message: 'Users found', users: [...] }
    const users = response.users || response;

    // Check if any user has admin role
    const hasAdminUser = Array.isArray(users)
      ? users.some((user) => user.role === "admin")
      : false;
    console.log("Has admin user:", hasAdminUser);

    return { hasAdmin: hasAdminUser };
  } catch (error) {
    console.error("Error checking admin from users:", error);
    throw error;
  }
}

export async function getUsers() {
  try {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // Backend returns: { status: 'success', message: 'Users found', users: [...] }
    return data.users || data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function getUserById(id) {
  try {
    const response = await fetch(`${API_URL}/users/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

export async function updateUser({ data, token }) {
  // console.log("data:", data);
  // console.log("token:", token);
  try {
    // console.log("Making update request with:", { data, token });

    const response = await fetch(`${API_URL}/users/update`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    // console.log("Update response:", responseData);

    if (!response.ok) {
      return {
        status: "error",
        message: responseData.message || "Error al actualizar el usuario",
      };
    }

    return responseData;
  } catch (error) {
    console.error("Error in updateUser:", error);
    return {
      status: "error",
      message: "Error de conexión al actualizar el usuario",
    };
  }
}

export async function deleteUser({ userId, token }) {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      return {
        status: "error",
        message: responseData.message || "Error al eliminar el usuario",
      };
    }

    return responseData;
  } catch (error) {
    console.error("Error in deleteUser:", error);
    return {
      status: "error",
      message: "Error de conexión al eliminar el usuario",
    };
  }
}

function getPublicIdFromUrl(url) {
  try {
    // La URL de Cloudinary tiene este formato:
    // https://res.cloudinary.com/[cloud_name]/image/upload/v[version]/avatars/[hash].[extension]
    const urlParts = url.split("/");
    // Obtener los últimos dos segmentos (carpeta/hash)
    const filename = urlParts[urlParts.length - 1];
    const folder = urlParts[urlParts.length - 2];

    // Remover la extensión del archivo
    const hash = filename.split(".")[0];

    // Retornar el public_id completo incluyendo la carpeta
    return `${folder}/${hash}`;
  } catch (error) {
    console.error("Error al extraer public_id:", error);
    return null;
  }
}

export async function deleteImage(imageUrl) {
  console.log("imageUrl:", imageUrl);

  try {
    const publicId = getPublicIdFromUrl(imageUrl);

    console.log("publicId:", publicId);

    if (!publicId) {
      throw new Error("No se pudo obtener el ID de la imagen");
    }

    const response = await fetch(`${API_URL}/users/me/image/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ public_id: publicId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al eliminar la imagen");
    }

    return await response.json();
  } catch (error) {
    console.error("Error al eliminar la imagen:", error);
    throw error;
  }
}

export async function getMedicos() {
  try {
    // Check if API_URL is defined
    if (!API_URL) {
      console.error("API_URL is not defined!");
      throw new Error("API_URL is not defined");
    }

    // console.log("API_URL value:", API_URL);
    // console.log("Making request to:", `${API_URL}/medicos`);
    // console.log("Current window.location:", window.location.href);
    // console.log("Current window.location.hostname:", window.location.hostname);

    // Create an AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(`${API_URL}/medicos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include", // Include cookies if needed
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // console.log("Response status:", response.status);
    // console.log("Response headers:", Object.fromEntries(response.headers));

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // console.log("Medicos data received:", data);
    return data;
  } catch (error) {
    console.error("Error en getMedicos:", error);
    console.error("Error details:", {
      message: error.message,
      name: error.name,
      stack: error.stack,
    });

    // Handle different types of errors
    if (error.name === "AbortError") {
      console.error("Request timed out after 10 seconds");
    } else if (
      error.name === "TypeError" &&
      error.message.includes("Failed to fetch")
    ) {
      console.error(
        "Network error detected. Check if the backend server is running and accessible."
      );
    }

    throw error; // re-lanzamos el error para que el componente lo maneje
  }
}

export async function getMedico(id) {
  const response = await fetch(`${API_URL}/medicos/${id}`);
  return response.json();
}

export async function createMedico(data) {
  const response = await fetch(`${API_URL}/medicos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function editMedico(id, data) {
  const response = await fetch(`${API_URL}/medicos/${id}/edit`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    const responseData = await response.json();
    return {
      success: true,
      medico: responseData.medico,
    };
  } else {
    const errorData = await response.json();
    return {
      success: false,
      error: errorData.message,
      status: errorData.status,
    };
  }
}

export async function destroyMedico(id) {
  const response = await fetch(`${API_URL}/medicos/${id}`, {
    method: "DELETE",
  });
  return response.json();
}

export async function medicosWhitelist() {
  const response = await fetch(`${API_URL}/medicos/whitelist`);
  return response.json();
}

export async function loader() {
  const medicos = await getMedicos();
  return medicos;
}

export async function getMedicoById({ params }) {
  const medico = await getMedico(params.id);
  if (!medico) {
    return {
      status: 404,
      statusText: "Medico no encontrado",
    };
  }
  return { medico };
}

export async function contact(email, subject, message) {
  const response = await fetch(`${API_URL}/api/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, subject, message }),
  });

  return response.json();
}

export async function sugerenciasPacientes(data) {
  try {
    const requestUrl = `${API_URL}/api/sugerencias/pacientes`;
    // console.log("API_URL:", API_URL);
    // console.log("Request URL:", requestUrl);
    // console.log("Request data:", data);

    const response = await fetch(requestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    // console.log("Response status:", response.status);
    // console.log("Response headers:", Object.fromEntries(response.headers));

    let responseData;
    try {
      // Intentamos parsear la respuesta como JSON
      responseData = await response.json();
    } catch (parseError) {
      // Si no es JSON o está vacía, creamos un objeto con mensaje genérico
      responseData = {
        error: "ERROR_RESPONSE",
        message:
          response.status === 429
            ? "Por favor, espere antes de enviar otra sugerencia."
            : "Error en la respuesta del servidor",
      };
    }

    // Si la respuesta no es ok, lanzamos un error con los datos del servidor
    if (!response.ok) {
      const error = new Error();
      error.response = {
        status: response.status,
        data: responseData,
      };
      throw error;
    }

    return responseData;
  } catch (error) {
    console.error("Error en sugerenciasPacientes:", error);
    if (error.response) {
      throw error; // Re-lanzamos el error con la respuesta del servidor
    }
    // Si no hay respuesta estructurada, creamos un error genérico
    const genericError = new Error();
    genericError.response = {
      status: 500,
      data: {
        error: "ERROR_GENERAL",
        message:
          "Error al procesar la solicitud. Por favor, intente más tarde.",
      },
    };
    throw genericError;
  }
}

export async function sugerenciasMedicos(data) {
  try {
    const requestUrl = `${API_URL}/api/sugerencias/medicos`;

    const response = await fetch(requestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    let responseData;
    try {
      // Intentamos parsear la respuesta como JSON
      responseData = await response.json();
    } catch (parseError) {
      // Si no es JSON o está vacía, creamos un objeto con mensaje genérico
      responseData = {
        error: "ERROR_RESPONSE",
        message:
          response.status === 429
            ? "Por favor, espere antes de enviar otra sugerencia."
            : "Error en la respuesta del servidor",
      };
    }

    // Si la respuesta no es ok, lanzamos un error con los datos del servidor
    if (!response.ok) {
      const error = new Error();
      error.response = {
        status: response.status,
        data: responseData,
      };
      throw error;
    }

    return responseData;
  } catch (error) {
    console.error("Error en sugerenciasMedicos:", error);
    if (error.response) {
      throw error; // Re-lanzamos el error con la respuesta del servidor
    }
    // Si no hay respuesta estructurada, creamos un error genérico
    const genericError = new Error();
    genericError.response = {
      status: 500,
      data: {
        error: "ERROR_GENERAL",
        message:
          "Error al procesar la solicitud. Por favor, intente más tarde.",
      },
    };
    throw genericError;
  }
}

export async function sugerenciasEmpresas({ fechaDesde, fechaHasta } = {}) {
  try {
    let url = `${API_URL}/api/sugerencias/empresas`;
    const params = [];
    if (fechaDesde) params.push(`fechaDesde=${encodeURIComponent(fechaDesde)}`);
    if (fechaHasta) params.push(`fechaHasta=${encodeURIComponent(fechaHasta)}`);
    if (params.length) url += `?${params.join("&")}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en sugerenciasEmpresas:", error);
    throw error;
  }
}

export async function uploadAvatar(data) {
  const response = await fetch(`${API_URL}/upload`, {
    method: "POST",
    body: data,
  });
  if (!response.ok) {
    // Intenta leer el mensaje de error del backend
    let errorMsg = "Network response was not ok";
    try {
      const errorData = await response.json();
      errorMsg = errorData.message || errorMsg;
      // Imprime el error completo para depuración
      console.error("Error del backend al subir imagen:", errorData);
    } catch (e) {
      console.error("Error al leer el error del backend:", e);
    }
    throw new Error(errorMsg);
  }
  const result = await response.json();
  return result;
}

// FILEMAKER
export const getFileMakerToken = async () => {
  try {
    // console.log('Starting fetch request to getFileMakerToken');
    const response = await fetch(`${API_URL}/resultados`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // console.log('Fetch request completed', response);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // Convertir la respuesta a JSON
    // console.log('Response data:', data); // Mostrar los datos en la consola
    return data; // Devolver los datos
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getResultados = async (token, medicoId, centroExterno) => {
  // console.log(medicoId, centroExterno);
  const response = await fetch(`${API_URL}/resultados/records`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token, medicoId, centroExterno }),
  });
  return response.json();
};

export const getResultadosByName = async (
  token,
  name,
  medicoId,
  centroExterno
) => {
  const response = await fetch(`${API_URL}/resultados/record/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token, name, medicoId, centroExterno }),
  });
  return response.json();
};

export const getPublicaciones = async (data) => {
  const response = await fetch(`${API_URL}/publicaciones`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

export const getPublicacion = async (id) => {
  const response = await fetch(`${API_URL}/publicaciones/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};
// Verificar si el token ha expirado
export const isTokenExpired = () => {
  const now = new Date(); // Obtener la fecha actual
  const tokenTimestamp = localStorage.getItem("tokenTimestamp"); // Obtener el timestamp del token
  const timeElapsed = now.getTime() - tokenTimestamp; // Calcular el tiempo transcurrido desde el ltimo token
  // const timeRemaining = 900000 - timeElapsed; // 15 minutos en milisegundos
  // const minutesRemaining = Math.floor(timeRemaining / 60000);
  // console.log(`Tiempo restante: ${minutesRemaining} minutos`);
  return timeElapsed > 900000;
};

export const getPdf = async (url) => {
  const response = await fetch(`${API_URL}/publicaciones/pdf`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const pdfBlob = await response.blob();
  const pdf = URL.createObjectURL(pdfBlob);
  // console.log(pdfUrl)
  return pdf;
};

export const forgotPassword = async (email) => {
  try {
    const response = await fetch(`${API_URL}/users/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error en forgotPassword:", error);
    throw error;
  }
};

export const resetPassword = async (token, password) => {
  try {
    const response = await fetch(`${API_URL}/users/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        token,
        newPassword: password,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en resetPassword:", error);
    throw error;
  }
};

// Get current authenticated user
export const getCurrentUser = async (token) => {
  try {
    const response = await fetch(`${API_URL}/users/verifyToken`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en getCurrentUser:", error);
    throw error;
  }
};

export const getSugerenciasCount = async ({ fechaDesde, fechaHasta } = {}) => {
  try {
    let url = `${API_URL}/api/sugerencias/count`;
    const params = [];
    if (fechaDesde) params.push(`fechaDesde=${encodeURIComponent(fechaDesde)}`);
    if (fechaHasta) params.push(`fechaHasta=${encodeURIComponent(fechaHasta)}`);
    if (params.length) url += `?${params.join("&")}`;
    const response = await fetch(url);
    const data = await response.json();

    // data tendrá esta estructura:
    // {
    //   pacientes: number,
    //   medicos: number,
    //   empresas: number
    // }

    return data;
  } catch (error) {
    console.error("Error al obtener el conteo de sugerencias:", error);
    throw error;
  }
};

export const getSugerenciasPacientesDetalles = async ({
  fechaDesde,
  fechaHasta,
} = {}) => {
  try {
    let url = `${API_URL}/api/sugerencias/pacientes/detalles`;
    const params = [];
    if (fechaDesde) params.push(`fechaDesde=${encodeURIComponent(fechaDesde)}`);
    if (fechaHasta) {
      // Sumar un día y restar un milisegundo para incluir todo el día
      const hasta = new Date(fechaHasta);
      hasta.setHours(23, 59, 59, 999);
      params.push(`fechaHasta=${encodeURIComponent(hasta.toISOString())}`);
    }
    if (params.length) url += `?${params.join("&")}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      "Error al obtener los detalles de sugerencias de pacientes:",
      error
    );
    throw error;
  }
};

export const getSugerenciasMedicosDetalles = async ({
  fechaDesde,
  fechaHasta,
} = {}) => {
  try {
    let url = `${API_URL}/api/sugerencias/medicos/detalles`;
    const params = [];
    if (fechaDesde) params.push(`fechaDesde=${encodeURIComponent(fechaDesde)}`);
    if (fechaHasta) {
      // Sumar un día y restar un milisegundo para incluir todo el día
      const hasta = new Date(fechaHasta);
      hasta.setHours(23, 59, 59, 999);
      params.push(`fechaHasta=${encodeURIComponent(hasta.toISOString())}`);
    }
    if (params.length) url += `?${params.join("&")}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      "Error al obtener los detalles de sugerencias de médicos:",
      error
    );
    throw error;
  }
};

export async function sendInvitationEmail(email, name, password, token) {
  const response = await fetch(`${API_URL}/users/send-invitation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      email,
      name,
      password,
      isExistingUser: true, // Add this flag to indicate this is for an existing user
    }),
  });
  return response.json();
}

// Función para crear comprobantes fiscales
export async function createComprobante(data, token) {
  try {
    const response = await fetch(`${API_URL}/comprobantes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      return {
        status: "error",
        message: responseData.message || "Error al crear el comprobante",
      };
    }

    return responseData;
  } catch (error) {
    console.error("Error al crear comprobante:", error);
    return {
      status: "error",
      message: "Error de conexión al crear el comprobante",
    };
  }
}

// Función para actualizar un comprobante
export async function updateComprobante(id, data, token) {
  try {
    console.log("🌐 URL de la petición:", `${API_URL}/comprobantes/${id}`);
    console.log("📤 Datos enviados:", data);
    const response = await fetch(`${API_URL}/comprobantes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      return {
        status: "error",
        message: responseData.message || "Error al actualizar el comprobante",
      };
    }

    return responseData;
  } catch (error) {
    console.error("Error al actualizar comprobante:", error);
    return {
      status: "error",
      message: "Error de conexión al actualizar el comprobante",
    };
  }
}

// Función para obtener todos los comprobantes
export async function getComprobantes(token) {
  try {
    const response = await fetch(`${API_URL}/comprobantes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData = await response.json();
    // console.log(responseData);
    if (!response.ok) {
      return {
        status: "error",
        message: responseData.message || "Error al obtener los comprobantes",
      };
    }

    return responseData;
  } catch (error) {
    console.error("Error al obtener comprobantes:", error);
    return {
      status: "error",
      message: "Error de conexión al obtener los comprobantes",
    };
  }
}

// Función para obtener TODOS los comprobantes sin filtro de usuario
export async function getAllComprobantes(token) {
  try {
    // Agregamos parámetro query para indicar que queremos todos
    const response = await fetch(`${API_URL}/comprobantes?all=true`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData = await response.json();
    if (!response.ok) {
      return {
        status: "error",
        message:
          responseData.message || "Error al obtener todos los comprobantes",
      };
    }

    return responseData;
  } catch (error) {
    console.error("Error al obtener todos los comprobantes:", error);
    return {
      status: "error",
      message: "Error de conexión al obtener todos los comprobantes",
    };
  }
}

// Función para eliminar un comprobante
export async function deleteComprobante(id, token) {
  try {
    const response = await fetch(`${API_URL}/comprobantes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      return {
        status: "error",
        message: responseData.message || "Error al eliminar el comprobante",
      };
    }

    return responseData;
  } catch (error) {
    console.error("Error al eliminar comprobante:", error);
    return {
      status: "error",
      message: "Error de conexión al eliminar el comprobante",
    };
  }
}
