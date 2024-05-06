<?php

require 'connexion.php';
header("Content-Type: application/json");

$method = $_SERVER['REQUEST_METHOD'];
switch($method){
    case 'GET': break;
    case 'POST': 
        $input = json_decode(file_get_contents("php://input"), true);
        if (!isset($input["email"]) || !isset($input["password"])) {
            http_response_code(400);
            $msg = ["erreur" => "tous les champs sont requis"];
            echo json_encode($msg);
            exit();
        }else{
            try {
                verifCompte($input);
            } catch (Exception $e) {
                http_response_code(500);
                $msg = ["erreur" => "Une erreur interne est survenue: " . $e->getMessage()];
                echo json_encode($msg);
                exit();
            }
        }
        break;
}

function verifCompte($input){
    global $connexion;

    $username = $input["email"];
    $pwd = $input["password"];

    $requete = " SELECT users.*
    FROM users
    INNER JOIN compte ON users.id_compte = compte.id_compte
    WHERE compte.email =:user  AND compte.mdp = :pwd";
    $prepared = $connexion->prepare($requete);
    $prepared->bindParam(":user", $username);
    $prepared->bindParam(":pwd", $pwd);
    $resultat = $prepared->execute();

    if(!$resultat){
        http_response_code(400);
        $msg = ["erreur" => "requete sql erronée"];
        echo json_encode($msg);
        exit();
    }
    else{
        $rows = $prepared->rowCount();
        if ($rows > 0) {
            http_response_code(201);
            $row = $prepared->fetch(PDO::FETCH_ASSOC);           
            $username = $row['username'];
            $name = $row['nom'];
            $lastname = $row['prenom'];
            $msg = ["message" => "Connecté avec succès", 'username' => $username, 'name' => $name, 'lastname' => $lastname,]; 
            echo json_encode($msg);
            
 
        } else {
            http_response_code(401);
            $msg = ["erreur" => "Identifiants de connexion incorrects"];
            echo json_encode($msg);
        }
    }
}
?>