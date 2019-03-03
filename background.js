// check to make sure the host and path match the mls provider
const mlsRule = {
  conditions: [
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { pathEquals: "/gateway/postings/postings.jsp", queryContains: "ps-report" }
    })
  ],
  actions: [ new chrome.declarativeContent.ShowPageAction() ]
}

chrome.runtime.onInstalled.addListener(function(){
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([mlsRule]);
  });
});

