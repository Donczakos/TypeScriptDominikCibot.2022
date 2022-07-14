"use strict";
let recordInf = [];
const recordInfTab = [
    [],
    [],
    [],
    []
];
let isRecolding = false;
let StartTime = performance.now();
const sounds = [
    document.querySelector('[data-sound="boom"]'),
    document.querySelector('[data-sound="clap"]'),
    document.querySelector('[data-sound="hihat"]'),
    document.querySelector('[data-sound="kick"]'),
    document.querySelector('[data-sound="openhat"]'),
    document.querySelector('[data-sound="ride"]'),
    document.querySelector('[data-sound="snare"]'),
    document.querySelector('[data-sound="tink"]')
];
const buttons = [
    document.querySelector("#q"),
    document.querySelector("#w"),
    document.querySelector("#e"),
    document.querySelector("#r"),
    document.querySelector("#t"),
    document.querySelector("#y"),
    document.querySelector("#u"),
    document.querySelector("#i")
];
const tracksCheckbox = [
    document.querySelector("#track1Record"),
    document.querySelector("#track2Record"),
    document.querySelector("#track3Record"),
    document.querySelector("#track4Record"), 
];
const stopRecord = [
    document.querySelector("#StopRecord1"),
    document.querySelector("#StopRecord2"),
    document.querySelector("#StopRecord3"),
    document.querySelector("#StopRecord4"), 
];
const play = [
    document.querySelector("#track1Play"),
    document.querySelector("#track2Play"),
    document.querySelector("#track3Play"),
    document.querySelector("#track4Play"), 
];
const boolChanel = [
    false,
    false,
    false,
    false, 
];
document.body.addEventListener("keypress", (keypress)=>{
    playSound(keypress.key);
});
addEventListener("click", (buttonclick)=>{
    buttons.forEach((element)=>{
        if (element == buttonclick.target) playSound(buttonclick.target.id);
    });
});
buttons.forEach((element)=>{
    if (element != null) element.addEventListener("click", (buttonclick)=>{
        recordMusic(buttonclick.target.id);
    });
});
tracksCheckbox.forEach((element)=>{
    if (element != null) {
        console.log("sdadsad");
        element.addEventListener("keypress", (keypress)=>{
            recordMusic(keypress.key);
        });
    }
});
tracksCheckbox.forEach((element, id)=>{
    if (element != null) element.addEventListener("click", ()=>{
        StartTime = performance.now();
        boolChanel[id] = true;
        recordInfTab[id] = [];
    });
}), stopRecord.forEach((element, id)=>{
    if (element != null) element.addEventListener("click", ()=>{
        boolChanel[id] = false;
    });
});
play.forEach((element, id)=>{
    if (element != null) element.addEventListener("click", ()=>{
        startMusic(id);
    });
});
function recordMusic(key) {
    for(let i = 0; i < boolChanel.length; ++i)if (boolChanel[i]) {
        let KlickTime = performance.now();
        recordInfTab[i].push({
            time: KlickTime - StartTime,
            clickKey: key
        });
    }
}
function startMusic(Number) {
    recordInfTab[Number].forEach((element)=>{
        setTimeout(()=>{
            playSound(element.clickKey);
            console.log(element);
        }, element.time);
    });
}
function playSound(key) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    switch(key){
        case "q":
            sounds[0] && (sounds[0].currentTime = 0);
            (_a = sounds[0]) === null || _a === void 0 || _a.play();
            break;
        case "w":
            sounds[1] && (sounds[1].currentTime = 0);
            (_b = sounds[1]) === null || _b === void 0 || _b.play();
            break;
        case "e":
            sounds[2] && (sounds[2].currentTime = 0);
            (_c = sounds[2]) === null || _c === void 0 || _c.play();
            break;
        case "r":
            sounds[3] && (sounds[3].currentTime = 0);
            (_d = sounds[3]) === null || _d === void 0 || _d.play();
            break;
        case "t":
            sounds[4] && (sounds[4].currentTime = 0);
            (_e = sounds[4]) === null || _e === void 0 || _e.play();
            break;
        case "y":
            sounds[5] && (sounds[5].currentTime = 0);
            (_f = sounds[5]) === null || _f === void 0 || _f.play();
            break;
        case "u":
            sounds[6] && (sounds[6].currentTime = 0);
            (_g = sounds[6]) === null || _g === void 0 || _g.play();
            break;
        case "i":
            sounds[7] && (sounds[7].currentTime = 0);
            (_h = sounds[7]) === null || _h === void 0 || _h.play();
            break;
    }
}

//# sourceMappingURL=index.c36f364e.js.map
