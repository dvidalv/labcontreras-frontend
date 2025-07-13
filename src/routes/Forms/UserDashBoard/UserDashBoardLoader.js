import { getUsers, getComprobantes } from "../../../utils/api";

export async function loader() {
  const token = localStorage.getItem("token");
  const usersResponse = await getUsers();
  const comprobantesResponse = token ? await getComprobantes(token) : null;

  // Manejar diferentes estructuras de respuesta del backend
  const users = Array.isArray(usersResponse)
    ? usersResponse
    : usersResponse?.users || [];

  // Manejar la estructura de datos de comprobantes
  const comprobantes =
    comprobantesResponse?.comprobantes ||
    comprobantesResponse?.data ||
    (Array.isArray(comprobantesResponse) ? comprobantesResponse : []);

  return {
    users,
    comprobantes,
  };
}
