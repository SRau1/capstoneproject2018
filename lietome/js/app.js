// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app  = new Framework7({
  root: '#app', // App root element
  id: 'io.framework7.app', // App bundle ID
  name: 'LieToMe', // App name
  theme: 'auto', // Automatic theme detection
  // App root data
  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
    };
  },
  // App root methods
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
  },
  // App routes
  routes: routes,
});

// Init/Create main view
var mainView = app.views.create('.view-main', {
  url: '/'
});


// Save profile
$$('.convert-form-to-data').on('click', function(){
  var formData = app.form.convertToData('#profile-form');
  var myJSON = JSON.stringify(formData);
  // alert for testing
  alert(myJSON);
  // Determine open Profile slot for new profile
  var openslot;
		for (var i = 1; i < 100;i++)
		{
		var test = localStorage.getItem("Profile" + i);
		if (test == undefined)
		{
			openslot = i;
			break;
		}
		}
	// Save new profile
	localStorage.setItem("Profile" + openslot, myJSON);
});
// Fill form for testing
$$('.fill-form-from-data').on('click', function(){
  var formData = {
    'name': 'John',
    'email': 'john@doe.com',
    'gender': 'female',
    'toggle': ['yes'],
  }
  app.form.fillFromData('#profile-form', formData);
});

// Scripts for Test page
$$(document).on('page:init','.page[data-name="test"]', function(){
	
$$('.convert-form-to-data').on('click', function(){
  var formData = app.form.convertToData('#my-form');
  var myJSON = JSON.stringify(formData);
  // alert for testing
  alert(myJSON);
  
  // Determine open Test slot for new test
  var openslot;
		for (var i = 1; i < 100;i++)
		{
		var test = localStorage.getItem("Test1-" + i);
		if (test == undefined)
		{
			openslot = i;
			break;
		}
		}
	// Save new test
	localStorage.setItem("Test1-" + openslot, myJSON);
});

// Reset form
$$('.reset-form').on('click', function(){
	document.getElementById('question').value = " ";
	document.getElementById('bookscheckbox').checked = "";
	app.range.setValue('#booksslider', 5);
	document.getElementById('moviescheckbox').checked = "";
	app.range.setValue('#moviesslider', 5);
	document.getElementById('foodcheckbox').checked = "";
	app.range.setValue('#foodslider', 5);
	document.getElementById('drinkscheckbox').checked = "";
	app.range.setValue('#drinksslider', 5);
	});
})


// Note for later: Remove item from localstorage is localStorage.removeItem(key)


// Scripts for Manual page
$$(document).on('page:init','.page[data-name="manual"]', function(){
	
var myPhotoBrowserPopupDark = app.photoBrowser.create({
    photos : [
        {
            html: '<iframe src="//www.youtube.com/embed/lmc21V-zBq0" frameborder="0" allowfullscreen></iframe>',
            caption: 'Woodkid - Run Boy Run (Official HD Video)'
        },
        {
            url: 'http://lorempixel.com/1024/1024/sports/2/',
            caption: 'Second Caption Text'
        },
        {
            url: 'http://lorempixel.com/1024/1024/sports/3/',
        },
    ],
    theme: 'dark',
    type: 'standalone'
});
$$('.pb-standalone-video').on('click', function () {
    myPhotoBrowserPopupDark.open();
});
})


// Scripts for Profiles page
$$(document).on('page:init','.page[data-name="profiles"]', function(){
// Get profiles from JSON data
var items = [];

for (var i = 1; i < 100; i++)
{
var text = localStorage.getItem("Profile" + i)
if (text == undefined)
{
	break;
}
else
{
var parsedJSON =  JSON.parse(text);
items.push(parsedJSON);
}
}

// creates Profiles list
var virtualList = app.virtualList.create({
  // List Element
  el: '.virtual-list',
  // Pass array with items
  items: items,
  // Custom search function for searchbar
  searchAll: function (query, items) {
    var found = [];
    for (var i = 0; i < items.length; i++) {
      if (items[i].name.toLowerCase().indexOf(query.toLowerCase()) >= 0 || query.trim() === '') found.push(i);
    }
    return found; //return array with matched indexes
  },
  // List item template
  itemTemplate:
    '<li>' +
      '<a href="#" class="item-link item-content">' +
        '<div class="item-inner">' +
          '<div class="item-title-row">' +
            '<div class="item-title">{{name}}</div>' +
          '</div>' +
          '<div class="item-subtitle">{{email}},{{gender}}</div>' +
        '</div>' +
      '</a>' +
    '</li>',
  // Item height
  height: app.theme === 'ios' ? 63 : 73,
});})




// Scripts for History page
$$(document).on('page:init','.page[data-name="history"]', function(){
// Get tests from JSON data
var items = [];
var profile = 1;

for (var i = 1; i < 100; i++)
{
var text = localStorage.getItem("Test" + profile + "-" + i)
if (text == undefined)
{
	break;
}
else
{
var parsedJSON =  JSON.parse(text);
items.push(parsedJSON);
}
}

// creates History list
var virtualList = app.virtualList.create({
  // List Element
  el: '.virtual-list2',
  // Pass array with items
  items: items,
  // Custom search function for searchbar
  searchAll: function (query, items) {
    var found = [];
    for (var i = 0; i < items.length; i++) {
      if (items[i].question.toLowerCase().indexOf(query.toLowerCase()) >= 0 || query.trim() === '') found.push(i);
    }
    return found; //return array with matched indexes
  },
  // List item template
  itemTemplate:
    '<li>' +
      '<a href="#" class="item-link item-content">' +
        '<div class="item-inner">' +
          '<div class="item-title-row">' +
            '<div class="item-title">{{question}}</div>' +
          '</div>' +
          '<div class="item-subtitle">{{email}},{{gender}}</div>' +
        '</div>' +
      '</a>' +
    '</li>',
  // Item height
  height: app.theme === 'ios' ? 63 : 73,
});})


