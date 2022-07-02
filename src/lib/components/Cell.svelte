<script lang="ts">
	import {fade} from "svelte/transition"

  export let id: number
  export let borderB: boolean
  export let borderR: boolean
</script>

<div
in:fade={{delay: id/4, duration: 1500}}
data-id={id}
class="flex items-center justify-center text-gray-300"
class:borderB
class:borderR
></div>

<style>
	.borderR {
		border-right: 1px solid black;
	}
	.borderB {
		border-bottom: 1px solid black;
	}
</style>