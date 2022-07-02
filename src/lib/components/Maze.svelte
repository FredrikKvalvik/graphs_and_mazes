<script lang="ts">
	import type { GraphEdges } from '$lib/scripts/mst-prim';

	import { mazeSelection } from '$lib/stores/maze-selection.store';
	import { maze } from "$lib/stores/maze.store"
	import Cell from '$lib/components/Cell.svelte';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import MazeSelection from '$lib/components/maze-selection.svelte';
	import PrimMstWorker from '$lib/workers/mst-prim-worker.ts?worker';

	const mazeSize = 700;
	interface node {
		borderB: boolean;
		borderR: boolean;
		id: number;
	}

	// let size: number = 10;
	// let edges: GraphEdges = [];
	// let nodes: node[] = [];

	let waitingForWorker = false

	const removeBorders = () => {
		$maze.edges.forEach((edge) => {
			const [a, b] = edge.vertexes;

			// if b === case
			switch (b) {
				//north
				case a + $maze.size:
					maze.updateNodes(a, "borderB")
					break;
				//south
				case a - $maze.size:
					maze.updateNodes(b, "borderB")
					break;
				//east
				case a + 1:
					maze.updateNodes(a, "borderR")
					break;
				//west
				case a - 1:
					maze.updateNodes(b, "borderR")
					break;
			}

			// remove all borders to the right of the maze
			if (b % $maze.size === $maze.size - 1) {
				maze.updateNodes(b, "borderR")
			}
			// remove all borders to at the bottom of the maze
			if (b - ($maze.size * $maze.size - $maze.size) >= 0) {
				maze.updateNodes(b, "borderB")
			}
		});
	};

	const enrichNodes = () => {
		const nodes = []
		for (let i = 0; i < $maze.size * $maze.size; i++) {
			nodes.push({
				borderB: true,
				borderR: true,
				id: i
			});
		}
		maze.setNodes(nodes)
	};


	const handleMazeGenerationWorker = () => {
		maze.reset();
		waitingForWorker = true;

		const worker = new PrimMstWorker();
		worker.postMessage($mazeSelection.selectedSize);

		worker.onmessage = handleWorkerAnswer;
	};

	const handleWorkerAnswer = ({ data }: { data: { size: number; edges: GraphEdges } }) => {
		maze.setEdges(data.edges);
		maze.setSize(data.size);
		enrichNodes();
		removeBorders();

		waitingForWorker = false;
	};

	// dont know how to type events
	const handleSelect = (e: any) => {
		$mazeSelection.selectedSize = parseInt(e.target.value);
	};
</script>

<div class="flex flex-row mt-12">
	<MazeSelection
		disabled={waitingForWorker}
		on:click={handleMazeGenerationWorker}
		on:change={handleSelect}
	/>

	<div
		class="mx-auto grid border-2 border-black relative"
		style="width: {mazeSize}px; height: {mazeSize}px; grid-template-columns: repeat({$maze.size}, 1fr); grid-template-rows: repeat({$maze.size}, 1fr);"
	>
		{#if waitingForWorker}
			<div class="absolute top-1/2 right-1/2">
				<LoadingSpinner size="lg" />
			</div>
		{:else}
			{#each $maze.nodes as node, i}
				<Cell id={node.id} borderB={$maze.nodes[i]?.borderB} borderR={$maze.nodes[i]?.borderR} />
			{/each}
		{/if}
	</div>
</div>
