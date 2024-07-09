// import browser from 'webextension-polyfill';

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "phraseFound") {
      browser.action.setPopup({popup: "popup.html"});
      browser.action.setBadgeText({text: "!"});
      browser.action.setBadgeBackgroundColor({color: "#FF0000"});
  } else if (message.action === "fillRegFields") {
    browser.tabs.query({active: true, currentWindow: true}).then(function(tabs) {
      if (tabs[0]) {
        sendMessageToContentScript(tabs[0].id, {action: "fillRegFields", data: message});
      }
    });
  } else if (message.action === "fillDemoFields") {
    browser.tabs.query({active: true, currentWindow: true}).then(function(tabs) {
      if (tabs[0]) {
        sendMessageToContentScript(tabs[0].id, {action: "fillDemoFields"});
      }
    });
  } else if (message.action === "updateContactInfo") {
    browser.tabs.query({active: true, currentWindow: true}).then(function(tabs) {
      if (tabs[0]) {
        sendMessageToContentScript(tabs[0].id, {action: "updateContactInfo", data: message});
      }
    });
  }
});

function sendMessageToContentScript(tabId, message) {
  browser.tabs.sendMessage(tabId, message).then(function(response) {
    // if (browser.runtime.lastError) {
    //   console.log('Error: ', browser.runtime.lastError.message);
    // } else {
    //   console.log('Message sent, response: ', response);
    // }
  });
}
