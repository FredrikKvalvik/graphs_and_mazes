<script lang="ts">
	const getTileIndex = (x: number, y: number) => {
		return y * 10 + x;
	};

	const getValidNeighbors = ({
		x,
		y
	}: {
		x: number;
		y: number;
	}): { index: number; direction: Dfs.direction }[] => {
		const neighbors = [];
		if (x < 9) {
			const rightIndex = getTileIndex(x + 1, y);
			const rightNeighbor: { index: number; direction: Dfs.direction } = {
				index: rightIndex,
				direction: 'right'
			};
			neighbors.push(rightNeighbor);
		}
		if (x > 0) {
			const leftIndex = getTileIndex(x - 1, y);
			const leftNeighbor: { index: number; direction: Dfs.direction } = {
				index: leftIndex,
				direction: 'left'
			};
			neighbors.push(leftNeighbor);
		}
		if (y > 0) {
			const topIndex = getTileIndex(x, y - 1);
			const topNeighbor: { index: number; direction: Dfs.direction } = {
				index: topIndex,
				direction: 'top'
			};
			neighbors.push(topNeighbor);
		}
		if (y < 9) {
			const bottomIndex = getTileIndex(x, y + 1);
			const bottomNeighbor: { index: number; direction: Dfs.direction } = {
				index: bottomIndex,
				direction: 'bottom'
			};
			neighbors.push(bottomNeighbor);
		}
		return neighbors;
	};

	const removeNeighborWalls = ({
		from,
		newCurrentTile
	}: {
		from: Dfs.direction;
		newCurrentTile: Dfs.Tile;
	}) => {
		switch (from) {
			case 'bottom':
				newCurrentTile.top = true;
				break;
			case 'top':
				newCurrentTile.bottom = true;
				break;
			case 'left':
				newCurrentTile.right = true;
				break;
			case 'right':
				newCurrentTile.left = true;
				break;
		}
	};

	const generateNewTile = (x: number, y: number): Dfs.Tile => {
		return {
			coordinates: [x, y],
			top: false,
			left: false,
			bottom: false,
			right: false,
			isVisited: false
		};
	};

	const generateTiles = (size: number): Dfs.Tile[] => {
		const tiles: Dfs.Tile[] = [];
		for (let y = 0; y < size; y++) {
			for (let x = 0; x < size; x++) {
				tiles.push(generateNewTile(x, y));
			}
		}
		return tiles;
	};

	const visitNewTile = ({
		newCurrentTile,
		tiles,
		options
	}: {
		newCurrentTile: Dfs.Tile;
		tiles: Dfs.Tile[];
		options?: Dfs.LabyrinthOptions;
	}) => {
		newCurrentTile.isVisited = true;
		const [x, y] = newCurrentTile.coordinates;

		if (options?.from) {
			removeNeighborWalls({
				from: options.from,
				newCurrentTile
			});
		}

		const neighbors = getValidNeighbors({ x, y }).sort(() => Math.random() - 0.5);

		neighbors.forEach((neighbor) => {
			if (!tiles[neighbor.index].isVisited) {
				newCurrentTile[neighbor.direction] = true;
				visitNewTile({
					newCurrentTile: tiles[neighbor.index],
					tiles,
					options: { previousTile: newCurrentTile, from: neighbor.direction }
				});
			}
		});
	};

	export const generateLabyrinth = (size: number) => {
		const tiles = generateTiles(size);

		visitNewTile({ newCurrentTile: tiles[0], tiles });

		labyrinth = tiles;
	};

	let labyrinth: Dfs.Tile[];
</script>

<div class="max-w-3xl mx-auto mt-8">
	<h1 class="text-4xl">Depth first</h1>
	<button
		class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
		on:click={() => {
			generateLabyrinth(10);
		}}>Generate</button
	>

	{#if labyrinth}
		<div class="grid grid-cols-10 grid-rows-10 w-fit mt-4">
			{#each labyrinth as { top, bottom, left, right }, index}
				<div
					class:bg-yellow-100={index === 0}
					class:bg-blue-100={index === 99}
					class="text-center h-20 w-20"
					style={`
          border-top: ${top ? 'none' : '2px solid black'};
          border-bottom: ${bottom ? 'none' : '2px solid black'};
          border-left: ${left || index === 0 ? 'none' : '2px solid black'};
          border-right: ${right || index === 99 ? 'none' : '2px solid black'};
        `}
				/>
			{/each}
		</div>
	{/if}
</div>
