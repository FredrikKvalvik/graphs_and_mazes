import {writable} from 'svelte/store';
import type {MstGraph} from '$lib/scripts/mst-prim';

export const maze = (() => {
  const {subscribe, set, update} = writable();

  return {
    subscribe,
    set: (value: MstGraph) => set(value)
  }

})()