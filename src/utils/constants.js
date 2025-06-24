let API_URL = "";

// Check if we're in a browser environment
if (typeof window !== "undefined") {
  if (window.location.hostname === "localhost") {
    API_URL = "http://localhost:3001";
  } else {
    API_URL = "https://labcontreras-backend.vercel.app";
  }

  // Debug logging
  console.log("Current hostname:", window.location.hostname);
  console.log("API_URL set to:", API_URL);
} else {
  // Fallback for server-side rendering or when window is not available
  API_URL = "http://localhost:3001";
  console.log("Window not available, using fallback API_URL:", API_URL);
}

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

export default API_URL;
