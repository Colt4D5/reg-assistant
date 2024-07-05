<script>
	import Header from '../lib/components/Header.svelte';
	import toast from 'svelte-french-toast';

  let contactInfo = $state({});
  let settingsOpen = $state(false);

  $effect(() => { console.log(settingsOpen) })

  let contactInfoForm;

  $effect(() => { // we don't want this to run until the browser is loaded
    // Load existing settings
    if (settingsOpen) {
      chrome.storage.local.get(['formFields'], function(result) {
        for (const [key, value] of Object.entries(result.formFields)) {
          contactInfo[key] = value;
          document.querySelector(`input[name="${key}"]`).value = result.formFields[key] || '';
        }
      });
    }
  });

  function prefillRegFields() {
    chrome.runtime.sendMessage({action: "fillRegFields", data: contactInfo});
  };

  function prefillDemoFields() {
    chrome.runtime.sendMessage({action: "fillDemoFields"});
  };

  function saveContactInfo(e) {
    e.preventDefault();

    const formFields = $state({});

    for (const [key, value] of Object.entries(contactInfoForm.elements)) {
      if (!Number(key) && key !== "0") {
        formFields[key] = value.value;
        contactInfo[key] = value.value;
      }
    }

    // Save to storage
    chrome.storage.local.set({ formFields }, function() {
      console.log('Settings saved');
    });
    
    // Show toast notification
    toast.success("Fields successfully saved!");

    // Hide form
    setTimeout(() => {
      contactInfoForm.classList.remove('show');
    }, 500);

    // Send back form data
    chrome.runtime.sendMessage({action: "updateContactInfo", data: formFields});
  }

  function toggleSettings() {
    settingsOpen = !settingsOpen;
  }

</script>

<Header {toggleSettings} />

<button id="fillRegFields" onclick={prefillRegFields}>Prefill Contact Info</button>
<button id="fillDemoFields" onclick={prefillDemoFields}>Prefill Demos</button>

{#if settingsOpen}
  <form onsubmit={saveContactInfo} id="contact-info-form">
    <fieldset>
      <label for="FirstName">
        First Name:<br>
        <input type="text" name="FirstName" id="FirstName">
      </label>
      <label for="LastName">
        Last Name:<br>
        <input type="text" name="LastName" id="LastName">
      </label>
      <label for="Title">
        Title:<br>
        <input type="text" name="Title" id="Title">
      </label>
      <label for="Company">
        Company:<br>
        <input type="text" name="Company" id="Company">
      </label>
      <label for="Street">
        Street:<br>
        <input type="text" name="Street" id="Street">
      </label>
      <label for="Zipcode">
        Zipcode:<br>
        <input type="text" name="Zipcode" id="Zipcode">
      </label>
      <label for="City">
        City:<br>
        <input type="text" name="City" id="City">
      </label>
      <label for="State">
        State:<br>
        <input type="text" name="State" id="State">
      </label>
      <label for="Country">
        Country:<br>
        <input type="text" name="Country" id="Country">
      </label>
      <label for="Phone">
        Phone:<br>
        <input type="text" name="Phone" id="Phone">
      </label>
      <label for="CellPhone">
        CellPhone:<br>
        <input type="text" name="CellPhone" id="CellPhone">
      </label>
      <label for="Email">
        Email:<br>
        <input type="text" name="Email" id="Email">
      </label>
    </fieldset>
    <input type="submit" value="Save">
  </form>
{/if}

<style>
  button {
    display: block;
    width: 100%;
    margin-bottom: 0.25rem;
  }
</style>