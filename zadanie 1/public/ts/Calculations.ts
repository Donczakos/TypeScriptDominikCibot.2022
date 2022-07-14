import { CreateInputs } from "./CreateInputs"

export class Calculations {
    private elementsInput: number = 0;
    private arrayNumber: number[] = [];
    constructor(elementsInput: number) {
        this.elementsInput = elementsInput;
        this.calc();
    }

    calc(): void  {
        document.getElementById('button')?.addEventListener('click', (event) => {
            this.addElement();
            this.settingsField();
            this.showText();
            this.clearArray();
        });
    }

    showText(): void {
        (document.querySelector(".show") as HTMLInputElement).style.display = "block"; 
    }

    clearArray(): void {
        this.arrayNumber = []; 
    }

    addElement(): void {
        for (let index = 0; index < this.elementsInput; index++) { 
            this.arrayNumber.push((document.querySelector("input#obj" + index) as any).value); 
        }
    }
    
    settingsField(): void {
        Math.min(... this.arrayNumber) ? (document.querySelector('span#fourth') as any).innerHTML = Math.min(... this.arrayNumber) : (document.querySelector('span#fourth') as any).innerHTML = "czekaj..."; 
        Math.max(... this.arrayNumber) ? (document.querySelector('span#third') as any).innerHTML = Math.max(... this.arrayNumber) : (document.querySelector('span#third') as any).innerHTML = "czekaj..."; 
        this.arithmeticAverage(this.arrayNumber) ? (document.querySelector('span#secound') as any).innerHTML = this.arithmeticAverage(this.arrayNumber) : (document.querySelector('span#secound') as any).innerHTML = "czekaj...";
        this.sum(this.arrayNumber) ? (document.querySelector('span#first') as any).innerHTML = this.sum(this.arrayNumber) : (document.querySelector('span#first') as any).innerHTML = "czekaj...";
    }

    sum(array: number[]): number {
        let average: number = 0
        array.forEach(element => {
            average += Number(element); 
        });
        const result = average
        return result
    }

    arithmeticAverage(array: number[]): number { 
        let average: number = 0
        array.forEach(element => {
            average += Number(element); 
        });

        const result = average / this.elementsInput; 
        return result
    }
}