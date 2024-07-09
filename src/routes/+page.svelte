<script>
	import { onMount } from 'svelte';
	import Header from '../lib/components/Header.svelte';
	import toast from 'svelte-french-toast';

  let contactInfo = {
    FirstName: '',
    LastName: '',
    Title: '',
    Company: '',
    Street: '',
    Zipcode: '',
    City: '',
    State: '',
    Country: '',
    Phone: '',
    CellPhone: '',
    Email: ''
  };
  let settingsOpen = $state(false);

  let contactInfoForm;

  onMount(() => { // we don't want this to run until the browser is loaded
    // Load existing settings
    browser.storage.local.get(['formFields']).then(function(result) {
      console.log(result);
      if (Object.hasOwn(result, 'formFields')) {
        for (const [key, value] of Object.entries(result.formFields)) {
          if (value.length > 0) {
            contactInfo[key] = value;
          }
        }
      }
    });
  });

  function prefillRegFields() {
    browser.runtime.sendMessage({action: "fillRegFields", data: contactInfo});
  };

  function prefillDemoFields() {
    browser.runtime.sendMessage({action: "fillDemoFields"});
  };

  function saveContactInfo(e) {
    e.preventDefault();

    const formFields = {};

    // console.log(contactInfoForm);

    // for (const [key, value] of Object.entries(contactInfoForm.elements)) {
    //   if (!Number(key) && key !== "0") {
    //     console.log(key, value);
    //     formFields[key] = value.value;
    //     contactInfo[key] = value.value;
    //   }
    // }


    console.log(contactInfo);
    // Save to storage
    browser.storage.local.set({ formFields: contactInfo })
      .then(() => {
        console.log('Settings saved');

        // Show toast notification
        toast.success("Fields successfully saved!");
    
        // Hide form
        setTimeout(() => {
          toggleSettings();
        }, 500);
    
        // Send back form data
        browser.runtime.sendMessage({action: "updateContactInfo", data: contactInfo});
      });
    
  }

  function toggleSettings() {
    settingsOpen = !settingsOpen;
  }

</script>

<Header {toggleSettings} />

<button id="fillRegFields" onclick={prefillRegFields}>Prefill Contact Info</button>
<button id="fillDemoFields" onclick={prefillDemoFields}>Prefill Demos</button>

{#if settingsOpen}
  <form onsubmit={saveContactInfo} id="contact-info-form" bind:this={contactInfoForm}>
    <fieldset>
      <label for="FirstName">
        First Name:<br>
        <input type="text" name="FirstName" id="FirstName" bind:value={contactInfo.FirstName}>
      </label>
      <label for="LastName">
        Last Name:<br>
        <input type="text" name="LastName" id="LastName" bind:value={contactInfo.LastName}>
      </label>
      <label for="Title">
        Title:<br>
        <input type="text" name="Title" id="Title" bind:value={contactInfo.Title}>
      </label>
      <label for="Company">
        Company:<br>
        <input type="text" name="Company" id="Company" bind:value={contactInfo.Company}>
      </label>
      <label for="Street">
        Street:<br>
        <input type="text" name="Street" id="Street" bind:value={contactInfo.Street}>
      </label>
      <label for="Zipcode">
        Zipcode:<br>
        <input type="text" name="Zipcode" id="Zipcode" bind:value={contactInfo.Zipcode}>
      </label>
      <label for="City">
        City:<br>
        <input type="text" name="City" id="City" bind:value={contactInfo.City}>
      </label>
      <label for="State">
        State:<br>
        <input type="text" name="State" id="State" bind:value={contactInfo.State}>
      </label>
      <label for="Country">
        Country:<br>
        <input type="text" name="Country" id="Country" bind:value={contactInfo.Country}>
      </label>
      <label for="Phone">
        Phone:<br>
        <input type="text" name="Phone" id="Phone" bind:value={contactInfo.Phone}>
      </label>
      <label for="CellPhone">
        CellPhone:<br>
        <input type="text" name="CellPhone" id="CellPhone" bind:value={contactInfo.CellPhone}>
      </label>
      <label for="Email">
        Email:<br>
        <input type="text" name="Email" id="Email" bind:value={contactInfo.Email}>
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