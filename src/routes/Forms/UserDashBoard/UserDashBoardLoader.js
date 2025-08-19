import { getUsers, getAllComprobantes } from "../../../utils/api";

export async function loader() {
  try {
    const token = localStorage.getItem("token");

    const usersResponse = await getUsers();
    const comprobantesResponse = token ? await getAllComprobantes(token) : null;

    // Manejar diferentes estructuras de respuesta del backend
    const users = Array.isArray(usersResponse)
      ? usersResponse
      : usersResponse?.users || [];

    // Manejar la estructura de datos de comprobantes
    // console.log("📦 Loader - Respuesta de comprobantes:", comprobantesResponse);
    const comprobantes =
      comprobantesResponse?.data || // Basado en el backend, los datos están en 'data'
      comprobantesResponse?.comprobantes ||
      (Array.isArray(comprobantesResponse) ? comprobantesResponse : []);
    // console.log("📋 Loader - Comprobantes procesados:", comprobantes);

    return {
      users,
      comprobantes,
    };
  } catch (error) {
    console.error("Error in loader:", error);
    return {
      users: [],
      comprobantes: [],
    };
  }
}
