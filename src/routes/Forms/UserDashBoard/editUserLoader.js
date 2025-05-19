import { getUserById } from "../../../utils/api";

export async function loader({ params }) {
  const user = await getUserById(params.id);
  return { user };
}
