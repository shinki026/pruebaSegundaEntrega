const hbs = require('hbs');
const fs = require('fs');
listaCursos = [];	
listaPersonas = [];


const listar = () => {
	try{
	listaCursos = require('../listadocurso.json');
	// listaEstudiantes = JSON.parse(fs.readFileSync('listado.json'));
	}catch(error){
		listaCursos = [];
	}
}

const listarpersonas = () => {
	try{
	listaPersonas= require('../listadopersonas.json');
	// listaEstudiantes = JSON.parse(fs.readFileSync('listado.json'));
	}catch(error){
		listaPersonas = [];
	}
}

const guardar = () => {
	let datos = JSON.stringify(listaCursos);
	fs.writeFile('listadocurso.json',datos,(err)=>{
		if(err) throw (err);
		console.log('archivo creado con exito');
	})
}

const guardarPersonas = () => {
	let datos = JSON.stringify(listaPersonas);
	fs.writeFile('listadopersonas.json',datos,(err)=>{
		if(err) throw (err);
		console.log('archivo creado con exito');
	})
}

const mensaje = () => {
		console.log('ya esta');
}



hbs.registerHelper('crear', (id,nombre,descripcion,valor,modalidad,horas) =>{
	listar();
	let curso = {
		id: id,
		nombre: nombre,
		descripcion: descripcion,
		valor: valor,
		modalidad: modalidad,
		horas: horas,
		estado: 'disponible'
	};

	let texto= '';

	let duplicado = listaCursos.find(idc => idc.id == curso.id);

	if(!duplicado){

		listaCursos.push(curso);

		guardar();

		texto = texto +
		       "<div class='alert alert-success' role='alert'>" +
		       "Se creo correctamente" +
			   "</div>";

	}else{
		texto = texto +
		       "<div class='alert alert-danger' role='alert'>" +
		       "El id ya esta asignado a un curso" +
			   "</div>";
	}

	return texto;
})


hbs.registerHelper('listarcursos',() => {
	listadocurso = require('../listadocurso.json');

	let texto = "<table class='table table-striped'>" +
				"<hread>" +
				 "<tr>" +
				  "<th scope='col'>Id</th>" +
				  "<th scope='col'>Nombre</th>" +
				  "<th scope='col'>Descripción</th>" +
				  "<th scope='col'>Valor</th>" +
				  "<th scope='col'>Modalidad</th>" +
				  "<th scope='col'>Horas</th>" +
				  "<th scope='col'>Estado</th>" +
				 "</tr>" +
				"</hread>" + 
			    "<tbody>" ;

	listadocurso.forEach(curs => {

				texto = texto +
					    "<tr>" +
      				    "<th scope='row'>"+ curs.id +"</th>" +
      				     "<td>"+ curs.nombre +"</td>" +
      				     "<td>"+ curs.descripcion +"</td>" +
      				     "<td>"+ curs.valor +"</td>" +
      				     "<td>"+ curs.modalidad +"</td>" +
      				     "<td>"+ curs.horas +"</td>" +
      				     "<td>"+ curs.estado +"</td>" +
    				    "</tr>";

	})

		texto = texto +
				"</tbody>"+
				"</table>";

	return texto;			
})


hbs.registerHelper('listarcursosinteresado',() =>{
	listcurso = require('../listadocurso.json');

 	let texto = "<div class='accordion' id='accordionExample'>";
 	let cont=0;
	listcurso.forEach(curs => {


		if(curs.estado ==='disponible'){
			texto = texto +
					"<div class='card'>" +
					"<div class='card-header' id='headingOne"+curs.id +"'>" + 
					"<h2 class='mb-0'>"	+
					"<h6>"+ "Nombre del Curso: "+ curs.nombre + "<br>" +
					"Descripción: " + curs.descripcion + "<br> " +
					"Valor: $ " + curs.valor + " pesos"+"</h4>" + 
					"<button class='btn btn-link' type='button' data-toggle='collapse' data-target='#collapseOne" + curs.id + "' aria-expanded='false' aria-controls='collapseOne"+ curs.id + "' >" +
					"Ver mas" +
        			"</button>" +
      				"</h6>" +
    				"</div>" +
    				"<div id='collapseOne"+ curs.id + "' class='collapse' aria-labelledby='headingOne"+ curs.id + "' data-parent='#accordionExample'>" +
      				"<div class='card-body'>" +
      				"Nombre: " + curs.nombre  + " Descripción: " + curs.descripcion + " Valor: " + curs.valor+ 
      				"<br>" +
        			"Modalidad: " + curs.modalidad + " Intensidad horaria: " + curs.horas + " horas" +
      				"</div>"+
    				"</div>"+
  					"</div>";

		}

	})

	texto = texto +
			"</div>";

	return texto;
})


hbs.registerHelper('crearestudiante', (documento,nombre,correo,telefono,curso) =>{
	listarpersonas();
	let persona = {
		documento: documento,
		nombre: nombre,
		correo: correo,
		telefono: telefono,
		curso: curso
	};

	let texto= '';

	let duplicado = listaPersonas.find(documento => documento.documento == persona.documento && documento.curso == persona.curso);

	if(!duplicado){
		
		listaPersonas.push(persona);

		guardarPersonas();

		texto = texto +
		       "<div class='alert alert-success' role='alert'>" +
		       "Se creo correctamente" +
			   "</div>";

	}else{
		console.log('no');

		texto = texto +
		       "<div class='alert alert-danger' role='alert'>" +
		       "Ya esta inscrito" +
			   "</div>";
	}

	return texto;
})




hbs.registerHelper('listarcursosactivos',() => {
	listarTodosCurso = require('../listadocurso.json');
	let texto="";
		listarTodosCurso.forEach(curso => {

			if(curso.estado==='disponible'){
				texto = texto +
						"<option value='" + curso.id + "'>" + curso.nombre + "</option>";
			}
		})
	return texto;
})


hbs.registerHelper('listarcursostodos',() => {
	listarTodosCurso = require('../listadocurso.json');
	let texto="";
		listarTodosCurso.forEach(curso => {

				texto = texto +
						"<option value='" + curso.id + "'>" + curso.nombre + "</option>";
			
		})
	return texto;
})


const guardaractualizar = () => {
	let datos = JSON.stringify(listaCursos);
	fs.writeFile('listadocurso.json',datos,(err)=>{
		if(err) throw (err);
		console.log('archivo creado con exito');
	})
}


hbs.registerHelper('cambioestadocurso',(curso) =>{
	listar();

	let texto= '';

	let encontrado = listaCursos.find(idc => idc.id == curso);

	if(!encontrado){
		console.log('no existe este estudiante');
	}

	else{
		encontrado.estado = 'cerrado';
		guardaractualizar();
	}

})


hbs.registerHelper('listarcursosadministrador',() =>{
	listcurso = require('../listadocurso.json');

	listpersona = require('../listadopersonas.json');

 	let texto = "<div class='accordion' id='accordionExample'>";
	listcurso.forEach(curs => {

			texto = texto +
					"<div class='card'>" +
					"<div class='card-header' id='headingOne"+curs.id +"'>" + 
					"<h2 class='mb-0'>"	+
					"<h6>"+ "Nombre del Curso: "+ curs.nombre + "<br>" +
					"<button class='btn btn-link' type='button' data-toggle='collapse' data-target='#collapseOne" + curs.id + "' aria-expanded='false' aria-controls='collapseOne"+ curs.id + "' >" +
					"Ver mas" +
        			"</button>" +
      				"</h6>" +
    				"</div>" ;

    			texto = texto +
					"<div id='collapseOne"+ curs.id + "' class='collapse' aria-labelledby='headingOne"+ curs.id + "' data-parent='#accordionExample'>" +
      				"<div class='card-body'>";

      			texto = texto +
    				"<table class='table'>" +
    				"<thead class='thead-dark'>" +
    				"<tr>" +
 					"<th scope='col'>Documento</th>" +
     		 		"<th scope='col'>Nombre</th>" +
      				"<th scope='col'>Correo</th>" +
      				"<th scope='col'>Telefono</th>" +
    				"</tr>" +
  					"</thead>" +
  					"<tbody>";
    				

    	listpersona.forEach(pers => {

    		if(curs.id === pers.curso){
    			console.log(pers.nombre);
					texto = texto + 
					"<tr>" +
					"<th scope='row'>" + pers.documento + "</th>" +
      				"<td>" + pers.nombre + "</td>" +
      				"<td>" + pers.correo + "</td>" +
      				"<td>" + pers.telefono + "</td>" +
      				"</tr>";
    		}
    	})
    	texto= texto+
    			"</tbody>" +
    			"</table>" +
    			"</div>"+
    			"</div>";
	})

	texto = texto +
			"</div>";

	return texto;
})	


hbs.registerHelper('eliminarusuario',(documento,curso) =>{
	listarpersonas();

	let texto="";
	let nuevo = [];
	// let nuevo = listaPersonas.filter(pers => pers.curso != curso);

	listaPersonas.forEach(curs => {
		console.log(documento+" "+curso);
		console.log(curs.documento+""+curs.curso);
		if(curs.documento !== documento && curs.curso !== curso){
			nuevo.push(curs);
		}

	})

	if(nuevo.length == listaPersonas.length){

		console.log('ningun estudiante tiene ese nombre');
	}
	else{
		console.log(nuevo);
		console.log(listaPersonas);
		// texto="eliminado";

		// listaPersonas = nuevo;
		// guardaractualizar();
	}

return texto
})

