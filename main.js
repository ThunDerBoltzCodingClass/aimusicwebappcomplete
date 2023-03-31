song1="";
song2="";

song1_status="";
song2_status="";

scoreRightWrist=0;
scoreLeftWrist=0;

rightWristX=0;
rightWristY=0;

leftWristX=0;
leftWristY=0;

function preload(){
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}

function setup(){
    canvas=createCanvas(600, 500);
    canvas.position(300, 200);
    video=createCapture();
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log('poseNet is initialized');
}

function gotPoses(results){
    if(results.length > 0){
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        
        scoreRightWrist=results[0].pose.keypoints[10].score;
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
    }
}

function draw(){
    image(video, 0, 0, 600, 500);
    fill("blue");
    stroke("blue");

    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();

    if(scoreLeftWrist > 0.02){
        circle(leftWristX, leftWristY, 20);
        song1.stop();
        if(song2_status == false){
            song2.play();
            document.getElementById("song").innerHTML="Playing - Peter Pan";
        }
        
    }
    
    if(scoreRightWrist > 0.02){
        circle(rightWristX, rightWristY, 20);
        song2.stop();
        if(song1_status == false){
            song1.play();
            document.getElementById("song").innerHTML="Playing - Harry Potter Theme Song";
        }
        
    }
}

function play(){
    song.play();
}