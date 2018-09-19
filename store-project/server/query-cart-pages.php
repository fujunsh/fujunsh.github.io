<?php

header('Content-Type:application/json; charset=utf-8');

echo file_get_contents('./data/query-cart-pages.json');

// $pro = array(
//   '1' => array(
//     "brandId" => 11,
//     "id" => 11,
//     "proName" => "PUMA彪马官方 男子跑步鞋 Enzo Mesh 190015 黑色-彪马白 02 43 产地印度尼西",
//     "proDesc" => "这是商品描述",
//     "oldPrice" => 688.1,
//     "price" => 459.1,
//     "num" => 2,
//     "proNum" => 12,
//     "sizeScope" => "37-49",
//     "size" => "42",
//     "status" => "1",
//     "updata" => "2018-2-3",
//     "pic" => array(
//       "picName" => "product3-2.jpg"
//     )
//   )
// );
// echo json_encode($pro);

?>