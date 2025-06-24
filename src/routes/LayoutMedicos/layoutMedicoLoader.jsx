import { getMedicos } from "../../utils/api";

export async function loader() {
  try {
    console.log("Loader function called - fetching medicos...");
    const medicos = await getMedicos();
    console.log("Loader function completed successfully:", medicos);
    return medicos;
  } catch (error) {
    console.error("Error in loader function:", error);
    // Return empty array as fallback to prevent crashes
    return [];
  }
}
