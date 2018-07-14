var rIndex,
                table = document.getElementById("table");
            
            // check the empty input
            function checkEmptyInput()
            {
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
            
            // add Row
            function addHtmlTableRow()
            {
                // get the table by id
                // create a new row and cells
                // get value from input text
                // set the values into row cell's
                if(!checkEmptyInput()){
                var newRow = table.insertRow(table.length),
                    cell1 = newRow.insertCell(0),
                    cell2 = newRow.insertCell(1),
                    idMsj = document.getElementById("idMsj").value,
                    descrip = document.getElementById("descrip").value;
            
                cell1.innerHTML = idMsj;
                cell2.innerHTML = descrip;
                // call the function to set the event to the new row
                selectedRowToInput();
            }
            }
            
            // display selected row data into input text
            function selectedRowToInput()
            {
                
                for(var i = 0; i < table.rows.length; i++)
                {
                    table.rows[i].onclick = function()
                    {
                      // get the seected row index
                      rIndex = this.rowIndex;
                      document.getElementById("messageText").value = this.cells[1].innerHTML;
                    };
                }
            }
            selectedRowToInput();
            
            function editHtmlTbleSelectedRow()
            {
                var idMsj = document.getElementById("idMsj").value,
                    descrip = document.getElementById("descrip").value;
               if(!checkEmptyInput()){
                table.rows[rIndex].cells[0].innerHTML = idMsj;
                table.rows[rIndex].cells[1].innerHTML = descrip;
              }
            }
            
            function removeSelectedRow()
            {
                table.deleteRow(rIndex);
                // clear input text
                document.getElementById("idMsj").value = "";
                document.getElementById("descrip").value = "";
            }
            
            $('#input-excel').change(function(){
        var reader = new FileReader();
        reader.readAsArrayBuffer(e.target.files[0]);
        reader.onload = function(e){
            var data = new Uint8Array(reader.result);
            var wb= XLSX.read(data,{type:'array'});
            var htmlstr = XLSX.write(wb,{sheet:"Hoja1",type:'binary',bookType:'html'});
            $('#wrapper')[0].innerHTML += htmlstr;
        }
    });