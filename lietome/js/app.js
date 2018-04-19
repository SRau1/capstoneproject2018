// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app  = new Framework7({
  root: '#app', // App root element
  id: 'io.framework7.app', // App bundle ID
  name: 'LieToMe', // App name
  theme: 'auto', // Automatic theme detection
  // App routes
  routes: routes,
});

// Init/Create main view
var mainView = app.views.create('.view-main', {
  url: '/'
});

// Set Theme to selected theme
if (localStorage.getItem("CurrentColorTheme") != null)
{
	$$('.view').removeClass('color-theme-pink color-theme-blue color-theme-red color-theme-black color-theme-gray color-theme-orange color-theme-yellow color-theme-green color-theme-white');
    $$('.view').addClass(localStorage.getItem("CurrentColorTheme"));
}
if (localStorage.getItem("CurrentTheme") != null)
{
	$$('.view').removeClass('theme-white theme-dark');
    $$('.view').addClass(localStorage.getItem("CurrentTheme"));
}

// Save profile function for New Profile popup
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
	mainView.router.navigate('/runPage/');
});
// Reset form
$$('.reset-profile-form').on('click', function(){
	document.getElementById('profname').value = "";
	document.getElementById('profage').value = "";
	document.getElementById('profgender').value = "";
	});

/*
* SHARED FUNCTIONS
*
*/
// Get Current Profile function -  returns current profile number
function getCurrentProfile(){
var currentprof = localStorage.getItem("CurrentProfile");
var profilenum = JSON.parse(currentprof);
return profilenum;
}

/* Function to calculate baseline averages
*/ 
function calcBaseScores(){
var sumbaseeye = 0;
var sumbasebody = 0;
var sumbasevoice = 0;
var sumbasemicro = 0;
var numbasetests = 0;
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
sumbaseeye += parseInt(parsedJSON.eyeslider);
sumbasebody += parseInt(parsedJSON.bodyslider);
sumbasevoice += parseInt(parsedJSON.voiceslider);
sumbasemicro += parseInt(parsedJSON.microslider);
numbasetests++;
}
}
// Calculate averages
var avgbaseeye = sumbaseeye / numbasetests;
var avgbasebody = sumbasebody / numbasetests;
var avgbasevoice = sumbasevoice / numbasetests;
var avgbasemicro = sumbasemicro / numbasetests;
// Calculate maximum variance
var maximumvariance = 0;
function calcmaxvariance(avg){
if (avg <= 5)
	{
		maximumvariance += (10 - avg);
	}
	else
	{
		maximumvariance += avg;
	}	
}
calcmaxvariance(avgbaseeye);
calcmaxvariance(avgbasebody);
calcmaxvariance(avgbasevoice);
calcmaxvariance(avgbasemicro);
// Store averages/variance
var averages =
{
	eyecontact:avgbaseeye,
	bodylanguage:avgbasebody,
	voicepattern:avgbasevoice,
	microexpressions:avgbasemicro,
	maxvariance:maximumvariance,
};
var jsonavg = JSON.stringify(averages);
localStorage.setItem("BaselineResults" + getCurrentProfile(), jsonavg);
if (mainView.router.currentRoute.url == '/basetest/')
{
	mainView.router.navigate('/runPage/');
}	
}

/* 
* END OF SHARED FUNCTIONS
*/


/*
*	Scripts for Settings Page
*/
$$(document).on('page:init','.page[data-name="settings"]', function(){
	
$$('input[name="color-radio"]').on('change', function () {
        if (this.checked) {
          $$('.view').removeClass('color-theme-pink color-theme-blue color-theme-red color-theme-black color-theme-gray color-theme-orange color-theme-yellow color-theme-green color-theme-white');
          $$('.view').addClass('color-theme-' + $$(this).val());
		  localStorage.setItem("CurrentColorTheme", 'color-theme-' + $$(this).val());
        }
      });
$$('input[name="layout-radio"]').on('change', function () {
        if (this.checked) {
          $$('.view').removeClass('theme-white theme-dark');
          $$('.view').addClass(this.value);
		  localStorage.setItem("CurrentTheme", this.value);
        }
      });
})


/*
 Scripts for runPage
 */
$$(document).on('page:init','.page[data-name="runPage"]', function(){
var jsonprofile = localStorage.getItem("Profile" + getCurrentProfile());
var parsedprof = JSON.parse(jsonprofile);
document.getElementById("currentprof").innerHTML = "Current Profile: " + parsedprof.name;

var jsonbaseavg = localStorage.getItem("BaselineResults" + getCurrentProfile());
var parsedbaseavg = JSON.parse(jsonbaseavg);
if (parsedbaseavg.eyecontact != null)
{
document.getElementById("averagebases").innerHTML = "<p>Eye Contact: " + parsedbaseavg.eyecontact.toFixed(2) + "</p><p>Physical Language: " + parsedbaseavg.bodylanguage.toFixed(2) + "</p><p>Verbal Language: " + parsedbaseavg.voicepattern.toFixed(2) + "</p><p>Microexpressions: " + parsedbaseavg.microexpressions.toFixed(2);
}
var sumtruth = 0;
var numtests = 0;
for (var i = 1; i < 100; i++)
{
var test = localStorage.getItem("Test" + getCurrentProfile() + "-" + i)
	if (test == undefined)
	{
	continue;
	}
	else
	{
	var parsedJSON =  JSON.parse(test);
	sumtruth += parsedJSON.truthresult;
	numtests++;
	}
}
if (numtests != 0)
{
var avgtruth =(sumtruth / numtests);
document.getElementById("averagetruth").innerHTML = "Truth Average: " + avgtruth.toFixed(2) + "%";
}
});
/*
 Scripts for Test page
 */
$$(document).on('page:init','.page[data-name="test"]', function(){
$$('.date').hide();	
$$('.convert-testform-to-data').on('click', function(){
// Save current date to form
	var today = new Date();
	document.getElementById('date').value = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear() + ' ' + today.getHours() + ':' + (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes())
	
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
	
	// Perform Truth Analysis
	var jsonbaseavg = localStorage.getItem("BaselineResults" + getCurrentProfile());
    var parsedbaseavg = JSON.parse(jsonbaseavg);
	if (parsedbaseavg.eyecontact == null)
	{
		localStorage.setItem("CurrentTest", null);
	}
	else {
	var testvariance = Math.abs(formData.eyeslider - parsedbaseavg.eyecontact) + Math.abs(formData.bodyslider - parsedbaseavg.bodylanguage) + Math.abs(formData.voiceslider - parsedbaseavg.voicepattern) + Math.abs(formData.microslider - parsedbaseavg.microexpressions);
	var liepercent = (testvariance / parsedbaseavg.maxvariance) * 100;
	formData.lieresult = liepercent;
	formData.truthresult = 100 - liepercent;
	// Save new test
	var myJSON = JSON.stringify(formData);
	localStorage.setItem("Test" + getCurrentProfile() + "-" + openslot, myJSON);
	localStorage.setItem("CurrentTest", myJSON);
	mainView.router.navigate('/testresult/');
	}
});

// Reset form
$$('.reset-form').on('click', function(){
	document.getElementById('question').value = " ";
	app.range.setValue('#eyeslider', 0);
	app.range.setValue('#bodyslider', 0);
	app.range.setValue('#voiceslider', 0);
	app.range.setValue('#microslider', 0);
	});
})

/*
Scripts for Test Result page
*/
$$(document).on('page:init','.page[data-name="testresult"]', function(){
var currenttestjson = localStorage.getItem("CurrentTest");
var parsedcurrenttest = JSON.parse(currenttestjson);
if (parsedcurrenttest == null)
{
	document.getElementById('resultcontent').innerHTML = "Error: No baseline data"
}
else
{
	if (parseFloat(parsedcurrenttest.lieresult) >= 0 && parseFloat(parsedcurrenttest.lieresult) < 10)
	{
		document.getElementById('resultcontent').innerHTML = '<img src="./images/truthexlike.png" alt="truthexlike Icon">';
	}
	else if (parseFloat(parsedcurrenttest.lieresult) > 10 && parseFloat(parsedcurrenttest.lieresult) <= 20)
	{
		document.getElementById('resultcontent').innerHTML = '<img src="./images/truthvlike.png" alt="truthvlike Icon">';
	}
	else if (parseFloat(parsedcurrenttest.lieresult) > 20 && parseFloat(parsedcurrenttest.lieresult) <= 30)
	{
		document.getElementById('resultcontent').innerHTML = '<img src="./images/truthlike.png" alt="truthlike Icon">';
	}
	else if (parseFloat(parsedcurrenttest.lieresult) > 30 && parseFloat(parsedcurrenttest.lieresult) <= 40)
	{
		document.getElementById('resultcontent').innerHTML = '<img src="./images/truthsomelike.png" alt="truthsomelike Icon">';
	}
	else if (parseFloat(parsedcurrenttest.lieresult) > 40 && parseFloat(parsedcurrenttest.lieresult) <= 50)
	{
		document.getElementById('resultcontent').innerHTML = '<img src="./images/truthslight.png" alt="truthslight Icon">';
	}
	else if (parseFloat(parsedcurrenttest.lieresult) > 50 && parseFloat(parsedcurrenttest.lieresult) <= 60)
	{
		document.getElementById('resultcontent').innerHTML = '<img src="./images/lieslight.png" alt="lieslight Icon">';
	}
	else if (parseFloat(parsedcurrenttest.lieresult) > 60 && parseFloat(parsedcurrenttest.lieresult) <= 70)
	{
		document.getElementById('resultcontent').innerHTML = '<img src="./images/liesomelike.png" alt="liesomelike Icon">';
	}
	else if (parseFloat(parsedcurrenttest.lieresult) > 70 && parseFloat(parsedcurrenttest.lieresult) <= 80)
	{
		document.getElementById('resultcontent').innerHTML = '<img src="./images/lielike.png" alt="lielike Icon">';
	}
	else if (parseFloat(parsedcurrenttest.lieresult) > 80 && parseFloat(parsedcurrenttest.lieresult) <= 90)
	{
		document.getElementById('resultcontent').innerHTML = '<img src="./images/lievlike.png" alt="lievlike Icon">';
	}
	else if (parseFloat(parsedcurrenttest.lieresult) > 90 && parseFloat(parsedcurrenttest.lieresult) <= 100)
	{
		document.getElementById('resultcontent').innerHTML = '<img src="./images/lieexlike.png" alt="lieexlike Icon">';
	}
	else
	{
	document.getElementById('resultcontent').innerHTML = '<img src="./images/resinc.png" alt="resinc Icon">';
	}
}
});


/*
 Scripts for BaseLineTest page
 */
$$(document).on('page:init','.page[data-name="basetest"]', function(){
$$('.question').hide();
$$('.input-clear-button').hide();
$$('.date').hide();
// Displays question text field when Custom Question is selected
$$('.enableinput').on('change', function(){
{
if(document.getElementById('questionselect').value == 'Custom Question')
{
$$('.question').show();
$$('.input-clear-button').show();
}
else
{
$$('.question').hide();
$$('.input-clear-button').hide();
}
}
})
// Saves baseline test form
$$('.convert-baseform-to-data').on('click', function(){
  // Save current date to form
	var today = new Date();
	document.getElementById('date').value = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear() + ' ' + today.getHours() + ':' + (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes())
  
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
	localStorage.setItem("BaseTest" + getCurrentProfile() + "-" + openslot, myJSON);
	alert("Question saved.");
});
// Reset form
$$('.reset-baseform').on('click', function(){
	document.getElementById('questionselect').value = "";
	document.getElementById('question').value = "";
	app.range.setValue('#eyeslider', 0);
	app.range.setValue('#bodyslider', 0);
	app.range.setValue('#voiceslider', 0);
	app.range.setValue('#microslider', 0);
	});
// Calculate base scores	
$$('.calc-basescores').on('click', function(){
calcBaseScores();
});
});


/*
 Scripts for Manual page
 */
$$(document).on('page:init','.page[data-name="manual"]', function(){
// Photo browser for Eye Contact	
var eyePhotoBrowser = app.photoBrowser.create({
    photos : [
        {
            url: './images/shifteyes.jpg',
			caption: 'Shifty Eyes'
        },
        {
            url: './images/pupil.jpg',
            caption: 'Dialated Pupils Can Indicate Lying'
        },
    ],
    theme: 'dark',
    type: 'standalone'
});
$$('.pb-eye').on('click', function () {
    eyePhotoBrowser.open();
});
// Photo Browser for Physical Language
var physPhotoBrowser = app.photoBrowser.create({
    photos : [
        {
            url: './images/posture.jpg',
            caption: 'Posture'
        },
		{
			url: './images/alligatortears.jpg',
			caption: 'Alligator Tears'
		},
    ],
    theme: 'dark',
    type: 'standalone'
});
$$('.pb-phys').on('click', function () {
    physPhotoBrowser.open();
});


// Photo Browser for Verbal Language
var verbalPhotoBrowser = app.photoBrowser.create({
    photos : [
    ],
   theme: 'dark',
   type: 'standalone'
});
$$('.pb-verbal').on('click', function () {
    verbalPhotoBrowser.open();
});


// Photo Browser for Microexpressions
var microPhotoBrowser = app.photoBrowser.create({
    photos : [
        {
            url: './images/microex.jpg',
            caption: 'The Microexpressions of Different Emotions'
        },
    ],
    theme: 'dark',
    type: 'standalone'
});
$$('.pb-micro').on('click', function () {
    microPhotoBrowser.open();
});
})


/*
 Scripts for Profiles page
 */
$$(document).on('page:init','.page[data-name="profiles"]', function(){
// Compare function to be used for sorting profiles
function compare(a,b){
	if (a.name < b.name)
		return -1;
	if (a.name > b.name)
		return 1;
	return 0;
}
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
items.sort(compare);
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
      '<a href="#" class="item-link item-content swipeout-content select-profile{{slot}}">' +
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
  localStorage.removeItem("BaselineResults" + profilenumber);
	for (var i = 1; i < 100; i++)
	{
		var currenttest = "Test" + profilenumber + "-" + i;
		var test = localStorage.getItem(currenttest)
		if (test == undefined)
	{
	continue;
	}
	else
	{
		localStorage.removeItem(currenttest);
	}
	}
	for (var i = 1; i < 100; i++)
	{
		var currenttest = "BaseTest" + profilenumber + "-" + i;
		var test = localStorage.getItem(currenttest)
		if (test == undefined)
	{
	continue;
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
	mainView.router.navigate('/runPage/');
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
// Compare function to be used for sorting tests
function compare(a,b){
	if (a.date < b.date)
		return -1;
	if (a.date > b.date)
		return 1;
	return 0;
}
// Get tests from JSON data
var items = [];
var savedtests = [];
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
savedtests.push(i);
}
}
items.sort(compare);
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
    '<li class="swipeout deleted-callback{{testnum}}">' +
      '<a href="#" class="item-link item-content">' +
        '<div class="item-inner">' +
          '<div class="item-title-row">' +
            '<div class="item-title">{{question}} {{date}} {{truthresult.toFixed(0)}}%Truth</div>' +
          '</div>' +
          '<div class="item-subtitle">Eye Contact:{{eyeslider}}, Physical Language:{{bodyslider}}, Verbal Language:{{voiceslider}}, Microexpressions:{{microslider}}</div>' +
        '</div>' +
      '</a>' +
	  '<div class="swipeout-actions-left">' +
        '<a href="#" data-confirm="Are you sure you want to delete question {{question}}?" data-confirm-title="Delete Question" class="swipeout-delete">Delete</a></div>' +
    '</li>',
  // Item height
  height: app.theme === 'ios' ? 63 : 73,
});

// This function is used to create delete test callback functions
function createDeleteCallback(testnumber)
{
$$('.deleted-callback' + testnumber).on('swipeout:delete', function () {
  localStorage.removeItem("Test" + getCurrentProfile() + "-" + testnumber);
});
}
// Creates as many on delete callback functions as there are tests
for (var i = 0; i < savedtests.length; i++)
{
createDeleteCallback(savedtests[i]);
}
})


/*
 Scripts for BaseHistory page
 */
$$(document).on('page:init','.page[data-name="basehistory"]', function(){
// Compare function to be used for sorting tests
function compare(a,b){
	if (a.date < b.date)
		return -1;
	if (a.date > b.date)
		return 1;
	return 0;
}
// Get tests from JSON data
var items = [];
var savedtests = [];
var profile = getCurrentProfile();

for (var i = 1; i < 100; i++)
{
var test = localStorage.getItem("BaseTest" + profile + "-" + i)
if (test == undefined)
{
	continue;
}
else
{
var parsedJSON =  JSON.parse(test);
if (parsedJSON.questionselect == 'Custom Question')
	{
		parsedJSON.questionselect = parsedJSON.question;
	}
items.push(parsedJSON);
savedtests.push(i);
}
}
items.sort(compare);
// creates History list
var virtualList = app.virtualList.create({
  // List Element
  el: '.virtual-list3',
  // Pass array with items
  items: items,
  // Custom search function for searchbar
  searchAll: function (query, items) {
    var found = [];
    for (var i = 0; i < items.length; i++) {
      if (items[i].questionselect.toLowerCase().indexOf(query.toLowerCase()) >= 0 || query.trim() === '') found.push(i);
    }
    return found; //return array with matched indexes
  },
  // List item template
  itemTemplate:
    '<li class="swipeout deleted-callback{{testnum}}">' +
      '<a href="#" class="item-link item-content">' +
        '<div class="item-inner">' +
          '<div class="item-title-row">' +
            '<div class="item-title">{{questionselect}} {{date}}</div>' +
          '</div>' +
          '<div class="item-subtitle">Eye Contact:{{eyeslider}}, Physical Language:{{bodyslider}}, Verbal Language:{{voiceslider}}, Microexpressions:{{microslider}}</div>' +
        '</div>' +
      '</a>' +
	  '<div class="swipeout-actions-left">' +
        '<a href="#" data-confirm="Are you sure you want to delete question {{questionselect}}?" data-confirm-title="Delete Question" class="swipeout-delete">Delete</a></div>' +
    '</li>',
  // Item height
  height: app.theme === 'ios' ? 63 : 73,
});
// This function is used to create delete test callback functions
function createDeleteCallback(testnumber)
{
$$('.deleted-callback' + testnumber).on('swipeout:delete', function () {
  localStorage.removeItem("BaseTest" + getCurrentProfile() + "-" + testnumber);
  calcBaseScores();
});
}
// Creates as many on delete callback functions as there are tests
for (var i = 0; i < savedtests.length; i++)
{
createDeleteCallback(savedtests[i]);
}
})


/* Scripts for Quiz page */
function checkAnswer(question){
	if (document.getElementById("correctanswer" + question).checked)
{
	document.getElementById("quizresult" + question).innerHTML = "Correct answer!";
}
else{
	document.getElementById("quizresult" + question).innerHTML = "Incorrect answer!";
}
}

$$(document).on('page:init','.page[data-name="quiz"]', function(){
$$('.check-answer').on('click', function(){checkAnswer("");});
});
$$(document).on('page:init','.page[data-name="quiz2"]', function(){
$$('.check-answer2').on('click', function(){checkAnswer(2);});
});
$$(document).on('page:init','.page[data-name="quiz3"]', function(){
$$('.check-answer3').on('click', function(){checkAnswer(3);});
});
$$(document).on('page:init','.page[data-name="quiz4"]', function(){
$$('.check-answer4').on('click', function(){checkAnswer(4);});
});
$$(document).on('page:init','.page[data-name="quiz5"]', function(){
$$('.check-answer5').on('click', function(){checkAnswer(5);});
});
$$(document).on('page:init','.page[data-name="quiz6"]', function(){
$$('.check-answer6').on('click', function(){checkAnswer(6);});
});
$$(document).on('page:init','.page[data-name="quiz7"]', function(){
$$('.check-answer7').on('click', function(){checkAnswer(7);});
});
$$(document).on('page:init','.page[data-name="quiz8"]', function(){
$$('.check-answer8').on('click', function(){checkAnswer(8);});
});
$$(document).on('page:init','.page[data-name="quiz9"]', function(){
$$('.check-answer9').on('click', function(){checkAnswer(9);});
});
$$(document).on('page:init','.page[data-name="quiz10"]', function(){
$$('.check-answer10').on('click', function(){checkAnswer(10);});
});