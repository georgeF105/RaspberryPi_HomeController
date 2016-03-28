/*
	Plug Functions
*/

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

function drawHome(arr)
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
		
		if(p.display == "1")
		{
			console.log("here 4");
			html += createSwitch(p.description, p.plug, p.state);
		}
		
	}
	$("#switch-wrapper").html(html);
	//return html;
	//$("#switch-wrapper").html(html);
}

function createSwitch(description, plugId, state){
	var checked = '';
	if(state == 1){
		checked = 'checked';
	}
	var id = 'switch-' + plugId;
	return ' <div class="switch-row">'+
					'<span class="label"> ' + description +' </span>'+
					'<div class="onoffswitch">'+
						'<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" onclick="togglePlug('+plugId+',&quot;'+id+'&quot;);"'+
							   'id="' + id +'"'+ checked +'/>'+
						'<label class="onoffswitch-label" for="'+ id +'">'+
							'<span class="onoffswitch-inner"></span>'+
							'<span class="onoffswitch-switch"></span>'+
						'</label>'+
					'</div>'+
				'</div>';
			
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
