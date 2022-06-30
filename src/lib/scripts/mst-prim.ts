class GraphNode {
	coordinates: [number, number];
	id: number;
	neighbors: GraphNode[];

	constructor({ coordinates, size }: { coordinates: [number, number]; size: number }) {
		this.coordinates = coordinates;
		this.id = coordinates[0] + coordinates[1] * size;
		this.neighbors = [];
	}

	addNeighbor(neighbor: GraphNode) {
		this.neighbors.push(neighbor);
	}

	getNeighborsIds(size: number) {
		const [x, y] = this.coordinates;
		const validNeighborsIds = [
			{
				id: this.id - 1,
				coordinates: [x - 1, y]
			},
			{
				id: this.id + 1,
				coordinates: [x + 1, y]
			},
			{
				id: this.id - size,
				coordinates: [x, y - 1]
			},
			{
				id: this.id + size,
				coordinates: [x, y + 1]
			}
		]
			.filter((neighbor) => {
				const [y, x] = neighbor.coordinates;
        return !(y < 0 || x < 0 || y >= size || x >= size);
			})
			.map((neighbor) => neighbor.id);

		return validNeighborsIds;
	}
}

class GraphEdge {
	weight: number;
	vertexes: [number, number];

	constructor(a: number, b: number) {
		this.weight = Math.random();
		this.vertexes = [a, b];
	}
}
export type GraphEdges = GraphEdge[];

export class MstGraph {
	nodes: GraphNode[];
	// edges: GraphEdge[];
	size: number;

	constructor(size: number) {
		this.nodes = [];
		// this.edges = [];
		this.size = size;
		this.generateNodes();
	}

	private generateNodes() {
		for (let x = 0; x < this.size; x++) {
				for (let y = 0; y < this.size; y++) {
				this.nodes.push(new GraphNode({ coordinates: [y, x], size: this.size }));
			}
		}
	}

	private getNode(id: number) {
		return this.nodes[id];
	}

	private findLightestEdge({ validEdges }: { validEdges: GraphEdge[] }) {
		const edges = validEdges;
		return edges.sort((a, b) => a.weight - b.weight)[0];
	}
	// addNewValidNode({edge, }: {edge: GraphEdge, visited: Set<number>}) {
	//   visited.add()
	// }

	private addNeighbors(node: GraphNode) {
		node
			.getNeighborsIds(this.size)
			.map((id) => this.getNode(id))
			.map((n) => node.addNeighbor(n))
      .filter(m => m !== undefined);
	}

	// private addEdge(edge: GraphEdge) {
	// 	this.edges.push(edge);
	// }

	createMst() {
		console.time("mst")
		console.log("loading...")
		const nodes = this.nodes;
		const visited = new Set<number>();

		const treeEdges: GraphEdge[] = []

		// add starting point
		visited.add(nodes[0].id);
		this.addNeighbors(nodes[0]);
		const validEdges = nodes[0].neighbors.map((neighbor) => {
			return new GraphEdge(nodes[0].id, neighbor.id);
		});

		while (validEdges.length && visited.size !== nodes.length) {

      // find lightest edge
			const edge = this.findLightestEdge({ validEdges });

      // check if either node is already visited
      // and remove edge from validEdges if so
      if (visited.has(edge.vertexes[0]) && visited.has(edge.vertexes[1])) {
        validEdges.splice(validEdges.indexOf(edge), 1);
        continue
      }
      // add lightest edge to mst
      treeEdges.push(edge);
      
			// get new valid edges from the next node
			edge.vertexes.forEach((vertex) => {
        if (visited.has(vertex)) {
          return;
        }
        visited.add(vertex);

        // get node and corresponding neighbors
				const node = this.getNode(vertex);
				this.addNeighbors(node);

        // filter out edges that are already in mst
				const validNeighbors = node.neighbors.filter((neighbor) => {
					return !visited.has(neighbor.id);
				});

        // add new valid edges to validEdges
				validEdges.push(
					...validNeighbors.map((neighbor) => {
						return new GraphEdge(vertex, neighbor.id);
					})
				);

			});

			// remove non-valid edges
			validEdges.forEach((currentEdge) => {
				if (visited.has(currentEdge.vertexes[0]) && visited.has(currentEdge.vertexes[1])) {
					validEdges.splice(validEdges.indexOf(currentEdge), 1);
				}
			});
		}
		console.timeEnd("mst")
		return treeEdges
	}

	reset() {
		this.nodes = [];
		// this.edges = [];
		this.generateNodes();
	}
}
