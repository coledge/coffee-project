"use strict";

function renderCoffee(coffee) {
    var html = '<div><h3>' + coffee.name + '</h3><p>' + coffee.roast + '</p></div>';

    return html;
}

function renderCoffees(coffees) {
    var html = '';

    coffees.sort(function(a, b) {
        return b.id - a.id;
    });

    for(var i = coffees.length - 1; i >= 0; i--) {
        html += renderCoffee(coffees[i]);
    }

    return html;
}

function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    var selectedRoast = roastSelection.value;
    var selectedName = nameSelection.value;

    var filteredCoffees = [];
    var namedCoffees = [];


    coffees.forEach(function(coffee) {

        //if selectedRoast == alll {push all}

        if (coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
        } else if (selectedRoast == 'all'){
            filteredCoffees.push(coffee);
        }

    });

    filteredCoffees.forEach(function(coffee) {
        if (coffee.name.toLowerCase().search(selectedName.toLowerCase()) != -1) {
            namedCoffees.push(coffee);
    }});


    // main.innerHTML = renderCoffees(filteredCoffees);
    main.innerHTML = renderCoffees(namedCoffees);

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



main.innerHTML = renderCoffees(coffees);

//Updates coffees when submit is clicked.
submitButton.addEventListener('click', updateCoffees);

//Updates as search bar is manipulated -- work in progress.
nameSelection.addEventListener('input',updateCoffees);

//Updates Coffees when dropdown is changed.
roastSelection.addEventListener('change', updateCoffees);





