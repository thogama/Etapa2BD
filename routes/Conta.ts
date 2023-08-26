import { PrismaClient } from '@prisma/client'
import { Router } from 'express'
const prisma = new PrismaClient()

const router = Router()


router.post("/conta", async (req, res) => {
    let cpf = req.body.cpf
    let nome_banco = req.body.nome_banco


    const novo_cliente = await prisma.cliente.findUnique({
        where: {
            cpf: cpf
        }
    })



    const novo_banco = await prisma.banco.findUnique({
        where: {
            nome: nome_banco
        }
    })



    console.log(novo_banco, novo_cliente)
    if (novo_cliente && novo_banco) {
        const nova_conta = await prisma.conta.create({
            data: {
                cliente_id: novo_cliente.id,
                banco_id: novo_banco.id,
                saldo: 0
            }
        })
        res.send(nova_conta)

    }
    else {

        res.status(503).send("Nao foi possivel criar conta")
    }
})

router.get("/conta/:cpf", async (req, res) => {
    const cpf = req.params.cpf;
    const conta = await prisma.conta.findFirst({
        where: {
            cliente: {
                cpf: cpf
            }
        }
    }) || 'Conta não encontrada'


    res.send(conta)
})

router.put("/conta/:cpf", async (req, res) => {
    const saldo = req.body.saldo
    const cpf = req.params.cpf;

    const cliente = await prisma.cliente.findUnique({
        where: {
            cpf: cpf
        }
    });

    if (!cliente) {
        return res.status(404).send("Cliente não encontrado");
    }

    const conta = await prisma.conta.findFirst({
        where: {
            cliente_id: cliente.id
        }
    });

    if (!conta) {
        return res.status(404).send("Conta não encontrada para este CPF");
    }

    let alterado = await prisma.conta.update({
        data: {
            saldo: saldo
        },
        where: {
            id: conta.id
        },

    })
    if (alterado) {
        res.send(alterado)
    }

})

router.delete("/conta/:cpf", async (req, res) => {
    const cpf = req.params.cpf;

    const cliente = await prisma.cliente.findUnique({
        where: {
            cpf: cpf
        }
    });

    if (!cliente) {
        return res.status(503).send("Cliente não encontrado");
    }

    const conta = await prisma.conta.findFirst({
        where: {
            cliente_id: cliente.id
        }
    });

    if (!conta) {
        return res.status(503).send("Conta não encontrada para este CPF");
    }


    await prisma.conta.delete({
        where: {
            id: conta.id
        }
    }).then(() => {
        res.send("Deletado")

    }).catch(() => {
        res.send("Nao existe ninguem com este cpf")

    })




})
export default router