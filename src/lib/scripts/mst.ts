const createNode = ({ x, y, size }: { x: number; y: number; size: number }): Mst.Node => {
	const node: Mst.Node = {
		visited: false,
		coordinates: [x, y],
		id: x + y * size,
		neighbors: []
	};

	return node;
};

export const createNodes = (size: number): Mst.Node[] => {
	// console.log(getNodePath({ nodeTree: tree, id: 4 }));
	const nodes: Mst.Node[] = [];
	for (let y = 0; y < size; y++) {
		for (let x = 0; x < size; x++) {
			nodes.push(createNode({ x, y, size }));
		}
	}

	addNeighbors({ nodes, size });

	return nodes;
};

const getIdByCoordinates = ({
	x,
	y,
	size
}: {
	x: number;
	y: number;
	size: number;
}): number | undefined => {
	if (x < 0 || y < 0 || x >= size || y >= size) {
		return undefined;
	}
	return x + y * size;
};

const addEdgeWeight = ({
	id,
	neighborCoordinates,
	nodes,
	size
}: {
	id: number;
	neighborCoordinates: [number, number];
	nodes: Mst.Node[];
	size: number;
}) => {
	const [x, y] = neighborCoordinates;

	const neighborId = getIdByCoordinates({ x, y, size });
	if (neighborId === undefined) {
		return;
	}

	const neighbor = nodes[neighborId].neighbors.find((node) => node.id === id);

	if (neighbor) {
		return neighbor.weight;
	}
	return Math.random();
};

const addNeighbors = ({ nodes, size }: { nodes: Mst.Node[]; size: number }) => {
	return nodes.map((node) => {
		const {
			id,
			coordinates: [x, y]
		} = node;
		node.neighbors = [
			{
				id: id - 1,
				weight: addEdgeWeight({ id, neighborCoordinates: [x - 1, y], nodes, size })
			},
			{
				id: id + 1,
				weight: addEdgeWeight({ id, neighborCoordinates: [x + 1, y], nodes, size })
			},
			{
				id: id - size,
				weight: addEdgeWeight({ id, neighborCoordinates: [x, y - 1], nodes, size })
			},
			{
				id: id + size,
				weight: addEdgeWeight({ id, neighborCoordinates: [x, y + 1], nodes, size })
			}
		].filter((n) => n.weight !== undefined);
	});
};
/*
	start på en node og legg naboer i kø
	hvis naboer er allerede besøkt, gå til neste
	hvis naboer ikke er besøkt, sett node som besøkt og legg ubesøkte naboer i kø

*/

const testTree = [
	{
		id: 0,
		children: [
			{
				id: 1,
				children: [
					{
						id: 3,
						children: []
					},
					{
						id: 4,
						children: []
					}
				]
			},
			{
				id: 2,
				children: [
					{
						id: 5,
						children: []
					}
				]
			}
		]
	}
];

// const getNodePath = ({ nodeTree, id }: {nodeTree: Mst.NodeTree, id: number}) => {

// 	let found = false
// 	const path:number[] = []

// 	const findNodePath = ({nodeTree, id}) => {
// 		nodeTree.forEach((node, index) => {
// 			if (node.id === id) {
// 				found = true
// 				path.push(index)
// 			}
// 			//dont do new calls if found
// 			if (node.children && !found) {
// 				findNodePath({nodeTree: node.children, id})

// 				//check to see if we found the node
// 				//if we did, add the index to the path
// 				if(found){
// 					path.push(index)
// 				}
// 			}
// 		})
// 	}
// 	findNodePath({nodeTree, id})
// 	return path.reverse()
// };

// const getNode = ({nodeTree, id}) => {
// 	const path = getNodePath({nodeTree, id})

// 	const traverseTree = ({nodeTree: nodeTree, path}) => {
// 		if(!nodeTree[path.shift()].children){
// 			return nodeTree
// 		}
// 		const nextNode = nodeTree[path.shift()].children
// 		if(path.length === 0){
// 			return nodeTree
// 		}
// 		return traverseTree({nodeTree:nextNode, path})
// 	}
// 	return traverseTree({nodeTree, path})
// }



// export const createMst = (nodes: Mst.Node[]) => {
// 	console.log(getNode({nodeTree: testTree, id: 5}))
// 	const tree = [];
// 	const mst: Mst.Node[] = [];
// 	const visited: Mst.Node[] = [];
// 	const queue: Mst.Node[] = [nodes[0]];

// 	while (queue.length) {
// 		const node: Mst.Node = queue.shift();
// 		if (node.visited) {
// 			continue;
// 		}

// 		node.visited = true;
// 		visited.push(node);

// 		const parent = getNode({ nodeTree: tree, id: node.parent });
// 		// console.log(parentPath)

// 		const treeNode = {
// 			id: node.id,
// 			children: [],
// 			path:[],
// 		};
// 		if (!tree.length) {
// 			tree.push(treeNode);
// 		}
		

// 		node.neighbors.forEach((neighbor) => {
// 			if (!nodes[neighbor.id].visited) {
// 				nodes[neighbor.id].parent = node.id;
// 				queue.push(nodes[neighbor.id]);
// 			}
// 			console.log(queue[0])
// 			// console.log(node.id, " -> ",node.parent)
// 		});
// 		mst.push(node);
// 	}
// 	// console.log(tree)
// 	return mst;
// };
