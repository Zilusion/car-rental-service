import { redirect, fail } from '@sveltejs/kit';
import { eq, desc, and } from 'drizzle-orm';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	// 1. Защита маршрута: только авторизованные
	if (!locals.user) {
		return redirect(302, '/login');
	}

	// 2. Получаем список бронирований текущего пользователя
	// Нам нужно объединить таблицу booking и car, чтобы показать фото и название машины
	const bookings = await db
		.select({
			id: table.booking.id,
			status: table.booking.status,
			startDate: table.booking.startDate,
			endDate: table.booking.endDate,
			totalPrice: table.booking.totalPrice,
			createdAt: table.booking.createdAt,
			car: {
				brand: table.car.brand,
				model: table.car.model,
				imageUrl: table.car.imageUrl
			}
		})
		.from(table.booking)
		.innerJoin(table.car, eq(table.booking.carId, table.car.id))
		.where(eq(table.booking.userId, locals.user.id))
		.orderBy(desc(table.booking.createdAt)); // Сначала новые

	return {
		bookings
	};
};

export const actions: Actions = {
	// Действие для отмены бронирования
	cancelBooking: async ({ request, locals }) => {
		if (!locals.user) return fail(401);

		const formData = await request.formData();
		const bookingId = formData.get('bookingId') as string;

		if (!bookingId) return fail(400);

		try {
			// Обновляем статус, но только если бронь принадлежит этому юзеру
			await db
				.update(table.booking)
				.set({ status: 'cancelled' })
				.where(and(eq(table.booking.id, bookingId), eq(table.booking.userId, locals.user.id)));
		} catch (e) {
			console.error(e);
			return fail(500, { message: 'Не удалось отменить бронирование' });
		}

		return { success: true };
	}
};
