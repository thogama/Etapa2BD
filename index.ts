import { PrismaClient } from '@prisma/client'
import express from 'express'

const app = express()
const port = 3000

const prisma = new PrismaClient()

app.get('/', async (req, res) => {
  const user = await prisma.aluno.create({
    data: {
      nome: "Alan Gama Videos",
      curso: "Eng. da Pesca",
      idade: 22
    }
  })
  res.send(user)
})

app.post('/', async (req, res) => {
  const users = await prisma.aluno.findMany()
  res.send(users)
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})