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

// Get Current Profile function -  returns current profile number
function getCurrentProfile(){
var currentprof = localStorage.getItem("CurrentProfile");
var profilenum = JSON.parse(currentprof);
return profilenum;
}
// Set Current Profile function - in progress
function setCurrentProfile(){
var jsonprofile = localStorage.getItem("Profile" + getCurrentProfile());
var parsedprof = JSON.parse(jsonprofile);
document.getElementById("currentprof").innerHTML = "Current Profile: " + parsedprof.name;
}

// Scripts for home page



// Save profile
$$('.convert-profileform-to-data').on('click', function(){
  var formData = app.form.convertToData('#profile-form');
  // alert for testing
  //alert(myJSON);
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
  // Add value of openslot to Profile data
  formData.slot = openslot;
  // alert for testing
  //alert(myJSON);	
	// Save new profile
	var myJSON = JSON.stringify(formData);
	localStorage.setItem("Profile" + openslot, myJSON);
	// Set new profile as current profile
	localStorage.setItem("CurrentProfile",openslot);
	setCurrentProfile();
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
	
$$('.convert-testform-to-data').on('click', function(){
  var formData = app.form.convertToData('#my-form');
  
  // Determine open Test slot for new test
  var openslot;
		for (var i = 1; i < 100;i++)
		{
		var test = localStorage.getItem("Test" + getCurrentProfile() + "-" + i);
		if (test == undefined)
		{
			openslot = i;
			break;
		}
		}
	formData.testnum = openslot;
	// Save new test
	var myJSON = JSON.stringify(formData);
	// alert for testing
    alert(myJSON);
	localStorage.setItem("Test" + getCurrentProfile() + "-" + openslot, myJSON);
});

// Reset form
$$('.reset-form').on('click', function(){
	document.getElementById('question').value = " ";
	document.getElementById('bookscheckbox').checked = "";
	app.range.setValue('#booksslider', 0);
	document.getElementById('moviescheckbox').checked = "";
	app.range.setValue('#moviesslider', 0);
	document.getElementById('foodcheckbox').checked = "";
	app.range.setValue('#foodslider', 0);
	document.getElementById('drinkscheckbox').checked = "";
	app.range.setValue('#drinksslider', 0);
	});
})



/* Scripts for BaseLineTest page - needs work
$$(document).on('page:init','.page[data-name="basetest"]', function(){
	
$$('.convert-testform-to-data').on('click', function(){
  var formData = app.form.convertToData('#my-form');
  
  // Determine open Test slot for new test
  var openslot;
		for (var i = 1; i < 100;i++)
		{
		var test = localStorage.getItem("Test" + getCurrentProfile() + "-" + i);
		if (test == undefined)
		{
			openslot = i;
			break;
		}
		}
	formData.testnum = openslot;
	// Save new test
	var myJSON = JSON.stringify(formData);
	// alert for testing
    alert(myJSON);
	localStorage.setItem("Test" + getCurrentProfile() + "-" + openslot, myJSON);
});

// Reset form
$$('.reset-form').on('click', function(){
	document.getElementById('question').value = " ";
	document.getElementById('bookscheckbox').checked = "";
	app.range.setValue('#booksslider', 0);
	document.getElementById('moviescheckbox').checked = "";
	app.range.setValue('#moviesslider', 0);
	document.getElementById('foodcheckbox').checked = "";
	app.range.setValue('#foodslider', 0);
	document.getElementById('drinkscheckbox').checked = "";
	app.range.setValue('#drinksslider', 0);
	});
})
*/

// Scripts for Manual page
$$(document).on('page:init','.page[data-name="manual"]', function(){
	
var myPhotoBrowserPopupDark = app.photoBrowser.create({
    photos : [
        {
            html: '<iframe src="//www.youtube.com/embed/lmc21V-zBq0" frameborder="0" allowfullscreen></iframe>',
            caption: 'Woodkid - Run Boy Run (Official HD Video)'
        },
        {
            url: './images/LieToMe.jpg',
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


// Note for later: Remove item from localstorage is localStorage.removeItem(key)

// Scripts for Profiles page
$$(document).on('page:init','.page[data-name="profiles"]', function(){
// Get profiles from JSON data
var items = [];
var savedprofiles = [];
for (var i = 1; i < 100; i++)
{
var test = localStorage.getItem("Profile" + i)
if (test == undefined)
{
	continue;
}
else
{
var parsedJSON =  JSON.parse(test);
items.push(parsedJSON);
savedprofiles.push(i);
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
    '<li class="swipeout deleted-callback">' +
      '<a href="#" class="item-link item-content swipeout-content select-profile{{slot}} back">' +
	  '<div class="item-media"><i class="icon icon-f7"></i></div>' +
        '<div class="item-inner">' +
          '<div class="item-title-row">' +
            '<div class="item-title">{{name}}</div>' +
          '</div>' +
          '<div class="item-subtitle">{{email}},{{gender}}</div>' +
        '</div>' +
      '</a>' +
	  '<div class="swipeout-actions-left">' +
        '<a href="#" data-confirm="Are you sure you want to delete profile {{name}}?" class="swipeout-delete delete-profile{{slot}}">Delete</a></div>' +
    '</li>',
  // Item height
  height: app.theme === 'ios' ? 63 : 73,
});

/* Need to figure out why this doesn't work
function createDeleteCallback()
{
$$('.deleted-callback').on('swipeout:deleted', function () {
  app.dialog.alert('Thanks, item removed!');
});
}

createDeleteCallback();
*/

// This function is used to create select-profile onclick functions
function createProfileSelect(profilenumber)
{
	$$('.select-profile' + profilenumber).on('click', function(){
	localStorage.setItem("CurrentProfile",profilenumber);
	setCurrentProfile();
	});
}

// Creates as many onclick select-profile functions as there are profiles
for (var i = 0; i < savedprofiles.length; i++)
{
createProfileSelect(savedprofiles[i]);
}

// This function is used to create delete-profile onclick functions
function deleteProfile(profilenumber)
{
	$$('.delete-profile' + profilenumber).on('click', function(){
	localStorage.removeItem("Profile" + profilenumber);
	for (var i = 1; i < 100; i++)
	{
		var currenttest = "Test" + profilenumber + "-" + i;
		var test = localStorage.getItem(currenttest)
		if (test == undefined)
	{
	break;
	}
	else
	{
		localStorage.removeItem(currenttest);
	}
	}
	});
}

// Creates as many onclick select-profile functions as there are profiles
for (var i = 0; i < savedprofiles.length; i++)
{
deleteProfile(savedprofiles[i]);
}

	})




// Scripts for History page
$$(document).on('page:init','.page[data-name="history"]', function(){
// Get tests from JSON data
var items = [];

var profile = getCurrentProfile();

for (var i = 1; i < 100; i++)
{
var test = localStorage.getItem("Test" + profile + "-" + i)
if (test == undefined)
{
	continue;
}
else
{
var parsedJSON =  JSON.parse(test);
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


