import { getSugerenciasMedicosDetalles } from "../../utils/api";

export async function loader({ request }) {
  const url = new URL(request.url);
  const fechaDesde = url.searchParams.get("fechaDesde");
  const fechaHasta = url.searchParams.get("fechaHasta");
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
    throw new Error(
      "No se pudieron cargar los datos de las encuestas de médicos"
    );
  }
}
