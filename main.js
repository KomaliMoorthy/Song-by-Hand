song1 = "";
song2 = "";
song1status = "";
song2status = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
righttWristY = 0;
scoreleftwrist = 0;
scorerightwrist = 0;

function preload() {
 song1 = loadSound("Peter Pan - Flying (Piano Version) - YouTube.webm ");
 song2 = loadSound("Hedwig's Theme - Youtube.mp3 ");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses );
}

function modelLoaded() {
    console.log('poseNet is Initialized');
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill('#800000');
    stroke('#800000');
    song1status = song1.isPlaying();
    song2status = song2.isPlaying();

    if(scorerightwrist > 0.2) {
    circle(rightWristX,rightWristY,20);
    song2.stop();
    if (song1status == false) {
        song1.play();
        document.getElementById("song").innerHTML = "Playing - Peter Pan";
    }
}
if(scoreleftwrist > 0.2) {
    circle(leftWristX,leftWristY,20);
    song1.stop();
    if (song2status == false) {
        song2.play();
        document.getElementById("song").innerHTML = "Playing - Hedwig's Theme";
    }
}
}

function gotPoses(results) {
 if(results.length > 0)
 {
     console.log(results);
     scoreleftwrist = results[0].pose.keypoints[9].score;
     scorerightwrist = results[0].pose.keypoints[10].score;
     console.log("scorerightwrist = "+scorerightwrist+"scoreleftwrist = "+scoreleftwrist);

     leftWristX = results[0].pose.leftWrist.x;
     leftWristY = results[0].pose.leftWrist.y;
     console.log('leftWristX' +leftWristX+ 'leftWristY' +leftWristY);

     rightWristX = results[0].pose.rightWrist.x;
     rightWristY = results[0].pose.rightWrist.y;
     console.log('rightWristX' +rightWristX+ 'rightWristY' +rightWristY);

 }
}