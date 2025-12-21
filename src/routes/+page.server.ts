import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const allCars = await db.select().from(table.car);

	const brands = [...new Set(allCars.map((c) => c.brand))].sort();

	const minPrice = Math.min(...allCars.map((c) => c.pricePerDay));
	const maxPrice = Math.max(...allCars.map((c) => c.pricePerDay));

	return {
		cars: allCars,
		filters: {
			brands,
			minPrice,
			maxPrice
		}
	};
};
