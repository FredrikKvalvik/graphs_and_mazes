<script lang="ts">
	// import { MstGraph } from '$lib/scripts/mst-prim';
	import type { GraphEdges } from '$lib/scripts/mst-prim';
	import { Button } from '$lib/elements';
	import Cell from '$lib/components/Cell.svelte';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import Worker from '$lib/scripts/mst-prim-worker.ts?worker';

	interface node {
		borderB: boolean;
		borderR: boolean;
		id: number;
	}

	const mazeSize = 800;

	let size = 50;
	let edges: GraphEdges = [];
	let nodes: node[] = [];

	let waitingForWorker = false;

	const removeBorders = () => {
		edges.forEach((edge) => {
			const [a, b] = edge.vertexes;

			// if b === case
			switch (b) {
				//north
				case a + size:
					nodes[a].borderB = false;
					break;
				//south
				case a - size:
					nodes[b].borderB = false;
					break;
				//east
				case a + 1:
					nodes[a].borderR = false;
					break;
				//west
				case a - 1:
					nodes[b].borderR = false;
					break;
			}

			// remove all borders to the right of the maze
			if (b % size === size - 1) {
				nodes[b].borderR = false;
			}
			// remove all borders to at the bottom of the maze
			if (b - (size * size - size) >= 0) {
				nodes[b].borderB = false;
			}
		});
	};

	const enrichNodes = () => {
		for (let i = 0; i < size * size; i++) {
			nodes.push({
				borderB: true,
				borderR: true,
				id: i
			});
		}
		nodes = nodes;
	};

	const reset = () => {
		nodes = [];
		edges = [];
	};

	const handleMazeGenerationWorker = () => {
		reset();
		waitingForWorker = true;

		const worker = new Worker();
		worker.postMessage(size);

		worker.onmessage = handleWorkerAnswer;
	};

	const handleWorkerAnswer = ({ data }: { data: { size: number; edges: GraphEdges } }) => {
		console.log(data);

		edges = data.edges;
		enrichNodes();
		removeBorders();

		waitingForWorker = false;
	};
</script>

<div class="p-8 border-2 border-red-200 max-w-md mx-auto">
	<input
		max="120"
		min="2"
		class="border-2 border-black"
		bind:value={size}
		type="number"
		on:change={() => reset()}
	/>
	<Button disabled={waitingForWorker} on:click={handleMazeGenerationWorker}>Generate Maze</Button>
</div>

<div class="bg-red mx-auto grid border-2 border-black"
style="width: {mazeSize}px; height: {mazeSize}px; ">
	<div
		style="grid-template-columns: repeat({size}, 1fr); grid-template-rows: repeat({size}, 1fr);"
	>
		{#if !waitingForWorker}
			<div class="h-full w-full flex justify-center items-center">
				<LoadingSpinner />
			</div>
		{:else}
			{#each nodes as node, i (i)}
				<Cell id={i} borderB={nodes[i]?.borderB} borderR={nodes[i]?.borderR} />
			{/each}
		{/if}
	</div>
</div>
