import {InterfaceSearch} from "./interface/interfaceSearch" 

export class Search implements  InterfaceSearch { 
    private _city: string = "";

    constructor() {
        this.searchCity()
    }
    searchCity() {
        this._city = (document.querySelector(".inputCity") as HTMLInputElement).value 
    }
    get city(): string { 
        return this._city; 
    }
}