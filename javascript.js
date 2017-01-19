

function start(){
	navigator.webkitGetUserMedia({video:true}, gotStream, failureStream);
	btn.disabled=true;
}

function gotStream(stream){
	var vid= document.getElementById('vid');
	vid.src=URL.createObjectURL(stream);
}

function failureStream(){
	console.log("Failure getting stream");
}