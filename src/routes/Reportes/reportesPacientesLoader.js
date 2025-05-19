import { getSugerenciasPacientesDetalles } from "../../utils/api";

export async function loader() {
  try {
    const data = await getSugerenciasPacientesDetalles();
    return data;
  } catch (error) {
    console.error(
      "Error al cargar los datos de las encuestas de pacientes:",
      error
    );
    throw new Error(
      "No se pudieron cargar los datos de las encuestas de pacientes"
    );
  }
}
