<?php


$id = $_GET['id'];
if($id == '1') {
  echo file_get_contents('./data/querySecondCategory.json');
}

?>