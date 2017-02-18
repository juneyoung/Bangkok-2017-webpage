let sampleVideoSrc = '../resources/videos/dock.mp4';

window.addEventListener('load', function(){
	var videoAreaId = 'video_jumbotron';
	document.getElementById(videoAreaId).className = 'fullscreen';
	loadBigVideo(document.getElementById(videoAreaId), sampleVideoSrc);
	//loadTubularVideo(document.getElementById(videoAreaId));
}, false);

// Add bigvidoe.js
// Video UI - Sample: weapon of choice - https://youtu.be/wCDIYvFmgW8

function loadBigVideo(elem, videoSrc){
    try{
	    //var BV = new $.BigVideo({container : $(elem), useFlashForFirefox:false});
	    var BV = new $.BigVideo();
		BV.init();
	    BV.show([
	        { type: "video/mp4",  src: videoSrc },
	        { type: "video/webm", src: videoSrc },
	        { type: "video/ogg",  src: videoSrc }
	    ]);
    } catch(BigvideoException) {
    	alert('failed to load Bigvideo Video');
    	console.error(BigvideoException);
    }
}

function loadTubularVideo(elem, youtubeId, options){
	try{
		$(elem).tubular({videoId : youtubeId});
	} catch(tubularException){
		alert('failed to load Tubular video');
		console.error(tubularException);
	}
}