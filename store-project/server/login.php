<?php

header('Content-Type:application/json; charset=utf-8');

$username = $_POST['username'];
$password = $_POST['password'];

// 后台验证
if($username != 'root') {
  echo json_encode(array('error' => '400', 'msg' => '该用户不存在'));
  return false;
}
if($password != 'root') {
  echo json_encode(array('error' => '400', 'msg' => '密码错误'));
  return false;
}

echo json_encode(array('success' => 'true'));

?>