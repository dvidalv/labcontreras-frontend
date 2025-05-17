import { hasAdmin } from "../../../utils/api";

export async function loader() {
  try {
    const data = await hasAdmin();
    return data;
  } catch (error) {
    console.error("Error al obtener el usuario por rol:", error);
    return null;
  }
}
