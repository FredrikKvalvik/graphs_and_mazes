import { MstGraph } from '$lib/scripts/mst-prim';

onmessage = (e => {
  const { data } = e;

  const graph = new MstGraph(data).createMst()

  postMessage(graph);
})