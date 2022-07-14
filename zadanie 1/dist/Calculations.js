"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calculations = void 0;
class Calculations {
    constructor(elementsInput) {
        this.elementsInput = 0;
        this.arrayNumber = [];
        this.elementsInput = elementsInput;
        this.calc();
    }
    calc() {
        var _a;
        (_a = document.getElementById('button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (event) => {
            this.addElement();
            this.settingsField();
            this.showText();
            this.clearArray();
        });
    }
    showText() {
        document.querySelector(".show").style.display = "block";
    }
    clearArray() {
        this.arrayNumber = [];
    }
    addElement() {
        for (let index = 0; index < this.elementsInput; index++) {
            this.arrayNumber.push(document.querySelector("input#obj" + index).value);
        }
    }
    settingsField() {
        Math.min(...this.arrayNumber) ? document.querySelector('span#fourth').innerHTML = Math.min(...this.arrayNumber) : document.querySelector('span#fourth').innerHTML = "czekaj...";
        Math.max(...this.arrayNumber) ? document.querySelector('span#third').innerHTML = Math.max(...this.arrayNumber) : document.querySelector('span#third').innerHTML = "czekaj...";
        this.arithmeticAverage(this.arrayNumber) ? document.querySelector('span#secound').innerHTML = this.arithmeticAverage(this.arrayNumber) : document.querySelector('span#secound').innerHTML = "czekaj...";
        this.sum(this.arrayNumber) ? document.querySelector('span#first').innerHTML = this.sum(this.arrayNumber) : document.querySelector('span#first').innerHTML = "czekaj...";
    }
    sum(array) {
        let average = 0;
        array.forEach(element => {
            average += Number(element);
        });
        const result = average;
        return result;
    }
    arithmeticAverage(array) {
        let average = 0;
        array.forEach(element => {
            average += Number(element);
        });
        const result = average / this.elementsInput;
        return result;
    }
}
exports.Calculations = Calculations;
