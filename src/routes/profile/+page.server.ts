import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq, sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) redirect(302, '/login');

	const [stats] = await db
		.select({
			count: sql<number>`count(*)`,
			totalSpent: sql<number>`sum(${table.booking.totalPrice})`
		})
		.from(table.booking)
		.where(eq(table.booking.userId, locals.user.id));

	return {
		user: locals.user,
		stats: {
			count: stats?.count || 0,
			totalSpent: stats?.totalSpent || 0
		}
	};
};
