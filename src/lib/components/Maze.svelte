<script lang="ts">
	import { MstGraph } from '$lib/scripts/mst-prim';
	import { Button } from '$lib/elements';
	import Cell from '$lib/components/Cell.svelte';

	const mazeSize = 800;


  interface node {
    borderB: boolean;
    borderR: boolean;
    id: number;
  }

	let size = 20;
	let graph = new MstGraph(size);
	let nodes: node[] = []

	$: graph = new MstGraph(size);


  const resetNodes = () => {
    nodes = graph.nodes.map((nodes, i) => {
      return {
        borderB: true,
        borderR: true,
        id: i
      }
    })
  }

	const handleMazeGeneration = () => {
    graph.createMst();
    resetNodes()

    console.log(nodes.length);

		graph.edges.forEach((edge) => {
			const [a, b] = edge.vertexes;

      // if b === case
      switch (b){
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
      if(b % size === size-1){
        nodes[b].borderR = false;
      }
      if(b - (size * size - size) >= 0){
        nodes[b].borderB = false;
      }

		})
	};
</script>

<div class="p-8 border-2 border-red-200 max-w-md mx-auto">
	<input max="120" min="2" class="border-2 border-black" bind:value={size} type="number" on:change={resetNodes}/>
	<Button on:click={handleMazeGeneration}>Generate Maze</Button>
</div>

<div
	class="bg-red mx-auto grid border-2 border-black"
	style="width: {mazeSize}px; height: {mazeSize}px; grid-template-columns: repeat({size}, 1fr); grid-template-rows: repeat({size}, 1fr);"
>
	{#each graph.nodes as node, i}
		<div
			data-id={i}
			class="flex items-center justify-center text-gray-300"
			class:border-b={nodes[i]?.borderB}
			class:border-r={nodes[i]?.borderR}
		>
		</div>
	{/each}
</div>

<style>
	.border-r {
		border-right: 1px solid black;
	}
	.border-b {
		border-bottom: 1px solid black;
	}
</style>
