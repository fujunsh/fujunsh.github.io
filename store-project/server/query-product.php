<?php

$page = $_GET['page'];
// if($page == 1) {
//   echo file_get_contents('./data/query-product.json');
// }
switch($page) {
  case 1:
  echo file_get_contents('./data/query-product.json');
  break;
  case 2:
  echo file_get_contents('./data/query-product2.json');
  break;
  case 3:
  echo file_get_contents('./data/query-product3.json');
  break;
  default:
  echo null;
}


?>