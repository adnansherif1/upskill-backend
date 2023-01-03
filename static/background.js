var core = {
  getOptions: function () {
    var result;
    try {
      result = JSON.parse(localStorage.settings);
      result = result[currentSetupKey];
    } catch (e) {
      result = null;
    }
    return result;
  },
};


function getScheme(info, tab) {
  chrome.tabs.executeScript(null, { file: "jquery-3.1.1.min.js" }, function () {
    chrome.tabs.executeScript(null, { file: "faker.js" }, function () {
      chrome.tabs.executeScript(
        null,
        {
          code:
            "var deepAutofillChromeExtensionSettings = " +
            JSON.stringify(tab.url) +
            ";",
        },
        function () {
          chrome.tabs.executeScript(null, { file: "scheme.js" }, function () {
            var optionsUrl = chrome.extension.getURL("options.html");
            chrome.tabs.create({ url: optionsUrl });
            chrome.notifications.create(
              "name-for-notification",
              {
                type: "basic",
                iconUrl: "monkey48.png",
                title: "Selectors copied",
                message:
                  "Simply paste the new configuration to a prefered position in you settings.",
              },
              function () {}
            );
          });
        }
      );
    });
  });
}

/*
  var settings = (localStorage.settings ? JSON.parse(localStorage.settings) : {});
  var mainContextMenuItem = chrome.contextMenus.create({
    title: "Auto Fill"
  });
  if (localStorage.settings !== undefined){
    for(var key in settings){
      if (settings.hasOwnProperty(key)){
        var menuSetup = settings[key];
        chrome.contextMenus.create({
          title: key, 
          contexts:["page"], 
          onclick: function(info, tab){
            currentSetupKey = key;
            fill(info, tab)
          },
          parentId: mainContextMenuItem
        });
      }
    }
    for(var key in settings){
      if (settings.hasOwnProperty(key)){
        var menuSetup = settings[key];
      }
    }
  }

  chrome.contextMenus.create({
    title: "Random",
    contexts:["page"], 
    onclick: function(info, tab){
      currentSetupKey = null;
      fill(info, tab)
    } 
  });
   
  chrome.contextMenus.create({
    title: "Get Scheme",
    contexts:["page"], 
    onclick: function(info, tab){
      getScheme(info, tab)
    } 
  }); 
   
  chrome.contextMenus.create({
    title: "Options",
    contexts:["page"], 
    onclick: function(info, tab){
      var optionsUrl = chrome.extension.getURL('options.html');
      chrome.tabs.create({ 'url': optionsUrl });
    } 
  }); 

*/

var APP_PAGE="http://www.applient.ninja:3000/";
var search_list = [ 
  RegExp('^https://www.google.com/search.*htivrt=jobs.*$'),
  RegExp('^https://www.linkedin.com/jobs/.*$'),
  RegExp('^https://www.indeed.com/.*$')
]

function fill(info, tab, file_name) {
  chrome.tabs.executeScript(null, { file: "jquery-3.1.1.min.js" }, function () {
    chrome.tabs.executeScript(null, { file: "faker.js" }, function () {
      chrome.tabs.executeScript(
        null,
        {
          code:
            "var deepAutofillChromeExtensionSettings = " +
            JSON.stringify(core.getOptions()) +
            ";",
        },
        function () {
          chrome.tabs.executeScript(null, { file: file_name }, function () {
          });
        }
      );
    });
  });
}

var is_new_page = function() {
  return false;
}
var is_search = function(url) {
  for(var i = 0; i < search_list.length; i++) {
    if(url.match(search_list[i])){
      return true;
    }
  }
  return false;
}
chrome.browserAction.onClicked.addListener(
  function(tab) {
      // chrome.tabs.sendMessage(tab.id,{"message":"hide"});

      // var present = false;
      // chrome.tabs.query({"currentWindow":true},function(tabs) {
      //   console.log(tabs);
      //   for(var i =0; i<tabs.length; i++){
      //     console.log(tabs[i].url);
      //     if(tab.url == APP_PAGE){
      //       // console.log(tab.url);
      //       present = true;
      //     }
      //   }
      //   if(!present){
      //     chrome.tabs.create({ url: APP_PAGE });
      //   }
      // });

      if(is_new_page()) {
        chrome.tabs.create({ url: APP_PAGE });
        return;
      }
      if(is_search(tab.url)) {
        fill(null, tab, "./Search/js/searchInject.js");
      } else {
        fill(null, tab, "run.js");
      }
      
  }
);


// chrome.extension.onMessage.addListener(
//   // request - json message , sender - information about origin of information, sendResponse - response
//   function (request, sender, sendResponse) {
//     if (request.greeting === "start filling") {
//       if(request.create == true) {
//         chrome.tabs.create({'url':'./html-resume-template/index.html'});
//         sendResponse("successful creation");
//         return true;
//       }
//       chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//         var currTab = tabs[0];
//         if (currTab) {
//           // * fill(null, null) should also work
//           fill(null, currTab);
//           sendResponse("successful filling");
//         }
//       });
//     }
//     return true;
//   }
// );
