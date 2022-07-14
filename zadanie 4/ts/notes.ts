import { Note } from "./note"
import { appStorage } from "./appStorage"
import {appFiresoreStorage} from "./appFiresoreStorage"
export class Notes {
     private _arrNotes: Note[] =  [];
    constructor(localData: string) {
        this.addNotes(localData);
        
    }
    addNotes(localData:string):void {
        if (localData === "localStorage"){

            JSON.parse(localStorage.getItem("Notes") as string).length > 0 ? this._arrNotes = JSON.parse(localStorage.getItem("Notes") as string) : [];
          
        }  

       
        (document.querySelector(".addButton") as HTMLButtonElement)?.addEventListener("click", (event) => {
            const title = (document.querySelector(".title") as HTMLInputElement).value
            const contents = (document.querySelector(".contents") as HTMLInputElement).value
            const color = (document.querySelector(".color") as HTMLInputElement).value
            const important = (document.querySelector(".important") as HTMLInputElement).checked 
            this._arrNotes.push(new Note(this._arrNotes.length,title, contents, color, important)); 
            this.addData(localData)
            this.clear();
        })
        this.addData(localData)
    }
    clear():void {
        (document.querySelector(".title") as HTMLInputElement).value = "";
        (document.querySelector(".contents") as HTMLInputElement).value = "";
        (document.querySelector(".color") as HTMLInputElement).value = "";
        (document.querySelector(".important") as HTMLInputElement).checked = false;
    }
    addData(localData:string){
        console.log(localData === "localStorage")
        if (localData === "localStorage"){

            new appStorage(this._arrNotes);
        }  
        else{
            new appFiresoreStorage(this._arrNotes);
        }
    }
    
}