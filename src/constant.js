const API_KEY = import.meta.env.VITE_API_KEY
const API = import.meta.env.VITE_API_URL

export const API_URL = (city) => `${API}?q=${city}&appid=${API_KEY}&units=metric`
