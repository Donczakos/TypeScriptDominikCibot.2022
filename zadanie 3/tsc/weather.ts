import { Search } from "./search" 
import { GetWeather } from "./getWeather" 
import { InterfaceSearch } from "./interface/interfaceSearch"  


export class Weather { 
  search: InterfaceSearch;
  api:any 

  constructor() {
    this.search = new Search(); 
    this.render(this.search) 
  }
  render(search: InterfaceSearch) {
    const button = document.querySelector(".btn"); 
    button?.addEventListener('click', (event) => {
      this.search = new Search(); 
       this.api = new GetWeather(this.search.city as string) 
       this.showApp() 
      localStorage.setItem("city", this.search.city as string ); 
    })
    if(typeof(localStorage.getItem("city")) === "string"){
      this.showApp() 

      this.api = new GetWeather(localStorage.getItem("city") as string)
    }
  }
  showApp(){ 
    (document.querySelector(".app") as HTMLElement).style.display = "block"
  }
}