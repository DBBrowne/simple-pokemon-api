export const environment = process.env.NODE_ENV
export const devmode = 'production' !== environment

export const apiBaseUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000/api'
