<script lang="ts">

export let disabled: boolean | undefined
</script>

<button {disabled}
class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
class:disabled
on:click><slot/></button
> 

<style>
  .disabled {
    @apply bg-blue-900 text-gray-400 cursor-wait;
  }
</style>