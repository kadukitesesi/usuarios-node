import express from 'express'
import  {PrismaClient}  from '@prisma/client'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())



app.post('/usuarios', async (req, res) => {
    
    const user = await prisma.user.create({
        data: {
            email: req.body.email,
            password: req.body.password,
            age: req.body.age
        }
    })
    res.status(201).json(user)
})

app.get('/usuarios', async (req, res) => {
    const users = await prisma.user.findMany()
    res.status(200).json(users)
})

app.put('/usuarios/:id', async (req,res) => {
    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            password: req.body.password,
            age: req.body.age
        }
    })
})

app.delete('/usuarios/:id', async (req,res) => {
    
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(204).json({message: "Apagado com sucesso"})
})

app.listen(8080)