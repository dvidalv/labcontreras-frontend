import { getSugerenciasMedicosDetalles } from "../../utils/api";

export async function loader({ request }) {
  const url = new URL(request.url);
  const fechaDesde = url.searchParams.get("fechaDesde");
  const fechaHasta = url.searchParams.get("fechaHasta");

  // Validar fechas
  if (fechaDesde) {
    const fechaDesdeDate = new Date(fechaDesde);
    const today = new Date();
    if (fechaDesdeDate > today) {
      return {
        error: true,
        message: "La fecha inicial no puede ser una fecha futura",
      };
    }
  }

  if (fechaHasta) {
    const fechaHastaDate = new Date(fechaHasta);
    const today = new Date();
    if (fechaHastaDate > today) {
      return {
        error: true,
        message: "La fecha final no puede ser una fecha futura",
      };
    }
  }

  try {
    const data = await getSugerenciasMedicosDetalles({
      fechaDesde,
      fechaHasta,
    });
    return data;
  } catch (error) {
    console.error(
      "Error al cargar los datos de las encuestas de médicos:",
      error
    );
    return {
      error: true,
      message:
        "No se pudieron cargar los datos de las encuestas de médicos. Por favor, intente más tarde.",
    };
  }
}
