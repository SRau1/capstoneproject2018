routes = [
  {
    path: '/',
    url: './index.html',
  },
  {
    path: '/about/',
    url: './pages/about.html',
  },
  {
    path: '/form/',
    url: './pages/form.html',
  },
  {
    path: '/profiles/',
    url: './pages/profiles.html',
  },
  {
    path: '/manual/',
    url: './pages/manual.html',
  },
  {
    path: '/test/',
    url: './pages/test.html',
  },
  {
    path: '/formtest/',
    url: './pages/formtest.html',
  },
  {
    path: '/history/',
    url: './pages/history.html',
  },
  {
    path: '/basetest/',
    url: './pages/basetest.html',
  },
  {
    path: '/quiz/',
    url: './pages/quiz.html',
  },
  {
    path: '/runPage/',
    url: './pages/runPage.html',
  },
  {
    path: '/baseresult/',
    url: './pages/baseresult.html',
  },
  {
    path: '/testresult/',
    url: './pages/testresult.html',
  },
  {
    path: '/quizresult/',
    url: './pages/quizresult.html',
  },
  {
    path: '/settings/',
    url: './pages/settings.html',
  },
  // Page Loaders & Router
  {
    path: '/page-loader-template7/:user/:userId/:posts/:postId/',
    templateUrl: './pages/page-loader-template7.html',
  },
  {
    path: '/page-loader-component/:user/:userId/:posts/:postId/',
    componentUrl: './pages/page-loader-component.html',
  },
  {
    path: '/request-and-load/user/:userId/',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = routeTo.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: 'Vladimir',
          lastName: 'Kharlampidi',
          about: 'Hello, i am creator of Framework7! Hope you like it!',
          links: [
            {
              title: 'Framework7 Website',
              url: 'http://framework7.io',
            },
            {
              title: 'Framework7 Forum',
              url: 'http://forum.framework7.io',
            },
          ]
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            componentUrl: './pages/request-and-load.html',
          },
          {
            context: {
              user: user,
            }
          }
        );
      }, 1000);
    },
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
