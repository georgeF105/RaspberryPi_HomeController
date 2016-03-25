<?php
header("Access-Control-Allow-Origin: *");
$hi = $_GET['function-name'];
//echo $hi;

if($hi == 'getAlarms'){
	//echo "here";
	echo getAlarms();
}

if($hi == 'setAlarms'){
	//echo "here";
	echo setAlarms($_GET['active'],$_GET['time'],$_GET['monday'],$_GET['tuesday'],$_GET['wednesday'],$_GET['thursday'],$_GET['friday'],$_GET['saturday'],$_GET['sunday'],$_GET['function']);
}

if($hi == 'toggleAlarmDay'){
	//echo "here";
echo toggleAlarmDay($_GET['ID'],$_GET['day'],$_GET['state']);
}

if($hi == 'stopAlarm'){
	//echo "here";
echo stopAlarm($_GET['ID']);
}

if($hi == 'changeTime'){
echo changeTime($_GET['ID'],$_GET['time']);
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

function getAlarms()
{
	//echo exec("sudo /home/pi/adafruit_Python_DHT/examples/GetHTJson.py 22 4");
	$conn = Get_Conn();
	$sql = "select id, active, time, monday, tuesday, wednesday, thursday, friday, saturday, sunday, function, running from Alarms";
	$result = mysqli_query($conn,$sql);
	$output = "[";
	while($rs = mysqli_fetch_assoc($result))
	{
		if($output != "["){$output .= ",";}
		$output .= '{"id":"' . $rs["id"] . '",';
		$output .= '"time":"' . $rs["time"] . '",';
		$output .= '"active":"' . $rs["active"] . '",';
		$output .= '"monday":"' . $rs["monday"] . '",';
		$output .= '"tuesday":"' . $rs["tuesday"] . '",';
		$output .= '"wednesday":"' . $rs["wednesday"] . '",';
		$output .= '"thursday":"' . $rs["thursday"] . '",';
		$output .= '"friday":"' . $rs["friday"] . '",';
		$output .= '"saturday":"' . $rs["saturday"] . '",';
		$output .= '"sunday":"' . $rs["sunday"] . '",';
		$output .= '"function":"' . $rs["function"] . '",';
		$output .= '"running":"' . $rs["running"] . '"}';
	}
	$output .= "]";
	mysql_close($conn);
	echo($output);
}

function setAlarms($active, $time, $monday, $tuesday, $wednesday, $thursday, $friday, $saturday, $sunday, $function)
{
	//echo exec("sudo /home/pi/adafruit_Python_DHT/examples/GetHTJson.py 22 4");
	$conn = Get_Conn();
	$sql = "insert into Alarms values(0, $active, '$time', $monday, $tuesday, $wednesday, $thursday, $friday, $saturday, $sunday, '$function')";
	$result = mysqli_query($conn,$sql);
	mysql_close($conn);
}

function toggleAlarmDay($ID, $DAY, $State)
{
	$conn = Get_Conn();
	$sql = "update Alarms set $DAY = $State where id = $ID";
	$result = mysqli_query($conn,$sql);
	mysql_close($conn);
}

function stopAlarm($ID)
{
	$conn = Get_Conn();
	$sql = "update Alarms set running = 2 where id = $ID";
	$result = mysqli_query($conn,$sql);
	mysql_close($conn);
	echo($sql);
}

function changeTime($ID, $time)
{
	$conn = Get_Conn();
	$sql = "update Alarms set time = \"$time\" where id = $ID";
	$result = mysqli_query($conn,$sql);
	mysql_close($conn);
	echo($sql);
}

?>