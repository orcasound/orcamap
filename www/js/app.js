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

  // Google Sheet things that need identify the sheet we're pulling from

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
      HYDROPHONESHEET : "HydrophoneFeeds",
      ACOUSTICSHEET : "OrcaSoundAcousticObs",
      RANGE : "A2:I",

      authorizeButton : document.getElementById('authorize-button'),
      signoutButton : document.getElementById('signout-button')
    }

    return gSheetJSON;
  },

  
// this was adapted from https://developers.google.com/sheets/api/quickstart/js#step_1_turn_on_the_api_name
// for orcaSound use case
  readObs: function readObs() {

    var gsheetVerifiedObs = {
        "type": "FeatureCollection",
        "features": [{
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": []
            },
            "properties": {
                "title": "MarkerClick",
                //"icon": "marker",
                //"fill-color": "#3887be"
            }
        }]
      };
  
      var gsheetRawObs = {
          "type": "FeatureCollection",
          "features": [{
              "type": "Feature",
              "geometry": {
                  "type": "Point",
                  "coordinates": []
              },
              "properties": {
                  "title": "MarkerClick",
                  //"icon": "marker",
                  //"fill-color": "#3887be"
              }
          }]
        };
  
    //read in obs from the gSheet passed to this function

    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: gSheetJSON.WORKBOOKID,
      range: gSheetJSON.VISUALSHEET + '!' + gSheetJSON.RANGE,
    }).then(function(response) {
      var range = response.result;
      if (range.values.length > 0) {
        //console.log('Time, Type, User, Latitude, Longitude, Acoustic Intensity, Verified Intensity');
        for (i = 0; i < range.values.length; i++) {
          var row = range.values[i];
          // Print columns A through D, which correspond to indices 0-3.
          //console.log(row);
          //console.log(row[7]);
          if (row[7] === "yes" || row[7] === "Yes") {
            var newObs = {
              "type": "Feature",
              "geometry": {
                  "type": "Point",
                  "coordinates": [parseFloat(row[5]),parseFloat(row[6])]
              },
              "properties": {
                  "title": "Verified Sighting",
                  "time": row[4],
                  "user": row[3],
                  "note": row[8]
              }
            }
            gsheetVerifiedObs.features.push(newObs);
            //console.log(newObs);
          }
          else if  (row[2] === "visual") {
            var newRawObs = {
              "type": "Feature",
              "geometry": {
                  "type": "Point",
                  "coordinates": [parseFloat(row[5]),parseFloat(row[6])]
              },
              "properties": {
                  "title": "Unverified Sighting",
                  "observation time": row[4],
                  "user": row[3],
                  "note": row[8]
              }
            }
            gsheetRawObs.features.push(newRawObs);
            //console.log(gsheetVerifiedObs);
            //console.log(newObs);
          }
        }
  
      } else {
        console.log('No data found.');
      }
    }, function(response) {
      console.log('Error: ' + response.result.error.message);
    });
    return [gsheetVerifiedObs, gsheetRawObs];
  },

  writeObs: function writeObs(obs) {
    //console.log(obs);
    //console.log(JSON.stringify(obs));
  
    // test to make sure feature has an associated timestamp before adding it
    if (obs.properties.timestamp) {
      //console.log('obs has time parameter: ' + obs.properties.time);
  
      //TODO: this user from oauth is badly hardwired. need to figure out a better
      //      way to id users
      //TODO: add hooks here for other observation types, categories
      //
      //     The string format for entered dates should be: YYYY-MM-DDTHH:mm:ss.sssZ, where:
      //
          // YYYY-MM-DD – is the date: year-month-day.
          // The character "T" is used as the delimiter.
          // HH:mm:ss.sss – is the time: hours, minutes, seconds and milliseconds.
          // The optional 'Z' part denotes the time zone in the format +-hh:mm. A
          // single letter Z that would mean UTC+0.
  
      var values = [
        [
          obs.properties.timestamp,
          obs.properties.humantime,
          "visual",
          gapi.auth2.getAuthInstance().currentUser.Ab.w3.U3,
          "Enter <YYYY-MM-DDTHH:MM:SSZZZ>",
          obs.geometry.coordinates[0],
          obs.geometry.coordinates[1]
        ],
        // Additional rows ...
      ];
      var body = {
        values: values
      };
  
      //TODO: update to bulk update, rows are being dropped 5/31/2018
      gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: gSheetJSON.WORKBOOKID,
        range: gSheetJSON.VISUALSHEET + '!' + gSheetJSON.RANGE,
         valueInputOption: 'USER_ENTERED',
         insertDataOption: 'INSERT_ROWS',
         resource: body
      }).then((response) => {
        var result = response.result;
        //console.log(response);
        //console.log(`${result.updatedCells} cells updated.`);
      });
    }
  },

} 

// this was adapted from https://developers.google.com/sheets/api/quickstart/js#step_1_turn_on_the_api_name
// for orcaSound use case
/**
 *  On load, called to load the auth2 library and API client library.
 */
// *****SECTION: GOOGLE AUTH*******
// TODO: This section should be moved to app.js

function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init({
    apiKey: gSheetJSON.API_KEY,
    clientId: gSheetJSON.CLIENT_ID,
    discoveryDocs: gSheetJSON.DISCOVERY_DOCS,
    scope: gSheetJSON.SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
  var pre = document.getElementById('obsListing');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}
// ***** END GOOGLE AUTH *******


// Authorized Hrefs
var authorizedHrefs = [
//  '/',
//  '/index.html',
  '/files.html',
  '/upload.html',
  '/profile.html',
  '/map-markers.html',
];

