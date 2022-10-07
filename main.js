objects = [];
status = "";
video = "";

function preload()
{
    video = createCapture(VIDEO);
    video.size(480, 380);
    video.hide();
}

function setup()
{
    canvas = createCanvas(480, 380);
    canvas.center();
}

function draw()
{
    image(video, 0, 0, 480, 380)
        if(status != "")
        {
            objectDetector.detect(video, gotResult);

            for(i = 0; i < objects.length; i++)
            {
                 document.getElementById("status").innerHTML = "Status : Objects Detected";
                 document.getElementById("status_found").innerHTML = "Number of objects : " + objects.length;

                fill("red");
                percent = floor(objects[i].confidence * 100);
                label = objects[i].label;
                objectX = objects[i].x;
                objectY = objects[i].y;

                text(label + " " + percent + "%", objectX + 15, objectY + 15);
                noFill();
                stroke("red");
                rect(objectX, objectY, objects[i].width, objects[i].height);
            }
        }
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    synth = window.speechSynthesis;
    utter = SpeechSynthesisUtterance;

    synth.play(utter);
}

function modelLoaded()
{
    console.log("Model Loaded");
    status = true;
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }

    console.log(results);
    objects = results;
}