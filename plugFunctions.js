/*
	Plug Functions
*/

function fetchPlugData(showAll) {

	$.ajax({
		url: "http://192.168.178.31/Scripts/SwitchPlug.php?function-name=GetAll",
		success: function (result) {
			console.log("success!");
			console.log(result);
			var arr = JSON.parse(result);
			console.log(arr);
			//var arr = 
			//createSwitches(arr);
			//$('#S1_descption').text(result);
			drawHome(arr, showAll);
		},
		error:function(result){
		console.log("error: ");
		console.log(result);
	
		//var tArr = '{ "plugs" : [ { "plug" : "2", "description" : "Test", "display" : 1, "state" : 1} ]}';
		var tArr = '[ { "plug" : "2", "description" : "Test", "display" : 1, "state" : 1}, { "plug" : "3", "description" : "Test 1", "display" : 0, "state" : 0}]';
		var arr = JSON.parse(tArr);
		console.log(arr);
		drawHome(arr,showAll);
		}
		//async: false

	});
	/*
	$.get("/Scripts/SwitchPlug.php?function-name=GetAll",
	function(result){
		console.log("result: ")
		console.log(result);
		return JSON.parse(result);
	});*/
}

function togglePlug(plugId,id) {
	console.log("ID: ");
	console.log(id);
	var checked = $('#switch-'+plugId).is(':checked');
	console.log("plug id : "+plugId);
	console.log(checked);
	if (!checked) {
		console.log('switch is on - turning it off')
		switch_plug(plugId,false);
	} else {
		console.log('switch is off - turning it on')
		switch_plug(plugId,true);
	}
}

function togglePlugDisplay(plugId,id) {
	console.log("ID: ");
	console.log(id);
	var checked = $('#switch-'+plugId).is(':checked');
	console.log("plug id : "+plugId);
	console.log(checked);
	if (checked) {
	console.log('switch is on - turning it off')
		changeDisplay(plugId,false);
	} else {
	console.log('switch is off - turning it on')
		changeDisplay(plugId,true);
	}
}

function drawHome(arr, showAll)
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
		console.log("here 3, Plug: "+i+"display"+p.display);
		
		if(showAll){
			html += createSwitchSettings(p.description, p.plug, p.state, p.display);
		}
		else if(p.display == "1"){
			html += createSwitch(p.description, p.plug, p.state, p.display);
		}
		
		
	}
	$("#switch-wrapper").html(html);
	//return html;
	//$("#switch-wrapper").html(html);
}

function createSwitch(description, plugId, state, display){
	var checked = '';
	if(state == 1){
		checked = 'checked';
		bnState = 'btn-default';
	}
	else{
		bnState = 'btn-success';
	}
	var id = 'switch-' + plugId;
	
	html =' <div class="switch-row">'+
				'<div class="btn-group switch-btn-group" role="group" aria-label="...">'+
					
					'<button type="button" class="btn btn-default btn-title  btn-lg" aria-label="description" onclick=""> <span class="glyphicon"></span>'+ description +' </button>'+
					'<button type="button" class="btn btn-default btn-switch btn-lg" aria-label="switchOn" onclick="switch_plug('+plugId+',true);"> <span class="glyphicon glyphicon-off" aria-hidden="true"></span> ON</button>'+
					'<button type="button" class="btn btn-success btn-switch btn-lg" aria-label="switchOff" onclick="switch_plug('+plugId+',false);"> <span class="glyphicon glyphicon-off" aria-hidden="true"></span> OFF</button>'+
				'</div>'+
			'</div>';
	return html;
}

function createSwitchSettings(description, plugId, state, display){
	var checked = '';
	if(state == 1){
		checked = 'checked';
		bnState = 'btn-default';
	}
	else{
		bnState = 'btn-success';
	}
	var id = 'switch-' + plugId;
	

	if(display){
		togDisplay = '<button type="button" class="btn btn-default btn-switch btn-lg" aria-label="display" onclick="changeDisplay('+plugId+',true);"> <span class="glyphicon" aria-hidden="true"></span> SHOW</button>';
	}
	else{
		togDisplay = '<button type="button" class="btn btn-success btn-switch btn-lg" aria-label="display" onclick="changeDisplay('+plugId+',true);"> <span class="glyphicon" aria-hidden="true"></span> SHOW</button>';
	}
	
	
	html =' <div class="switch-row">'+
				'<div class="btn-group switch-settings-btn-group" role="group" aria-label="...">'+
					
					'<button type="button" class="btn btn-default btn-title btn-lg" aria-label="description" onclick=""> <span class="glyphicon"></span>'+ description +' </button>'+
					'<button type="button" class="btn btn-default btn-switch btn-lg" aria-label="switchOn" onclick="switch_plug('+plugId+',true);"> <span class="glyphicon glyphicon-off" aria-hidden="true"></span> ON</button>'+
					'<button type="button" class="btn btn-success btn-switch btn-lg" aria-label="switchOff" onclick="switch_plug('+plugId+',false);"> <span class="glyphicon glyphicon-off" aria-hidden="true"></span> OFF</button>'+
					togDisplay+
				'</div>'+
			'</div>';
	return html;
}

function switch_plug(plugId, state) { //TODO
	console.log("switching plug:  plugid = "+plugId +", state = " +state);
	$.ajax({
		url: "/Scripts/SwitchPlug.php?function-name=switchPlug&plug="+plugId+"&state="+state,
		success: function (result) {
			console.log("success!");
			console.log(result);
			
		},
		error:function(result){
		console.log("error: ");
		console.log(result);
		}

	});
}

function changeDisplay(plugId, state)
{
	console.log("Changeing plug display plug:  plugid = "+plugId +", state = " +state);
	$.ajax({
		url: "/Scripts/SwitchPlug.php?function-name=Change_Visibility&plug="+plugId+"&state="+state,
		success: function (result) {
			console.log("success!");
			console.log(result);
			
		},
		error:function(result){
		console.log("error: ");
		console.log(result);
		}

	});
	
}

function addPlug(plugId, description, oncode, offcode) {
	$.ajax({
		url: "/Scripts/SwitchPlug.php?function-name=addPlug&plug="+plugId+"&description="+description+"&oncode="+oncode+"&offcode="+offcode,
		success: function (result) {
			console.log("success!");
			console.log(result);
			
		},
		error:function(result){
		console.log("error: ");
		console.log(result);
		}

	});
}

function ChangePlugDescription(plugId, description) {
	$.ajax({
		url: "/Scripts/SwitchPlug.php?function-name=changeDescription&plug="+plugId+"&description="+description,
		success: function (result) {
			console.log("success!");
			console.log(result);
			
		},
		error:function(result){
		console.log("error: ");
		console.log(result);
		}

	});
}
