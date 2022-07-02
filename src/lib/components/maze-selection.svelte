<script lang="ts">
	import { mazeSelection } from '$lib/stores/maze-selection.store';
	import Button from '$lib/elements/Button.svelte';

	export let disabled: boolean;
</script>

<div class="">
	<div class=" ml-8 p-8 flex flex-col gap-y-4 bg-blue-200">
		<div class="flex gap-x-4 justify-between">
			<label for="maze-size">Maze size:</label>
			<select
				on:change={(e) => mazeSelection.setSelectedSize(e.target.value)}
				class="p-1"
				name="maze-size"
				id="maze-size"
			>
				<option value="10">10x10</option>
				<option value="20">20x20</option>
				<option value="30">30x30</option>
				<option value="50">50x50</option>
				<option value="75">75x75</option>
				<option value="100">100x100</option>
			</select>
		</div>
		<div class="flex justify-between gap-x-4">
			<label for="maze-algorith"> maze algorith: </label>
			<select class="p-1" name="maze-algorith" id="maze-algoritm">
				<option value="prim">Prims MST</option>
			</select>
		</div>

		<Button {disabled} on:click>Generate Maze</Button>
	</div>
</div>
