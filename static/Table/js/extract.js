var dict_name = 'table_data';
checkEntryPoint();


function checkEntryPoint() {
  var websiteName = window.location.href;
  if ((websiteName.includes("search") && websiteName.includes("jobs") && websiteName.includes("linkedin")) ||
    (websiteName.includes("search") && websiteName.includes("jobs") && websiteName.includes("google")) ||
    (websiteName.includes("jobs") && websiteName.includes("indeed") && !websiteName.includes("jobsearch"))) {
    console.log("Extract Company Details");
    $(document).ready(function () {
      doubleCheckEntryPoint();
      init();
    });
  } else {
    setTimeout(function () {
      console.log("wrong entry point");
      checkEntryPoint();
    }, 5000);
  }
}

function doubleCheckEntryPoint() {
  var websiteName = window.location.href;
  if (websiteName.includes("linkedin") && !(websiteName.includes("search") && websiteName.includes("jobs"))) {
    console.log("user exit entry point");
    checkEntryPoint();
  } else if (websiteName.includes("google") && !(websiteName.includes("search") && websiteName.includes("jobs"))) {
    console.log("user exit entry point");
    checkEntryPoint();
  } else if (websiteName.includes("indeed") && websiteName.includes("jobsearch")) {
    console.log("user exit entry point")
    checkEntryPoint();
  } else {
    setTimeout(function () {
      console.log("correct entry point");
      doubleCheckEntryPoint()
    }, 5000);
  }
}

function init() {
  curWebsite = window.location.href.toLowerCase();
  console.log(curWebsite);
  if (curWebsite.includes("linkedin")) {
    init_linkedin();
  } else if (curWebsite.includes("indeed")) {
    init_indeed();
  } else if (curWebsite.includes("google")) {
    init_google();
  }
}

function data_saver(data) {
  chrome.storage.sync.get([dict_name], function (result) {
    var tot_rows = Object.keys(result['table_data']).length;
    for (var i in result['table_data']) {
      if (result['table_data'][i]['role'] == data['role'] && result['table_data'][i]['company'] == data['company']) {
        return;
      }
    }
    var row_num = tot_rows + 1;
    var key = "#row" + row_num;
    result['table_data'][key] = data;
    chrome.storage.sync.set(result, function () {});
  });
}
//  -----------------------------linkedin-------------------------------------

function init_linkedin() {
  console.log("init linkedin called");
  apply_button_listener_linkedin(500, 0, "not same");
  card_change_listener_linkedin(500, 500, 0);
  changePage(500, 500, 0);

  // Boyuan's Version
  // $(".jobs-search-results__list").click(function () {
  //   console.log("card changed");
  //   setTimeout(() => {
  //     console.log($('h2'));
  //   }, 2000);
  //   apply_listener_linkedin(500);
  // });

  // Adnan's Version
  // setTimeout(function () {

  //   $(".artdeco-pagination__pages").click(function () {
  //     console.log("page changed");
  //     console.log("hi");
  //     setTimeout(() => {
  //       console.log($('h2'));
  //     }, 2000);
  //     apply_listener_linkedin(2000);
  //   });
  // }, 2000);

}


function card_change_listener_linkedin(card_wait_time, apply_button_wait_time, num) {
  var cards_container = $("section").eq(1).find("ul").eq(0);
  if (cards_container) {
    console.log($("section").eq(1).prop("className").includes("left"));
    if (!($("section").eq(1).prop("className").includes("left"))) {
      cards_container = $("section").eq(2).find("ul").eq(0);
    }
    $(cards_container).click(function () {
      console.log("card changed");
      apply_button_listener_linkedin(apply_button_wait_time, 0, "not same");
    });
  } else {
    setTimeout(function () {
      if (num < 20) {
        card_change_listener_linkedin(card_wait_time, apply_button_wait_time, num + 1);
      }
    }, card_wait_time);
  }
}

function changePage(page_wait_time, apply_button_wait_time, num) {
  if ($("section").length > 5) {
    var pageBar = $("section").eq(3).find("ul").eq(0);
    console.log($(pageBar).find("li:first"));
    console.log($(pageBar).find("li:first").text());
    if (!($(pageBar).find("li:first").text().includes("1"))) {
      pageBar = $("section").eq(2).find("ul").eq(0);
    }
    $(pageBar).click(function () {
      console.log("page changed");
      var jobDescription = $('article').text().trim().slice(15, 25);
      apply_button_listener_linkedin(apply_button_wait_time, 0, jobDescription);
    });
  } else {
    setTimeout(function () {
      if (num < 20) {
        changePage(page_wait_time, apply_button_wait_time, num + 1);
      }
    }, page_wait_time);
  }
}

function apply_button_listener_linkedin(apply_button_wait_time, num, description) {
  var companyName = $('h2').parent().next().find('a:first').text().trim();
  var jobDescription = $('article').text().trim().slice(15, 25);
  if (companyName && ($(".jobs-apply-button").length > 0) && jobDescription && !(jobDescription == description)) {
    console.log(jobDescription);
    console.log(description);
    var data = {}
    var titleName = $('h2').eq(3).text().trim();
    if (!($('h2').eq(3).parent().prop("tagName") == "a")) {
      titleName = $('h2').eq(2).text().trim();
    }
    // var companyName = $('h2').parent().next().find('a:first').text().trim();

    console.log(titleName);
    console.log(companyName);

    console.log($(".jobs-apply-button").length);

    /* assign a event listener to the apply button on linkedin page */
    $(".jobs-apply-button").click(function () {
      console.log("button clicked");
      data['role'] = titleName;
      data['company'] = companyName;
      data['link'] = window.location.href;
      data_saver(data);
    });
  } else {
    setTimeout(function () {
      if (num < 20) {
        apply_button_listener_linkedin(apply_button_wait_time, num + 1, description);
      }
    }, apply_button_wait_time);
  }
}


//  -----------------------------Indeed-------------------------------------

function init_indeed() {
  console.log("init indeed called");
  apply_button_listener_indeed(500, 0, "not same");
  card_change_listener_indeed(500, 500, 0);
  page_change_indeed(500, 0);
}

function card_change_listener_indeed(card_wait_time, apply_button_wait_time, num) {

  if ($('div[id = "mosaic-zone-jobcards"]')) {
    $('div[id = "mosaic-zone-jobcards"]').click(function () {
      var iframe = document.getElementById('vjs-container-iframe');
      var idoc = iframe.contentDocument || iframe.contentWindow.document; // ie compatibility
      var role = idoc.querySelector("h1");
      var titleName = $(role).clone().children().remove().end().text();
      var jobDescription = $(idoc).find("h2#jobDescriptionTitle").next().text().slice(15, 25);
      console.log(jobDescription);
      apply_button_listener_indeed(apply_button_wait_time, 0, jobDescription);
    });
  } else {
    setTimeout(function () {
      card_change_listener_indeed(card_wait_time, apply_button_wait_time, num + 1);
    }, card_wait_time);
  }

}

function apply_button_listener_indeed(apply_button_wait_time, num, description) {

  var data = {};
  var iframe = document.getElementById('vjs-container-iframe');
  if (iframe) {
    var idoc = iframe.contentDocument || iframe.contentWindow.document; // ie compatibility
    var role = idoc.querySelector("h1");
    var titleName = $(role).clone().children().remove().end().text();
    var jobDescription = $(idoc).find("h2#jobDescriptionTitle").next().text().trim().slice(15, 25);
    if (idoc.querySelector("div.jobsearch-InlineCompanyRating")) {
      var companyName = idoc.querySelector("div.jobsearch-InlineCompanyRating").firstChild.textContent;
    }
    var applyButton = idoc.querySelector("[id = 'applyButtonLinkContainer']");
    if (!applyButton) {
      applyButton = idoc.querySelector("[id = 'indeedApplyButton']");
    }
    if (applyButton && jobDescription && !(description == jobDescription)) {
      console.log(description);
      console.log(jobDescription);
      console.log(titleName);
      // console.log(companyName);
      //console.log(applyButton);

      // APPLY BUTTON LISTNER added to each card change
      applyButton.addEventListener("click", function () {
        console.log("button clicked");
        data['role'] = titleName;
        data['company'] = companyName;
        data['link'] = window.location.href;
        data_saver(data);
      });
    } else {
      setTimeout(function () {
        apply_button_listener_indeed(apply_button_wait_time, num + 1, description);
      }, apply_button_wait_time);
    }
  } else {
    setTimeout(function () {
      apply_button_listener_indeed(apply_button_wait_time, num + 1, description);
    }, apply_button_wait_time);
  }
};

function page_change_indeed(page_wait_time, num) {
  console.log($(".pagination-list").find('li').length);
  if (($(".pagination-list").find("li").length > 3)) {
    var pageBar = $(".pagination-list");
    $(pageBar).click(function () {
      console.log("page changed");
      var jobDescription = $('article').text().trim().slice(15, 25);
      console.log(jobDescription);
      apply_button_listener_indeed(apply_button_wait_time, 0, jobDescription);
    });
  } else {
    setTimeout(function () {
      if (num < 20) {
        page_change_indeed(page_wait_time, num + 1);
      }
    }, page_wait_time);
  }
}


//  -----------------------------Google-------------------------------------

function init_google() {
  console.log("init google called");
  init_mutation_observer(500);
  apply_button_listener_google(500, 0);
  //card_change_listener_google(500, 1000);
};

// function card_change_listener_google(card_wait_time, apply_button_wait_time) {
//   setTimeout(function () {
//     $('.nJXhWc').click(function () {
//       console.log("card changed");
//       apply_button_listener_google(apply_button_wait_time);
//     });
//   }, card_wait_time);

//   var titleName = $('#tl_ditsc h2').text();
//   if (fieldsets.length == len) {
//     $("fieldset")
//       .not(":hidden,input[type=submit],input[readonly],.filled")
//       .each(function () {
//         //console.log("new fieldset");
//         identify_fieldset(this);
//         fill_fieldset(this);
//       });
//   } else {
//     setTimeout(function () {
//       fill_created(len);
//     }, 300);
//   }
// }

function apply_button_listener_google(apply_button_wait_time, numTrials) {
  var buttonCollectionBar = $('#tl_ditsc').find("div[class = 'mR2gOd']");
  var buttons = $(buttonCollectionBar).find('a');
  if (buttonCollectionBar && buttons.length > 1) {
    var data = {}
    var titleName = $('#tl_ditsc h2').text();
    var companyName = $('#tl_ditsc').find('div[class="nJlQNd sMzDkb"]').text();

    console.log(titleName);
    console.log(companyName);
    $(buttonCollectionBar).find('a').each(function () {
      var buttonLabel = $(this).text().toLowerCase();
      console.log(buttonLabel);
      if (!buttonLabel.includes("linkedin") && !buttonLabel.includes("indeed")) {
        $(this).click(function () {
          console.log("button clicked");
          data['role'] = titleName;
          data['company'] = companyName;
          data['link'] = window.location.href;
          data_saver(data);
        });
      };
    });
  } else {
    setTimeout(function () {
      apply_button_listener_google(apply_button_wait_time, 0);
    }, apply_button_wait_time);
  }
}

function init_mutation_observer(apply_button_wait_time) {
  const targetNode = document.getElementById('tl_ditc');

  // Options for the observer (which mutations to observe)
  const config = {
    attributes: false,
    childList: true,
    subtree: false
  };

  // Callback function to execute when mutations are observed
  const callback = function (mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        // curJob["jobDescription"] = $(mutation.addedNodes[0]).text();
        apply_button_listener_google(apply_button_wait_time, 0);
      }
    }
  };
  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(targetNode, config);
}