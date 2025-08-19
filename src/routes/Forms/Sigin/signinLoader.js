import { hasAdmin } from "../../../utils/api";

export async function loader() {
  try {
    const data = await hasAdmin();
    // console.log("hasAdmin API response:", data);
    return data;
  } catch (error) {
    console.error("Error al obtener el usuario por rol:", error);
    // Return a default object instead of null to prevent destructuring errors
    return { hasAdmin: false };
  }
}
