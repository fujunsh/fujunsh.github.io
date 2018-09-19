<?php

header('Content-Type:application/json; charset=utf-8');
$id = $_GET['productId'];
$num = $_GET['num'];
$size = $_GET['size'];
$login = $_GET['status'];

$product = array('id' => $id, 'num' => $num, 'size' => $size,);

if($login == 0) {
  echo json_encode(array('error' => '400', 'msg' => '未登录'));
}else {
  echo json_encode(array('success' => '200', 'msg' => '未登录'));
}


?>