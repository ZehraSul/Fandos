export const FANDOS_API_URL =
  process.env.NODE_ENV && process.env.NODE_ENV === "development"
    ? "http://localhost:8000/api"
    : "https://fandos.herokuapp.com/api";
