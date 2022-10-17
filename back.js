const express = require('express')
const app = express();
const cors = require('cors')
const bcrypt = require('bcryptjs');


//body-parser de express para que no devuelva undefined.
/*
Cuando intentaba traer el req.body de la peticion POST, me 
devolvia UNEDFINED.
Body-Parser, analiza las colicitudes entrantes y extraen lo
que le indiquemos.
las solicitudes tienen que estar en formato JSON
*/
//BODY-PARSER
const bp = require('body-parser')
app.use(bp.json())
app.use(cors());

let usuarios = require('./datos/usuarios');

//crear usuario nuevo y encriptar contraseña
app.post('/user/new',(req,res)=> {
    const nuevoUsuario = req.body;

    nuevoUsuario.forEach(pass => {
        const passEncrypt = pass.password;
        bcrypt.hash(passEncrypt, 10,(err,passEncriptada)=> {
            if(err){
                console.log('error hasheando', err)
            } else {
                //contraseña encriptada
                pass.password = passEncriptada;
            }
        })
        return pass;
    }) 
    usuarios.push(nuevoUsuario)
    res.send('se registro usuario')
})

//autenticar contraseña
app.post('/user/autenticacion', (req,res)=> {
    const autenticar = req.body;
   
    usuarios.flat().some(user => {
        if(user.username === autenticar.username){
            const passEncriptada = user.password;
            bcrypt.compare(autenticar.pass,passEncriptada,(err,coinciden)=> {
                if(err){
                    console.log('error comprobando: ',err)
                    return res.status(403).send(coinciden)
                } else if(coinciden === true){
                    user.ultimoLogin = autenticar.lastLogin
                    return res.status(200).send(coinciden);
                } else {
                    return res.status(403).send(coinciden);
                }
            })
        }

    })
})


//actualizar usuario
app.put('/user', (req,res)=> {
    usuarios= req.body;
    res.send('se actualizo usuario')
})

//mostrar usuarios en api
app.get('/user',(req,res)=> {  
    res.send(usuarios.flat())
})

const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, ()=> {
    console.log(`El servidor esta escuchando en el puerto ${PUERTO}`)
})