const express = require('express')
const app = express();
const cors = require('cors')

//body-parser de express para que no devuelva undefined.
/*
Cuando intentaba traer el req.body de la peticion POST, me 
devolvia UNEDFINED.
Body-Parser, analiza las colicitudes entrantes y extraen lo
que le indiquemos.
*/
//BODY-PARSER
const bp = require('body-parser')
app.use(bp.json())
app.use(bp.urlencoded({extended: true}))
app.use(cors());

let usuarios = require('./datos/datosUsuarios.js');

app.get('/', (req,res)=> {
    res.send('Todo joia')
})

app.post('/user',(req,res)=> {
    usuarios = req.body;
    console.log(usuarios)
    res.send('se agrego usuario')
})
app.put('/user', (req,res)=> {
    usuarios = req.body;
    res.send('se actualizo usuario')
})

app.get('/user',(req,res)=> {
    res.send(usuarios)
})

const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, ()=> {
    console.log(`El servidor esta escuchando en el puerto ${PUERTO}`)
})