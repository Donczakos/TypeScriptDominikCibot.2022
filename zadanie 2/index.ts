interface recordInfo
{
  time :number;
  clickKey :string;
}
let recordInf:Array<recordInfo> = []as Array<recordInfo>;

const recordInfTab: recordInfo[][] =[[],[],[],[]]

let StartTime = performance.now();

const sounds: (HTMLAudioElement|null)[] =
[
    document.querySelector('[data-sound="boom"]'),
    document.querySelector('[data-sound="clap"]'),
    document.querySelector('[data-sound="hihat"]'),
    document.querySelector('[data-sound="kick"]'),
    document.querySelector('[data-sound="openhat"]'),
    document.querySelector('[data-sound="ride"]'),
    document.querySelector('[data-sound="snare"]'),
    document.querySelector('[data-sound="tink"]')
];

const buttons: (HTMLButtonElement|null)[] =
[
    document.querySelector("#q"),
    document.querySelector("#w"),
    document.querySelector("#e"),
    document.querySelector("#r"),
    document.querySelector("#t"),
    document.querySelector("#y"),
    document.querySelector("#u"),
    document.querySelector("#i")
];
const tracksCheckbox: (HTMLButtonElement|null)[] = 
[
    document.querySelector("#track1Record"),
    document.querySelector("#track2Record"),
    document.querySelector("#track3Record"),
    document.querySelector("#track4Record"),
];
const stopRecord: (HTMLButtonElement|null)[] = 
[
    document.querySelector("#StopRecord1"),
    document.querySelector("#StopRecord2"),
    document.querySelector("#StopRecord3"),
    document.querySelector("#StopRecord4"),
];
const play: (HTMLButtonElement|null)[] = 
[
    document.querySelector("#track1Play"),
    document.querySelector("#track2Play"),
    document.querySelector("#track3Play"),
    document.querySelector("#track4Play"),
];
const boolChanel: (boolean)[] = 
[
false,
false,
false,
false,
];

document.body.addEventListener('keypress',  (keypress) => {
playSound(keypress.key)
}); 

addEventListener('click',  (buttonclick) => {
    buttons.forEach(element => {
        if(element==buttonclick.target){
            
            playSound((buttonclick.target as Element).id);
        }
    });
    }); 
    buttons.forEach(element => {
            element?.addEventListener('click',  (buttonclick) => {recordMusic((buttonclick.target as Element).id); }); 
    });
    tracksCheckbox.forEach(element => {
            element?.addEventListener('keypress',  (keypress) => {recordMusic(keypress.key); }); 
    });

    tracksCheckbox.forEach((element,id) => {
        element?.addEventListener('click',() => {
            StartTime = performance.now();
        boolChanel[id] = true;
        recordInfTab[id] = [];

    });
}),

    stopRecord.forEach((element,id) => {
        element?.addEventListener("click",() =>{
            boolChanel[id] = false;
         });
    });

    play.forEach((element,id) => {
        element?.addEventListener("click",() =>{
            startMusic(id);
         });
    }); 

    function recordMusic(key: string)
{
    for(let i=0;i<boolChanel.length;++i){
    if(boolChanel[i])
    {
    let KlickTime = performance.now()
    recordInfTab[i].push({ time : (KlickTime-StartTime) , clickKey : key })  ;
    }
    }
}

function startMusic(Number:number){

    recordInfTab[Number].forEach(element => {
    setTimeout(() =>{
        playSound(element.clickKey);
    },element.time);

});

}

function playSound(key: string){


    switch(key){
        case 'q':
            (sounds[0]) ? sounds[0].currentTime = 0:null;
            sounds[0]?.play();
        break;

        case 'w':
            (sounds[1]) ? sounds[1].currentTime = 0:null;
            sounds[1]?.play();
        break;

        case 'e':
            (sounds[2]) ? sounds[2].currentTime = 0:null;
            sounds[2]?.play();
        break;

        case 'r':
            (sounds[3]) ? sounds[3].currentTime = 0:null;
            sounds[3]?.play();
        break;

        case 't':
            (sounds[4]) ? sounds[4].currentTime = 0:null;
            sounds[4]?.play();
        break;

        case 'y':
            (sounds[5]) ? sounds[5].currentTime = 0:null;
            sounds[5]?.play();
        break;

        case 'u':
            (sounds[6]) ? sounds[6].currentTime = 0:null;
            sounds[6]?.play();
        break;

        case 'i':
            (sounds[7]) ? sounds[7].currentTime = 0:null;
            sounds[7]?.play();
        break;
    }

}