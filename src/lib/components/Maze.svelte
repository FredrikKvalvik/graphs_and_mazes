<script lang="ts">
	// import { MstGraph } from '$lib/scripts/mst-prim';
	import type { GraphEdges } from '$lib/scripts/mst-prim';
	import { Button } from '$lib/elements';
	import Cell from '$lib/components/Cell.svelte';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import MazeSelection from '$lib/components/maze-selection.svelte';
	import MstWorker from '$lib/workers/mst-prim-worker.ts?worker';

	interface node {
		borderB: boolean;
		borderR: boolean;
		id: number;
	}

	const mazeSize = 800;

	let size: number = 10
	let selectedSize: number = 10
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
		size = 0
		nodes = [];
		edges = [];
	};

	const handleMazeGenerationWorker = () => {
		reset();
		waitingForWorker = true;

		const worker = new MstWorker();
		worker.postMessage(selectedSize);

		worker.onmessage = handleWorkerAnswer;
	};

	const handleWorkerAnswer = ({ data }: { data: { size: number; edges: GraphEdges } }) => {
		edges = data.edges;
		size = data.size;
		enrichNodes();
		removeBorders();

		waitingForWorker = false;
	};

	// dont know how to type events
	const handleSelect = (e: any) => {
		selectedSize = parseInt(e.target.value)
	}
</script>

<MazeSelection disabled={waitingForWorker} on:click={handleMazeGenerationWorker}  on:change={handleSelect} />

<div
	class="mx-auto grid border-2 border-black relative"
	style="width: {mazeSize}px; height: {mazeSize}px; grid-template-columns: repeat({size}, 1fr); grid-template-rows: repeat({size}, 1fr);"
>
	{#if waitingForWorker}
		<div class="absolute top-1/2 right-1/2">
			<LoadingSpinner size="lg" />
		</div>
	{:else}
		{#each nodes as node, i}
			<Cell id={node.id} borderB={nodes[i]?.borderB} borderR={nodes[i]?.borderR} />
		{/each}
	{/if}
</div>
