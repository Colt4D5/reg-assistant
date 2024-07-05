chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "phraseFound") {
      chrome.action.setPopup({popup: "popup.html"});
      chrome.action.setBadgeText({text: "!"});
      chrome.action.setBadgeBackgroundColor({color: "#FF0000"});
  } else if (message.action === "fillRegFields") {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (tabs[0]) {
        sendMessageToContentScript(tabs[0].id, {action: "fillRegFields", data: message});
      }
    });
  } else if (message.action === "fillDemoFields") {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (tabs[0]) {
        sendMessageToContentScript(tabs[0].id, {action: "fillDemoFields"});
      }
    });
  } else if (message.action === "updateContactInfo") {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (tabs[0]) {
        sendMessageToContentScript(tabs[0].id, {action: "updateContactInfo", data: message});
      }
    });
  }
});

function sendMessageToContentScript(tabId, message) {
  chrome.tabs.sendMessage(tabId, message, function(response) {
    // if (chrome.runtime.lastError) {
    //   console.log('Error: ', chrome.runtime.lastError.message);
    // } else {
    //   console.log('Message sent, response: ', response);
    // }
  });
}
