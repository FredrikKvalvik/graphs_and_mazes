import { MstGraph } from './mst-prim';

onmessage = (e => {
  const { data } = e;

  const graph = new MstGraph(data).createMst()

  const body = {
    edges: graph.edges,
    nodes: graph.nodes
  }
  postMessage(body);
})