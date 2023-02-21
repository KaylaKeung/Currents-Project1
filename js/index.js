let screenTimer = null,
	timer = null,
	bannerTimer=null;
let imgArr = [],renderArr=[];
let allMoveNum=0, moveNum=0;
let previewIndex=0,imgIndex=0;
renderDate();

$(".pre").click(function(){
	if(imgIndex>imgArr.length-1){
		return;
	}
	imgIndex++;
	previewIndex = renderArr.length-imgIndex;
	$(".pre").attr("src","./img/pre1.png");
	$(".bottomCon>div").eq(previewIndex).find("img").css("left","40px");
	$(".bottomCon>div").eq(previewIndex).find(".rLine").css("right","-40px");
	$(".bottomCon>div").eq(previewIndex).find(".rLine").css("background","linear-gradient(rgba(255,255,255,1),rgba(255,255,255,0))");
	setTimeout(()=>{
		$(".pre").attr("src","./img/pre.png");
		$(".bottomCon>div").eq(previewIndex).find("img").css("left","0px");
		$(".bottomCon>div").eq(previewIndex).find(".rLine").css("right","0px");
		$(".bottomCon>div").eq(previewIndex).find(".rLine").css("background","linear-gradient(rgba(23,255,213,1),rgba(255,255,255,0))");
	},1000)
	$(".preview").attr("src",renderArr[previewIndex].url);
	$(".previewTime").html(renderArr[previewIndex].time);
	toMove();
})
$(".next").click(function(){
	if(imgIndex<2){
		return;
	}
	imgIndex--;
	previewIndex = renderArr.length-imgIndex;
	$(".next").attr("src","./img/next1.png");
	$(".bottomCon>div").eq(previewIndex).find("img").css("left","40px");
	$(".bottomCon>div").eq(previewIndex).find(".rLine").css("right","-40px");
	$(".bottomCon>div").eq(previewIndex).find(".rLine").css("background","linear-gradient(rgba(255,255,255,1),rgba(255,255,255,0))");
	$(".bottomCon>div").eq(previewIndex).find("img").css("left","40px")
	setTimeout(()=>{
		$(".next").attr("src","./img/next.png");
		$(".bottomCon>div").eq(previewIndex).find("img").css("left","0px");
		$(".bottomCon>div").eq(previewIndex).find(".rLine").css("right","0px");
		$(".bottomCon>div").eq(previewIndex).find(".rLine").css("background","linear-gradient(rgba(23,255,213,1),rgba(255,255,255,0))");
	},1000)
	$(".preview").attr("src",renderArr[previewIndex].url);
	$(".previewTime").html(renderArr[previewIndex].time);
	toMove();
})

function getNowDate(type) {
	var date = new Date();
	var sign2 = ":";
	var year = date.getFullYear()
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hour = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds()
	// if (month >= 1 && month <= 9) {
	// 	month = "0" + month;
	// }
	// if (day >= 0 && day <= 9) {
	// 	day = "0" + day;
	// }
	if (hour >= 0 && hour <= 9) {
		hour = "0" + hour;
	}
	if (minutes >= 0 && minutes <= 9) {
		minutes = "0" + minutes;
	}
	if (seconds >= 0 && seconds <= 9) {
		seconds = "0" + seconds;
	}
	if (type == 'day') {
		return day + "/" + month + "/" + year;
	} else {
		return hour + sign2 + minutes + sign2 + seconds;
	}
}
function formatDate(date){
	let dateArr = date.split('/');
	let mons=['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEPT','OCT','NOV','DEC'];
	return mons[dateArr[1]-1]+' '+dateArr[0]+' '+dateArr[2]
}
function renderDate() {
	$(".date").html(formatDate(getNowDate("day")))
	timer && clearInterval(timer)
	timer = setInterval(() => {
		let timeArr = getNowDate().split(":");
		$(".hour").html(timeArr[0]);
		$(".minute").html(timeArr[1]);
		$(".second").html(timeArr[2]);
	}, 1000)
}

function renderScreen() {
	let bottomBox = $(".bottomBox");
	let bottomCon = $(".bottomCon");
	let zIndex = 999999999;
	let html = "";
	// console.log(imgArr)
	let newImgArr = imgArr.concat();
	newImgArr.push(imgArr[0]);
	renderArr = newImgArr.concat().reverse();
	let width = bottomBox[0].offsetWidth * 0.6,
		height = bottomBox[0].offsetHeight;
	$(".line").css('left', width + 'px')
	$(".line").css('display', 'block');
	$(".mask").css("width",width+"px");
	renderArr.forEach((item, index) => {
		let l=null,t=null;
			l = index * 50;
			t = index * 50;
		let z = zIndex - index * 10;
		if(index>0){
			l=l-50-allMoveNum;
			t=t-50-allMoveNum;
		}
		html += `<div style="position: absolute;left:${l}px;top:${t}px;width:${width}px;height:${height}px;z-index:${z}">
					<p class="time">${item.time}</p>
					<img src='${item.url}'/>
					<p class="rLine"></p>
					</div>`
		// bottomCon.html(html);
		$(".bottomCon").css("width",width+l);
	})
	bottomCon.html(html);
	let bottomDiv=$(".bottomCon>div");
	for (let i = 0; i < bottomDiv.length; i++) {
		if(i>0){
			let nowDiv=bottomDiv.eq(i);
			let l = nowDiv.position().left;
			let t = nowDiv.position().top;
			nowDiv.css("left",l+50+'px');
			nowDiv.css("top",t+50+'px');
		}
	}
	previewIndex==0 && $(".preview").attr("src",renderArr[previewIndex].url);
	previewIndex==0 && $(".previewTime").html(renderArr[previewIndex].time);
	$(".preview").css("display","block")
	addClick();
}


function addClick(){
	$(".bottomCon>div").click(function(event){
		event.stopPropagation();
		let index = $(this).index();
		previewIndex = index;
		imgIndex = renderArr.length-previewIndex;
		// console.log(previewIndex,$(this).find("p.time").html())
		$(".preview").attr("src",renderArr[previewIndex].url);
		$(".previewTime").html(renderArr[previewIndex].time);
		toMove();
	})
}

function toMove(type){
	// console.log("previewIndex111111111",imgArr.length,previewIndex,imgArr[previewIndex].time)
	let bottomDiv=$(".bottomCon>div");
	for (let i = 0; i < bottomDiv.length; i++) {
		if(i>0){
			let nowDiv=bottomDiv.eq(i);
			let l = (i-previewIndex+1)*50;
			let t = (i-previewIndex+1)*50;
			if(i==1){
				moveNum=parseInt(bottomDiv.eq(i).position().left-l);
			}
			nowDiv.css("left",l+'px');
			nowDiv.css("top",t+'px');
		}
	}
	allMoveNum+=moveNum;
}