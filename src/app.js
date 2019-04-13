const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const port = process.env.PORT||3000;
require('./helpers');

const directoriopublico = path.join(__dirname, '../public');
const directoriopartials = path.join(__dirname,'../partials');
app.use(express.static(directoriopublico));
hbs.registerPartials(directoriopartials);
app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine','hbs');

app.get('/',(req,res) => {
	res.render('index',{
		estudiante: 'paola'
	});
		
});

app.get('/crearcurso',(req,res) =>{
	res.render('crearcurso',{
		estudiante: req.body.nombre
	});
});

app.get('/listarcursos',(req,res) =>{
	res.render('listarcursos',{
		estudiante: req.body.nombre
	});
});

app.get('/eliminarinscrito',(req,res) =>{
	res.render('eliminarinscrito',{
		estudiante: 'paola'
	});
});


app.get('/crearestudiante',(req,res) =>{
	res.render('crearestudiante',{
		estudiante: req.body.nombre
	});
});

app.get('/cursosinscritos',(req,res) =>{
	res.render('cursosinscritos',{
		estudiante: req.body.nombre
	});
});

app.post('/calculos',(req, res) => {
	// console.log(req.query);
	res.render('calculos',{
		estudiante: req.body.nombre,
		nota1: parseInt(req.body.nota1),
		nota2: parseInt(req.body.nota2),
		nota3: parseInt(req.body.nota3)
	});
});

app.post('/listarcursos',(req, res) => {	
		// console.log(req.body.curso);
		// curso: req.body.curso
		res.render('listarcursos',{
		curso: req.body.curso,
	});

});

app.post('/prueba',(req, res) => {
	// console.log(req.query);
	res.render('prueba',{
		id: req.body.id,
		nombre: req.body.nombrecurso,
		descripcion: req.body.descripcion,
		valor: req.body.valor,
		modalidad: req.body.modalidad,
		horas: req.body.horas
	});
});

app.post('/prueba2',(req, res) => {
	// console.log(req.query);
	res.render('prueba2',{
		documento: req.body.documento,
		nombre: req.body.nombre,
		correo: req.body.correo,
		telefono: req.body.telefono,
		curso: req.body.curso
	});
});

app.post('/prueba3',(req, res) => {
	// console.log(req.query);
	res.render('prueba3',{
		documento: req.body.documento,
		curso: req.body.curso
	});
});


// app.get('*',(req, res)=>{
// 	res.render('error');
// 	estudiante: 'error'
// });


app.listen(port, () => {
	console.log('Escuchando por el puerto ' + port);
})