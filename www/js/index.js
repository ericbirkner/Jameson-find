var db_name="ballantines_games.db";
//var db_name="tombola";
// Wait for Cordova to load
//toekn para horus
var logOb;
//var token = "bc276116-da84-079f-01ca-dbaf91bf77d2";
var token = "e62b90a3-7ecf-b747-f6eb-f11079fcbacd";

//esto previene que el subnormal haga drag en la pagina;
var fixed = document.getElementById('fixed');
fixed.addEventListener('touchmove', function(e) {
        e.preventDefault();
}, false);

document.addEventListener("deviceready", onDeviceReady, false);




var currentRow;
// Populate the database
//
function populateDB(tx) {
	tx.executeSql('CREATE TABLE IF NOT EXISTS premios (id INTEGER PRIMARY KEY AUTOINCREMENT, name, number)');
	
}

function creaTablaRegistros(tx) {
	
	tx.executeSql('CREATE TABLE IF NOT EXISTS registros (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName,lastName,rut,email,birthday, recibe_info)');	
}

// Query the database
//
function queryDB(tx) {
	tx.executeSql('SELECT * FROM premios', [], querySuccess, errorCB);
}

function searchQueryDB(tx) {
	tx.executeSql("SELECT * FROM premios where name like ('%"+ document.getElementById("txtName").value + "%')",
			[], querySuccess, errorCB);
}
// Query the success callback
//
function querySuccess(tx, results) {
	var tblText='<table id="t01" border="1"><tr><th>ID</th> <th>Premio</th> <th>cantidad</th><th>editar</th></tr>';
	var len = results.rows.length;
	for (var i = 0; i < len; i++) {
		var tmpArgs=results.rows.item(i).id + ",'" + results.rows.item(i).name
				+ "','" + results.rows.item(i).number+"'";
		tblText +='<tr onclick="goPopup('+ tmpArgs + ');"><td>' + results.rows.item(i).id +'</td><td>'
				+ results.rows.item(i).name +'</td><td>' + results.rows.item(i).number +'</td><td align="center"><img src="img/edit.png"></td></tr>';
	}
	tblText +="</table>";
	//document.getElementById("").innerHTML =tblText;
	$('#tblDiv').html(tblText);
}

//Delete query
function deleteRow(tx) {
  tx.executeSql('DELETE FROM premios WHERE id = ' + currentRow, [], queryDB, errorCB);
}

// Transaction error callback
//
function errorCB(err) {
	//console.log("Error processing SQL: "+err.code);
}

// Transaction success callback
//
function successCB() {
	var db = window.openDatabase(db_name, "1.0", "Birkner Media", 200000);
	db.transaction(queryDB, errorCB);
}

 // Cordova is ready
//
function onDeviceReady() {
	
	//se crean variables para almacenar tiempos
	if(typeof(Storage) !== "undefined") {
		console.log(localStorage);
		if (!localStorage.memoriza) {
			localStorage.memoriza = 30;
		}

		if (!localStorage.diferencias) {
			localStorage.diferencias = 30;
		}

		if (!localStorage.puzzle) {
			localStorage.puzzle = 30;
		} 

	} else {
		console.log("no le lleva web storage...");
	}
	
	var db = window.openDatabase(db_name, "1.0", "Birkner Media", 200000);
	db.transaction(populateDB, errorCB, successCB);
	db.transaction(creaTablaRegistros, errorCB);	
}



//Insert query
//
function insertDB(tx) {
	var sql = 'INSERT INTO premios (name,number) VALUES ("' +document.getElementById("txtName").value
			+'","'+document.getElementById("txtNumber").value+'")';
	console.log(sql);
	document.getElementById('form').reset();
	tx.executeSql(sql);
}

function goInsert() {
	var db = window.openDatabase(db_name, "1.0", "Birkner Media", 200000);
	db.transaction(insertDB, errorCB, successCB);
}

function goSearch() {
	var db = window.openDatabase(db_name, "1.0", "Birkner Media", 200000);
	db.transaction(searchQueryDB, errorCB);
}

function goDelete() {
	 var db = window.openDatabase(db_name, "1.0", "Birkner Media", 200000);
	 db.transaction(deleteRow, errorCB);
	 document.getElementById('qrpopup').style.display='none';
}

//Show the popup after tapping a row in table
//
function goPopup(row,rowname,rownum) {
	currentRow=row;
	document.getElementById("qrpopup").style.display="block";
	document.getElementById("editNameBox").value = rowname;
	document.getElementById("editNumberBox").value = rownum;
}

function editRow(tx) {
	tx.executeSql('UPDATE premios SET name ="'+document.getElementById("editNameBox").value+
			'", number= "'+document.getElementById("editNumberBox").value+ '" WHERE id = '
			+ currentRow, [], queryDB, errorCB);
}
function goEdit() {
	var db = window.openDatabase(db_name, "1.0", "Birkner Media", 200000);
	db.transaction(editRow, errorCB);
	document.getElementById('qrpopup').style.display='none';
}

function goRegistro() {
	
	var db = window.openDatabase(db_name, "1.0", "Birkner Media", 200000);
	db.transaction(function(tx){
	var firstName 	= $( "#firstName" ).val();
	var lastName 	= $( "#lastName" ).val();
	var recibe_info	= $( "#recibe_info" ).val();
	var lastName 	= $( "#lastName" ).val();
	var email 		= $( "#email" ).val();
	//var birthday 	= $( "#birthday" ).val();
	var birthday 	= $("#ano").val()+'-'+$("#mes").val()+'-'+$("#dia").val();	
	var rut 		= $( "#rut" ).val();
	var sql = 'INSERT INTO registros (firstName, lastName,rut,email,birthday, recibe_info) VALUES ("' +firstName+'","'+lastName+'","'+rut+'","'+email+'","'+birthday+'","'+recibe_info+'");';
	//var sql = 'INSERT INTO registro (firstName, lastName,rut,email,birthday, recibe_info) VALUES ("eric","birkner","111111111","email@dalso.com","1212122222","si");';
	console.log(sql);
	tx.executeSql(sql);	
		
	
	window.location= 'menu.html';	
	
	}, errorCB);	
	
}

//funcion random array
(function($) {
    $.rand = function(arg) {
        if ($.isArray(arg)) {
            return arg[$.rand(arg.length)];
        } else if (typeof arg === "number") {
            return Math.floor(Math.random() * arg);
        } else {
            return 4;  // chosen by fair dice roll
        }
    };
})(jQuery);



//validacion de formulario

$(document).ready(function() {
  
	$('form').on('submit', function(Event){
    	// validation code here
		Event.preventDefault();
		var rut = $('#rut').val();
		// retorna true si es válido
		if($.validateRut(rut)) {
			
			goRegistro();
			
		}else{
			alert('El rut no es válido');
		}
		
		
  	});
});

