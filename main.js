"use strict";

function renderCoffee(coffee) {
    var html = '<div class="col-6"><h3><strong>' + coffee.name + '</strong></h3><p>' + coffee.roast + '</p><hr></div>';

    return html;
}

function renderCoffees(coffees) {
    var html = '';
    html += '<div class="row">';
    coffees.sort(function (a, b) {
        return b.id - a.id;
    });

    for (var i = coffees.length - 1; i >= 0; i--) {
        html += renderCoffee(coffees[i]);
    }
    html += '</div>';
    return html;
}

function updateCoffees(e) {
    console.log(e);
    e.preventDefault(); // don't submit the form, we just want to update the data
    var selectedRoast = roastSelection.value;
    var selectedName = nameSelection.value;

    var filteredCoffees = [];
    var namedCoffees = [];


    coffees.forEach(function (coffee) {

        //if selectedRoast == alll {push all}

        if (coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
        } else if (selectedRoast == 'all') {
            filteredCoffees.push(coffee);
        }

    });

    filteredCoffees.forEach(function (coffee) {
        if (coffee.name.toLowerCase().search(selectedName.toLowerCase()) != -1) {
            namedCoffees.push(coffee);
        }
    });
    if (namedCoffees.length === 0) {
        namedCoffees.push({name: "Sorry,", roast: "Your search didn't find anything."});
    }

    // main.innerHTML = renderCoffees(filteredCoffees);
    main.innerHTML = renderCoffees(namedCoffees);

}

function addCoffee(e) {
    e.preventDefault();
    var newName = newCoffeeName.value;
    var addRoast = newRoast.value;
    // console.log(newName);
    // console.log(addRoast);
    var newCoffee = {id: coffees.length + 1, name: newName, roast: addRoast};
    // console.log(newCoffee);

    if(confirm("Are you sure you'd like to add the " + addRoast + " roast '" + newName + "'? ")) {
        coffees.push(newCoffee);
        main.innerHTML = renderCoffees(coffees);

        localStorage.setItem(newName, addRoast);
        alert("Your suggestion '" + newName + "' has been added! Thanks!");
    } else {
        alert("No hard feeling - your coffee hasn't been added.");

    }
}

function addCoffeefromStorage(name, roast) {

    var newCoffee = {id: coffees.length + 1, name: name, roast: roast};

    coffees.push(newCoffee);
    main.innerHTML = renderCoffees(coffees);
}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

var main = document.querySelector('#coffees');

var submitButton = document.querySelector('#submit-search');

var roastSelection = document.querySelector('#roast-selection');

var nameSelection = document.querySelector('#name-selection');

var newCoffeeName = document.querySelector('#new-coffee-name');

var newRoast = document.querySelector('#new-roast');

var addButton = document.querySelector('#submit-add');


main.innerHTML = renderCoffees(coffees);

for (var i = 0; i < localStorage.length; i++) {
    addCoffeefromStorage(localStorage.key(i), localStorage.getItem(localStorage.key(i)));
}

//Updates coffees when submit is clicked.
submitButton.addEventListener('click', updateCoffees);

//Updates as search bar is manipulated -- work in progress.
nameSelection.addEventListener('input', updateCoffees);

//Updates Coffees when dropdown is changed.
roastSelection.addEventListener('change', updateCoffees);

addButton.addEventListener('click', addCoffee);

//addCoffee();