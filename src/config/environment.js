import dotenv from 'dotenv'
dotenv.config()

export const nodeEnv = process.env.NODE_ENV

export const debugMode = !['test', 'production'].includes(nodeEnv)
export const port = process.env.PORT || 4000