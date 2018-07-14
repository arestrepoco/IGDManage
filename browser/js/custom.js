(function() {
	var app = angular.module('myApp',[]);
	app.controller('MyController',['$scope', myControler]);
	var excelJsonObj = [];
function myController($scope){
	$scope.uploadExcel = function(){
		var myFile = document.getElementById('file');
		var input = myFile;
		var reader = new FileReader();
		reader.onload = function(){
			var fileData = reader.result;
			var wb = XLSX.read(fileData,{type:'binary'});
			wb.SheetNames.forEach(function(sheetName){
				var rowObject = XLSX.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);
				excelJsonObj = rowObject;
			});

			for (var i = 0; i < excelJsonObj.length; i++) {
				var data = excelJsonObj[i];
				$('#myTable tbody:last-child').append('<tr><td>'+data.ID+'</td><td>'+data.DESCRIPCION+'</td></tr>');
				excelJsonObj.rows[i].onclick = function()
                    {
                      // get the seected row index
                      rIndex = this.rowIndex;
                      document.getElementById("messageText").value = this.cells[1].innerHTML;
                    };
				}	
		};
		reader.readAsBinaryString(input.files[0]);
	};
}
})();