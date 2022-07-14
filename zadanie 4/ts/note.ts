export class Note {
    private _id:number = 0;
    private _title:string = "";
    private _contents:string = "";
    private _color: string = "";
    private _important: boolean = true;
    private _date: number = 0;
    private _done: boolean = false;

    constructor(id:number,title:string,contents:string,color:string,important:boolean ){
        this._id = id;
        this._title = title;
        this._contents = contents;
        this._color = color;
        this._important = important;
        this._date = new Date().getTime();
    }

    get title():string{
        return this._title;
    }
    get contents():string{
        return this._contents;
    }
    get color():string{
        return this._color;
    }
    get important():boolean{
        return this._important;
    }
    get date():number{
        return this._date;
    }
    get done():boolean{
        return this._done;
    }

}