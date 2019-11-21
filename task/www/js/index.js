var toggle_position = true;
var watchID;


//when the jQuery Mobile page is initialised
$(document).on('pageinit', function() {
	
	//set up listener for button click
	$(document).on('click', getPosition);
	
	//change time box to show message
	$('#time').val("Press the button to get location data");
	
});


//Call this function when you want to get the current position
function getPosition() {
	
	if(toggle_position == false)
	{
		toggle_position = true;
		
		navigator.geolocation.clearWatch(watchID);
		
		$('#getLocationButton').html("Idle");
	}
	else
	{		
		toggle_position = false;
		
		//change time box to show updated message
		$('#time').val("Getting data...");
	
		//change latitude box to show updated message
		$('#lattext').val("Getting data...");
	
		//change longitude box to show updated message
		$('#longtext').val("Getting data...");
		
		console.log("chnage button");
		$('#getLocationButton').html('Watching Position');
	
		//instruct location service to watch position with appropriate callbacks
		watchID = navigator.geolocation.watchPosition(successPosition, failPosition);
	}
	
}


//called when the position is successfully determined
function successPosition(position) {
	
	//You can find out more details about what the position obejct contains here:
	// http://www.w3schools.com/html/html5_geolocation.asp
	

	//lets get some stuff out of the position object
	// new date
	var unixTime =(position.timestamp);
	//var time = unixTime.toDateString;
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	
	//OK. Now we want to update the display with the correct values
	$('#time').val("Recieved data at " + unixTime);
	$('#lattext').val(latitude);
	$('#longtext').val(longitude);
	
	
}

//called if the position is not obtained correctly
function failPosition(error) {
	//change time box to show updated message
	$('#time').val("Error getting data: " + error);
	
}