import { PrismaClient } from '@prisma/client'
import { Router } from 'express'
const prisma = new PrismaClient()

const router = Router()


router.post("/banco", async (req, res) => {
    console.log(req.body)
    try {
        const novobanco = await prisma.banco.create({
            data: {
                nome: req.body.nome,
                caixa: req.body.caixa,
            }
        })
        res.send(novobanco)

    } catch {
        res.send("Este banco existe")
    }


})

router.get("/banco/:nome", async (req, res) => {
    const nome = req.params.nome;
    const banco = await prisma.banco.findUnique({
        where: {
            nome: nome
        }
    }) || "Ops tinha nada disso!!!"


    res.send(banco)
})

router.put("/banco/:nome", async (req, res) => {
    const nome = req.params.nome;
    const caixa = req.body.caixa


    let novo = await prisma.banco.update({
        data: {
            caixa: caixa,

        },
        where: {
            nome: nome
        }
    })

    if (novo) {
        res.send(novo)

    }
    else
        res.send("Nao existe este Banco")


})

router.delete("/banco/:nome", async (req, res) => {
    const nome = req.params.nome;


    await prisma.banco.delete({
        where: {
            nome: nome
        }
    }).then(() => {
        res.send("Deletado")
    }).catch(() => {
        res.send("Nao existe este banco")
    })

})
export default router