var handler = function (data) {

    var jobType = $('#jobType').magicSuggest({
        allowFreeEntries: false,
        placeholder: 'Make a selection',
        data: ['Full-time', 'Part-time', 'Temporary', 'Contract', 'Internship', 'Volunteer'],
        cls: 'median-box',
        id: '1'
    });
    var expLevel = $('#expLevel').magicSuggest({
        allowFreeEntries: false,
        placeholder: 'Make a selection',
        data: ['Internship', 'Entry Level', 'Associate', 'Mid-Senior', 'Director', 'Executive'],
        cls: 'median-box',
        id: '2'
    });
    var skills = $('#skills').magicSuggest({
        allowFreeEntries: true,
        placeholder: 'Make a selection',
        data: ['Python', 'Java', 'C', 'C++', 'javascript'],
        cls: 'median-box',
        id: '3'
    });

    if (!isEmpty(data)) {
        $('#jobTitle').val(data['jobTitle']);
        $('#location').val(data['location']);
        jobType.setValue(JSON.parse(data['jobType']));
        expLevel.setValue(JSON.parse(data['expLevel']));
        skills.setValue(JSON.parse(data['skills']));
    }


    /*     $(jobType).on('selectionchange', function () {
            alert(JSON.stringify(this.getValue()));
        }); */

    $('.saveButton').click(function () {
        var infoDict = {};
        infoDict['jobTitle'] = $('#jobTitle').val();
        infoDict['location'] = $('#location').val();
        infoDict['skills'] = JSON.stringify(skills.getValue());
        infoDict['expLevel'] = JSON.stringify(expLevel.getValue());
        infoDict['jobType'] = JSON.stringify(jobType.getValue());
        console.log(infoDict);
        data_saver(infoDict, 'search_data');
    })
}

window.addEventListener("load", initSearch);

function initSearch() {
    data_loader('search_data', handler);
}

function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}