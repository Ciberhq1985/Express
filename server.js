const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

// Asi es como se crea una nueva aplicacion Express. no hay necesidad de pasar ningun argumento dentro de express
var app = express()

// pasaremos como argumentos una key y un valor 
app.set('view engine', 'hbs')
    // Declarando la linea de codigo que me permite usar partial para reusar codigo en diferentes templates sin tener que estar actualizando uno a uno
hbs.registerPartials(__dirname + '/views/partial')
    // app.us es para registrar un midleware can do anything, podemos solo ejecutar algunos codigoscomo logging something todo the screen podemos hacer cambios en el request or response object, podemos utilizar midleware para determinar si dejamos entrar a alguien o no. podemos utilizarlo para responder a request usando res.render or res.send
    // a diferencia de midleware superior en este caso nuestra funcion tomara tres argumentos y el tercero sera next. next es el argumento que nos servira para decir hemos terminado aqui podemos pasar al siguiente paso. en caso de no especificar el llamado de next dentro de la funcion se crea un loop y nuca sale de aqui el programa
    // para anadir mas funcionalidades deberiamos explorar el el request, response y next object. Para ello debemos ir a la pagina de express.js/api reference escoger la version de ecpress que estemos utilizando> y a la derecha arriba deberia salirnos request y response. damos clic sobre cualquiera de ellos y se despliega la lista de metodos que podemos utilizar
app.use((req, res, next) => {
        var now = new Date().toString()
        var log = `${now}: requestMethodIs: ${req.method} url:${req.url}`
        console.log(log)
        fs.appendFile('server.log', log + '/n', (err) => {
            if (err) {
                console.log('unable to open the server.log')
            }
        })
        next()
    })
    // midleware que permite render le mtce page. Importante a partir de esta linea como no especifique el algumento next nada de lo que hay abajo se ejecutara 
    // midleware se ejecuta en el orden en que se escribe el codigo es por ello que a partir de que en la siquiente funcion no s eejecutara mas nada a causa de la falta del argumento next()  
    // 

// piece of express midleware. Midleware let you configure how your express aplication works we will be using extensively a lo largo del curso.Midleware nos permite anadir funciones aue no existen express
// anadiendo un midleware. app.use toma la funcion midleware que queremos usar> le ensenamos a express a leer desde una direccion estatica
// __dirname es la variable que se consigue pasar en nuestro fichero by that wrapper funtion we explore the name in it store the path to your proyects directory en este caso especifico almacena el camino hacia node-web-server
app.use(express.static(__dirname + '/public'))
    // crear un handlerbar helper nos permite crear o devolver un valor o funcion que usamos en varia paginas eliminar duplicidades etc>  los handlebar helper pueden o no tomar argumentos.
hbs.registerHelper('getCurrentYear', () => {
        return new Date().getFullYear()
    })
    // handlerbar helper con argumento funcion pasarle un texto y convertirlo todo en mayuscula.
hbs.registerHelper('screamIt', (text) => {
        return text.toUpperCase()
    })
    // en lo adelante comenzaremos a establecer todos los http handlers 
    // si se quiere crear un app todo lo que se tiene que hacer es llamar el method, por ejemplo si alguien visita la ruta de nuestro sitio web vamos a querer enviar algo de vuelta podria ser algun json data or html page se usar un handler de la siguiente forma app.get esto nos permitira establecer un handler para un http reques
    // primer argumento el URL y el segundo sera la funcion para correr, le dira a express que hacer en este caso la funcion tendra dos argumentos request y response.request almacena la informacion que se esta demandando headers, body, the method thas was made with the request to the path all of that is stored in. RESPONSE tiene un monton de metodos disponibles para usar por lo tanto se puede responder al http request de la forma que nos da la gana
    // app.get('/', (req, res) => {
    //         // de momento utilizaremos el metodo respond.send esto nos permitira responder a la solicitud enviando algun dato de vuelta aqui mismo
    //         // res.send('<h1>Hello Caris</h1>')

//         // en el caso de objetos el metodo send lo convierte en tipo json y lo envia como tal se puede ven en la herramienta de desarrollador 
//         res.send({
//             name: 'Marcus',
//             likes: [
//                 'fruits',
//                 'sports'
//             ]
//         })
//     })
// el about despues de slash me da el chance de presentar en esta nueva direccion la respuesta indicada abajo seria ahora localhos: 3000/about
app.get('/about', (req, res) => {
    // res.send('about page')
    // para pasar valores anadir un segundo argumento en forma de objeto
    res.render('about.hbs', {
        pageTitle: 'About page',
        // currentYear: new Date().getFullYear()
    })
})

app.get('/', (req, res) => {
    // res.send('about page')
    // para pasar valores anadir un segundo argumento en forma de objeto
    res.render('home.hbs', {
        pageTitle: 'Caris in Vodafone',
        body: 'She is been working very hard',
        welcomeMessage: 'She is the best!!!',
        // currentYear: new Date().getFullYear()

    })
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'unable to handle request'
    })
})

// con el methodo listen el app se conctara a un puerto de la maquina 'el puerto 3000 es para uso anfition local utilizado para desarrollo'
app.listen(3000)