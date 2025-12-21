import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';

export const load: PageServerLoad = async ({ params }) => {
	const carId = params.id;
	const [car] = await db.select().from(table.car).where(eq(table.car.id, carId)).limit(1);
	if (!car) error(404, 'Машина не найдена');
	return { car };
};

export const actions: Actions = {
	book: async ({ request, locals, params }) => {
		if (!locals.user) {
			return fail(401, { error: 'Нужно войти в систему' });
		}

		const formData = await request.formData();
		const startDateStr = formData.get('startDate') as string;
		const endDateStr = formData.get('endDate') as string;
		const totalPrice = Number(formData.get('totalPrice'));

		if (!startDateStr || !endDateStr || !totalPrice) {
			return fail(400, { error: 'Неверные данные бронирования' });
		}

		try {
			await db.insert(table.booking).values({
				id: randomUUID(),
				userId: locals.user.id,
				carId: params.id!,
				startDate: new Date(startDateStr),
				endDate: new Date(endDateStr),
				totalPrice: totalPrice,
				status: 'confirmed'
			});
		} catch (e) {
			console.error(e);
			return fail(500, { error: 'Ошибка при создании брони' });
		}

		redirect(303, '/profile');
	}
};
