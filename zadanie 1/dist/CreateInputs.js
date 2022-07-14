"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateInputs = void 0;
const Calculations_1 = require("./Calculations");
class CreateInputs {
    constructor() {
        this.elementsInput = 0;
        this.arrayString = [];
        this.objectHtml = "";
        this.buildInputs();
    }
    clearInputs() {
        const button = document.querySelector("#buttonDelete");
        button === null || button === void 0 ? void 0 : button.addEventListener('click', (event) => {
            this.arrayString = [];
            this.objectHtml = "";
            this.elementsInput = 0;
            document.querySelector("#generate").value = "";
            this.render();
        });
    }
    clearInput() {
        const elementsClear = document.querySelectorAll("#clearElement");
        elementsClear.forEach((element, index) => {
            element === null || element === void 0 ? void 0 : element.addEventListener('click', (event) => {
                let element = this.arrayString.indexOf(this.arrayString[index]);
                this.arrayString.splice(element, 1);
                this.createInputsElement();
                this.elementsInput = this.elementsInput - 1;
                this.render();
            });
        });
    }
    buildInputs() {
        const counter = document.querySelector("#generate");
        counter === null || counter === void 0 ? void 0 : counter.addEventListener("keydown", (event) => {
            this.clearInputs();
            this.clear();
            let evKey = event;
            this.elementsInput += parseInt(evKey.key);
            this.createInputs();
            this.settings_button();
            new Calculations_1.Calculations(this.elementsInput);
            this.render();
        });
    }
    settings_button() {
        if (this.elementsInput != 0) {
            document.querySelector("#button").style.display = "block";
            document.querySelector("#buttonDelete").style.display = "block";
        }
        else {
            document.querySelector("#button").style.display = "none";
            document.querySelector("#buttonDelete").style.display = "none";
        }
    }
    render() {
        document.querySelector(".app").innerHTML = this.objectHtml;
        this.settings_button();
        new Calculations_1.Calculations(this.elementsInput);
        this.clearInput();
        document.querySelector(".show").style.display = "none";
    }
    createInputs() {
        for (let index = 0; index < this.elementsInput; index++) {
            this.arrayString.push("<label for=''>Liczba " + (index + 1) + "<input id='obj" + index + "' placeholder='podaj liczbę' type='text'><button id='clearElement'>-</button></label>");
        }
        this.createInputsElement();
        document.querySelector(".app").innerHTML = this.objectHtml;
    }
    createInputsElement() {
        this.objectHtml = this.arrayString.join("");
    }
    clear() {
        this.arrayString = [];
        this.objectHtml = "";
        this.elementsInput = 0;
    }
}
exports.CreateInputs = CreateInputs;
