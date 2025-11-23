import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params }) => {
	const carId = params.id;

	const [car] = await db.select().from(table.car).where(eq(table.car.id, carId)).limit(1);

	if (!car) {
		error(404, {
			message: 'Машина не найдена'
		});
	}

	return {
		car
	};
};
