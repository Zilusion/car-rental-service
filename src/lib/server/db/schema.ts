import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: text('id').primaryKey(),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	role: text('role').$type<'user' | 'admin'>().default('user').notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.default(sql`(CURRENT_TIMESTAMP)`)
		.notNull()
});

export const session = sqliteTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

export const car = sqliteTable('car', {
	id: text('id').primaryKey(),
	brand: text('brand').notNull(),
	model: text('model').notNull(),
	year: integer('year').notNull(),
	pricePerDay: integer('price_per_day').notNull(),
	category: text('category').$type<'passenger' | 'cargo'>().notNull(),
	minAge: integer('min_age').notNull().default(18),
	minWorkExperience: integer('min_work_experience').notNull().default(0),
	transmission: text('transmission').$type<'automatic' | 'manual'>().notNull(),
	fuelType: text('fuel_type').$type<'petrol' | 'diesel' | 'electric'>().notNull(),
	seats: integer('seats').notNull().default(5),
	features: text('features'),
	imageUrl: text('image_url').notNull(),
	status: text('status')
		.$type<'available' | 'rented' | 'maintenance'>()
		.default('available')
		.notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.default(sql`(CURRENT_TIMESTAMP)`)
		.notNull()
});

export const booking = sqliteTable('booking', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	carId: text('car_id')
		.notNull()
		.references(() => car.id),
	startDate: integer('start_date', { mode: 'timestamp' }).notNull(),
	endDate: integer('end_date', { mode: 'timestamp' }).notNull(),
	totalPrice: integer('total_price').notNull(),
	status: text('status')
		.$type<'pending' | 'confirmed' | 'cancelled' | 'completed'>()
		.default('pending')
		.notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.default(sql`(CURRENT_TIMESTAMP)`)
		.notNull()
});

export type User = typeof user.$inferSelect;
export type Session = typeof session.$inferSelect;
export type Car = typeof car.$inferSelect;
export type Booking = typeof booking.$inferSelect;
