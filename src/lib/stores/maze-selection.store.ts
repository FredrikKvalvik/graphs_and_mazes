import { writable } from 'svelte/store';

export const mazeSelection = (() => {
	const { subscribe, update } = writable({
		selectedSize: 10,
		algorithm: 'prim'
	});

	return {
		subscribe,
		setSelectedSize: (size: string) =>
			update((obj) => {
				obj.selectedSize = parseInt(size);
				return obj;
			}),
		setSelectedAlgorithm: (algorithm: string) =>
			update((obj) => {
				obj.algorithm = algorithm;
				return obj;
			})
	};
})();
