/**
 * Normaliza el rol del usuario para comparaciones en el cliente.
 * Acepta variantes con acentos, mayúsculas, plurales y alias frecuentes.
 */
export function normalizeAppRole(role) {
  const raw = (role ?? "")
    .toString()
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9_]/g, "");

  const aliases = {
    medico: "medico",
    medicos: "medico",
    doctor: "medico",
    dr: "medico",
    recepcion: "recepcion",
    reception: "recepcion",
    admin: "admin",
    administrator: "admin",
    user: "user",
    usuario: "user",
    guest: "guest",
    invitado: "guest",
  };

  return aliases[raw] ?? raw;
}

export const ROLES_CAN_VIEW_REPORTES = ["admin", "user", "medico", "recepcion"];

export const ROLES_CAN_VIEW_MEDICOS_LINK = ["admin", "user"];

export function canViewReportesNav(user) {
  const normalized = normalizeAppRole(user?.role);
  return ROLES_CAN_VIEW_REPORTES.includes(normalized);
}

export function canViewMedicosNav(user) {
  return ROLES_CAN_VIEW_MEDICOS_LINK.includes(normalizeAppRole(user?.role));
}
