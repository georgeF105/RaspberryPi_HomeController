/*
	Alarm Functions
*/



function drawAlarms(arr)
{
	console.log("here 1");
	//var arr = fetchAllData();
	//console.log("here 2");
	console.log(arr);
	console.log("Length: ");
	console.log(arr.length);
	var html = '';
	for(var i = 0; i < arr.length; i++)
	{
		var p = arr[i];
		
		console.log("here 4");
		html += createAlarm(p);
		
	}
	$("#alarms-wrapper").html(html);
	
	//$("#timeIn_1").timePicker();
	//return html;
	//$("#switch-wrapper").html(html);
}

function createAlarm(p)
{
	var id = 'alarm-' + p.id;
	if(p.monday == 1){var cMon = 'btn-success';}else{var cMon = 'btn-default';}
	if(p.tuesday == 1){var cTue = 'btn-success';}else{var cTue = 'btn-default';}
	if(p.wednesday == 1){var cWen = 'btn-success';}else{var cWen = 'btn-default';}
	if(p.thursday == 1){var cThr = 'btn-success';}else{var cThr = 'btn-default';}
	if(p.friday == 1){var cFri = 'btn-success';}else{var cFri = 'btn-default';}
	if(p.saturday == 1){var cSat = 'btn-success';}else{var cSat = 'btn-default';}
	if(p.sunday == 1){var cSun = 'btn-success';}else{var cSun = 'btn-default';}
	
	var cAct = 'btn-default';
	var fAct = p.id+',&quot;active&quot;,'+p.active;
	if(p.active == 1)
	{
		cAct = 'btn-success';
		if(p.running == 1)
		{
			cAct = 'btn-danger';
			fAct = p.id+',&quot;running&quot;,2';
		}
	}
	
	
	//if(p.running == 1){var cRun = 'btn-danger';}else{var cRun = 'btn-default';}
	
	
	return '<div class="alarm-row">'+
				//'<span class="label" aria-label="Alarm' + p.id + '">' + p.time + ' </span>'+
				'<input type="time" id="timeIn_'+p.id+'" class="timeInput" size="10" value=' + p.time + ' autocomplete="OFF">'+
				//'<input type="text" id="time1" class="timeInput" size="10" value="12.00 PM" autocomplete="OFF" >'+
				'<button type="button" class="btn btn-sm btn-default" aria-label="submit" onclick="setTime('+p.id+');" > <span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span> </button>'+
				'<div class="dayselect">'+
					'<div class="btn-group" role="group" aria-label="...">'+
						'<button type="button" class="btn btn-sm '+cMon+'" aria-label="monday" onclick="toggleAlarmDay('+p.id+',&quot;monday&quot;,'+p.monday+');"> M </button>'+
						'<button type="button" class="btn btn-sm '+cTue+'" aria-label="tuesday"onclick="toggleAlarmDay('+p.id+',&quot;tuesday&quot;,'+p.tuesday+');"> T </button>'+
						'<button type="button" class="btn btn-sm '+cWen+'" aria-label="wednesday" onclick="toggleAlarmDay('+p.id+',&quot;wednesday&quot;,'+p.wednesday+');"> W </button>'+
						'<button type="button" class="btn btn-sm '+cThr+'" aria-label="thursday" onclick="toggleAlarmDay('+p.id+',&quot;thursday&quot;,'+p.thursday+');"> T </button>'+
						'<button type="button" class="btn btn-sm '+cFri+'" aria-label="friday" onclick="toggleAlarmDay('+p.id+',&quot;friday&quot;,'+p.friday+');"> F </button>'+
						'<button type="button" class="btn btn-sm '+cSat+'" aria-label="saturday" onclick="toggleAlarmDay('+p.id+',&quot;saturday&quot;,'+p.saturday+');"> S </button>'+
						'<button type="button" class="btn btn-sm '+cSun+'" aria-label="sunday" onclick="toggleAlarmDay('+p.id+',&quot;sunday&quot;,'+p.sunday+');"> S </button>'+
					'</div>'+
					'<button type="button" class="btn btn-sm '+cAct+'" aria-label="ON/OFF" onclick="toggleAlarmDay('+fAct+');" > <span class="glyphicon glyphicon-off" aria-hidden="true"></span> </button>'+
					//'<button type="button" class="btn '+cRun+'" aria-label="ON/OFF" onclick="toggleAlarmDay('+fAct+');" > <span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span> </button>'+
				'</div>'+
					
			'</div>';	
}

function toggleAlarmDay(id,day,state)
{
	
	if(state == 1){
		state = 0;
	}
	else if(state == 0)
	{
		state = 1;
	}
	console.log("Toggle "+day+" On Alarm id: "+id+" To State: "+state)
	
	$.ajax({
		url: "http://192.168.178.31/Scripts/AlarmFunctions.php?function-name=toggleAlarmDay&ID="+id+"&day="+day+"&state="+state,
		success: function (result) {
			console.log("Toggle Day success!"+result);
			fetchAlarmData();
		},
		error:function(result){
		console.log("Toggle Day error: ");
		}
		//async: false

	});
	
}

function setTime(id)
{
	time = $("#timeIn_"+id).val();
	console.log("New Time = " + time + "ID= " +id);
	
	$.ajax({
		url: "http://192.168.178.31/Scripts/AlarmFunctions.php?function-name=changeTime&ID="+id+"&time="+time,
		success: function (result) {
			console.log("Change time success! " + result);
			fetchAlarmData();
		},
		error:function(result){
		console.log("Toggle Day error: ");
		}
		//async: false

	});
	
}

function fetchAlarmData(){
	$.ajax({
		url: "http://192.168.178.31/Scripts/AlarmFunctions.php?function-name=getAlarms",
		success: function (result) {
			console.log("Get All Alarm Data success!");
			console.log(result);
			var arr = JSON.parse(result);
			console.log(arr);
			//var arr = 
			//createSwitches(arr);
			//$('#S1_descption').text(result);
			drawAlarms(arr);
		},
		error:function(result){
		console.log("Get All Alarm Data error: ");
		console.log(result);
		}
		//async: false

	});
}