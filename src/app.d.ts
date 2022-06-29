/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}

export declare global {
	namespace Dfs {
		interface Tile {
			coordinates: [number, number];
			top: boolean;
			left: boolean;
			bottom: boolean;
			right: boolean;
			isVisited: boolean;
		}

		interface LabyrinthOptions {
			from?: direction;
			previousTile?: Tile;
		}

		type direction = 'top' | 'left' | 'bottom' | 'right';
	}

	namespace Mst {
		interface Node {
			visited: boolean;
			parent?: number;
			coordinates: [number, number];
			id: number;
			neighbors: {
				id: number;
				weight?: number;
			}[];
		}

		interface NodeTree {
			id: number;
			children?: NodeTree[];
		}
	}
}
