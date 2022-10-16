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
app.use(cors());

let usuarios = require('./datos/usuarios');


app.post('/user/new',(req,res)=> {
    usuarios.push(req.body)
    res.send('se agrego usuario')
})
app.put('/user', (req,res)=> {
    usuarios= req.body;
    res.send('se actualizo usuario')
})

app.get('/user',(req,res)=> {
    res.send(usuarios.flat())
})

const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, ()=> {
    console.log(`El servidor esta escuchando en el puerto ${PUERTO}`)
})