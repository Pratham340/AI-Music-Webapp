song1="";

song2="";

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

song1_status = "";
song2_status = "";

scoreRightWrist = 0;
scoreLeftWrist = 0;

function preload()
{
	song1 = loadSound("music1.mp3");//Astronomia
	song2 = loadSound("music2.mp3");//Dance Monkey
}

function setup() {
	canvas =  createCanvas(600,400);
	canvas.center();
    canvas.position(470, 270);
	video = createCapture(VIDEO);
	video.hide();
	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded() {
	console.log('PoseNet Is Initialized');
  }

  function gotPoses(results)
{
  if(results.length > 0)
  {
	console.log(results);

	scoreRightWrist =  results[0].pose.keypoints[10].score;
	scoreLeftWrist =  results[0].pose.keypoints[9].score;

	rightWristX = results[0].pose.rightWrist.x;
	rightWristY = results[0].pose.rightWrist.y;
	console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

	leftWristX = results[0].pose.leftWrist.x;
	leftWristY = results[0].pose.leftWrist.y;
	console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
		
  }
}
email = localStorage.getItem("email");
  document.getElementById("email").innerHTML= "<h1>Welcome "+email+"!</h1>";


  function draw(){
	image(video, 0, 0, 600, 400);

	song1_status = song1.isPlaying();
	song2_status = song2.isPlaying();

	fill("#FFFB33");
	stroke("endregion");

	if(scoreRightWrist > 0.2)
	{ 
		circle(rightWristX,rightWristY,20);

			song2.stop();

		if(song1_status == false)
		{
			song1.play();
			document.getElementById("song").innerHTML = "Playing - Astronomia  Song";
		}
	}
    if(scoreLeftWrist > 0.2)
	{
		circle(leftWristX,leftWristY,20);

			song1.stop();

		if(song2_status == false)
		{
			song2.play();
			document.getElementById("song").innerHTML = "Playing - Dance Monkey (8D Audio)";
		}
  }
}
  
  function play()
{
	song.play();
	song.setVolume(1);
	song.rate(1);
}