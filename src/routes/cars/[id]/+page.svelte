<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { enhance } from '$app/forms';

	import { Button } from '$lib/components/ui/button';
	import { RangeCalendar } from '$lib/components/ui/range-calendar';
	import { Separator } from '$lib/components/ui/separator';
	import { getLocalTimeZone, today, type DateValue } from '@internationalized/date';
	import { Armchair, Fuel, Settings2, User } from '@lucide/svelte';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { Badge } from '$lib/components/ui/badge';

	let { data, form }: { data: PageData; form: ActionData } = $props();
	let { car } = data;
	let user = $derived(page.data.user);

	let value = $state({
		start: today(getLocalTimeZone()),
		end: today(getLocalTimeZone()).add({ days: 1 })
	});

	// Расчет дней и цены
	let days = $derived.by(() => {
		if (!value.start || !value.end) return 0;
		const start = value.start.toDate(getLocalTimeZone());
		const end = value.end.toDate(getLocalTimeZone());
		const diffTime = Math.abs(end.getTime() - start.getTime());
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays || 1;
	});

	let totalPrice = $derived(days * car.pricePerDay);
	const formatPrice = (p: number) => (p / 100).toLocaleString('ru-RU');

	// Функция для конвертации CalendarDate в строку ISO (YYYY-MM-DD) для формы
	function formatIsoDate(date: DateValue | undefined) {
		if (!date) return '';
		return date.toString(); // CalendarDate.toString() возвращает YYYY-MM-DD
	}
</script>

<div class="container mx-auto py-10 px-4 max-w-6xl">
	<!-- Хлебные крошки -->
	<div class="text-sm text-zinc-400 mb-6">
		<a href={resolve('/')} class="hover:text-zinc-900 transition-colors">Главная</a> / {car.brand}
		{car.model}
	</div>

	<!-- Заголовок -->
	<div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
		<div>
			<h1 class="text-4xl md:text-5xl font-black text-zinc-900 tracking-tight mb-2">
				{car.brand}
				{car.model}
			</h1>
			<div class="text-2xl font-medium text-zinc-900">
				от {formatPrice(car.pricePerDay)} ₽
				<span class="text-lg text-zinc-400 font-normal">/ день</span>
			</div>
		</div>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
		<!-- ЛЕВАЯ КОЛОНКА (без изменений) -->
		<div class="lg:col-span-8 space-y-12">
			<div
				class="w-full aspect-video bg-zinc-100 rounded-3xl overflow-hidden flex items-center justify-center p-8 relative group"
			>
				<img
					src={car.imageUrl}
					alt={car.model}
					class="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
				/>
				<Badge
					variant="outline"
					class="absolute top-6 left-6 bg-white/80 backdrop-blur border-zinc-200"
				>
					{car.year} год
				</Badge>
			</div>

			<!-- Характеристики (сократил для примера, код тот же) -->
			<div>
				<h3 class="text-xl font-bold mb-6">Характеристики</h3>
				<div class="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4">
					<div class="space-y-1">
						<div class="text-xs text-zinc-400 uppercase tracking-wide">Категория</div>
						<div class="font-medium flex items-center gap-2">
							<Armchair class="w-4 h-4 text-zinc-400" />
							{car.category === 'passenger' ? 'Легковая' : 'Грузовая'}
						</div>
					</div>
					<!-- ... остальные хар-ки ... --><!-- Топливо -->
					<div class="space-y-1">
						<div class="text-xs text-zinc-400 uppercase tracking-wide">Топливо</div>
						<div class="font-medium flex items-center gap-2">
							<Fuel class="w-4 h-4 text-zinc-400" />
							{car.fuelType}
						</div>
					</div>

					<!-- Коробка -->
					<div class="space-y-1">
						<div class="text-xs text-zinc-400 uppercase tracking-wide">Коробка передач</div>
						<div class="font-medium flex items-center gap-2">
							<Settings2 class="w-4 h-4 text-zinc-400" />
							{car.transmission === 'automatic' ? 'Автомат' : 'Механика'}
						</div>
					</div>

					<!-- Возраст -->
					<div class="space-y-1">
						<div class="text-xs text-zinc-400 uppercase tracking-wide">Требования</div>
						<div class="font-medium flex items-center gap-2">
							<User class="w-4 h-4 text-zinc-400" />
							{car.minAge}+ лет
						</div>
					</div>
				</div>
				{#if car.features}
					<div class="mt-8 flex flex-wrap gap-2">
						{#each car.features.split(',') as feature (feature)}
							<div
								class="bg-zinc-50 px-3 py-1.5 rounded-lg text-sm text-zinc-600 border border-zinc-100"
							>
								{feature.trim()}
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>

		<!-- ПРАВАЯ КОЛОНКА: ВИДЖЕТ БРОНИРОВАНИЯ -->
		<div class="lg:col-span-4">
			<div
				class="bg-white border border-zinc-200 shadow-xl shadow-zinc-200/50 rounded-3xl p-6 lg:p-8 sticky top-24"
			>
				<h3 class="text-xl font-bold mb-4">Оформить аренду</h3>

				<div class="mb-6">
					<span class="text-sm font-medium text-zinc-500 mb-2 block">Выберите даты</span>
					<div class="border rounded-xl p-1 bg-zinc-50 flex justify-center">
						<RangeCalendar
							bind:value
							class="rounded-md border-none bg-transparent"
							weekdayFormat="short"
							minValue={today(getLocalTimeZone())}
						/>
					</div>
				</div>

				<div class="space-y-3 mb-6">
					<div class="flex justify-between text-zinc-600">
						<span>{formatPrice(car.pricePerDay)} ₽ × {days} дн.</span>
						<span>{formatPrice(totalPrice)} ₽</span>
					</div>
					<Separator />
					<div class="flex justify-between items-center">
						<span class="font-bold text-lg">Итого</span>
						<span class="font-black text-2xl text-indigo-900">{formatPrice(totalPrice)} ₽</span>
					</div>
				</div>

				<form method="POST" action="?/book" use:enhance>
					<!-- Используем хелпер formatIsoDate -->
					<input type="hidden" name="startDate" value={formatIsoDate(value.start)} />
					<input type="hidden" name="endDate" value={formatIsoDate(value.end)} />
					<input type="hidden" name="totalPrice" value={totalPrice} />

					{#if user}
						<Button
							type="submit"
							size="lg"
							class="w-full text-lg py-6 rounded-xl bg-indigo-600 hover:bg-indigo-700"
						>
							Забронировать
						</Button>
					{:else}
						<Button
							href={resolve('/login')}
							variant="outline"
							size="lg"
							class="w-full text-lg py-6 rounded-xl border-indigo-200 text-indigo-700 hover:bg-indigo-50"
						>
							Войти для бронирования
						</Button>
					{/if}

					{#if form?.error}
						<p class="text-red-500 text-center mt-2 text-sm">{form.error}</p>
					{/if}
				</form>

				<div class="mt-6 text-xs text-zinc-400 text-center">
					Бесплатная отмена за 24 часа до начала аренды.
				</div>
			</div>
		</div>
	</div>
</div>
