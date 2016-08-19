<?php

class Model {

    function __construct() {
        $this->db = new Database('mysql', 'localhost', '00568357_552744', '00568357_552744', 'rekrutacja123');
    }

    public function getSubCategory($name)
    {
    	$sth = $this->db->prepare("SELECT `wc_name` FROM `wof_cat` WHERE UPPER(`wc_parent`) = UPPER('".$name."') and `wc_class` = 'Baza Awarii'");
        $sth->execute();
        return $sth->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getOperationByLine($name)
    {
    	$sth = $this->db->prepare("SELECT `w_id` 
    									, `w_author` 
    									, `w_last_editor` 
    									, `w_status` 
    									, date_format( `w_creation_date` , '%Y-%m-%d %H:%i' ) AS w_creation_date
    									, date_format( `w_operation_date` , '%Y-%m-%d %H:%i' ) AS w_operation_date
    									, `oi_title` 
    									, `oi_line` 
    									, `oi_line2` 
    									, `oi_position` 
    									, `oi_number` 
    									, `oi_keywords` 
    									, `oi_attachment` 
    								 FROM `wof_oi_card` 
    								WHERE UPPER(`oi_line`) LIKE UPPER('".$name."%')");
        $sth->execute();
        return $sth->fetchAll(PDO::FETCH_ASSOC);
    }

}