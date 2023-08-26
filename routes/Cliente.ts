import { PrismaClient } from '@prisma/client'
import { Router } from 'express'
const prisma = new PrismaClient()

const router = Router()


router.post("/cliente", async (req, res) => {
    console.log(req.body)
    try {
        const novoCliente = await prisma.cliente.create({
            data: {
                nome: req.body.nome,
                cpf: req.body.cpf,
            }
        })
        res.send(novoCliente)

    } catch {
        res.send("Este cliente ja pussui conta")
    }


})

router.get("/cliente/:cpf", async (req, res) => {
    const cpf = req.params.cpf;
    const cliente = await prisma.cliente.findUnique({
        where: {
            cpf: cpf
        }
    }) || "Ops tinha nada disso!!!"


    res.send(cliente)
})

router.put("/cliente/:cpf", async (req, res) => {
    const cpf = req.params.cpf;
    const nome = req.body.nome


    let novo = await prisma.cliente.update({
        data: {
            nome: nome,

        },
        where: {
            cpf: cpf
        }
    })
    if (novo) {
        res.send(novo)
    }
    else res.send("Nao existe ninguem com este cpf")


})

router.delete("/cliente/:cpf", async (req, res) => {
    const cpf = req.params.cpf;
    await prisma.cliente.delete({
        where: {
            cpf: cpf
        }
    }).then(() => {
        res.send("Deletado")

    }).catch(() => {
        res.send("Nao existe ninguem com este cpf")

    })




})

export default router