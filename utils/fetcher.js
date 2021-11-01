import api from "../api"

export const fetcher = (...args) => api.get(...args).json()
