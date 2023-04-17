import express, { Application, json } from 'express'
import { errorHandler } from './middlewares/handle.middleware'

const app: Application = express()
app.use(json())

app.post("/users", )

// tem que por o .error ?
app.use(errorHandler)

export default app
