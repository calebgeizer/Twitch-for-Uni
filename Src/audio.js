var ctx = new AudioContext();
var	analyser = ctx.createAnalyser();
var inputVid = document.getElementById("video");
var source = ctx.createMediaElementSource(inputVid);
source.connect(analyser);
analyser.connect(ctx.destination);

const NO_VOICE = 0;
const VOICE = 1;
let countThreshold = 0;
let state = VOICE;

function voiceDetect() {
	console.log(Math.max(...dataArray));

	switch(state) {
    case VOICE:
    	console.log("There's a voice :D" + countThreshold);
  		inputVid.playbackRate = userSpeed;
  		if (countThreshold == 0) {
  			inputVid.currentTime = inputVid.currentTime - 2;
  			countThreshold++;
  		}

      if (Math.max(...dataArray) < 110) {
				countThreshold++;
				if (countThreshold > 10) {
					
					countThreshold = 0;
					state = NO_VOICE;
				}

			} else {
				countThreshold = 1;
			}
      break;
    case NO_VOICE:
    	// inputVid.playbackRate = 5.0;
    	inputVid.currentTime = inputVid.currentTime + 1;
    	console.log("no voice" + countThreshold);
        
    	if (Math.max(...dataArray) > 70) {
				countThreshold++;

				if (countThreshold > 2) {
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

var lastVal = 0;
function voiceDetect2() {
	let variance = Math.floor(getVar(dataArray) - Math.max(...dataArray) / inputVid.volume);
	console.log(lastVal - variance)
	let value = Math.abs(lastVal - variance);
	switch(state) {
    case VOICE:
    	console.log("There's a voice " + countThreshold);
  		inputVid.playbackRate = userSpeed;
  		if (countThreshold == 0) {
  			inputVid.currentTime = inputVid.currentTime - 3;
  			countThreshold++;
  		}

      if (value < 30) {
				countThreshold++;
				if (countThreshold > 40) {
					
					countThreshold = 0;
					state = NO_VOICE;
				}

			} else {
				countThreshold = 1;
			}
      break;
    case NO_VOICE:
    	inputVid.playbackRate = 10.0;
    	// inputVid.currentTime = inputVid.currentTime + 1;
    	console.log("no voice " + countThreshold);
        
    	if (value > 30) {
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

	lastVal = variance;
}

function getVar(arr) {

    function getVariance(arr, mean) {
        return arr.reduce(function(pre, cur) {
            pre = pre + Math.pow((cur - mean), 2);
            return pre;
        }, 0)
    }

    var meanTot = arr.reduce(function(pre, cur) {
        return pre + cur;
    })
    var total = getVariance(arr, meanTot / arr.length);

    var res = {
        mean: meanTot / arr.length,
        variance: total / arr.length
    }

    // return ["Mean:",
    //     res.mean,
    //     "Variance:",
    //     res.variance
    // ].join(' ');

    return res.variance;
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
		// voiceDetect();
		voiceDetect2();

		if ((state == NO_VOICE)) {
			setTimeout(myTimer, 100);
		} else {
			setTimeout(myTimer, 100);
		}
		
}

//Create 2D canvas
// const canvas = document.createElement('canvas');
// canvas.style.position = 'relative';
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight/2;
// document.body.appendChild(canvas);
// const canvasCtx = canvas.getContext('2d');
// canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

// function draw() {
//   //Schedule next redraw
//   requestAnimationFrame(draw);
//   if (!dataArray) {
//   	return;
//   }

//   //Draw black background
//   canvasCtx.fillStyle = 'rgb(0, 0, 0)';
//   canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

//   //Draw spectrum
//   var bufferLength = dataArray.length;
//   const barWidth = (canvas.width / bufferLength) * 2.5;
//   let posX = 0;
//   for (let i = 0; i < bufferLength; i++) {
//     const barHeight = (dataArray[i] * 3);
//     canvasCtx.fillStyle = 'rgb(' + Math.floor(barHeight + 100) + ', 50, 50)';
//     canvasCtx.fillRect(posX, canvas.height - barHeight / 2, barWidth, barHeight / 2);
//     posX += barWidth + 1;
//   }
// };

// draw();