<script lang="ts">
  //
  import Button from '$lib/elements/Button.svelte';

  export let disabled
</script>

<div class="p-8 border-2 border-red-200 max-w-md mx-auto">
  <select on:change name="maze-size" id="maze-size">
    <option value="10">10x10</option>
    <option value="20">20x20</option>
    <option value="30">30x30</option>
    <option value="50">50x50</option>
    <option value="75">75x75</option>
    <option value="100">100x100</option>
  </select>
  
    <Button {disabled} on:click >Generate Maze</Button>
  </div>