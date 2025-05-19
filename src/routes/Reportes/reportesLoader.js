import { getSugerenciasCount } from "../../utils/api";

export async function loader({ request }) {
  const url = new URL(request.url);
  const fechaDesde = url.searchParams.get("fechaDesde");
  const fechaHasta = url.searchParams.get("fechaHasta");
  const sugerenciasCount = await getSugerenciasCount({
    fechaDesde,
    fechaHasta,
  });
  return sugerenciasCount;
}
