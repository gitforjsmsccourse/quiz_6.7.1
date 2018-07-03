console.log('you are at ' + window.location);

//document.getElementsByTagName('div')
//document.getElementsByClassName('myClassName')
//document.getElementsById('myIdName')
//document.querySelector('anySelector')
//document.querySelectorAll('allSelector')




class Person {
	constructor(name) {
		this.name = name;
		this.happiness = 0;
	}
	
	increaseHappinessAndGet() {
		this.happiness = this.happiness + 1;
		return this.happiness;
	}
	
	hasCat() {
		return this.increaseHappinessAndGet();
	}
	
	hasRest() {
		return this.increaseHappinessAndGet();
	}
	
	hasMoney() {
		return this.increaseHappinessAndGet();
	}
	
	getTemperatureInMoskow() {
		const APIKey = '38d998a1ef92083a198db0f97499cbee';
		const url = 'http://api.openweathermap.org/data/2.5/weather?q=Moscow&appid=' + APIKey;
		
		let t = 0;
		
		let xhr = new XMLHttpRequest();
		xhr.open('GET', url, false); // false - synchronically
		xhr.send();
		if (xhr.status == 200) {
			let data = JSON.parse(xhr.responseText);
			t = Math.round(Number.parseFloat(data.main.temp) - 273.15);
		}
		
		return t;
	}
	
	isTempereatureInMoskowAbove15() {
		return this.getTemperatureInMoskow() > 15;
	}
	
	isSunny() {
		return this.isTempereatureInMoskowAbove15() ? this.increaseHappinessAndGet() : this.happiness;
	}
}

function isYes(value) {
	return value == "yes";
}

function getFace(person) {
	if (person.happiness > 3) {
		return "😁" // Grinning Face With Smiling Eyes
	} else if (person.happiness > 1) {
		return "😐" // Neutral Face
	} else {
		return "☹️"; // Frowning Face
	}
}

const happinessForm = document.forms[0];

happinessForm.onsubmit = function(e) {
	e.preventDefault();
	
	const name = happinessForm.elements.name.value;
	const hasCat = isYes(happinessForm.elements.cat.value);
	const hasRest = isYes(happinessForm.elements.rest.value);
	const hasMoney = isYes(happinessForm.elements.money.value);
	
	const person = new Person(name);
	if (hasCat) {
		person.hasCat();
	}
	
	if (hasRest) {
		person.hasRest();
	}
	
	if (hasMoney) {
		person.hasMoney();
	}
	
	person.isSunny();
	
	const personNameLabel = document.querySelector(".personName");
	const iconLabel = document.querySelector(".icon");
	
	personNameLabel.innerHTML = person.name;
	
	iconLabel.innerHTML = getFace(person);
}


