<script lang="ts">

  export let disabled: boolean | undefined

</script>

<button {disabled}
class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
on:click><slot/></button
> 