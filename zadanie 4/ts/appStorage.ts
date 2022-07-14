import { Notes } from "./notes"
import { Note } from "./note"
import { Store } from "./interface/interfaceStore"
export class appStorage implements Store {
     _arrNotes:Note[] = []
     _arrNotesString:string[] = []
     _arrNotesStringDone:string[] = []
    constructor(arrNotes:Note[]){
        this._arrNotes = arrNotes;
        this.viewNotes()
    }
    isDone():void{
        let buttonDelete =  document.querySelectorAll(".buttonDone") ;
        const arrayNotDone = this._arrNotes.filter(e=>e["_done"] === false);
        console.log(arrayNotDone)
         buttonDelete?.forEach((e,key)=>{
            e?.addEventListener("click", (event) => {
                const indexTask:number = this._arrNotes.indexOf(arrayNotDone[key]);
                // this._arrNotes.indexOf(arrayNotDone[key])
                this._arrNotes[indexTask]["_done"] = true;
                console.log(this._arrNotes)
                this.viewNotes()
            })        
         })
       
        }
    viewNotes():void{
        console.log("viewNotes()")
        localStorage.setItem('Notes', JSON.stringify(this._arrNotes))
        const arrNotes = JSON.parse(localStorage.getItem("Notes") as string); // JSON ??????
        this._arrNotesString = arrNotes.map((note:Note,key:number)=>{
            return !note["_done"] ? this.sortElement(note["_id"],note["_color"],note["_contents"],note["_color"],note["_important"],note["_date"]) : "";
        })
        this._arrNotesStringDone = arrNotes.map((note:Note,key:number)=>{
            return note["_done"] ? this.sortElement(note["_id"],note["_color"],note["_contents"],note["_color"],note["_important"],note["_date"],true) : "";
        })
 
        this.showElement()
        this.isDone();
    }

    showElement():void{
        (document.querySelector(".listTask") as HTMLDivElement).innerHTML = this._arrNotesString.join("");
        (document.querySelector(".listTaskDone") as HTMLDivElement).innerHTML = this._arrNotesStringDone.join("")
    }

    sortElement(key:number,title:string,contents:string,color:string,important: boolean,date: number,buttonDone = false):string{
        const fullDate = new Date(date)
        let result =""
        if(buttonDone)
        {
            result= `<div class="listaToDo"><p style="color:${color}">id: ${key+1} | ${title} | ${contents} | ${fullDate} |  <button style="display:none" class="buttonDone">Zrobione</button></p></div>`
        }
        else{
            result= `<div class="listaToDo" style="background:${important ? '#ef9595': 'transparent'}">${important ? 'WAŻNE': ''}<p style="color:${color}">id: ${key+1} | ${title} | ${contents} | ${fullDate} | <button class="buttonDone">Zrobione</button></p></div>`
        }
        
        return result
    }
}