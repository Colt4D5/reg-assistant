<script>
  console.log("hellooo from svelte");
  let contactInfo = $state({});

  let contactInfoForm;
  let toastContainer;

  // class Toast {
  //   constructor(container) {
  //     this.container = container;
  //     this.toasts = [];
  //     this.successIcon = `<svg style="margin-right: 0.5rem;" width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  // <path fill-rule="evenodd" clip-rule="evenodd" d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM18.4158 9.70405C18.8055 9.31268 18.8041 8.67952 18.4127 8.28984L17.7041 7.58426C17.3127 7.19458 16.6796 7.19594 16.2899 7.58731L10.5183 13.3838L7.19723 10.1089C6.80398 9.72117 6.17083 9.7256 5.78305 10.1189L5.08092 10.8309C4.69314 11.2241 4.69758 11.8573 5.09083 12.2451L9.82912 16.9174C10.221 17.3039 10.8515 17.301 11.2399 16.911L18.4158 9.70405Z" fill="currentColor"/>
  // </svg>`;
  //     this.errorIcon = `<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-1.5-5.009c0-.867.659-1.491 1.491-1.491.85 0 1.509.624 1.509 1.491 0 .867-.659 1.509-1.509 1.509-.832 0-1.491-.642-1.491-1.509zM11.172 6a.5.5 0 0 0-.499.522l.306 7a.5.5 0 0 0 .5.478h1.043a.5.5 0 0 0 .5-.478l.305-7a.5.5 0 0 0-.5-.522h-1.655z" fill="currentColor"/></svg>`;
  //   }
  //   add(newToast) {
  //     this.toasts.push(newToast)
  //     this.updateUI();
    
  //     setTimeout(() => {
  //       // document.querySelector(`#tst-${newToast.id}`).classList.remove('visible');
  //       this.toasts.find(toast => toast.id === newToast.id).classList.remove('visible');
  //     }, 3000);

  //     setTimeout(() => {
  //       this.remove(newToast.id);
  //     }, 3500);
  //   }
  //   remove(uid) {
  //     this.toasts = this.toasts.filter(toast => toast.id !== uid);
  //     this.updateUI();
  //   }
  //   updateUI() {
  //     this.container.innerHTML = this.toasts.map(toast => {
  //       return `
  //         <div id="tst-${toast.id}" class="toast visible ${toast.status}">
  //           ${toast.status === 'success' ? this.successIcon : ''}
  //           ${toast.status === 'error' ? this.errorIcon : ''}
  //           ${toast.msg}
  //         </div>
  //       `;
  //     }).join('');
  //   }
  // }
  
    // const toast = new Toast(toastContainer);

  let toasts = $state([]);

  $effect(() => {
    // Load existing settings
    chrome.storage.local.get(['formFields'], function(result) {
      for (const [key, value] of Object.entries(result.formFields)) {
        // console.log(key, value);
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

    // Show toast notification
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

  function showRegFields(e) {
    contactInfoForm.classList.toggle('show');
  }

</script>

<button id="fillRegFields" onclick={prefillRegFields}>Prefill Contact Info</button>
<button id="fillDemoFields" onclick={prefillDemoFields}>Prefill Demos</button>
<button id="updateContactInfo" onclick={showRegFields}>Update Form Fields</button>

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
        success! - 
      {:else if toast.status === 'error'}
        error! - 
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