let currentImg;
let ML = "";

function httpPost(data) {
    var http = new XMLHttpRequest();
    var url = '';
    http.open('POST', url, true);

    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            console.log(http.responseText);
        }
    }
    http.send("Buzz: " + data);
}

function updateAnalysis(currentImg) {
    var http = new XMLHttpRequest();
    var url = '';
    http.open('POST', url, true);

    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            // console.log(http.responseText);
            let results = document.getElementById("info");
            results.getElementsByTagName("ul")[0].innerHTML = http.responseText;
        }
    }
    http.timeout = 2000;
    http.send("Analysis: " + currentImg);
}

function connectionTest() {
    var http = new XMLHttpRequest();
    var url = '';
    http.open('POST', url, true);

    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            alert(http.responseText);
        }
    }

    http.send("Connection test");
}

const playClass = "fa fa-play";
const pauseClass = "fa fa-pause";

function playPauseToggle() {
    var inputVid = document.getElementById("video");
    var inputBtn = document.getElementById("playPause");

    if (inputVid.duration != NaN) {
        return;
    }

    if (inputVid.paused) {
        inputBtn.className = pauseClass;
        inputVid.play();
    } else {
        inputBtn.className = playClass;
        inputVid.pause();
    }
}

function updateVidProgress() {
    var inputVid = document.getElementById("video");
    var vidProgress = document.getElementById("progress");

    vidProgress.style.width = (inputVid.currentTime * 100  / inputVid.duration) + "%"
}



function setupButtons() {
    // let nav = document.getElementById("navigation");
    // nav.getElementsByTagName("li")[0].addEventListener("click", function(){typeChosen(this)});
    // nav.getElementsByTagName("li")[1].addEventListener("click", function(){typeChosen(this)});
    // nav.getElementsByTagName("li")[2].addEventListener("click", function(){typeChosen(this)});
    // nav.getElementsByTagName("li")[3].addEventListener("click", function(){typeChosen(this)});
    // typeChosen(nav.getElementsByTagName("li")[0]);

	// Setup machine learning check button
    // document.getElementById("machine-learning-checkbox").addEventListener(
    //     "click", 
    //     function(){toggleMachineLearning(this)}
    // );

    // let testResponse = document.getElementById("testResponse");
    // testResponse.addEventListener("click", function(){connectionTest()});

    var inputNode = document.getElementById("videoFile");
    inputNode.addEventListener('change', playSelectedFile, false)

    var inputVid = document.getElementById("video");
    inputVid.ontimeupdate = function() {updateVidProgress()};
}

var URL = window.URL || window.webkitURL

var playSelectedFile = function (event) {
    var file = this.files[0]
    var type = file.type
    var videoNode = document.getElementById("video");
    var canPlay = videoNode.canPlayType(type)
    if (canPlay === '') canPlay = 'no'
    var message = 'Can play type "' + type + '": ' + canPlay
    var isError = canPlay === 'no'

    if (isError) {
      return
    }

    var fileURL = URL.createObjectURL(file)
    videoNode.src = fileURL
}


setupButtons();

