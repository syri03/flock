<?php

require "connexion.php";
header("Content-type:application/json");

$method = $_SERVER["REQUEST_METHOD"];
switch ($method)
{
    case 'POST':
        //récupère les données envoyées par Angular
        $data = file_get_contents("php://input");
        //convertir la chaîne json en format php
        $inputs = json_decode($data, true);
        $n = $inputs["name"];
        $l = $inputs["lastname"];
        $u = $inputs["username"];
        $v = $inputs["ville"];
        $pn = $inputs["phonenumber"];
        $e = $inputs["email"];
        $p = $inputs["password"];
        $id_compte=random_int(1,100);
        $msg = [];
        //préparer la requête

        $prepared1 = $connexion->prepare("INSERT INTO compte (id_compte,email,mdp,privilege) values (:id_compte,:e1,:p1,'')");
        $prepared1->bindParam(":e1",$e);
        $prepared1->bindParam(":p1",$p);
        $prepared1->bindParam(":id_compte",$id_compte);
        $resultat =  $prepared1->execute();
       
       //exécuter la requête
      
       if($resultat == false)
       { http_response_code(204);
         $msg = ["msg" => "requete sql erronée"];
       }
       else
       {
            $prepared = $connexion->prepare("INSERT INTO users (nom,prenom,num_tel,ville,username,id_compte) values (:n,:l,:pn,:v,:u,:id_compte)");
            //liaison entre données et requête préparée
            $prepared->bindParam(":n",$n);
            $prepared->bindParam(":l",$l);
            $prepared->bindParam(":u",$u);
            $prepared->bindParam(":v",$v);
            $prepared->bindParam(":pn",$pn);
            $prepared->bindParam(":id_compte",$id_compte);
            $resultat1 =  $prepared->execute();
            if ($resultat1){
                http_response_code(201);
                $msg = ["msg" => "ajout avec succès"];
            }
            else{
                http_response_code(204);
                $msg = ["msg" => "echec ajout compte"];
            }
        }
       
    echo json_encode($msg);
         break;
    default: 
    {
        http_response_code(204);
        $msg = ["msg" => "method not allowed"];
        echo json_encode($msg);
    }
}

?>