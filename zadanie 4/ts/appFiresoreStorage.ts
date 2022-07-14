import { initializeApp } from "firebase/app";
import { Note } from "./note"
import {collection, getDocs,doc, getFirestore,setDoc} from "firebase/firestore"
import { Store } from "./interface/interfaceStore"
export class appFiresoreStorage implements Store {
     _arrNotes:Note[] = []
     _arrNotesString:string[] = []
     _arrNotesStringDone:string[] = []

    firebaseConfig = {
        apiKey: "AIzaSyCzMJB5mmZQ6GYycyB7nHdi4pFnHr2RKKE",
        authDomain: "zad4-8da5f.firebaseapp.com",
        projectId: "zad4-8da5f",
        storageBucket: "zad4-8da5f.appspot.com",
        messagingSenderId: "786587009542",
        appId: "1:786587009542:web:b1186a4234f5cc61533987"
      };
      getDb:any = ()=>{}
      colRef:any = ()=>{}

    constructor(arrNotes:Note[]){   
        console.log("arrNotes", arrNotes)
        console.log("arrNotes", JSON.stringify(arrNotes))
    
        this.init();
        this.download();
       
        this._arrNotes.push(...arrNotes); 
        console.log("gotowe", this._arrNotes);
    
        this.setData(JSON.stringify(this._arrNotes)) 
        this.viewNotes();
    }

    download(){
         getDocs(this.colRef)
          .then((snapshot:any)=>{
            let store:any  =[]
            snapshot.docs.forEach((doc:any)=>{
                store.push(doc.data().zad4)
                
            })
            console.log(store)
          })
    }
    setData(data: string){ 
         setDoc(doc(this.getDb,"zad4","zad4"),{"zad4":`${JSON.stringify(this._arrNotes)}`});
    }
    init(){
     
          const app = initializeApp(this.firebaseConfig);
           const db = getFirestore();
           const colRef = collection(db,"zad4");
          this.getDb = db; 
          this.colRef = colRef; 

    }

    viewNotes():void{
        console.log("viewNotes()")
        localStorage.setItem('Notes', JSON.stringify(this._arrNotes))
        const arrNotes = JSON.parse(localStorage.getItem("Notes") as string);
        this._arrNotesString = arrNotes.map((note:Note,key:number)=>{
            return !note["_done"] ? this.sortElement(note["_id"],note["_color"],note["_contents"],note["_color"],note["_important"],note["_date"]) : "";
        })
        this._arrNotesStringDone = arrNotes.map((note:Note,key:number)=>{
            return note["_done"] ? this.sortElement(note["_id"],note["_color"],note["_contents"],note["_color"],note["_important"],note["_date"],true) : "";
        })
 
        this.showElement()
        this.isDone();
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