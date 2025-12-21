<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { enhance } from '$app/forms';

	import { Button } from '$lib/components/ui/button';
	import { RangeCalendar } from '$lib/components/ui/range-calendar';
	import { Separator } from '$lib/components/ui/separator';
	import { getLocalTimeZone, today, type DateValue } from '@internationalized/date';
	import { Armchair, Fuel, Settings2, User, Play } from '@lucide/svelte';
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

	function formatIsoDate(date: DateValue | undefined) {
		if (!date) return '';
		return date.toString();
	}
</script>

<div class="container mx-auto py-10 px-4 max-w-6xl">
	<!-- Хлебные крошки -->
	<div class="text-sm text-zinc-400 mb-6">
		<a href={resolve('/')} class="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
			>Главная</a
		>
		/ {car.brand}
		{car.model}
	</div>

	<!-- Заголовок -->
	<div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
		<div>
			<h1 class="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight mb-2">
				{car.brand}
				{car.model}
			</h1>
			<div class="text-2xl font-medium text-zinc-900 dark:text-zinc-100">
				от {formatPrice(car.pricePerDay)} ₽
				<span class="text-lg text-zinc-400 font-normal">/ день</span>
			</div>
		</div>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
		<!-- ЛЕВАЯ КОЛОНКА -->
		<div class="lg:col-span-8 space-y-12">
			<div
				class="w-full aspect-video bg-zinc-100 dark:bg-zinc-900/50 rounded-3xl overflow-hidden flex items-center justify-center p-8 relative group"
			>
				<img
					src={car.imageUrl}
					alt={car.model}
					class="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-700"
				/>
				<Badge
					variant="outline"
					class="absolute top-6 left-6 bg-white/80 dark:bg-black/60 backdrop-blur border-zinc-200 dark:border-zinc-700 dark:text-zinc-200"
				>
					{car.year} год
				</Badge>
			</div>

			<!-- Характеристики -->
			<div>
				<h3 class="text-xl font-bold mb-6 text-zinc-900 dark:text-white">Характеристики</h3>
				<div class="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4">
					<div class="space-y-1">
						<div class="text-xs text-zinc-400 uppercase tracking-wide">Категория</div>
						<div class="font-medium flex items-center gap-2 dark:text-zinc-200">
							<Armchair class="w-4 h-4 text-zinc-400" />
							{car.category === 'passenger' ? 'Легковая' : 'Грузовая'}
						</div>
					</div>
					<!-- Топливо -->
					<div class="space-y-1">
						<div class="text-xs text-zinc-400 uppercase tracking-wide">Топливо</div>
						<div class="font-medium flex items-center gap-2 dark:text-zinc-200">
							<Fuel class="w-4 h-4 text-zinc-400" />
							{car.fuelType === 'petrol'
								? 'Бензин'
								: car.fuelType === 'diesel'
									? 'Дизель'
									: 'Электро'}
						</div>
					</div>

					<!-- Коробка -->
					<div class="space-y-1">
						<div class="text-xs text-zinc-400 uppercase tracking-wide">Коробка передач</div>
						<div class="font-medium flex items-center gap-2 dark:text-zinc-200">
							<Settings2 class="w-4 h-4 text-zinc-400" />
							{car.transmission === 'automatic' ? 'Автомат' : 'Механика'}
						</div>
					</div>

					<!-- Возраст -->
					<div class="space-y-1">
						<div class="text-xs text-zinc-400 uppercase tracking-wide">Требования</div>
						<div class="font-medium flex items-center gap-2 dark:text-zinc-200">
							<User class="w-4 h-4 text-zinc-400" />
							{car.minAge}+ лет
						</div>
					</div>
				</div>
				{#if car.features}
					<div class="mt-8 flex flex-wrap gap-2">
						{#each car.features.split(',') as feature (feature)}
							<div
								class="bg-zinc-50 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-sm text-zinc-600 dark:text-zinc-300 border border-zinc-100 dark:border-zinc-700"
							>
								{feature.trim()}
							</div>
						{/each}
						<div
							class="bg-zinc-50 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-sm text-zinc-900 dark:text-white border border-zinc-100 dark:border-zinc-700 font-semibold flex items-center gap-1"
						>
							<Play class="w-3 h-3 fill-current" /> CarPlay
						</div>
					</div>
				{/if}
			</div>
		</div>

		<!-- ПРАВАЯ КОЛОНКА: ВИДЖЕТ БРОНИРОВАНИЯ -->
		<div class="lg:col-span-4">
			<div
				class="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-200/50 dark:shadow-none rounded-3xl p-6 lg:p-8 sticky top-24"
			>
				<h3 class="text-xl font-bold mb-4 text-zinc-900 dark:text-white">Оформить аренду</h3>

				<div class="mb-6">
					<span class="text-sm font-medium text-zinc-500 mb-2 block">Выберите даты</span>
					<div
						class="border dark:border-zinc-700 rounded-xl p-1 bg-zinc-50 dark:bg-zinc-950/50 flex justify-center"
					>
						<RangeCalendar
							bind:value
							class="rounded-md border-none bg-transparent"
							weekdayFormat="short"
							minValue={today(getLocalTimeZone())}
						/>
					</div>
				</div>

				<div class="space-y-3 mb-6">
					<div class="flex justify-between text-zinc-600 dark:text-zinc-400">
						<span>{formatPrice(car.pricePerDay)} ₽ × {days} дн.</span>
						<span>{formatPrice(totalPrice)} ₽</span>
					</div>
					<Separator class="dark:bg-zinc-800" />
					<div class="flex justify-between items-center">
						<span class="font-bold text-lg dark:text-zinc-200">Итого</span>
						<span class="font-black text-2xl text-indigo-900 dark:text-indigo-400"
							>{formatPrice(totalPrice)} ₽</span
						>
					</div>
				</div>

				<form method="POST" action="?/book" use:enhance>
					<input type="hidden" name="startDate" value={formatIsoDate(value.start)} />
					<input type="hidden" name="endDate" value={formatIsoDate(value.end)} />
					<input type="hidden" name="totalPrice" value={totalPrice} />

					{#if user}
						<Button
							type="submit"
							size="lg"
							class="w-full text-lg py-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white"
						>
							Забронировать
						</Button>
					{:else}
						<Button
							href={resolve('/login')}
							variant="outline"
							size="lg"
							class="w-full text-lg py-6 rounded-xl border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-900 dark:text-indigo-400 dark:hover:bg-indigo-900/30"
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
