<?php
require "connexion.php";
header("Content-type: application/json ");


$method = $_SERVER["REQUEST_METHOD"];

switch ($method){
    case 'POST':
        $data = file_get_contents("php://input");
        $inputs = json_decode($data, true);
        ajouterevent($inputs);
        break;
        
    case 'DELETE':
        $tev = $_GET['tev'];
        Supprimerevent($tev);
        break;
    
    case 'GET':
        afficherevent();
        break;

    case 'PUT':
        $data = file_get_contents("php://input");
        $inputs = json_decode($data, true);
        modifierevent($inputs);
        break;


    default: break;
}
function ajouterevent($inputs){
        
    global $connexion;
   
  

    $location = $inputs["location"];
    $dates = $inputs["dates"];
    $daten = $inputs["daten"];
    $about = $inputs["about"];
    $evname = $inputs["evname"];  
    $type = $inputs["type"];
    $note = $inputs["note"];
    $creator = $inputs["creator"];
    $filename=$inputs["image"];     

    $sql = "SELECT titre_event FROM events WHERE titre_event = :evname";
    $prepared = $connexion->prepare($sql);

    $prepared->bindParam(":evname", $evname);

    $resultat =  $prepared->execute();

    if($resultat){
        $r = $prepared->rowCount();
        if($r>0){
            //http_response_code(204);
            echo json_encode(["msg" => "event existe déja"]);
        }else{
            $requete = "INSERT INTO events (titre_event,type_event,location,description,creator,note,start,end,image) VALUES(:a,:b,:c,:d,:e,:f,:g,:h,:i)";    
            
            $prepared2 = $connexion->prepare($requete);
            $prepared2->bindParam(":a", $evname);
            $prepared2->bindParam(":b", $type);
            $prepared2->bindParam(":c", $location);
            $prepared2->bindParam(":d", $about);   
            $prepared2->bindParam(":e", $creator);  
            $prepared2->bindParam(":f", $note);  
            $prepared2->bindParam(":g", $dates);  
            $prepared2->bindParam(":h", $daten);     
            $prepared2->bindParam(":i", $filename); 
            move_uploaded_file($filename,$folder);
            $resultat2 = $prepared2->execute();
            if($resultat2){
                http_response_code(201);
                echo json_encode(["msg" => "Ajout du event avec succés"]);
            }else{
                echo json_encode(["msg" => "Erreur lors de l'ajout"]);
            }
        }
    }else{
        echo json_encode(["msg" => "Erreur interne"]);
    }



    
}


function Supprimerevent($tev){
    global $connexion;
    $requete = "DELETE FROM events WHERE titre_event = :a";
    $prepared = $connexion->prepare($requete);
    $prepared->bindParam(":a", $tev);
    $resultat = $prepared->execute();

    if($resultat){
        echo json_encode(["message" => "Suppression effectuée"]);
    }else{
        echo json_encode(["message" => "Erreur lors du suppression"]);
    }
}

function afficherevent(){
    global $connexion;
    $requete = "SELECT * FROM events";
    $prepared = $connexion->prepare($requete);
    $resultat = $prepared->execute();
    if($resultat){
        $sql = $prepared->fetchAll(PDO::FETCH_ASSOC);
        if (empty($sql)) {
            echo json_encode(["message" => "Aucun event trouvé"]);
        }else{
            echo json_encode($sql);
        }
    }else{
        echo json_encode(["message" => "Erreur lors du l'affichage"]);
    }
}   



function modifierevent($inputs){
    global $connexion;
    $old = $inputs["ancien"];
    $location = $inputs["location"];
    $dates = $inputs["dates"];
    $daten = $inputs["daten"];
    $about = $inputs["about"];
    $evname = $inputs["evname"];  
    $type = $inputs["type"];
    $note = $inputs["note"];
    $creator = $inputs["creator"];
   
    $sql = "SELECT titre_event FROM events WHERE titre_event = :old";
    $prepared = $connexion->prepare($sql);

    $prepared->bindParam(":old", $old);

    $resultat =  $prepared->execute();

    if($resultat){
        $r = $prepared->rowCount();
        if($r<=0){
            //http_response_code(204);
            echo json_encode(["msg" => "event n'existe pas"]);
        }else{
            $requete = "UPDATE events SET titre_event = :a, type_event = :b, location = :c, description= :d, creator=:e, note=:f, start=:g, end=:h WHERE titre_event=:old";    

            $prepared2 = $connexion->prepare($requete);

            $prepared2->bindParam(":old", $old);           
            $prepared2->bindParam(":a", $evname);
            $prepared2->bindParam(":b", $type);
            $prepared2->bindParam(":c", $location);
            $prepared2->bindParam(":d", $about);   
            $prepared2->bindParam(":e", $creator);  
            $prepared2->bindParam(":f", $note);  
            $prepared2->bindParam(":g", $dates);  
            $prepared2->bindParam(":h", $daten); 
            $resultat2 = $prepared2->execute();

            if($resultat2){
                http_response_code(201);
                echo json_encode(["msg" => "Modification des informations avec succés"]);
            }else{
                echo json_encode(["msg" => "Erreur lors du modification"]);
            }
        }
    }else{
        echo json_encode(["msg" => "Erreur interne"]);
    }
}

?>