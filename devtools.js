console.log("hello from devtools");
chrome.devtools.panels.create("StreCript",
    "",
    "panel.html",
    function (panel) {
        console.log("hello from callback");
    }
);
