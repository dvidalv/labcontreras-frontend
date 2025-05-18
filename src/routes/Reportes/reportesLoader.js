import { getSugerenciasCount } from "../../utils/api";

export async function loader() {
  const sugerenciasCount = await getSugerenciasCount();
  return sugerenciasCount ;
}
