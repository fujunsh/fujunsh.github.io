<?php
header('Content-Type:application/json; charset=utf-8');
// header('Content-Type:application/json');
echo file_get_contents('./data/query-productDetail.json');
?>