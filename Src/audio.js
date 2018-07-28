var ctx = new AudioContext();
var	analyser = ctx.createAnalyser();
var inputVid = document.getElementById("video");
var source = ctx.createMediaElementSource(inputVid);
source.connect(analyser);
analyser.connect(ctx.destination);

function processAudio() {
	var myVar = setInterval(myTimer, 100);
}

const NO_VOICE = 0;
const VOICE = 1;
let countThreshold = 0;
let state = NO_VOICE;

function voiceDetect() {
	console.log(Math.max(...dataArray));

	switch(state) {
    case VOICE:
    	console.log("There's a voice :D" + countThreshold);
  		inputVid.playbackRate = 1.0;
  		if (countThreshold == 0) {
  			inputVid.currentTime = inputVid.currentTime - 1.5;
  			countThreshold++;
  		}

      if (Math.max(...dataArray) < 110) {
				countThreshold++;
				if (countThreshold > 5) {
					
					countThreshold = 0;
					state = NO_VOICE;
				}

			} else {
				countThreshold = 1;
			}
      break;
    case NO_VOICE:
    	// inputVid.playbackRate = 5.0;
    	inputVid.currentTime = inputVid.currentTime + .5;
    	console.log("no voice" + countThreshold);
        
    	if (Math.max(...dataArray) > 110) {
				countThreshold++;

				if (countThreshold > 3) {
					countThreshold = 0;
					state = VOICE;
				}
				
			} else {
				countThreshold = 1;
			}

      break;
    default:
	}
}

var dataArray;
function myTimer() {
		analyser.fftSize = 8192;
    // dataArray = new Float32Array(analyser.fftSize);
    dataArray = new Uint8Array(analyser.fftSize);
		// analyser.getFloatTimeDomainData(dataArray);
		// console.log("Time domain diff " + (Math.max(...dataArray) - Math.min(...dataArray)));
		analyser.getByteFrequencyData(dataArray);
		// console.log(dataArray);
		// console.log("Frequency domain max " + (Math.max(...dataArray)));
		// console.log(dataArray);
		// Threshold 120


		voiceDetect();

}

//Create 2D canvas
const canvas = document.createElement('canvas');
canvas.style.position = 'relative';
canvas.width = window.innerWidth;
canvas.height = window.innerHeight/2;
document.body.appendChild(canvas);
const canvasCtx = canvas.getContext('2d');
canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

function draw() {
  //Schedule next redraw
  requestAnimationFrame(draw);
  if (!dataArray) {
  	return;
  }

  //Draw black background
  canvasCtx.fillStyle = 'rgb(0, 0, 0)';
  canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

  //Draw spectrum
  var bufferLength = dataArray.length;
  const barWidth = (canvas.width / bufferLength) * 2.5;
  let posX = 0;
  for (let i = 0; i < bufferLength; i++) {
    const barHeight = (dataArray[i] * 3);
    canvasCtx.fillStyle = 'rgb(' + Math.floor(barHeight + 100) + ', 50, 50)';
    canvasCtx.fillRect(posX, canvas.height - barHeight / 2, barWidth, barHeight / 2);
    posX += barWidth + 1;
  }
};

draw();