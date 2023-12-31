const { VITE_API_DEV_URL, VITE_API_PROP_URL } = (import.meta as any).env;

const fetchUrl = (import.meta as any).env.PROD
  ? VITE_API_PROP_URL
  : VITE_API_DEV_URL;

export { VITE_API_DEV_URL, VITE_API_PROP_URL, fetchUrl };
