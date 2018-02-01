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

// Add the following scripts to test page
$$(document).on('page:init','.page[data-name="test"]', function(){
	
$$('.convert-form-to-data').on('click', function(){
  var formData = app.form.convertToData('#my-form');
  var myJSON = JSON.stringify(formData);
  // alert for testing
  alert(myJSON);
  localStorage.setItem("testJSON", myJSON);
});

// test form fill function
$$('.fill-form-from-data').on('click', function(){
  var formData = {
    'name': 'John',
    'email': 'john@doe.com',
    'gender': 'female',
    'toggle': ['yes'],
  }
  app.form.fillFromData('#my-form', formData);
});

})

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