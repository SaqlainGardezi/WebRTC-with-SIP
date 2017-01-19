/* setting the value of start, call and hangup to false initially*/
btn1.disabled = false;
btn2.disabled = true;
btn3.disabled = true;
/* declaration of global variables for peerconecection 1 and 2, local
streams, sdp constrains */
var pc1,pc2;
var localstream;
var sdpConstraints = {'mandatory': {
'OfferToReceiveAudio':true,
'OfferToReceiveVideo':true }};function start() {
btn1.disabled = true;
navigator.getUserMedia({audio:true, video:true},
/* get audio and video capture */
gotStream, function() {});
}function gotStream(stream){

attachMediaStream(vid1, stream);
localstream = stream;/* ready to call the peer*/
btn2.disabled = false;
}function call() {
btn2.disabled = true;
btn3.disabled = false;
videoTracks = localstream.getVideoTracks();
audioTracks = localstream.getAudioTracks();
var servers = null;
pc1 = new RTCPeerConnection(servers);/* peer1 connection to server
*/	console.log("hello123");
pc1.onicecandidate = iceCallback1;	console.log("hello12312");
pc2 = new RTCPeerConnection(servers);/* peer2 connection to server
*/
pc2.onicecandidate = iceCallback2;
pc2.onaddstream = gotRemoteStream;
pc1.addStream(localstream);
pc1.createOffer(gotDescription1);
}
function gotDescription1(desc){/* getting SDP from offer by peer2 */
pc1.setLocalDescription(desc);	console.log("hello3");
pc2.setRemoteDescription(desc);
pc2.createAnswer(gotDescription2, null, sdpConstraints);
}
function gotDescription2(desc){/* getting SDP from answer by peer1 */
pc2.setLocalDescription(desc);	console.log("hello4");
pc1.setRemoteDescription(desc);
}function hangup() {
pc1.close();
pc2.close();
pc1 = null; /* peer1 connection to server closed */
pc2 = null; /* peer2 connection to server closed */
btn3.disabled = true; /* disables the Hang Up button */
btn2.disabled = false; /*enables the Call button */
}
function gotRemoteStream(e){
	console.log("hello");
	var vid2=document.getElementById('vid2');
vid2.src = window.URL.createObjectURL(e.stream);
}
function iceCallback1(event){
if (event.candidate) {
		console.log("hello2");
pc2.addIceCandidate(new RTCIceCandidate(event.candidate));
}
}
function iceCallback2(event){
if (event.candidate) {
pc1.addIceCandidate(new RTCIceCandidate(event.candidate));
}
}