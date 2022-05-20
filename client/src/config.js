export const environment = process.env.NODE_ENV
export const devmode = 'production' !== environment

const apiDevUrl = 'http://localhost:4000/api'
const apiProdUrl = process.env.REACT_APP_PROD_API_URL
export const apiBaseUrl = environment === 'production' ? apiProdUrl : apiDevUrl
