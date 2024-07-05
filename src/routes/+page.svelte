<script>
  let contactInfo = $state({});

  let contactInfoForm;
  let toastContainer;

  let toasts = $state([]);

  import { successIcon, errorIcon } from '$lib/assets/icons';
	import Header from '../lib/components/Header.svelte';

  $effect(() => { // we don't want this to run until the browser is loaded
    // Load existing settings
    chrome.storage.local.get(['formFields'], function(result) {
      for (const [key, value] of Object.entries(result.formFields)) {
        contactInfo[key] = value;
        document.querySelector(`input[name="${key}"]`).value = result.formFields[key] || '';
      }
    });
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

    // Create new toast notification
    const uid = crypto.randomUUID();

    const newToast = {
      id: uid,
      msg: "Fields successfully saved!",
      status: "success"
    }
    
    toasts.push(newToast);

    // Hide form
    contactInfoForm.classList.remove('show');

    // Send back form data
    chrome.runtime.sendMessage({action: "updateContactInfo", data: formFields});
  }

  function toggleRegFields() {
    contactInfoForm.classList.toggle('show');
    return false;
  }

</script>

<Header toggleFunction={toggleRegFields} />

<button id="fillRegFields" onclick={prefillRegFields}>Prefill Contact Info</button>
<button id="fillDemoFields" onclick={prefillDemoFields}>Prefill Demos</button>
<!-- <button id="updateContactInfo" onclick={toggleRegFields}>Update Form Fields</button> -->

<form onsubmit={saveContactInfo} id="contact-info-form" bind:this={contactInfoForm}>
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

<div id="toast-container" bind:this={toastContainer}>
  {#each toasts as toast}
    <div id={`tst-${toast.id}`} class={`toast visible ${toast.status}`}>
      {#if toast.status === 'success'}
        {@html successIcon} 
      {:else if toast.status === 'error'}
        {@html errorIcon} 
      {/if}
      {toast.msg}
    </div>
  {/each}
  
</div>

<style>
  button {
    display: block;
    width: 100%;
    margin-bottom: 0.25rem;
  }
  #contact-info-form {
    display: none;
    &.show {
      display: block;
    }

  }
  #toast-container {
    position: fixed;
    top: 1rem;
    right: 1rem;
    .toast {
      width: min(70vw, 300px);
      background-color: var(--pico-secondary-background);
      padding: 1rem;
      margin-bottom: 0.25rem;
      border-radius: 0.25rem;
      
      opacity: 0;
      transition: opacity 0.5s ease;
      &.visible {
        opacity: 1;
      }
      &.success {
        color: #fff;
        background-color: #408140;
      }
      &.error {
        color: #fff;
        background-color: #ff3c41;
      }
    }
  }
</style>