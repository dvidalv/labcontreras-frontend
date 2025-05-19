import API_URL from "./constants";
import {} from "./constants";

export async function signinUser(email, password) {
  const response = await fetch(`${API_URL}/signin`, {
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
  console.log("API_URL:", API_URL);
  const response = await fetch(`${API_URL}/users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function hasAdmin() {
  // console.log("role:", role);
  try {
    const response = await fetch(`${API_URL}/users/check-admin`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener el usuario por rol:", error);
    throw error;
  }
}

export async function getUsers() {
  const response = await fetch(`${API_URL}/users`);
  return response.json();
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
  try {
    console.log("Making update request with:", { data, token });

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
    console.log("Update response:", responseData);

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
  try {
    const publicId = getPublicIdFromUrl(imageUrl);

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
    const response = await fetch(`${API_URL}/medicos`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error en getMedicos:", error);
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
    console.log("API_URL:", API_URL);
    console.log("Request URL:", requestUrl);
    console.log("Request data:", data);

    const response = await fetch(requestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    console.log("Response status:", response.status);
    console.log("Response headers:", Object.fromEntries(response.headers));

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

export async function sugerenciasEmpresas(data) {
  try {
    const requestUrl = `${API_URL}/api/sugerencias/empresas`;

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
    console.error("Error en sugerenciasEmpresas:", error);
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

export async function uploadAvatar(data) {
  const response = await fetch(`${API_URL}/upload`, {
    method: "POST",
    body: data,
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
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
  const timeRemaining = 900000 - timeElapsed; // 15 minutos en milisegundos
  const minutesRemaining = Math.floor(timeRemaining / 60000);
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
    if (fechaHasta) params.push(`fechaHasta=${encodeURIComponent(fechaHasta)}`);
    if (params.length) url += `?${params.join("&")}`;
    const response = await fetch(url);
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
