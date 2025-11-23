import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async () => {
	const allCars = await db.select().from(table.car);

	const passengerNoExperience = allCars.filter(
		(car) => car.category === 'passenger' && car.minWorkExperience === 0
	);

	const passengerExperienced = allCars.filter(
		(car) => car.category === 'passenger' && car.minWorkExperience > 0
	);

	const cargo = allCars.filter((car) => car.category === 'cargo');

	return {
		cars: {
			passengerNoExperience,
			passengerExperienced,
			cargo
		}
	};
};
