const videoElem = document.getElementById("video");
const logElem = document.getElementById("log");
const startElem = document.getElementById("start");
const stopElem = document.getElementById("stop");

// Options for getDisplayMedia()

var displayMediaOptions = {
	video: {
		cursor: "never"
	},
	audio: false
};
startCapture();
// Set event listeners for the start and stop buttons
// startElem.addEventListener("click", function(evt) {
// 	startCapture();
// }, false);

// stopElem.addEventListener("click", function(evt) {
// 	stopCapture();
// }, false);
// console.log = msg => logElem.innerHTML += `${msg}<br>`;
// console.error = msg => logElem.innerHTML += `<span class="error">${msg}</span><br>`;
// console.warn = msg => logElem.innerHTML += `<span class="warn">${msg}<span><br>`;
// console.info = msg => logElem.innerHTML += `<span class="info">${msg}</span><br>`;
async function startCapture() {
	// logElem.innerHTML = "";

	try {
		videoElem.srcObject = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
		// dumpOptionsInfo();

		let video = document.getElementById("video")
		
		setTimeout(() => {
			toScreenshot();
		}, 1000)
	} catch (err) {
		console.error("Error: " + err);
	}
}
function toScreenshot(){
	let time = getNowDate();
	html2canvas(video).then(function(canvas) {
		// console.log(canvas)
		// document.body.appendChild(canvas);
		let imgUrl = canvas.toDataURL("image/png");
		imgArr.push({
			time:time,
			url:imgUrl
		});
		$(".numBox").html(imgArr.length)
		$(".second").css("color","#17FFD5");
		$(".numBox").css("background","#17ffd5");
		
		setTimeout(()=>{
			$(".second").css("color","#fff");
			$(".numBox").css("background","#fff");
		},1000)
		renderScreen();
	});
	$("#video").css("width","300px");
	$("#video").css("height","180px");
	screenTimer && clearInterval(screenTimer)
	screenTimer = setInterval(()=>{
		// if(imgArr.length==15){
		// 	clearInterval(screenTimer);
		// }
		let time = getNowDate();
		html2canvas(video).then(function(canvas) {
			// console.log(canvas)
			// document.body.appendChild(canvas);
			let imgUrl = canvas.toDataURL("image/png");
			imgArr.push({
				time:time,
				url:imgUrl
			});
			$(".numBox").html(imgArr.length)
			$(".second").css("color","#17FFD5");
			$(".numBox").css("background","#17ffd5");
			
			setTimeout(()=>{
				$(".second").css("color","#fff");
				$(".numBox").css("background","#fff");
			},1000)
			renderScreen();
		});
	},10000)
}
function stopCapture(evt) {
	let tracks = videoElem.srcObject.getTracks();

	tracks.forEach(track => track.stop());
	videoElem.srcObject = null;
}

function dumpOptionsInfo() {
	const videoTrack = videoElem.srcObject.getVideoTracks()[0];

	console.info("Track settings:");
	console.info(JSON.stringify(videoTrack.getSettings(), null, 2));
	console.info("Track constraints:");
	console.info(JSON.stringify(videoTrack.getConstraints(), null, 2));


	let video = document.getElementById("video")
	html2canvas(video, {
		onrendered: function(canvas) {
			var url = canvas.toDataURL(); //图片地址
			document.body.appendChild(canvas);
		},
		width: 300,
		height: 300
	});
}

$(document).ready(function() {
	// document.getElementById("start").click();

	function triggerClick() {
		var event = new MouseEvent('click', {
			'view': window,
			'bubbles': true,
			'cancelable': true
		});
		var cb = document.querySelector('input[type=submit][name=btnK]');
		var canceled = !cb.dispatchEvent(event);
		if (canceled) {
			// preventDefault was called and the event cancelled
		} else {
			// insert your event-logic here...
		}
	}
});
