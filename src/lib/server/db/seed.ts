import 'dotenv/config';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';
import { randomUUID } from 'node:crypto';

if (!process.env.DATABASE_URL) {
	throw new Error('DATABASE_URL is not set in .env');
}

const client = new Database(process.env.DATABASE_URL);
const db = drizzle(client, { schema });

const CARS_DATA = [
	{
		brand: 'Volkswagen',
		model: 'Polo VI',
		year: 2022,
		pricePerDay: 250000,
		category: 'passenger',
		minAge: 18,
		minWorkExperience: 0,
		transmission: 'automatic',
		fuelType: 'petrol',
		seats: 5,
		features: 'Bluetooth, Кондиционер, Парктроник',
		imageUrl: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80'
	},
	{
		brand: 'Skoda',
		model: 'Rapid',
		year: 2023,
		pricePerDay: 260000,
		category: 'passenger',
		minAge: 18,
		minWorkExperience: 0,
		transmission: 'automatic',
		fuelType: 'petrol',
		seats: 5,
		features: 'Мультимедиа, Подогрев сидений',
		imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=80'
	},
	{
		brand: 'Chery',
		model: 'Tiggo 4 Pro',
		year: 2024,
		pricePerDay: 310000,
		category: 'passenger',
		minAge: 18,
		minWorkExperience: 0,
		transmission: 'automatic',
		fuelType: 'petrol',
		seats: 5,
		features: 'Круиз-контроль, Камера заднего вида, CarPlay',
		imageUrl: 'https://images.unsplash.com/photo-1627454820576-5085e347781b?w=800&q=80'
	},
	{
		brand: 'Nissan',
		model: 'Qashqai',
		year: 2021,
		pricePerDay: 350000,
		category: 'passenger',
		minAge: 21,
		minWorkExperience: 2,
		transmission: 'automatic',
		fuelType: 'petrol',
		seats: 5,
		features: 'Панорамная крыша, Климат-контроль, Навигация',
		imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80'
	},
	{
		brand: 'Mercedes-Benz',
		model: 'E200',
		year: 2023,
		pricePerDay: 850000,
		category: 'passenger',
		minAge: 26,
		minWorkExperience: 6,
		transmission: 'automatic',
		fuelType: 'petrol',
		seats: 5,
		features: 'Кожаный салон, Burmester звук, Автопилот, Люк',
		imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80'
	},
	{
		brand: 'Audi',
		model: 'A6',
		year: 2022,
		pricePerDay: 820000,
		category: 'passenger',
		minAge: 26,
		minWorkExperience: 6,
		transmission: 'automatic',
		fuelType: 'petrol',
		seats: 5,
		features: 'Virtual Cockpit, Quattro, Массаж сидений',
		imageUrl: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&q=80'
	},
	{
		brand: 'Ford',
		model: 'Transit',
		year: 2020,
		pricePerDay: 450000,
		category: 'cargo',
		minAge: 18,
		minWorkExperience: 0,
		transmission: 'manual',
		fuelType: 'diesel',
		seats: 3,
		features: 'Грузоподъемность 1т, Кондиционер',
		imageUrl: 'https://images.unsplash.com/photo-1579600164624-9e320d77c772?w=800&q=80'
	}
];

async function main() {
	console.log('🌱 Запускаем сиддинг...');

	try {
		await db.delete(schema.car);
		console.log('🧹 Старые данные удалены.');

		for (const item of CARS_DATA) {
			await db.insert(schema.car).values({
				id: randomUUID(), // Генерируем ID
				...item,
				category: item.category as 'passenger' | 'cargo',
				transmission: item.transmission as 'automatic' | 'manual',
				fuelType: item.fuelType as 'petrol' | 'diesel' | 'electric',
				status: 'available'
			});
		}
		console.log('✅ База данных успешно наполнена машинами!');
	} catch (error) {
		console.error('❌ Ошибка сиддинга:', error);
		process.exit(1);
	}
}

main();
