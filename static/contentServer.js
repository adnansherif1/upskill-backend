window.addEventListener("message",(event)=>{
    if(event.data.from && event.data.from=="web" && event.data.type == "load"){
        chrome.storage.sync.get([event.data.dict_name], function (result) {
            window.postMessage({
                "type":"load",
                "from":"extension",
                "data":result[event.data.dict_name],
                "dict_name":event.data.dict_name
            });
            console.log("load request ext");
            console.log(result);
        });
    }
    else if(event.data.from && event.data.from=="web" && event.data.type == "save"){
        var info = {};
        info[event.data.dict_name] = event.data.data;
        console.log("save request ext");
        console.log(event.data.data);
        chrome.storage.sync.set(info, function () {});
    }
});

console.log("script injected");