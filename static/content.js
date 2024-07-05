function searchForPhrase(phrase) {
  const bodyText = document.body.innerText.toLowerCase();
  return bodyText.includes(phrase.toLowerCase());
}

const phraseToSearch = 'Microsoft VBScript runtime error';
if (searchForPhrase(phraseToSearch)) {
  chrome.runtime.sendMessage({action: "phraseFound", phrase: phraseToSearch});
  createNotification();
} else {
  // 
}


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === "fillRegFields") {
      // console.log(request.data.data);
      const contactInfo = request.data.data;
      const prefix = prompt("What identifier would you like to use?");
      for (const [key, value] of Object.entries(contactInfo)) {
        if (value.length <= 0 || !document.querySelector(`#${key}`)) {
          continue;
        }
        let finalVal = value;
        if (['FirstName','LastName'].includes(key)) {
          finalVal = prefix + value;
        } else if (['Email'].includes(key)) {
          finalVal = finalVal.replace('@', `+${prefix}@`);
          if (document.querySelector('#ConfEmail')) {
            document.querySelector('#ConfEmail').value = finalVal;
          }
        }
        if (document.querySelector(`#${key}`)) {
          document.querySelector(`#${key}`).value = finalVal;
        }
      }
      sendResponse({result: "Action completed"});
    } else if (request.action === "fillDemoFields") {
      const inputs = document.querySelectorAll('input[type="radio"], input[type="checkbox"]');
      const questionGroups = {};
      
      inputs.forEach(input => {
        const groupName = input.name;
        if (!questionGroups[groupName]) {
          input.checked = true;
          questionGroups[groupName] = true;
        }
      });
      
      // Handle select elements
      const selects = document.querySelectorAll('select');
      for (let select of selects) {
        if (select.options.length > 0) {
          select.selectedIndex = 1;
        }
      }

      const textInputs = document.querySelectorAll('input[id^=D][type="text"]');
      textInputs.forEach(input => {
        if (!input.getAttribute('id').includes('_OT')) {
          input.value = 'Test text for Demo ' + input.getAttribute('id')
        }
      })

      sendResponse({result: "Action completed"});
    } else if (request.action === "updateContactInfo") {
      console.log('Form submitted:', request.data.data);
      const contactInfo = request.data.data;

      sendResponse({result: "Action completed"});
    }
    // Return true if you want to send a response asynchronously
    // return true;
  }
);
