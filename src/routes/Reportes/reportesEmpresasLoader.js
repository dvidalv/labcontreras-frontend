import { sugerenciasEmpresas } from "../../utils/api";

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
    const data = await sugerenciasEmpresas({
      fechaDesde,
      fechaHasta,
    });
    // Si la respuesta es un array, la retornamos tal cual
    if (Array.isArray(data)) return data;
    // Si la respuesta es un objeto con error, lo retornamos
    if (data && data.error) return data;
    // Si la respuesta es un objeto con una propiedad de datos, la retornamos
    if (data && Array.isArray(data.data)) return data.data;
    // Si no hay datos, retornamos un array vacío
    return [];
  } catch (error) {
    console.error(
      "Error al cargar los datos de las encuestas de empresas:",
      error
    );
    return {
      error: true,
      message:
        "No se pudieron cargar los datos de las encuestas de empresas. Por favor, intente más tarde.",
    };
  }
}
