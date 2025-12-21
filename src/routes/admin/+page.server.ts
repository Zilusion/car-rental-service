import { error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user || locals.user.role !== 'admin') {
		error(403, 'Доступ запрещен. Только для персонала.');
	}

	const allBookings = await db
		.select({
			id: table.booking.id,
			status: table.booking.status,
			totalPrice: table.booking.totalPrice,
			createdAt: table.booking.createdAt,
			username: table.user.username,
			carBrand: table.car.brand,
			carModel: table.car.model
		})
		.from(table.booking)
		.leftJoin(table.user, eq(table.booking.userId, table.user.id))
		.leftJoin(table.car, eq(table.booking.carId, table.car.id))
		.orderBy(desc(table.booking.createdAt));

	return {
		bookings: allBookings
	};
};
