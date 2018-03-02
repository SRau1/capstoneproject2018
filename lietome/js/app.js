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

// Change theme
$$('input[name="color-radio"]').on('change', function () {
        if (this.checked) {
          $$('.view').removeClass('color-theme-pink color-theme-blue color-theme-red color-theme-black color-theme-gray color-theme-orange color-theme-yellow color-theme-green color-theme-white');
          $$('.view').addClass('color-theme-' + $$(this).val());
        }
      });
      $$('input[name="layout-radio"]').on('change', function () {
        if (this.checked) {
          $$('.view').removeClass('theme-white theme-dark');
          $$('.view').addClass(this.value);
        }
      });


// Get Current Profile function -  returns current profile number
function getCurrentProfile(){
var currentprof = localStorage.getItem("CurrentProfile");
var profilenum = JSON.parse(currentprof);
return profilenum;
}

// Save profile
$$('.convert-profileform-to-data').on('click', function(){
  var formData = app.form.convertToData('#profile-form');
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
	// Save new profile
	var myJSON = JSON.stringify(formData);
	localStorage.setItem("Profile" + openslot, myJSON);
	// Set new profile as current profile
	localStorage.setItem("CurrentProfile",openslot);
});
// Fill form for testing
$$('.fill-form-from-data').on('click', function(){
  var formData = {
    'name': 'John',
    'age': '26',
    'gender': 'Male',
  }
  app.form.fillFromData('#profile-form', formData);
});


/*
 Scripts for runPage
 */
$$(document).on('page:init','.page[data-name="runPage"]', function(){
var jsonprofile = localStorage.getItem("Profile" + getCurrentProfile());
var parsedprof = JSON.parse(jsonprofile);
document.getElementById("currentprof").innerHTML = "Current Profile: " + parsedprof.name;
});


/*
 Scripts for Test page
 */
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
	document.getElementById('eyecheckbox').checked = "";
	app.range.setValue('#eyeslider', 0);
	document.getElementById('bodycheckbox').checked = "";
	app.range.setValue('#bodyslider', 0);
	document.getElementById('voicecheckbox').checked = "";
	app.range.setValue('#voiceslider', 0);
	document.getElementById('microcheckbox').checked = "";
	app.range.setValue('#microslider', 0);
	document.getElementById('fidgetcheckbox').checked = "";
	app.range.setValue('#fidgetslider', 0);
	});
})



/*
 Scripts for BaseLineTest page
 */
$$(document).on('page:init','.page[data-name="basetest"]', function(){
$$('.question').hide();
// Displays question text field when Custom Question is selected
$$('.enableinput').on('change', function(){
{
if(document.getElementById('questionselect').value == 'Custom Question')
$$('.question').show();
else
$$('.question').hide();
}
})

// Saves baseline test form
$$('.convert-baseform-to-data').on('click', function(){
  var formData = app.form.convertToData('#basetestform');
  
  // Determine open Test slot for new test
  var openslot;
		for (var i = 1; i < 100;i++)
		{
		var test = localStorage.getItem("BaseTest" + getCurrentProfile() + "-" + i);
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
	localStorage.setItem("BaseTest" + getCurrentProfile() + "-" + openslot, myJSON);
});

// Reset form
$$('.reset-baseform').on('click', function(){
	document.getElementById('questionselect').value = "";
	document.getElementById('question').value = "";
	app.range.setValue('#eyeslider', 0);
	app.range.setValue('#bodyslider', 0);
	app.range.setValue('#voiceslider', 0);
	app.range.setValue('#microslider', 0);
	app.range.setValue('#fidgetslider', 0);
	});

/* Calculate base scores	
$$('.calc-basescores').on('click', function(){
var sumbaseeye;
var sumbasebody;
var sumbasevoice;
var sumbasemicro;
var sumbasefidget;
var numbasetests;

//	Get results from JSON data
for (var i = 1; i < 100; i++)
{
var retrievedtest = localStorage.getItem("BaseTest" + getCurrentProfile() + "-" + i)
if (retrievedtest == undefined)
{
	continue;
}
else
{
var parsedJSON =  JSON.parse(retrievedtest);
// Increase sums
sumbaseeye += parsedJSON.eyeslider;
sumbasebody += parsedJSON.bodyslider;
sumbasevoice += parsedJSON.voiceslider;
sumbasemicro += parsedJSON.microslider;
sumbasefidget += parsedJSON.fidgetslider;
numbasetests++;
}
}
// Calculate averages
var avgbaseeye = sumbaseeye / numbasetests;
var avgbasebody = sumbasebody / numbasetests;
var avgbasevoice = sumbasevoice / numbasetests;
var avgbasemicro = sumbasemicro / numbasetests;
var avgbasefidget =sumbasefidget / numbasetests;

// Store averages
var averages
{
	eyecontact:avgbaseeye
	bodylanguage:avgbasebody
	voicepattern:avgbasevoice
	microexpressions:avgbasemicro
	fidgeting:avgbasefidget
}

var jsonavg = JSON.stringify(averages);
localStorage.setItem("BaselineResults" + getCurrentProfile(), averages);

});
*/

})


/*
 Scripts for Manual page
 */
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


/*
 Scripts for Profiles page
 */
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
    '<li class="swipeout deleted-callback{{slot}}">' +
      '<a href="/runPage/" class="item-link item-content swipeout-content select-profile{{slot}}">' +
	  '<div class="item-media"><i class="icon icon-f7"></i></div>' +
        '<div class="item-inner">' +
          '<div class="item-title-row">' +
            '<div class="item-title">{{name}}</div>' +
          '</div>' +
          '<div class="item-subtitle">{{age}},{{gender}}</div>' +
        '</div>' +
      '</a>' +
	  '<div class="swipeout-actions-left">' +
        '<a href="#" data-confirm="Are you sure you want to delete profile {{name}}?" data-confirm-title="Delete Profile" class="swipeout-delete">Delete</a></div>' +
    '</li>',
  // Item height
  height: app.theme === 'ios' ? 63 : 73,
});

// This function is used to create delete profile callback functions
function createDeleteCallback(profilenumber)
{
$$('.deleted-callback' + profilenumber).on('swipeout:delete', function () {
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
// Creates as many on delete callback functions as there are profiles
for (var i = 0; i < savedprofiles.length; i++)
{
createDeleteCallback(savedprofiles[i]);
}

// This function is used to create select-profile onclick functions
function createProfileSelect(profilenumber)
{
	$$('.select-profile' + profilenumber).on('click', function(){
	localStorage.setItem("CurrentProfile",profilenumber);
	});
}

// Creates as many onclick select-profile functions as there are profiles
for (var i = 0; i < savedprofiles.length; i++)
{
createProfileSelect(savedprofiles[i]);
}
	})




/*
 Scripts for History page
 */
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
          '<div class="item-subtitle">{{eyecheckbox}}:{{eyeslider}}, {{bodycheckbox}}:{{bodyslider}}, {{voicecheckbox}}:{{voiceslider}}, {{microcheckbox}}:{{microslider}}, {{fidgetcheckbox}}:{{fidgetslider}}</div>' +
        '</div>' +
      '</a>' +
    '</li>',
  // Item height
  height: app.theme === 'ios' ? 63 : 73,
});})


