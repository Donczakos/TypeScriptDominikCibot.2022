export class GetWeather {  
    city: string = ""   
    time: number = this.countTime(2) 

    constructor(city: string) { 
        this.city = city;
        this.settingApi(city) 
        this.refresh(localStorage.getItem("city") as string) 
    }
    
    countTime(time: number): number { 
        return time * 60 * 1000 
    }

    settingApi(city: string) {  
        this.apiCity("https://api.openweathermap.org/data/2.5/weather?q=" + this.city + "&APPID=efa2ef11f117f7485b2fca8e87a3a2f5&units=metric") // lączenie stringów ???
    }
    refresh(city: string) {
        setInterval(() => { 
            console.log(city)
            let dataWeather = this.settingApi(city) 
        }, this.time) 
    }

    apiCity<T>(url: string): Promise<T> { 
        return fetch(url) 
            .then(response => { 
                if (!response.ok) { 
                    throw new Error(response.statusText)
                }
                return response.json<T>() 
            })
            .then(data => {  
                this.settingText(data) 
                this.chart(data.coord.lon as number, data.coord.lat as number) 
                return data 
            })
    }

    apiChart<T>(url: string ): Promise<T> {
        return fetch(url)
            .then(response => { 
                if (!response.ok) { 
                    throw new Error(response.statusText)
                }
                return response.json<T>()
            })
            .then(data => {
                console.log("data",data)
                this.printChart(data.hourly as number[]) 
                return data
            })
    }

    printChart(hourly: number[]) {
        let arrayWeather = []; 
        let data = new Date().getTime();
        const minute = 1000 * 60; 
        const hour = minute * 60; 
        arrayWeather = hourly.map((e: any, key) => { 
            return "<tr><td> " + new Date(data + (hour*key)).getHours() + "</td><td> " + e.temp + " ℃</td><td><img src=" + this.settingImg(e, false) + "></td></tr>"
        });
        arrayWeather.unshift("<tr><th>Godzina</th><th>Temperatura</th><th>Grafika</th></tr>"); 
        (document.querySelector("table") as HTMLElement).innerHTML = arrayWeather.join("");
    }

    chart(lon: number, lat: number) {
        console.log(lon, lat)
        const api: string = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=daily,minutely,current,alerts&units=metric&appid=efa2ef11f117f7485b2fca8e87a3a2f5"; 
        this.apiChart(api); 
    }
    settingText(data: any) {
        (document.querySelector(".spanCity") as HTMLSpanElement).innerHTML = data.name;
        (document.querySelector(".spanHumidity") as HTMLSpanElement).innerHTML = data.main.humidity + "%";
        (document.querySelector(".spanTemp") as HTMLSpanElement).innerHTML = data.main.temp + "℃";
        (document.querySelector(".spanPressure") as HTMLSpanElement).innerHTML = data.main.pressure + "hPa";
        this.settingImg(data as Object);
    }
    settingImg(data: any, flag = true) {
        const status = (data.weather[0].main);
        console.log(status)
        let url = "";
        switch (status) {
            case "Clear":
                url = "http://openweathermap.org/img/wn/01d@2x.png"
                break;
            case "Rain":
                url = "http://openweathermap.org/img/wn/10d@2x.png"
                break;
            case "Thunderstorm":
                url = "http://openweathermap.org/img/wn/11d@2x.png"
                break;
            case "Drizzle":
                url = "http://openweathermap.org/img/wn/09d@2x.png"
                break;
            case "Snow":
                url = "http://openweathermap.org/img/wn/13d@2x.png"
                break;
            case "Clouds":
                url = "http://openweathermap.org/img/wn/02d@2x.png"
                break;
            default:
                url = "https://ssl.gstatic.com/onebox/weather/48/sunny.png"
                break
        }
        if (flag) {
            (document.querySelector(".weatherImg") as HTMLImageElement).src = url
        }
        else {
            return url;
        }

    }
}