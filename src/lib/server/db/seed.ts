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
	// --- ЭКОНОМ / БЕЗ СТАЖА (18/0) ---
	{
		brand: 'Volkswagen',
		model: 'Polo VI',
		year: 2022,
		pricePerDay: 252000,
		category: 'passenger',
		minAge: 18,
		minWorkExperience: 0,
		transmission: 'automatic',
		fuelType: 'petrol',
		seats: 5,
		features: 'Кондиционер, Bluetooth, Подогрев зеркал',
		imageUrl: '/images/cars/vw-polo-vi.webp'
	},
	{
		brand: 'Skoda',
		model: 'Rapid',
		year: 2023,
		pricePerDay: 253600,
		category: 'passenger',
		minAge: 18,
		minWorkExperience: 0,
		transmission: 'automatic',
		fuelType: 'petrol',
		seats: 5,
		features: 'Мультимедиа, Подогрев сидений, USB-зарядка',
		imageUrl: '/images/cars/skoda-rapid.webp'
	},
	{
		brand: 'KIA',
		model: 'Rio X',
		year: 2022,
		pricePerDay: 266200,
		category: 'passenger',
		minAge: 18,
		minWorkExperience: 0,
		transmission: 'automatic',
		fuelType: 'petrol',
		seats: 5,
		features: 'Климат-контроль, Камера заднего вида, Apple CarPlay',
		imageUrl: '/images/cars/kia-rio-x.webp'
	},
	{
		brand: 'Chery',
		model: 'Tiggo 4',
		year: 2023,
		pricePerDay: 266900,
		category: 'passenger',
		minAge: 18,
		minWorkExperience: 0,
		transmission: 'automatic',
		fuelType: 'petrol',
		seats: 5,
		features: 'Парктроники, Круиз-контроль, Обогрев руля',
		imageUrl: '/images/cars/chery-tiggo-4.webp'
	},
	{
		brand: 'Chery',
		model: 'Tiggo 4 Pro',
		year: 2024,
		pricePerDay: 275900,
		category: 'passenger',
		minAge: 18,
		minWorkExperience: 0,
		transmission: 'automatic',
		fuelType: 'petrol',
		seats: 5,
		features: 'Панорамная крыша, Камера 360, Беспроводная зарядка',
		imageUrl: '/images/cars/chery-tiggo-4-pro.webp'
	},

	// --- КОМФОРТ (21/2) ---
	{
		brand: 'Nissan',
		model: 'Qashqai',
		year: 2021,
		pricePerDay: 289900,
		category: 'passenger',
		minAge: 21,
		minWorkExperience: 2,
		transmission: 'automatic',
		fuelType: 'petrol',
		seats: 5,
		features: 'Двухзонный климат, Навигация, Удержание в полосе',
		imageUrl: '/images/cars/nissan-qashqai.webp'
	},
	{
		brand: 'Omoda',
		model: 'S5',
		year: 2023,
		pricePerDay: 312000,
		category: 'passenger',
		minAge: 21,
		minWorkExperience: 2,
		transmission: 'automatic',
		fuelType: 'petrol',
		seats: 5,
		features: 'Спортивные сиденья, Люк, Атмосферная подсветка',
		imageUrl: '/images/cars/omoda-s5.webp'
	},
	{
		brand: 'Chery',
		model: 'Tiggo 7 Pro',
		year: 2024,
		pricePerDay: 325100,
		category: 'passenger',
		minAge: 21,
		minWorkExperience: 2,
		transmission: 'automatic',
		fuelType: 'petrol',
		seats: 5,
		features: 'Кожаный салон, Электропривод багажника, Автозапуск',
		imageUrl: '/images/cars/chery-tiggo-7-pro.webp'
	},
	{
		brand: 'Haval',
		model: 'Jolion',
		year: 2024,
		pricePerDay: 329700,
		category: 'passenger',
		minAge: 21,
		minWorkExperience: 2,
		transmission: 'automatic',
		fuelType: 'petrol',
		seats: 5,
		features: 'Проекция на стекло, Ассистент парковки, Android Auto',
		imageUrl: '/images/cars/haval-jolion.webp'
	},
	{
		brand: 'Geely',
		model: 'Emgrand',
		year: 2024,
		pricePerDay: 330200,
		category: 'passenger',
		minAge: 21,
		minWorkExperience: 2,
		transmission: 'automatic',
		fuelType: 'petrol',
		seats: 5,
		features: 'Большой багажник, Тихий салон, Климат-контроль',
		imageUrl: '/images/cars/geely-emgrand.webp'
	},
	{
		brand: 'Belgee',
		model: 'X50',
		year: 2024,
		pricePerDay: 332600,
		category: 'passenger',
		minAge: 21,
		minWorkExperience: 2,
		transmission: 'automatic',
		fuelType: 'petrol',
		seats: 5,
		features: 'Турбо-мотор, Спортивный режим, Панорама',
		imageUrl: '/images/cars/belgee-x50.webp'
	},
	{
		brand: 'Geely',
		model: 'Coolray',
		year: 2023,
		pricePerDay: 332600,
		category: 'passenger',
		minAge: 21,
		minWorkExperience: 2,
		transmission: 'automatic',
		fuelType: 'petrol',
		seats: 5,
		features: 'Автопарковка, Видеорегистратор, Спортивный выхлоп',
		imageUrl: '/images/cars/geely-coolray.webp'
	},

	// --- ПРЕМИУМ / БИЗНЕС (24/4) ---
	{
		brand: 'Exeed',
		model: 'LX FL',
		year: 2024,
		pricePerDay: 342800,
		category: 'passenger',
		minAge: 24,
		minWorkExperience: 4,
		transmission: 'automatic',
		fuelType: 'petrol',
		seats: 5,
		features: 'Премиум аудио Sony, Голосовое управление, Полный привод',
		imageUrl: '/images/cars/exeed-lx-fl.webp'
	},
	{
		brand: 'Exeed',
		model: 'LX',
		year: 2023,
		pricePerDay: 345400,
		category: 'passenger',
		minAge: 24,
		minWorkExperience: 4,
		transmission: 'automatic',
		fuelType: 'petrol',
		seats: 5,
		features: 'Двойные стекла, Ионизация воздуха, Face ID',
		imageUrl: '/images/cars/exeed-lx.webp'
	},
	{
		brand: 'Toyota',
		model: 'RAV4',
		year: 2022,
		pricePerDay: 346500,
		category: 'passenger',
		minAge: 24,
		minWorkExperience: 4,
		transmission: 'automatic',
		fuelType: 'petrol',
		seats: 5,
		features: 'Легендарная надежность, Safety Sense, Off-road режим',
		imageUrl: '/images/cars/toyota-rav4.webp'
	},
	{
		brand: 'Omoda',
		model: 'C5',
		year: 2024,
		pricePerDay: 361900,
		category: 'passenger',
		minAge: 24,
		minWorkExperience: 4,
		transmission: 'automatic',
		fuelType: 'petrol',
		seats: 5,
		features: 'Футуристичный дизайн, Акустика, Вентиляция сидений',
		imageUrl: '/images/cars/omoda-c5.webp'
	},

	// --- ГРУЗОВЫЕ / СПЕЦ ---
	{
		brand: 'Ford',
		model: 'Transit',
		year: 2021,
		pricePerDay: 450000,
		category: 'cargo',
		minAge: 18,
		minWorkExperience: 0,
		transmission: 'manual',
		fuelType: 'diesel',
		seats: 3,
		features: 'Объем 10м³, Грузоподъемность 1.2т, Задние распашные двери',
		imageUrl: '/images/cars/ford-transit.webp'
	},
	{
		brand: 'Sollers',
		model: 'Atlant (Грузовой)',
		year: 2023,
		pricePerDay: 420000,
		category: 'cargo',
		minAge: 18,
		minWorkExperience: 0,
		transmission: 'manual',
		fuelType: 'diesel',
		seats: 3,
		features: 'Высокая крыша, Низкая погрузка, Webasto',
		imageUrl: '/images/cars/sollers-atlant-cargo.webp'
	},
	{
		brand: 'Sollers',
		model: 'Atlant (Пассажирский)',
		year: 2023,
		pricePerDay: 480000,
		category: 'cargo',
		minAge: 25,
		minWorkExperience: 5,
		transmission: 'manual',
		fuelType: 'diesel',
		seats: 9,
		features: '9 мест, Кондиционер в салоне, USB у каждого места',
		imageUrl: '/images/cars/sollers-atlant-bus.webp'
	}
];

async function main() {
	console.log('🌱 Запускаем сиддинг...');

	try {
		await db.delete(schema.car);
		console.log('🧹 Старые данные удалены.');

		for (const item of CARS_DATA) {
			await db.insert(schema.car).values({
				id: randomUUID(),
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
