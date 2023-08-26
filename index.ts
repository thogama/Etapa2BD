import express from 'express'
import ClienteRoutes from './routes/Cliente'
import BancoRoutes from "./routes/Banco"
const app = express()
const port = 3000
app.use(express.json());


app.use(ClienteRoutes)
app.use(BancoRoutes)
// app.use(ContaRoutes)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

export default app