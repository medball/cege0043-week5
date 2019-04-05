//create a POST String with the data
function startDataUpload(){
	//get the textbox values
	var name = document.getElementById("name").value;
	var surname = document.getElementById("surname").value;
	var module = document.getElementById("module").value;
	//plave the values in a POST string to send to the server
	var postString = "name="+name+"&surname="+surname+"&module="+module;
	//get the checkbox values
	var checkString = "";
	//loop for all boxes
	for (var i = 1;i < 5;i++){
		if (document.getElementById("check"+i).checked == true){
			checkString = checkString + document.getElementById("check"+i).value+"||"
		}
	}
	//add the new checkbox values to the original POST string
	postString = postString+"&modulelist="+checkString;
	//get the radio button value depending on whether the morning or afternoon option is checked
	if (document.getElementById("morning").checked){
		postString = postString+"&lecturetime=morning";
	}
	if (document.getElementById("afternoon").checked){
		postString = postString+"&lecturetime=afternoon";
	}
	//get the select box value
	var language = document.getElementById("languageselectbox").value;
	postString = postString+"&language="+language;
	//get the values for the coordinate information
	var latitude = document.getElementById("latitude").value;
	var longitude = document.getElementById("longitude").value;
	postString = postString+"&latitude="+latitude+"&longitude="+longitude;
	//return an alert to check this has worked
	alert(postString);
	//call the processing function
	processData(postString);
}

//make a global variable to hold the request
var client;
var httpPortNumber = '30282';

//process the POST String
function processData(postString){
	//make a new request using the client variable
	client = new XMLHttpRequest();
	postString = postString+"&port_id=30282";
	var url = 'http://developer.cege.ucl.ac.uk:'+httpPortNumber+'/uploadData';
	//use the server to bounce the data back to us using /reflectData
	client.open('POST',url,true);
	//inform the server of the type of data
	client.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	//call the function to upload the data when the client is ready
	client.onreadystatechange = dataUpload;
	//send the post String
	client.send(postString);
}

//add an event listener function to wait for the response from the data server and process that response once received
function dataUpload(){
	//if the client has state 4, the data is ready
	if (client.readyState == 4){
		//change the DIV to show the response
		document.getElementById("dataUploadResult").innerHTML = client.responseText;
	}
}
