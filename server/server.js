const express = require('express')
const path = require('path')

const app = express()
const api = express.Router()

app.use(express.static(path.join(__dirname, '/../client/')))

app.use('/dist', express.static(__dirname + '/../dist'))
app.use('/dependencies/axios/', express.static(__dirname + '/../node_modules/axios/dist/'))



api.get('/posts', (req, res, next) => {

    let posts = [
        {
            titulo: "Historia de xavier",
            autor: {
                id: 1,
                nombre: "Xavier",
                avatar: {
                    thumbail: null,
                    original: null
                },
                nacimiento: 737458389
            },
            cuerpo: "Una cosa es una cosa",
            fecha: "fecha",
            id: 1,
            categoria: {
                nombre: "categoria Y",
                id: 2
            },
            likes: 0
        },
        {
            titulo: "Historia de Daniel",
            autor: {
                id: 2,
                nombre: "Daniel",
                avatar: {
                    thumbail: null,
                    original: null
                },
                nacimiento: 737458389
            },
            cuerpo: "Una cosa es una cosa",
            fecha: "fecha",
            id: 2,
            categoria: {
                nombre: "categoria X",
                id: 1
            },
            likes: 0
        },
        {
            titulo: "Historia de Cis",
            autor: {
                id: 3,
                nombre: "Cis",
                avatar: {
                    thumbail: null,
                    original: null
                },
                nacimiento: 737458389
            },
            cuerpo: "Una cosa es una cosa",
            fecha: "fecha",
            id: 3,
            categoria: {
                nombre: "categoria X",
                id: 1
            },
            likes: 0
        }
    ]

    let data = {
        data: posts
    }

    res.status(200).send(data)
})

api.get("/categories", (req, res, next) => {

    let categories = [
        /*{
            nombre: "Todas",
            id: 0
        },*/
        {
            nombre: "categoria X",
            id: 1
        },
        {
            nombre: "categoria Y",
            id: 2
        }
    ]

    let data = {
        data: categories
    }

    res.status(200).send(data)
})

app.use("/api", api)



app.listen(666, () => console.log('Server activo'))
