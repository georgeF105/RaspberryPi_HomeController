<?php
header("Access-Control-Allow-Origin: *");
$hi = $_GET['function-name'];
//echo $hi;

if($hi == 'GetDescription'){
	//echo "here";
	echo Get_Plug_Description($_GET['plug']);
}
if($hi == 'GetState'){
	echo Get_Plug_State($_GET['plug']);
}
if($hi == 'GetAll'){
	//echo "getting All..";
	echo Get_All();
}
if($hi == 'switchPlug')
{
	$State = filter_var($_GET['state'],FILTER_VALIDATE_BOOLEAN);
	Switch_Plug($_GET['plug'],$State);
}
if($hi == 'addPlug')
{
	Add_Plug($_GET['plug'],$_GET['description'],$_GET['oncode'],$_GET['offcode']);
}
if($hi == 'changeDescription')
{
	Change_Description($_GET['plug'],$_GET['description']);
}
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

function Switch_Plug($plug, $State)
{
//$conn = Get_Conn():
	if(!$conn)
	{
		$conn = Get_Conn();
	}
	
	if (!$conn)
	{
		die("Connection Failed: " .mysqli_connect_error());
	}
	
	//$time = 1;//time();
	if($State == true)
	{
		$sqlGet = "select oncode from Plugs where plug = '$plug' limit 1";
		$sqlSet = "update Plugs set state = 1 Where plug = '$plug' ";
		$result = mysqli_fetch_assoc(mysqli_query($conn, $sqlGet));
		$code = $result['oncode'];
		$result = mysqli_fetch_assoc(mysqli_query($conn, $sqlSet));
		exec("sudo /var/www/html/Scripts/SendPlugCode '$code'", $eOutput, $eResult);
		echo "Plug: '$plug' On - Code: '$code' - Return: '$eResult' - eOutput: '$eOutput'";
	}
	else
	{
		$sqlGet = "select offcode from Plugs where plug = '$plug' limit 1";
		$result = mysqli_fetch_assoc(mysqli_query($conn, $sqlGet));
		$sqlSet = "update Plugs set state = 0 Where plug = '$plug' " ;
		$code = $result['offcode'];
		$result = mysqli_fetch_assoc(mysqli_query($conn, $sqlSet));
		exec("sudo /var/www/html/Scripts/SendPlugCode '$code'", $eOutput, $eResult);
		echo "Plug: '$plug' Off - Code: '$code' - Return: '$eResult' - eOutput: '$eOutput'";
	}
	//echo $code;
	mysql_close($conn);

}

function Get_Plug_State($plug)
{
	$conn = Get_Conn();
	$sql= "select state from Plugs where plug = '$plug' limit 1";
	$result = mysqli_fetch_assoc(mysqli_query($conn, $sql));
	return $result['state'];
	mysql_close($conn);
}

function Get_Plug_Description($plug)
{
	$conn = Get_Conn();
	$sql= "select description from Plugs where plug = '$plug' limit 1";
	$result = mysqli_fetch_assoc(mysqli_query($conn, $sql));
	echo $result['description'];
	mysql_close($conn);
}

function Get_All()
{
	$conn = Get_Conn();
	$sql = "select plug, description, state, display from Plugs";
	$result = mysqli_query($conn,$sql);
	$output = "[";
	while($rs = mysqli_fetch_assoc($result)){
		if($output != "["){$output .= ",";}
		$output .= '{"plug":"' . $rs["plug"] . '",';
		$output .= '"description":"' . $rs["description"] . '",';
		$output .= '"display":"' . $rs["display"] . '",';
		$output .= '"state":"' . $rs["state"] . '"}';
	}
		$output .= "]";
	mysql_close($conn);
	echo($output);
	//echo($result);
}

function Add_Plug($plug, $description, $oncode, $offcode)
{
	$conn = Get_Conn();
	$sql = "select 1 from Plugs where plug = '$plug' limit 1";
	if(mysqli_fetch_row(mysqli_query($conn,$sql)))
	{
		die("Plug: '$plug' already assigned".mysqli_connect_error());
	}
	else
	{
		$sql = "insert into Plugs values('$plug', '$description', '$oncode', '$offcode', false, 'Time()', true )";
		if(mysqli_query($conn,$sql))
			echo "Plug Added";
		else
			echo "Error" . $sql . mysqli_error($conn);
	}
	mysqli_close();
}

Function Change_Description($plug,$description)
{
	$conn = Get_Conn();
	$sql = "update Plugs set description='$description' where plug = '$plug'";
	if(mysqli_query($conn,$sql))
	{
		echo "Updated: '$plug' to '$description'";
	}
	else
	{
		"Error updating: " . mysqli_error($conn);
	}
	mysqli_close($conn);
}

?>