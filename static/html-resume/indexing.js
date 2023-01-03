var spaceValue = 1;
var fontSize = 0.95;

window.addEventListener("load", initPopup);
function initPopup(){
    data_loader('userinfo',dataHandler);
    // window.addEventListener('message',(event) => {
    //     if(event.data.from && event.data.from == "extension" && event.data.type=="load") {
    //       loadData(event.data.data);
    //     }
    // },false);
    // window.postMessage({
    // "type":"load",
    // "from":"web"
    // });


    $("#sPlus").click({param1 :"sPlus"}, scaleToFit);

    $("#sMinus").click({param1 :"sMinus"}, scaleToFit);
    
    $("#fPlus").click({param1 :"fPlus"}, scaleToFit);

    $("#fMinus").click({param1 :"fMinus"}, scaleToFit);
    /* $("#fPlus").click(function() {
        $(':root').css("--space", 0.5);
    })
    
    $("#fMinus").click(function() {
        $(':root').css("--space", 0.5);
    }) */


}

function dataHandler(data){
    loadData(event.data.data);
}
function scaleToFit(event) {
    var userCommand = event.data.param1;

    if (userCommand === "sPlus") {
        spaceValue = spaceValue + 0.1;
        $(':root').css("--space", spaceValue + "em");

    } else if (userCommand === "sMinus") {
        spaceValue = spaceValue - 0.1;
        $(':root').css("--space", spaceValue + "em");

    } else if (userCommand === "fPlus") {
        fontSize = fontSize + 0.03;
        $(':root').css("--fontSize", fontSize + "em");
        console.log("plus: " + fontSize)
    } else if (userCommand === "fMinus") {
        fontSize = fontSize - 0.03;
        $(':root').css("--fontSize", fontSize + "em");
        console.log("minus: " + fontSize)
    }

    
}

function loadData(res){

    console.log(res);
    var personInfo = res["personal"];
    var namediv = document.getElementById('fullname');
    var fullname = document.createElement('h6');
    fullname.textContent = personInfo["first-name"] + " " + personInfo["last-name"] ;
    fullname.style.textAlign = "center";
    namediv.appendChild(fullname);

    var cont = document.getElementById('cont');

    const contLi2 = document.createElement('li');

    const contPara2 = document.createElement('p');



    var personLocation = personInfo["address"] + ", " + personInfo["city"] + ", " + personInfo["state"];

    contPara2.textContent = personLocation + " | E: " + personInfo["email"] + " | M: " + personInfo["phone"];
    contPara2.className = "sanserif";

    contLi2.appendChild(contPara2);

    cont.appendChild(contLi2);
        


    //education//
    var educ = document.getElementById('educ');


    var eduInfo = res["education"];
    //const schools  = eduInfo["university"];
/*     for (let i = 0; i < 1; i++) {
        console.log(i);
        // const thisSkl = schools[i];
        const expLi = document.createElement('li');
        // const expDiv1 = document.createElement('div');
        const expHeader1 = document.createElement('header');
        const expPara1 = document.createElement('p');
        const expTime = document.createElement('time');
        // const expDiv2 = document.createElement('div');
        const expHeader2 = document.createElement('header');
        // const expSpan1 = document.createElement('span');
        const expPara2 = document.createElement('p');
        const expSpan2 = document.createElement('span');

        expPara1.className = "sanserif";

        expPara1.textContent = eduInfo["state"] + ", " + eduInfo["field"];
        expTime.textContent = eduInfo["from"] + " – " + eduInfo["to"];
        // expDiv1.appendChild(expPara1);
        // expDiv1.appendChild(expTime);
        expHeader1.appendChild(expPara1);
        expHeader1.appendChild(expTime);

        // expSpan1.textContent = eduInfo["university"];
        expPara2.textContent = eduInfo["university"];
        expSpan2.textContent = "GPA: " + eduInfo["gpa"];
        // expDiv2.appendChild(expSpan1);
        // expDiv2.appendChild(expSpan2);
        // expHeader2.appendChild(expSpan1);
        expHeader2.appendChild(expPara2);
        expHeader2.appendChild(expSpan2);

        // expLi.appendChild(expDiv1);
        expLi.appendChild(expHeader1);
        // expLi.appendChild(expDiv2);
        expLi.appendChild(expHeader2);
        educ.appendChild(expLi);
    }
 */
    for (let i = 0; i < 1; i++) {
        console.log(i);
        // const thisSkl = schools[i];
        const expLi = document.createElement('li');
        // const expDiv1 = document.createElement('div');
        const expHeader1 = document.createElement('header');
        const expPara1 = document.createElement('p');
        const expSpan1 = document.createElement('span');
        const expTime = document.createElement('time');
        const expUl = document.createElement('ul');
        
        const expGPALi = document.createElement('li');
        const expCourseLi = document.createElement('li');
        const expSkillLi = document.createElement('li');

        expPara1.className = "sanserif";
        expPara1.style.fontWeight = "bold";
        expSpan1.className = "notBold";

        expSpan1.textContent =" - " + eduInfo["state"] + ", " + eduInfo["field"];
        expTime.textContent = eduInfo["from"] + " – " + eduInfo["to"];
        expPara1.textContent = eduInfo["university"];

        expPara1.appendChild(expSpan1);
        
        expHeader1.appendChild(expPara1);
        expHeader1.appendChild(expTime);

        expGPALi.textContent = "GPA: " + eduInfo["gpa"];
        expCourseLi.textContent = "Relevant Courses: " + eduInfo["relevant-courses"];
        expSkillLi.textContent = "Skills: " + eduInfo["related-skills"];
        expUl.appendChild(expGPALi)
        expUl.appendChild(expCourseLi);
        expUl.appendChild(expSkillLi);

        expLi.appendChild(expHeader1);
        expLi.appendChild(expUl);
        educ.appendChild(expLi);
    }


   /*  // Still Hard Coded
    var sample3 = {
    "technologies": ["JavaScript", "PHP", "HTML5", "CSS3", "Bootstrap", "React"],
    "courses": ["Responsive Design", "A/B Testing", "Mobile Development", "Data Visualization", "Usability Testing"]
    };



    //COURSES
    var courses = document.getElementById('relevant-courses');
    // var obj = JSON.parse(sample);
    var courseList = sample3.courses;
    var expLi = document.createElement('li');
    //var expDiv1 = document.createElement('div');
    var expPara1 = document.createElement('p');

    expPara1.className = "sanserif";
    expPara1.textContent = "Relevant Courses: " + courseList[0]
    for (let i = 1; i < courseList.length; i++) {
        expPara1.textContent = expPara1.textContent + ", " + courseList[i];
    }
    console.log(expPara1.textContent);

    //    expDiv1.appendChild(expPara1);
    //    expLi.appendChild(expDiv1);
    expLi.appendChild(expPara1);
    courses.appendChild(expLi);

    //SKILLS//
    var skills = document.getElementById('skills');
    // var obj = JSON.parse(sample);
    var techList = sample3.technologies;
    var expLi = document.createElement('li');
    //var expDiv1 = document.createElement('div');
    var expPara1 = document.createElement('p');

    expPara1.className = "sanserif";
    expPara1.textContent = "Skills: " + techList[0]
    for (let i = 1; i < techList.length; i++) {
        expPara1.textContent = expPara1.textContent + ", " + techList[i];
    }
    console.log(expPara1.textContent)

    //expDiv1.appendChild(expPara1);
    //expLi.appendChild(expDiv1);
    expLi.appendChild(expPara1);
    skills.appendChild(expLi); */

    function createExps(exps, positions) {
        console.log(positions);
        for (let i = 1; i < Object.keys(positions).length+1-2; i++) {
            const thisPos = positions[i];
            if (!thisPos.sel) {
                continue;
            }
            const expLi = document.createElement('li');
            const expHeader = document.createElement('header');
            const expPara1 = document.createElement('p');
            const expTime = document.createElement('time');
            const expSpan = document.createElement('span');
            const expUl = document.createElement('ul');

            expPara1.className = "sanserif";
            expPara1.style.fontWeight = "bold";
            expSpan.className = "notBold";

            expPara1.textContent = thisPos.company;
            if (thisPos.from && thisPos.to) {
                expTime.textContent = thisPos.from + " – " + thisPos.to;
            } else if (thisPos.from){
                expTime.textContent = thisPos.from;
            } else if (thisPos.to) {
                expTime.textContent = thisPos.to;
            } else {
                 expTime.textContent = "";
            }

            expPara1.appendChild(expSpan);

            expHeader.appendChild(expPara1);
            expHeader.appendChild(expTime);


            
            if (thisPos["job-title"]) {
                expSpan.textContent = " - " + thisPos["job-title"];
            } else {
                expSpan.textContent = "";
            }

            //console.log(thisPos["role-description"]);
            if (thisPos["role-description"]) {
                console.log(thisPos["role-description"]);
                const desc = thisPos["role-description"].split("\n");
                for (let j = 0; j < desc.length; j++) {
                    //console.log(desc[j].trim().length);
                    if (desc[j].trim().length == 0) continue;
                    const expDescLi = document.createElement('li');
                    expDescLi.textContent = desc[j];
                    expUl.appendChild(expDescLi);
                }
            }
            expLi.appendChild(expHeader);
            expLi.appendChild(expUl);
            exps.appendChild(expLi);
        }
    }
    function createCategory(num,categoryName) {
        var categories = document.getElementById('categories');
        var line = document.createElement('hr');
        var heading = document.createElement('h6');
        var list = document.createElement('ol');
        list.id = "cat" + num;
        heading.textContent = categoryName;
        categories.appendChild(heading);
        categories.appendChild(line);
        categories.appendChild(list);
    }
    var exps = document.getElementById('cat1');
    // make the first category also dynamic
    $($('#categories').find('h6')[1]).text(res['categories']['names'][1]);
    var positions = res['categories']['category1'];
    createExps(exps,positions);
    if(Object.keys(res['categories']['category2']).length > 2) {
        console.log(res['categories']['category2']);
        createCategory(2,res['categories']['names'][2]);
        var exps = document.getElementById('cat2');
        var positions = res['categories']['category2'];
        createExps(exps,positions);
    }
    console.log(Object.keys(res['categories']['category3']).length);
    if(Object.keys(res['categories']['category3']).length > 2) {
        createCategory(3,res['categories']['names'][3]);
        var exps = document.getElementById('cat3');
        var positions = res['categories']['category3'];
        createExps(exps,positions);
    }  
    var sheet = $('.sheet')[0];
    console.log(sheet);
    console.log(""+sheet.clientHeight+"and"+ sheet.scrollHeight);

}

// personal:
// address: "2550 telegraph avenue"
// age-group: "29"
// city: "Berkeley"
// country: "united states"
// current-company: "94564"
// current-position: "94564"
// disability-status: "yes"
// email: "adnansherif@berkeley.edu"
// ethnicity: "asian"
// first-name: "adnan"
// gender: "man"
// github: "adnansherif@berkeley.edu"
// last-name: "Sherif"
// legal-status: "yes"
// linkedin: "adnansherif@berkeley.edu"
// phone: "4243108159"
// pronouns: "he/him"
// state: "AL"
// veteran-status: "yes"
// working-visa: "no"
// zip-code: "94564"

// education:
// field: "compiuter science "
// from: "2018"
// gpa: "4.0"
// state: "BS"
// to: "2021"
// university: "Berkeley"
// __proto__: Object
// __proto__: Object


// Object
// categories:
// category1:
// 1:
// addVbutton: ""
// company: "Experian"
// from: "2021-05"
// job-title: "Machine learning internship"
// location: "Bekreley"
// role-description: "•Developed convenient, cost-effective, and privacy first proctoring platform for online University exams. The many to one proctoring platform has unique features including one to one audio, visual, and chat communication.\n\n•Implemented webRTC peer connections relayed through Kurento media servers and  hosted on AWS EC2 instances for audio-visual communication. \n\n•Built course management system and proctoring UI with Angular framework.Used react native for mobile app\n•Build rest api for creating sessions, authentication, and recording ops with spring java and mySQL."
// role-version0: "•Developed convenient, cost-effective, and privacy first proctoring platform for online University exams. The many to one proctoring platform has unique features including one to one audio, visual, and chat communication.\n\n•Implemented webRTC peer connections relayed through Kurento media servers and  hosted on AWS EC2 instances for audio-visual communication. \n\n•Built course management system and proctoring UI with Angular framework.Used react native for mobile app\n\n•Build rest api for creating sessions, authentication, and recording ops with spring java and mySQL."
// sel: "on"
// selected0: true
// to: "2021-12"
// versionnum: 1
// __proto__: Object
// 2: {addVbutton: "", company: "Pinxuan", from: "2021-01", job-title: "Data scientist", location: "Berkeley", …}
// num: 2
// sel: []
// __proto__: Object
// category2: {1: {…}, 2: {…}, num: 2, sel: Array(0)}
// category3: {num: 0, sel: Array(0)}
// __proto__: Object
// __proto__: Object