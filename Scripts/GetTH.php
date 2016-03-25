<?php
header("Access-Control-Allow-Origin: *");
$hi = $_GET['function-name'];
//echo $hi;

if($hi == 'GetTH'){
	//echo "here";
	echo getTh($_GET['zone'],$_GET['results']);
}

/*
echo "GetHTJson";
echo exec("sudo /home/pi/adafruit_Python_DHT/examples/GetHTJson.py 22 4");
echo "adaf";
echo exec("sudo /home/pi/adafruit_Python_DHT/examples/AdafruitDHT.py 22 4");
*/
/*
Switch_Plug(2,true);
echo "Plug 2 On ";
echo Get_Plug_State(2);
sleep(2);
echo " Turing Plug Off ";
Switch_Plug(2,false);
echo " Plug 2 Off ";
echo Get_Plug_State(2);
*/
function Get_Conn()
{
	$servername = "localhost";
	$username = "server";
	$password = "password";
	$dbname = "home";
	$conn = mysqli_connect($servername, $username, $password, $dbname);
	if (!$conn)
	{
		die("Connection Failed: " .mysqli_connect_error());
	}
	return $conn;
}

function getTh($zone, $results)
{
	//echo exec("sudo /home/pi/adafruit_Python_DHT/examples/GetHTJson.py 22 4");
	$conn = Get_Conn();
	$sql = "select time, temperature, humidity from thData where zone = '$zone' order by time desc limit $results";
	$result = mysqli_query($conn,$sql);
	$output = "[";
	while($rs = mysqli_fetch_assoc($result))
	{
		if($output != "["){$output .= ",";}
		$output .= '{"time":"' . $rs["time"] . '",';
		$output .= '"temperature":"' . $rs["temperature"] . '",';
		$output .= '"humidity":"' . $rs["humidity"] . '"}';
	}
	$output .= "]";
	mysql_close($conn);
	echo($output);
}



?>