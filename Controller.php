<?php 
	require 'Model.php';
	require 'Database.php';
	header("content-type:application/json");
	$mainCateogry = $_POST['mainCategory'];
	$subCategory = $_POST['subCategory'];
	$secondSubCategory = $_POST['secondSubCategory'];	

	try {
		$conn = new Model();
		$mainCategoryResults = $conn->getSubCategory(null);

		if($mainCateogry != '' or $mainCateogry != null)		
			$subCategoryResults = $conn->getSubCategory($mainCateogry);
		

		if($subCategory != '' or $subCategory != null)		
			$secondSubCategoryResults = $conn->getSubCategory($mainCateogry.'-/-'.$subCategory);
		

		$oi_line = $mainCateogry;
		if($subCategory !='')
			$oi_line = $oi_line.'-/-'.$subCategory;
		if($secondSubCategory !='')
			$oi_line = $oi_line.'-/-'.$secondSubCategory;

		$operationResults = $conn->getOperationByLine($oi_line);


	} catch (PDOException $e) {
	    print "Error!: " . $e->getMessage() . "<br/>";
	    die();
	}
	
  	echo json_encode(array('mainCategory' => $mainCategoryResults, 'subCategory' => $subCategoryResults, 'secondSubCategory' => $secondSubCategoryResults, 'operations' => $operationResults));

  	exit();

?>