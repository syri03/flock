<?php
require "connexion.php";
header("Content-type: application/json");

$method = $_SERVER["REQUEST_METHOD"];
switch ($method)
{
    case 'POST':
        $data = file_get_contents("php://input");
        $inputs = json_decode($data, true);
        $f = $inputs["f"];
        $a = $inputs["a"];;
        $j = $inputs["j"];
        $c = $inputs["c"];
        $pn = $inputs["pn"];
        $t = $inputs["t"];
        $F = $inputs["F"];
        $I = $inputs["I"];
        $e=$inputs["e"];
        $msg = [];
        // Préparer la requête
        $prepared1 = $connexion->prepare("INSERT INTO profile ( username,descr,job,country,phone,twitter, facebook, instagram,email) VALUES (:a, :b, :c,:d,:e,:f,:g,:h,:i)");
        
        $prepared1->bindParam(":a", $f);
        $prepared1->bindParam(":b", $a);
        $prepared1->bindParam(":c", $j);
        $prepared1->bindParam(":d", $c);
        $prepared1->bindParam(":e", $pn);
        $prepared1->bindParam(":f", $t);
        $prepared1->bindParam(":g", $F);
        $prepared1->bindParam(":h", $I);
        $prepared1->bindParam(":i", $e);
        // Exécuter la requête
        $resultat = $prepared1->execute();
        if ($resultat == false) {
            http_response_code(204);
            $msg = ["msg" => "Requête SQL erronée"];
        } else {
            $prepared2 = $connexion->prepare("UPDATE users JOIN compte ON users.id_compte = compte.id_compte
            SET username = :a
            WHERE compte.email = :e;");
            $prepared2->bindParam(":e", $e);
            $prepared2->bindParam(":a", $f);
            $resulta2 = $prepared2->execute();
            http_response_code(201);
            $msg = ["msg" => "Ajout avec succès"];
        }
        echo json_encode($msg);
        break;
    default: {
            http_response_code(204);
            $msg = ["msg" => "Méthode non autorisée"];
            echo json_encode($msg);
        }
}
?>
