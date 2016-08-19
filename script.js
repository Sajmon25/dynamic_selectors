$(function(){

	searchRowsFromTable = function(){
		var mainCategory = $("#mainCategory").val();
		var subCategory = $("#subCategory").val();
		var secondSubCategory = $("#secondSubCategory").val();
		$('#rows').html("<b>Loading data...</b>");

		$.ajax({
	      	url: 'Controller.php',
	      	type: 'post',
	      	data: {'mainCategory': mainCategory, 'subCategory': subCategory, 'secondSubCategory': secondSubCategory},
	      	cache: false,
	      	success: function(json) {

	      		var mainCategoryOptions = json['mainCategory'];
	      		$('#mainCategory').html("");
	      		if(mainCategory == '') {
	      			appendOption('#mainCategory', '', '-- select main category --');
	      		}
      			appendDataToSelectAndSetSelected(mainCategoryOptions, '#mainCategory', mainCategory);		      		
      			appendDataToSelect(mainCategoryOptions, '#mainCategory', mainCategory);
      			if(mainCategory != '') {
	      			appendOption('#mainCategory', '', '-- select main category --');
	      		}	

      			var subCategoryOptions = json['subCategory'];
      			if(subCategoryOptions != null) {
      				$('#subCategory').html("");
      				if(subCategory == '' || mainCategory == '') {
      					appendOption('#subCategory', '', '-- select subcategory --')
      				}
      				appendDataToSelectAndSetSelected(subCategoryOptions, '#subCategory', subCategory);		      		
      				appendDataToSelect(subCategoryOptions, '#subCategory', subCategory);
      				if(subCategory != '') {
      					appendOption('#subCategory', '', '-- select subcategory --')
      				}
      			}

      			var secondSubCategoryOptions = json['secondSubCategory'];
      			if(secondSubCategoryOptions != null) {
      				$('#secondSubCategory').html("");
      				if(secondSubCategory == '' || subCategory == '') {
      					appendOption('#secondSubCategory', '', '-- select second subcategory --')
      				}
      				appendDataToSelectAndSetSelected(secondSubCategoryOptions, '#secondSubCategory', secondSubCategory);		      		
      				appendDataToSelect(secondSubCategoryOptions, '#secondSubCategory', secondSubCategory);
      				if(secondSubCategory != '') {
      					appendOption('#secondSubCategory', '', '-- select second subcategory --')
      				}
      			}

      			var operations = json['operations'];
      			if(operations != '') {
      				$("#rows").html("");
      			} else
      			{
      				$('#rows').html("<b>No data found!</b>");
      			}
      			$.each(operations, function(idx, obj) {	      				
      				$("#rows").append("<tr><td>"+obj.w_id+"</td><td>"+obj.w_author+"</td><td>"+obj.w_last_editor+"</td><td>"+obj.w_status+"</td><td>"+obj.w_creation_date+"</td><td>"+obj.w_operation_date+"</td><td>"+obj.oi_title+"</td><td>"+obj.oi_line+"</td><td>"+obj.oi_line2+"</td><td>"+obj.oi_position+"</td><td>"+obj.oi_number+"</td><td>"+obj.oi_keywords+"</td><td>"+obj.oi_attachment+"</td></tr>") 	    
      			});
	      },
		      error: function(xhr, desc, err) {
		        console.log(xhr + "\n" + err);
	      }
	    });		
		
	};

	appendDataToSelect = function(selectOptions, selectName, selectedValue){
		var option = '';

		$.each(selectOptions, function(i, row) {
			if(row.wc_name != selectedValue){
					$(selectName)
			         .append($("<option></option>")
			                    .attr("value",row.wc_name)
			                    .text(row.wc_name)); 
			};		
	    });	
	};

	appendDataToSelectAndSetSelected = function(selectOptions, selectName, selectedValue){
		
		$.each(selectOptions, function(i, row) {

				if(row.wc_name == selectedValue){
					$(selectName)
		         		.append($("<option></option>")
		                    .attr("value",row.wc_name)
		                    .attr("selected", true)
		                    .text(row.wc_name)); 

				};
	    });
	};

	appendOption = function(selectName, optionValue, optionText){
		$(selectName)
	         .append($("<option></option>")
	            .attr("value", optionValue)
	            .text(optionText)); 
	};


	$(document).ready(function(){
		searchRowsFromTable();
	});
});