<?php
Header('Access-Control-Allow-Origin:*');
if($_GET)
{ $comando=$_GET['comando'];
$servername = "localhost";
$username = "nuevo_usuario"; // Cambiar al nuevo nombre de usuario
$password = "nueva_contraseña"; // Cambiar a la nueva contraseña
$dbname = "nombre_BD";//Cambiar al nombre de base de datos
// Crear la conexión
$conn = new mysqli($servername, $username, $password,
$dbname);
// Check connection
if ($conn->connect_error) {
die("Connection failed: " . $conn->connect_error);
}
if($comando=='autenticar')
{ $usuario=$_GET["usuario"];
$contrasena=$_GET["contrasena"];
$sql = "Select * from usuarios where usuario='$usuario' and
contrasena='$contrasena'";
$result=$conn->query($sql);
if($result->num_rows>0){
echo'{"encontrado":"si"}';
}else{
    echo'{"encontrado":"no"}';
    }
    }
    $conn->close();
    }
    ?>