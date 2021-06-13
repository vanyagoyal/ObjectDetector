status = "";
clock_img = "";
objects = [];

function preload(){
    clock_img = loadImage("clock.jpg");
}

function setup(){
    canvas1 = createCanvas(400 , 400);
    canvas1.parent("clock_div");
    //webcam = createCapture(VIDEO);
    //webcam.hide();
    detector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Status :- Detecting Objects";
}

function draw(){
    //image(webcam , 0 , 0 , 400 , 350);
    image(clock_img , 0 , 0 , 400 , 400);
    
    if (status != " "){
        for (i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status :- Objects Detected";
            document.getElementById("number").innerHTML = "Number Of Objects Detected :- " + objects.length;
            fill('#ff0000');
            percentage = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + "%" , objects[i].x , objects[i].y);
            noFill();
            stroke('#ff0000');
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
        }
    }
}

function modelLoaded(){
    console.log("COCO SSD MODEL LOADED!!");
    status = true;
    detector.detect(clock_img , gotResult);
}

function gotResult(error , result){
    if (error) {
        console.error("ERROR --> " , error);
    }
    console.log("RESULT ➡ " , result);
    objects = result;
}