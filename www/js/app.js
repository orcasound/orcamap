var app = {
  events: {
    // Signup
    '#signup-form submit': 'signup',

    // Login
    '#login-form submit': 'login',
    '#login-with-mic click': 'loginWithMIC',

    // Files
    '#upload-form submit': 'uploadFile',

    // Profile
    '#profile-form submit': 'saveProfile'
  },

  // Google Sheet API Stuff

  googleSheetSetup: function googleSheetSetup() {
  
    var gSheetJSON = {
      // Client ID and API key from the Developer Console
      CLIENT_ID : '1074262146370-umh810j84cdk47ocqf0f28v65gdmriue.apps.googleusercontent.com',
      API_KEY : 'AIzaSyC1stf2UedjvWn3C_rS4cC8Rhb4BwcjugA',

      // Array of API discovery doc URLs for APIs used by the quickstart
      DISCOVERY_DOCS : ["https://sheets.googleapis.com/$discovery/rest?version=v4"],

      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
      SCOPES : "https://www.googleapis.com/auth/spreadsheets",

      // Spreadsheet ID and cell range for retrieval of obsType
      WORKBOOKID : "1Ezv9Xqa_CmFR3kwEMUYCy1GMDOm1la_gzZsXUIsOy_E",
      VISUALSHEET : "OrcaSoundVisualObs",
      ACOUSTICSHEET : "OrcaSoundAcousticObs",
      RANGE : "A2:I",

      authorizeButton : document.getElementById('authorize-button'),
      signoutButton : document.getElementById('signout-button')
    }

    return gSheetJSON;
  },


  // /**
  //  *  On load, called to load the auth2 library and API client library.
  //  */
  // // *****SECTION: GOOGLE AUTH*******
  // // TODO: This section should be moved to app.js

  // handleClientLoad: function handleClientLoad() {
  //   gapi.load('client:auth2', initClient);
  // },

  // /**
  //  *  Initializes the API client library and sets up sign-in state
  //  *  listeners.
  //  */
  // function initClient() {
  //   gapi.client.init({
  //     apiKey: API_KEY,
  //     clientId: CLIENT_ID,
  //     discoveryDocs: DISCOVERY_DOCS,
  //     scope: SCOPES
  //   }).then(function () {
  //     // Listen for sign-in state changes.
  //     gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

  //     // Handle the initial sign-in state.
  //     updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
  //     authorizeButton.onclick = handleAuthClick;
  //     signoutButton.onclick = handleSignoutClick;
  //   });
  // }

  // /**
  //  *  Called when the signed in status changes, to update the UI
  //  *  appropriately. After a sign-in, the API is called.
  //  */
  // function updateSigninStatus(isSignedIn) {
  //   if (isSignedIn) {
  //     authorizeButton.style.display = 'none';
  //     signoutButton.style.display = 'block';
  //     listObs();
  //   } else {
  //     authorizeButton.style.display = 'block';
  //     signoutButton.style.display = 'none';
  //   }
  // }

  // /**
  //  *  Sign in the user upon button click.
  //  */
  // function handleAuthClick(event) {
  //   gapi.auth2.getAuthInstance().signIn();
  // }

  // /**
  //  *  Sign out the user upon button click.
  //  */
  // function handleSignoutClick(event) {
  //   gapi.auth2.getAuthInstance().signOut();
  // }

  // /**
  //  * Append a pre element to the body containing the given message
  //  * as its text node. Used to display the results of the API call.
  //  *
  //  * @param {string} message Text to be placed in pre element.
  //  */
  // function appendPre(message) {
  //   var pre = document.getElementById('obsListing');
  //   var textContent = document.createTextNode(message + '\n');
  //   pre.appendChild(textContent);
  // }
  // // ***** END GOOGLE AUTH *******


  authorizeSheet: function () {
    console.log('stub of authorizing to google sheet');
  },


  loadTideStations: function (dataStoreType) {
      console.log('in loadTideStations');
      // Render the table
      function renderTable(stations, selector) {
          // Default stations to an empty array
          stations = stations || [];

          // Create the rows
          var rows = stations.map(function (station) {
              return '<tr>\n'
                + '<td>' + station.name + '</td>\n'
                + '<td>' + station.id + '</td>\n'
                + '<td>' + station.lat + '</td>\n'
                + '<td>' + station.lng + '</td>\n'
                + '<td>' + (station.reference_id || '') + '</td>\n'
                + '</tr>';
          });

          // Create the table
          var html = '<table class="table table-striped">\n'
            + '<thead>\n'
            + '<tr>\n'
            + '<th>Station Name</th>\n'
            + '<th>ID</th>\n'
            + '<th>Latitude</th>\n'
            + '<th>Longitude</th>\n'
            + '<th>Reference ID</th>\n'
            + '</tr>\n'
            + '</thead>\n'
            + '<tbody>\n'
            + rows.join('')
            + '</tbody>\n'
            + '</table>\n';

          // Add the html to the page
          $(selector).html(html);
      }

      // Load the stations
      var store = Kinvey.DataStore.collection('NOAAStations', dataStoreType);
      store.find()
        .subscribe(function (stations) {
            return renderTable(stations, '#NOAAStations-table')
        });
  },

  uploadFile: function(event) {
    // stub for uploading files to google sheet?? 
    // Prevent the form from being submitted
    event.preventDefault();

    // Remove the upload-success and upload-error
    $('#upload-success').hide(0);
    $('#upload-error').hide(0);
    $('#exif-data').hide(0);

    // Get entered values
    var file = $('#file')[0].files[0];

    if (file) {
      var filename = $('#filename').val();
      var public = document.getElementById('public').checked;
      var acloptions_json = {};
      filename = filename || filename !== '' ? filename : file.name;

        // this is where I think the EXIF scrape can come for uploading to Kinvey. 
        // Really belongs as a pre-save file hook on Kinvey, though.

      // Show progress

      $('#upload-progress').show(0);

      
      //console.log($('#user-location-lat')[0].textContent);
      //console.log($('#user-location-lng'));

      var file_geoloc = [parseFloat($('#user-location-lng')[0].textContent), parseFloat($('#user-location-lat')[0].textContent)];
      //console.log(file_geoloc);
      
      if (!public) {
          console.log('PRIVATE!!');
          acloptions_json = { 'gr': false };
      } else {
          acloptions_json = { 'gr': true };
      };
      // Upload the file
      Kinvey.Files.upload(file, { '_acl': acloptions_json,'_geoloc': file_geoloc, filename: filename, public: public }, { timeout: 10 * 60 * 1000 })
        .then(function() {
          // Hide progress
          $('#upload-progress').hide(0);

          // Show success message
          $('#upload-success').html('<p>File uploaded!</p>').show(0);

        })
          
        .catch(function(error) {
          // Hide progress
          $('#upload-progress').hide(0);

          // Show error message
          $('#upload-error').html('<p>' + error.message + '</p>').show(0);
        });
    } else {
      // Hide progress
      $('#upload-progress').hide(0);

      // Show error message
      $('#upload-error').html('<p>Please select a file to upload.</p>').show(0);
    }
  }
};

// Authorized Hrefs
var authorizedHrefs = [
//  '/',
//  '/index.html',
  '/files.html',
  '/upload.html',
  '/profile.html',
  '/map-markers.html',
];

// Bind events
function bindEvents() {
  return new RSVP.Promise(function(resolve) {
    var elementEventKeys = Object.keys(app.events);
    elementEventKeys.forEach(function(elementEventKey) {
      var element = elementEventKey.split(' ')[0];
      var event = elementEventKey.split(' ')[1];
      $(element).on(event, app[app.events[elementEventKey]]);
    });
    resolve();
  });
}

// Initialize Kinvey
Kinvey.initialize({
  appKey: 'kid_ryiIKffKZ',
  appSecret: 'cdf8c00f516e4941a691eab1275ed2a6'
})
  .then(function(activeUser) {
    if (!activeUser && authorizedHrefs.indexOf(location.pathname) !== -1) {
        location.replace('/login.html');
        //console.log(location.pathname);
    } else {
        return bindEvents();
    }
  })
  .then(function() {
      $(document).trigger('app.ready');
  })
  .catch(function(error) {
    alert(error.message);
    console.log(error);
  });

