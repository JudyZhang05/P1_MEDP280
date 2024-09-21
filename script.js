const story = [
    "Daedalus & Icarus"
    ,"Long long ago, there lived a famous inventor and engineer."
    ,"His name was <b>Daedalus.</b>"
    ,"Daedalus lived happily with his son, <b>Icarus.</b>"
    ,"Until he and his son were scouted out by King Minos."
    ,"Daedalus and his son were commissioned to build a complex and impenetrable labyrinth. "
    ,"For this labyrinth would hold a grotesque and violent monster..."
    ,"the <b>Minotaur.</b>"
    ,"After completing the labyrinth, King Minos couldn\’t risk this secret to spread to the public."
    ,"Thus he imprisoned Daedalus and Icarus to the top of the tower for eternity."
    ,"While the father and son thought hard of an escape plan. Daedalus came up with an idea."
    ,"Together, they collected feathers from birds and wax from candles to create four large wings."
    ,"As Daedalus tied a set of wings to his son, he bestowed a few words of wisdom."
    ,"\“Fly too low, and the sea will drag you down, fly too high and the sun will melt the wax. Don\’t stray away from my side..."
    ,"...follow my lead, son.\”"
    ,"And with that, they set off into the sky, escaping from the island of Crete."
    ,"Too intoxicated by the freedom, the boy, flew high, higher than the clouds, higher than any man or creature has ever been before."
    ,"Powerless and horrified, the father, desperately called after his son, but to no avail."
    ,"It was too late."
    ,"Feather after feather, loosened by the now melted wax drifted further and further away, until there was no more."
    ,"All Daedalus could do was stare hopelessly at his son\’s flailing body rapidly descending into the sea."
    ,"And he was never seen again."
    ,"Befallen with grief and regret, Daedalus retched sobs could be heard from miles away."
    ,"The End."
    ,"Thanks for reading!"
];

let av = [2, 3, 7, 9, 14, 16, 17, 20, 22];

let at = [7, 9]

const device_size = {
    web: "Press the arrow keys to continue"
    ,mob: "Tap to continue"
}

const view = document.querySelector("body");
const panel = document.querySelector(".panel");
let sound = document.querySelector(".sound");
const text = document.querySelector(".narrative");
let vs = document.querySelector(".visual");
const lfall = document.querySelector(".lfall");
const ffall = document.querySelector(".ffall");
const instruct = document.querySelector(".instruction");

const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

let lineNumber = 0;

// Title Page
const reset = () => {
    panel.style.justifyContent = "center";

    sound.style.width = "4em"
    sound.style.filter = "none";

    text.id = "title";
    text.style.animation = "none";

    instruct.style.opacity = "60%";
    instruct.style.fontSize = "1.5em";

    view.style.backgroundImage = "url(./assets/feather.png)";
}
reset();

// storyline
const start = (progress) => {
    panel.style.justifyContent = "space-between";

    sound.style.filter = "brightness(0) saturate(100%) invert(53%) sepia(1%) saturate(1078%) hue-rotate(317deg) brightness(95%) contrast(87%)";
    sound.style.width = "2em"

    text.removeAttribute("id");
    text.style.animation = "none";

    instruct.style.opacity = "30%";
    instruct.style.fontSize = "1em";

    lineNumber+=progress;
}

function go(p){
    text.innerHTML = "";

    if (lineNumber+1 == story.length){
        lineNumber = 0;
        reset();
    }else{
        start(p);
    }

    if(lineNumber == 18){
        setTimeout(() => {
            ffall.style.opacity = "100%";
            ffall.style.animation = "floatdown 5s forwards";
        },1500
    )}

    if(av.includes(lineNumber)){
        setTimeout(() => {
            vs.style.visibility = "visible";
            vs.src = `./assets/d${lineNumber}.png`;
            if(wsize.matches){
                vs.style.width = "150%";
                vs.style.marginTop = "40%"
            }else{
                vs.style.marginTop = "10%"
                vs.style.width = "90%";
            }
            vs.style.opacity = "100%";
            if(lineNumber == 20){
                lfall.style.opacity = "100%";
                lfall.style.top = "60%";
            }
        }, 1500);
    }else{
        if(lineNumber == 21){
            lfall.style.opacity = "0%";
            lfall.style.top = "90%";
        }else{
            lfall.style.opacity = "0%";
            lfall.style.top = "0%";
        }
        vs.style.marginTop = "0%"
        view.style.backgroundImage = "none";
        vs.style.width = "0px";
    }
    
    if(lineNumber !== 0){
        gsap.to(text, {
            duration: 2,
            text: {
                value: story[lineNumber],
                newClass: "class2",
                delimiter: " ",
            },
        });
    }else{
        text.innerHTML = "Daedalus & Icarus"
        reset();
    }

    if(lineNumber == 11 && s == true){
        audio.src = "./assets/t2_e.mp3";
        audio.play();
    }else if(lineNumber == 0 && s == true){
        s = false;
        sound.src = "./assets/s_off.svg";
        audio.src = "./assets/t1.mp3";
    }
}

vs.addEventListener("click", () => {
    if(at.includes(lineNumber)){
        vs.src = `./assets/d${lineNumber}_1.png`
    }
});


// gsap
document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(TextPlugin)
});

// media query
let wsize = window.matchMedia("(max-width: 500px)");
const direct = () => {
    if(wsize.matches){
        instruct.innerHTML = device_size.mob;
    }
    else{
        instruct.innerHTML = device_size.web;
    }
}
direct();
wsize.addEventListener("change", () => {
    direct()
});

document.addEventListener("keydown", (event) => {
    if(event.code == "ArrowRight"){
        go(1);
    }else if(event.code == "ArrowLeft" && lineNumber >= 1){
        go(-1);
    }
});

next.addEventListener("click", () => {
    go(1);
});
prev.addEventListener("click", () => {
    go(-1);
})

//sound
let audio = document.querySelector(".soundTrack")


audio.src = "./assets/t1.mp3";
let s = false;
sound.addEventListener("click", () => {
    if (s == false){
        s = true;
        sound.src = "./assets/s_on.svg";
        audio.play();
    }
    else{
        s = false;
        sound.src = "./assets/s_off.svg";
        audio.pause();
    }
});

