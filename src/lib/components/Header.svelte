<script>
  let { toggleFunction } = $props();
  import { settingsIcon } from '$lib/assets/icons';
</script>

<header>
  <div class="inner">
    <h1>Reg Assist</h1>
    <button onclick={toggleFunction}>{@html settingsIcon}</button>
  </div>
</header>

<style>
  header {
    padding: 0.5rem 0 1.5rem;
    .inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      h1 {
        margin-bottom: 0;
      }
      button {
        background-color: transparent;
        border: none;
        padding: 0;
        margin: 0;
        display: inline;
        &:hover {
          color: var(--pico-primary-hover);
        }
      }
    }
  }
</style>