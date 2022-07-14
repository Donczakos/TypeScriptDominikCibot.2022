import { Calculations } from "./Calculations";

export class CreateInputs { 
    private elementsInput: number = 0; 
    private arrayString: string[] = []; 
    private objectHtml: string = ""; 

    constructor() { 
        this.buildInputs() 
    }

    clearInputs(): void { 
        const button = document.querySelector("#buttonDelete");  
        button?.addEventListener('click', (event) => { 
            this.arrayString = [] 
            this.objectHtml = ""; 
            this.elementsInput = 0; 
            (document.querySelector("#generate") as HTMLInputElement).value = ""
            this.render();
        })
    }

    clearInput(): void  {
        const elementsClear = document.querySelectorAll("#clearElement"); 
        elementsClear.forEach((element, index) => { 
            element.addEventListener('click', (event) => { 
                let element = this.arrayString.indexOf(this.arrayString[index]); 
                this.arrayString.splice(element, 1);  
                this.createInputsElement(); 
                this.elementsInput = this.elementsInput - 1;
                this.render();  
            })
        })
    }
    buildInputs(): void { 
        const counter = document.querySelector("#generate"); 
        counter?.addEventListener("keydown", (event) => {
            this.clearInputs() 
            this.clear(); 
            let evKey: any = event;
            this.elementsInput += parseInt(evKey.key); 
            this.createInputs();
            this.settings_button();
            new Calculations(this.elementsInput); 
            this.render();
        });  
    }
    settings_button(): void {
        if (this.elementsInput != 0) {
            (document.querySelector("#button") as HTMLInputElement).style.display = "block"; 
            (document.querySelector("#buttonDelete") as HTMLInputElement).style.display = "block";
        }
        else {
            (document.querySelector("#button") as HTMLInputElement).style.display = "none";  
            (document.querySelector("#buttonDelete") as HTMLInputElement).style.display = "none";
        }
    }
    render(): void  {
        (document.querySelector(".app") as HTMLInputElement).innerHTML = this.objectHtml; 
        this.settings_button();
        new Calculations(this.elementsInput);
        this.clearInput();
        (document.querySelector(".show") as HTMLInputElement).style.display = "none"; 
    }
    createInputs(): void {
        for (let index = 0; index < this.elementsInput; index++) { 
            this.arrayString.push("<label for=''>Liczba " + (index + 1) + "<input id='obj" + index + "' placeholder='podaj liczbę' type='text'><button id='clearElement'>-</button></label>") 
        }
        this.createInputsElement();
        (document.querySelector(".app") as HTMLInputElement).innerHTML = this.objectHtml; 
    }
    createInputsElement(): void  {
        this.objectHtml = this.arrayString.join("") 
    }
    clear(): void {
        this.arrayString = []; 
        this.objectHtml = "";
        this.elementsInput = 0; 
    }
}