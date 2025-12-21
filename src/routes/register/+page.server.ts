import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { hash } from '@node-rs/argon2';
import { encodeBase32LowerCase } from '@oslojs/encoding';
import * as auth from '$lib/server/auth';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	// Если уже вошел — кидаем на главную
	if (event.locals.user) {
		return redirect(302, '/');
	}
	return {};
};

export const actions: Actions = {
	register: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get('username');
		const password = formData.get('password');
		const confirmPassword = formData.get('confirm-password');

		// 1. Валидация типов данных
		if (
			typeof username !== 'string' ||
			typeof password !== 'string' ||
			typeof confirmPassword !== 'string'
		) {
			return fail(400, { message: 'Неверные данные формы' });
		}

		// 2. Простые проверки
		if (username.length < 3 || username.length > 31) {
			return fail(400, { message: 'Имя пользователя должно быть от 3 до 31 символов' });
		}
		if (password.length < 6 || password.length > 255) {
			return fail(400, { message: 'Пароль должен быть не менее 6 символов' });
		}
		if (password !== confirmPassword) {
			return fail(400, { message: 'Пароли не совпадают' });
		}

		// 3. Проверка: занят ли юзернейм?
		const [existingUser] = await db
			.select()
			.from(table.user)
			.where(eq(table.user.username, username));

		if (existingUser) {
			return fail(400, { message: 'Это имя пользователя уже занято' });
		}

		// 4. Генерация ID и хеширование
		const userId = generateUserId();
		const passwordHash = await hash(password, {
			// Рекомендованные параметры для Argon2id
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		try {
			// 5. Запись в БД
			await db.insert(table.user).values({
				id: userId,
				username,
				passwordHash,
				role: 'user' // По дефолту обычный юзер
			});

			// 6. Автоматический вход после регистрации
			const sessionToken = auth.generateSessionToken();
			const session = await auth.createSession(sessionToken, userId);
			auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
		} catch (e) {
			console.error(e);
			return fail(500, { message: 'Ошибка сервера при регистрации' });
		}

		return redirect(302, '/');
	}
};

// Вспомогательная функция для генерации ID (как в демо)
function generateUserId() {
	// 15 байт случайных данных кодируем в base32 -> получается 24 символа
	const bytes = crypto.getRandomValues(new Uint8Array(15));
	const id = encodeBase32LowerCase(bytes);
	return id;
}
