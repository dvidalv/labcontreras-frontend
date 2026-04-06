const envApiUrl = import.meta.env.VITE_API_URL?.trim();
const API_URL = envApiUrl || "https://labcontreras-backend.vercel.app";

export const menuLinks = [
  { to: "/", text: "Inicio" },
  {
    to: "#",
    text: "Nosotros",
    submenu: true,
    submenuItems: [
      { to: "/historia", text: "Historia" },
      {
        to: "/nosotros/mision-vision-valores",
        text: "Mision, vision y valores",
      },
      {
        to: "/nosotros/derechos-deberes-pacientes",
        text: "Derechos y deberes de pacientes",
      },
    ],
  },
  { to: "/medicos", text: "Médicos" },
  { to: "/resultados", text: "Resultados Médicos" },
  { to: "/contact", text: "Contacto" },
  { to: "/reportes", text: "Reportes" },
];

// export const FILEMAKER_URL = 'https://www.server-lpcr.com.doo';
// export const FILEMAKER_DATABASE = 'lpcr';
// export const FILEMAKER_LAYOUT = 'pacientes_web';

// Tipos de Comprobantes Electrónicos (e-CF) República Dominicana
export const TIPOS_ECF = [
  { codigo: "31", nombre: "Factura de Crédito Fiscal Electrónica" },
  { codigo: "32", nombre: "Factura de Consumo Electrónica" },
  { codigo: "33", nombre: "Nota de Débito Electrónica" },
  { codigo: "34", nombre: "Nota de Crédito Electrónica" },
  { codigo: "41", nombre: "Compras Electrónicas" },
  { codigo: "43", nombre: "Gastos Menores Electrónico" },
  { codigo: "44", nombre: "Régimenes Especiales Electrónico" },
  { codigo: "45", nombre: "Gubernamental Electrónico" },
];

export default API_URL;
