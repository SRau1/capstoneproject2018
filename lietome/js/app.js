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

// Fill form for testing
$$('.fill-form-from-data').on('click', function(){
  var formData = {
    'name': 'John',
    'email': 'john@doe.com',
    'gender': 'female',
    'toggle': ['yes'],
  }
  app.form.fillFromData('#my-form', formData);
});



// Add the following scripts to test page
$$(document).on('page:init','.page[data-name="test"]', function(){
	
$$('.convert-form-to-data').on('click', function(){
  var formData = app.form.convertToData('#my-form');
  var myJSON = JSON.stringify(formData);
  // alert for testing
  alert(myJSON);
  localStorage.setItem("testJSON", myJSON);
});

// Reset form - doesn't work
$$('.reset-form').on('click', function(){
	app.form.removeFormData('#my-form');
	});
})


// Note for later: Remove item from localstorage is localStorage.removeItem(key)


// Add the following scripts to manual page
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


// Add the following scripts to profiles page
$$(document).on('page:init','.page[data-name="profiles"]', function(){
// Get profiles from JSON data
var text = localStorage.getItem("testJSON")
var parsedJSON =  JSON.parse(text);

var items = [];

  items.push({
	title: 'test title',
    question: parsedJSON.question,
    bookscheckbox: parsedJSON.bookscheckbox,
	booksslider: parsedJSON.booksslider
  });

// Create profiles list
var virtualList = app.virtualList.create({
  // List Element
  el: '.virtual-list',
  // Pass array with items
  items: items,
  // Custom search function for searchbar
  searchAll: function (query, items) {
    var found = [];
    for (var i = 0; i < items.length; i++) {
      if (items[i].title.toLowerCase().indexOf(query.toLowerCase()) >= 0 || query.trim() === '') found.push(i);
    }
    return found; //return array with matched indexes
  },
  // List item Template7 template
  itemTemplate:
    '<li>' +
      '<a href="#" class="item-link item-content">' +
        '<div class="item-inner">' +
          '<div class="item-title-row">' +
            '<div class="item-title">{{title}},{{question}}</div>' +
          '</div>' +
          '<div class="item-subtitle">{{bookscheckbox}},{{booksslider}}</div>' +
        '</div>' +
      '</a>' +
    '</li>',
  // Item height
  height: app.theme === 'ios' ? 63 : 73,
});})


