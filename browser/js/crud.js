var sqlInstance = require("mysql");
//Database configuration
var setUp = {
    server: 'localhost',
    database: 'gestinstagram',
    user: 'root',
    password: '',
    port: 1433
};
sqlInstance.connect(setUp)
// To retrieve all the data - Start
function mostrarMensajes(){
new sqlInstance.Request()
                    .query("select * from msjrespuestas")
                    .then(function (dbData) {
                        if (dbData == null || dbData.length === 0)
                            return;
                        console.dir(dbData);
                    })
                    .catch(function (error) {
                        console.dir(error);
                    });
}

//validar que los campos sean rellenados
function checkEmptyInput(){
                var isEmpty = false,
                    idMsj = document.getElementById("idMsj").value,
                    descrip = document.getElementById("descrip").value;
            
                if(idMsj === ""){
                    alert("El campo ID MENSAJE no puede estar vacio");
                    isEmpty = true;
                }
                else if(descrip === ""){
                    alert("El campo DESCRIPCION no puede estar vacio");
                    isEmpty = true;
                }
                return isEmpty;
            }

// To retrieve all the data - End
function insertarMensaje(){
    // Insert data - Start
    if(!checkEmptyInput()){
        var dbConn = new sqlInstance.Connection(setUp,
    function (err) {
        var myTransaction = new sqlInstance.Transaction(dbConn);
        myTransaction.begin(function (error) {
            var rollBack = false;
            myTransaction.on('rollback',
                function (aborted) {
                    rollBack = true;
                });
            new sqlInstance.Request(myTransaction)
            idMsj = document.getElementById("idMsj").value,
            descrip = document.getElementById("descrip").value;
                .query("INSERT INTO msjrespuestas VALUES ("idMsj", "descrip")",
                function (err, recordset) {
                    if (err) {
                        if (!rollBack) {
                            myTransaction.rollback(function (err) {
                                alert(err);
                            });
                        }
                    } else {
                        myTransaction.commit().then(function (recordset) {
                            alert('Data is inserted successfully!');
                        }).catch(function (err) {
                            alert('Error in transaction commit ' + err);
                        });
                    }
                });
        });
    });
// Insert data - End
    }
}


function eliminarMensaje(){
    if(!checkEmptyInput()){
        // Delete data - Start
idMsj = document.getElementById("idMsj").value,
descrip = document.getElementById("descrip").value;
var dbConn = new sqlInstance.Connection(setUp,
    function (err) {
        var myTransaction = new sqlInstance.Transaction(dbConn);
        myTransaction.begin(function (error) {
            var rollBack = false;
            myTransaction.on('rollback',
                function (aborted) {
                    rollBack = true;
                });
            new sqlInstance.Request(myTransaction)
                .query("DELETE FROM msjrespuestas WHERE idMensaje=" + idMsj,
                function (err, recordset) {
                    if (err) {
                        if (!rollBack) {
                            myTransaction.rollback(function (err) {
                                alert(err);
                            });
                        }
                    } else {
                        myTransaction.commit().then(function (recordset) {
                            alert('Data is deleted successfully!');
                        }).catch(function (err) {
                            alert('Error in transaction commit ' + err);
                        });
                    }
                });
        });
    });
// Delete data - End
    }
}

function actualizarMensaje(){
    if(!checkEmptyInput()){
        // Update data - Start
idMsj = document.getElementById("idMsj").value,
descrip = document.getElementById("descrip").value;
var dbConn = new sqlInstance.Connection(setUp,
    function (err) {
        var myTransaction = new sqlInstance.Transaction(dbConn);
        myTransaction.begin(function (error) {
            var rollBack = false;
            myTransaction.on('rollback',
                function (aborted) {
                    rollBack = true;
                });
            new sqlInstance.Request(myTransaction)
                .query("UPDATE msjrespuestas SET descripcion = "descrip" WHERE idMensaje=" + idMsj,
                function (err, recordset) {
                    if (err) {
                        if (!rollBack) {
                            myTransaction.rollback(function (err) {
                                alert(err);
                            });
                        }
                    } else {
                        myTransaction.commit().then(function (recordset) {
                            alert("Data is updated successfully!");
                        }).catch(function (err) {
                            alert('Error in transaction commit ' + err);
                        });
                    }
                });
        });
    });
// Update data - End
    }
}


