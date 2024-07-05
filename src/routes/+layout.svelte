<script>
  import '@picocss/pico';
  let { children } = $props();
	import { Toaster } from 'svelte-french-toast';
</script>

<Toaster />

{@render children()}

