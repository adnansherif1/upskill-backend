jQuery.noConflict();
console.log('starting search');
var dict_name = 'search_data';



curWebsite = window.location.href.toLowerCase();
console.log(curWebsite.includes("google"));
if (curWebsite.includes("linkedin")) {
  chrome.storage.sync.get([dict_name], function (result) {
    fill_search_detail_Linkedin(result[dict_name]);
  });
} else if (curWebsite.includes("indeed")) {
  chrome.storage.sync.get([dict_name], function (result) {
    fill_search_detail_Indeed(result[dict_name]);
  });
} else if (curWebsite.includes("google")) {
  chrome.storage.sync.get([dict_name], function (result) {
    fill_search_detail_Google(result[dict_name]);
  });
}

function change(element) {
  try {
    ['keydown', 'keyup', 'keychange', 'change', 'input'].forEach(name => {
      element.dispatchEvent(new Event(name, {
        bubbles: true
      }));
      // $(element).trigger(name);
    });
  } catch (e) {
    console.log(e);
  }
}


//  ---------------- Fill in Search Detail ---------------------


// ------------------Linkedin--------------------------------------
function fill_search_detail_Linkedin(infoDict) {
  console.log(infoDict);

  setTimeout(function () {
    document.getElementsByClassName('jobs-search-box__submit-button')[0].click();
  }, 2000);

  setTimeout(function () {
    var titleInput = document.getElementsByClassName('jobs-search-box__text-input')[0];
    var locationInput = document.getElementsByClassName('jobs-search-box__text-input')[3];


    var skills = JSON.parse(infoDict["skills"]);
    console.log(skills);
    var skills_str = "";
    for (var j = 0; j < skills.length; j++) {
      if (j == skills.length - 1) {
        skills_str = skills_str + "\"" + skills[j] + "\"";
        break;
      }
      skills_str = skills_str + "\"" + skills[j] + "\"" + " OR ";
    }
    // test this
    var title_skills_str = "";
    if (skills_str == "") {
      title_skills_str = "\"" + infoDict["jobTitle"] + "\"";
    } else {
      title_skills_str = "\"" + infoDict["jobTitle"] + "\"" + " AND " + "(" + skills_str + ")";
    }

    console.log(skills_str);

    titleInput.value = title_skills_str;
    change(titleInput);
    locationInput.value = infoDict['location'];
    change(locationInput);
  }, 1000);

  setTimeout(function () {
    var filterButton = document.getElementById('search-reusables__filters-bar').children[1].querySelector('button');
    filterButton.click();
  }, 4000);

  setTimeout(function () {
    var expLevel_lst = JSON.parse(infoDict['expLevel']);
    var jobType_lst = JSON.parse(infoDict['jobType']);
    checkFilterBox_Linkedin(expLevel_lst, jobType_lst);
  }, 6000);
};


function checkFilterBox_Linkedin(exp_level_lst, job_type_lst) {
  console.log(job_type_lst.includes("Full-time"));
  if (exp_level_lst.includes("Internship")) {
    console.log("internship");
    console.log(document.getElementById('advanced-filter-experience-1').checked)
    if (document.getElementById('advanced-filter-experience-1') && !document.getElementById('advanced-filter-experience-1').checked) {
      document.getElementById('advanced-filter-experience-1').click();
    }
  }
  if (exp_level_lst.includes("Entry Level")) {
    if (document.getElementById('advanced-filter-experience-2') && !document.getElementById('advanced-filter-experience-2').checked) {
      document.getElementById('advanced-filter-experience-2').click();
    }
  }
  if (exp_level_lst.includes("Associate")) {
    if (document.getElementById('advanced-filter-experience-3') && !document.getElementById('advanced-filter-experience-3').checked) {
      document.getElementById('advanced-filter-experience-3').click();
    }
  };
  if (exp_level_lst.includes("Mid-Senior")) {
    if (document.getElementById('advanced-filter-experience-4') && !document.getElementById('advanced-filter-experience-4').checked) {
      document.getElementById('advanced-filter-experience-4').click();
    }
  };
  if (exp_level_lst.includes("Director")) {
    if (document.getElementById('advanced-filter-experience-5') && !document.getElementById('advanced-filter-experience-5').checked) {
      document.getElementById('advanced-filter-experience-5').click();
    }
  };
  if (exp_level_lst.includes("Executive")) {
    if (document.getElementById('advanced-filter-experience-6') && !document.getElementById('advanced-filter-experience-6').checked) {
      document.getElementById('advanced-filter-experience-6').click();
    }
  };

  if (job_type_lst.includes("Full-time")) {
    console.log("Full time entered")
    if (document.getElementById('advanced-filter-jobType-F') && !document.getElementById('advanced-filter-jobType-F').checked) {
      document.getElementById('advanced-filter-jobType-F').click();
    }
  };
  if (job_type_lst.includes("Part-time")) {
    if (document.getElementById('advanced-filter-jobType-P') && !document.getElementById('advanced-filter-jobType-P').checked) {
      document.getElementById('advanced-filter-jobType-P').click();
    }
  };
  if (job_type_lst.includes("Temporary")) {
    if (document.getElementById('advanced-filter-jobType-T') && !document.getElementById('advanced-filter-jobType-T').checked) {
      document.getElementById('advanced-filter-jobType-T').click();
    }
  };
  if (job_type_lst.includes("Contract")) {
    if (document.getElementById('advanced-filter-jobType-C') && !document.getElementById('advanced-filter-jobType-C').checked) {
      document.getElementById('advanced-filter-jobType-C').click();
    }
  };
  if (job_type_lst.includes("Internship")) {
    if (document.getElementById('advanced-filter-jobType-I') && !document.getElementById('advanced-filter-jobType-I').checked) {
      document.getElementById('advanced-filter-jobType-I').click();
    }
  };
  if (job_type_lst.includes("Volunteer")) {
    if (document.getElementById('advanced-filter-jobType-I') && !document.getElementById('advanced-filter-jobType-V').checked) {
      document.getElementById('advanced-filter-jobType-V').click();
    }
  };
}

//  -----------------------------linkedin-------------------------------------



//  ---------------- Google ---------------------

function fill_search_detail_Google(infoDict) {
  var title = infoDict["jobTitle"];
  var skills = infoDict["skills"];
  var location = infoDict["location"];
  var expLevel = infoDict["expLevel"];
  var jobType = infoDict["jobType"];

  // document.querySelector('[data-value='+ title+ ']').click();

  setTimeout(function () {
    var searchButton = document.querySelector("[aria-label = 'Search']");
    var searchBar = document.getElementById('hs-qsb');

    if (location) {
      var tempStr = title + " AND " + location + " AND " + JSON.parse(infoDict['jobType'])[0];
    } else {
      var tempStr = title + " AND " + JSON.parse(infoDict['jobType'])[0];
    }


    var skills = JSON.parse(infoDict["skills"]);
    console.log(skills);
    var skills_str = "";
    for (var j = 0; j < skills.length; j++) {
      if (j == skills.length - 1) {
        skills_str = skills_str + "\"" + skills[j] + "\"";
        break;
      }
      skills_str = skills_str + "\"" + skills[j] + "\"" + " OR ";
    }
    // test this
    var title_skills_str = "";
    if (skills_str == "") {
      title_skills_str = tempStr;
    } else {
      title_skills_str = tempStr + " AND " + "(" + skills_str + ")";
    }

    searchBar.value = title_skills_str;
    change(searchBar);
    console.log(searchButton);
    searchButton.click();

    // // change(searchButton);
    // var titleInput = document.querySelector('[data-value=' + "\"" + title + "\"" + ']');
    // console.log(titleInput);
    // console.log(titleInput.getAttribute('aria-pressed'));
    // if (titleInput && !titleInput.getAttribute('aria-pressed')) {
    //   //titleInput.click();
    //   //change(titleInput);
    // }

    // var jobType_lst = JSON.parse(infoDict['jobType']);
    // console.log(jobType_lst.length);
    // for (var j in jobType_lst) {
    //   if (jobType_lst[j] == "Full-time") {
    //     j = "FULLTIME";
    //   } else if (jobType_lst[j] == "Part-time") {
    //     j == "PARTTIME";
    //   } else if (jobType_lst[j] == "Internship") {
    //     j = "INTERN";
    //   } else if (jobType_lst[j] == "Contract") {
    //     j = "CONTRACTOR";
    //   } else {
    //     continue;
    //   }

    //   var type = document.querySelector('[data-value=' + "\"" + j + "\"" + ']');
    //   if (type && !type.getAttribute["aria-pressed"]) {
    //     change(type);
    //     type.click();
    //   }
    // }

    // console.log(location);
    // var locationInput = document.querySelector('[data-name*=' + "\"" + location + "\"" + ']')
    // console.log(locationInput);
    // if (locationInput && !locationInput.getAttribute["aria-pressed"]) {
    //   //locationInput.click();
    //   // change(locationInput);
    // }


  }, 2000);


};

//  ---------------- Google ---------------------

//  ---------------- Indeed ---------------------

function fill_search_detail_Indeed(infoDict) {
  console.log("enter");
  setTimeout(function () {
    var titleInput = document.getElementById('text-input-what');
    var locationInput = document.getElementById('text-input-where');
    // var typeListElement = document.getElementById('filter-jobtype-menu');
    // var expLevel_lst = JSON.parse(infoDict['expLevel']);
    // var jobType_lst = JSON.parse(infoDict['jobType']);

    var skills = JSON.parse(infoDict["skills"]);
    console.log(skills);
    var skills_str = "";
    for (var j = 0; j < skills.length; j++) {
      if (j == skills.length - 1) {
        skills_str = skills_str + "\"" + skills[j] + "\"";
        break;
      }
      skills_str = skills_str + "\"" + skills[j] + "\"" + " OR ";
    }
    // test this
    var title_skills_str = "";
    if (skills_str == "") {
      title_skills_str = "\"" + infoDict["jobTitle"] + "\"";
    } else {
      if (skills_str) {
        title_skills_str = "\"" + infoDict["jobTitle"] + "\"" + " AND " + "(" + skills_str + ")";
      }
    }
    title_skills_str = title_skills_str + " AND " + "\"" + JSON.parse(infoDict['jobType'])[0] + "\"";

    console.log(infoDict["jobTitle"]);
    titleInput.value = title_skills_str;
    change(titleInput);

    console.log(infoDict["location"]);
    locationInput.value = infoDict["location"];
    change(locationInput);
    document.querySelector('[class="yosegi-InlineWhatWhere-primaryButton"').click();
    // console.log(document.querySelector('[class="yosegi-InlineWhatWhere-primaryButton"'));
    // document.querySelector('[class="yosegi-InlineWhatWhere-primaryButton"').addEventListener("click", jobTypeClick);

    // var jobType = document.querySelectorAll("a.filter-jobtype-menu");
    // console.log(jobType);

    // console.log(document.getElementById("filter-jobtype-menu").children);
    // Array.from(document.getElementById("filter-jobtype-menu").children)
    // [].slice.call(document.getElementById("filter-jobtype-menu").children)
    // var children = [].slice.call(document.getElementById("filter-jobtype-menu").children)
    // children.forEach(function (elem) {
    //   if (elem.children[0].textContent.includes(JSON.parse(infoDict["jobType"])[0])) {
    //     elem.children[0].click();
    //   }
    // })




    // 13-I 14-F 15-P 16-T 17-C

    /*     if (jobType_lst.includes("Internship")) {
          var intern = document.querySelectorAll("a.yosegi-FilterPill-dropdownListItemLink")[12];
          intern.click();
          //change(intern);
        } else if (jobType_lst.includes("Full-time")) {
          var full = document.querySelectorAll("a.yosegi-FilterPill-dropdownListItemLink")[13];
          full.click();
          change(full);
        } else if (jobType_lst.includes("Part-time")) {
          var part = document.querySelectorAll("a.yosegi-FilterPill-dropdownListItemLink")[14];
          part.click();
          change(part);
        } else if (jobType_lst.includes("Temporary")) {
          var temp = document.querySelectorAll("a.yosegi-FilterPill-dropdownListItemLink")[15];
          temp.click();
          change(temp);
        } else if (jobType_lst.includes("Contract")) {
          var ctrac = document.querySelectorAll("a.yosegi-FilterPill-dropdownListItemLink")[16];
          ctrac.click();
          change(ctrac);
        } */

  }, 1000);

  /* setTimeout(function () {
    document.getElementsByClassName('jobs-search-box__submit-button')[0].click();
  }, 2000);

  setTimeout(function () {
    var titleInput = document.getElementsByClassName('jobs-search-box__text-input')[0];
    var locationInput = document.getElementsByClassName('jobs-search-box__text-input')[3];


    var skills = JSON.parse(infoDict["skills"]);
    console.log(skills);
    var skills_str = "";
    for (var j = 0; j < skills.length; j++) {
      if (j == skills.length - 1) {
        skills_str = skills_str + "\"" + skills[j] + "\"";
        break;
      }
      skills_str = skills_str + "\"" + skills[j] + "\"" + "OR";
    }
    // test this
    var title_skills_str = "";
    if (skills_str == "") {
      title_skills_str = infoDict["jobTitle"];
    } else {
      title_skills_str = infoDict["jobTitle"] + " AND " + "(" + skills_str + ")";
    }

    console.log(skills_str);

    titleInput.value = title_skills_str;
    change(titleInput);
    locationInput.value = infoDict['location'];
    change(locationInput);
  }, 1000);

  setTimeout(function () {
    var filterButton = document.getElementById('search-reusables__filters-bar').children[1].querySelector('button');
    filterButton.click();
  }, 4000);

  setTimeout(function () {
    var expLevel_lst = JSON.parse(infoDict['expLevel']);
    var jobType_lst = JSON.parse(infoDict['jobType']);
    checkFilterBox_Linkedin(expLevel_lst, jobType_lst);
  }, 4000); */
}










//  ---------------- Indeed ---------------------