import { PrismaClient } from '@prisma/client'
import { Router } from 'express'
const prisma = new PrismaClient()

const router = Router()


router.post("/conta", async (req, res) => {
    console.log(req.body)

    let cpf = req.body.cpf
    let nome_banco = req.body.nome_banco
    let cliente: any
    let banco: any

    try {
        const novo_cliente = await prisma.cliente.findUnique({
            where: {
                cpf: cpf
            }
        })
        cliente = novo_cliente
        console.log(cliente)

    } catch {
        res.send("Cliente não encontrado.")
    }

    try {
        const novo_banco = await prisma.banco.findUnique({
            where: {
                nome: nome_banco
            }
        })
        banco = novo_banco
        console.log(banco)

    } catch {
        res.send("Banco não encontrado.")
    }

    try {
        const nova_conta = await prisma.conta.create({
            data: {
                cliente_id: cliente.id,
                banco_id: banco.id,
                saldo: 0
            }
        })
        res.send(nova_conta)

    } catch {
        res.send("Não foi possivel criar conta.")
    }

})

router.get("/cliente/:cpf", async (req, res) => {
    const cpf = req.params.cpf;
    const cliente = await prisma.cliente.findFirst({
        where: {
            cpf: cpf
        }
    }) || "Ops tinha nada disso!!!"


    res.send(cliente)
})

router.put("/cliente/:cpf", async (req, res) => {
    const cpf = req.params.cpf;
    const nome = req.body.nome
    const cliente = await prisma.cliente.findFirst({
        where: {
            cpf: cpf
        }
    })

    if (cliente) {
        let novo = await prisma.cliente.update({
            data: {
                nome: nome,

            },
            where: {
                id: cliente.id
            }
        })
        res.send(novo)
    }
    else {
        res.send("Nao existe ninguem com este cpf")
    }

})

router.delete("/cliente/:cpf", async (req, res) => {
    const cpf = req.params.cpf;
    const cliente = await prisma.cliente.findFirst({
        where: {
            cpf: cpf
        }
    })

    if (cliente) {
        await prisma.cliente.delete({
            where: {
                id: cliente.id
            }
        })
        res.send("Deletado")
    }
    else {
        res.send("Nao existe ninguem com este cpf")
    }

})
export default router