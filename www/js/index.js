   function onDeviceReady() {
        var db = window.openDatabase("Database", "1.0", "PractisisMobile", 200000);
        db.transaction(iniciaDB, errorCB, successCB);
    }

    // Populate the database
    //
    
    function iniciaDB(tx) {
        tx.executeSql('DROP TABLE IF EXISTS PRODUCTOS');
        tx.executeSql('CREATE TABLE IF NOT EXISTS PRODUCTOS (id integer primary key, producto text, codigo text, precio integer, categoriaid integer, iva integer, servicio integer, activo integer)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS CATEGORIA (id unique, categoria, activo)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS CLIENTES (id unique, nombre, cedula, email, direccion, telefono)');
    }

    
    function populateDB(tx) {
        //tx.executeSql('DROP TABLE IF EXISTS DEMO');
        tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
        tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
        tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
    }

    // Transaction error callback
    //
    function errorCB(tx, err) {
        alert("Error processing SQL: "+err);
    }

    // Transaction success callback
    //
    function successCB() {
        alert("success!");
    }

    function selector(){
         var db = window.openDatabase("Database", "1.0", "PractisisMobile", 200000);
         db.transaction(sacadatos, errorCB, successCB);
    }
    
    function sacadatos(tx){
         tx.executeSql('SELECT COUNT(ID) as cnt FROM DEMO;',[], function (tx,res){
            console.log("vamos:"+res.rows.item(0).cnt);
            });
         
    }
    
    
    function ingresaproductos(){
         var db = window.openDatabase("Database", "1.0", "PractisisMobile", 200000);
         db.transaction(metedatos, errorCB, successCB);
    }
    
    function metedatos(tx){
         tx.executeSql('INSERT INTO PRODUCTOS (producto, codigo, precio, categoriaid, iva, servicio, activo) VALUES (?, ?, ?, ?, ?, ?, ?) ;',["producto1","12302921",10,1,1,1,1], function (tx,res){
            console.log("vamos:"+res.insertId);
            });
         
    }
    
    var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        //aqui codigo de ondevide ready para empezar a hacer cosas.
    },
    escanear: function(){
        resultDiv = document.querySelector("#results");
	resultDiv.innerHTML='';
        cordova.plugins.barcodeScanner.scan(
		function (result) {
                        alert(result.text);
		}, 
		function (error) {
			alert("Error de Scan: " + error);
		}
	);
        
    }
};

function ajax(cadena){var xmlhttp=false;
/*@cc_on @*/
/*@if (@_jscript_version >= 5)
try { xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");} catch (e) {try {xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");} 

catch (E) { xmlhttp = false;}}
@end @*/
//console.log(cadena);
if (!xmlhttp && typeof XMLHttpRequest!='undefined') { try {xmlhttp = new XMLHttpRequest(); } catch (e) { xmlhttp=false;}}
if (!xmlhttp && window.createRequest) {	try { xmlhttp = window.createRequest();} catch (e) { xmlhttp=false;}}
xmlhttp.open("GET",cadena,true);
xmlhttp.onreadystatechange=function() {
if (xmlhttp.readyState==4){
	if(xmlhttp.status==200){
        resultDiv = document.querySelector("#results");
	resultDiv.innerHTML=xmlhttp.responseText;	
}}} 
xmlhttp.send(null);
}