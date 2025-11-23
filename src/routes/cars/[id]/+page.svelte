<script lang="ts">
	import type { PageData } from './$types';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { Badge } from '$lib/components/ui/badge';
	import { resolve } from '$app/paths';
	// Иконки
	import {
		Fuel,
		Settings2,
		User,
		Play,
		ParkingCircle,
		AlertTriangle,
		Armchair
	} from '@lucide/svelte';

	let { data }: { data: PageData } = $props();
	let { car } = data;

	const formatPrice = (price: number) => (price / 100).toLocaleString('ru-RU');
</script>

<div class="container mx-auto py-10 px-4 max-w-6xl">
	<!-- Хлебные крошки (упрощенно) -->
	<div class="text-sm text-zinc-400 mb-6">
		<a href={resolve('/')} class="hover:text-zinc-900 transition-colors">Главная</a> / {car.brand}
		{car.model}
	</div>

	<!-- Заголовок и Цена -->
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

		<!-- Кнопка CTA (Call To Action) -->
		<Button
			size="lg"
			class="bg-[#050036] hover:bg-[#050036]/90 text-white rounded-xl px-12 py-7 text-lg shadow-lg shadow-indigo-500/20 w-full md:w-auto"
		>
			Выбрать даты
		</Button>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
		<!-- ЛЕВАЯ КОЛОНКА: Фото + Инфо -->
		<div class="lg:col-span-8 space-y-12">
			<!-- Главное фото -->
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

			<!-- Характеристики -->
			<div>
				<h3 class="text-xl font-bold mb-6">Характеристики</h3>
				<div class="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4">
					<!-- Класс -->
					<div class="space-y-1">
						<div class="text-xs text-zinc-400 uppercase tracking-wide">Категория</div>
						<div class="font-medium flex items-center gap-2">
							<Armchair class="w-4 h-4 text-zinc-400" />
							{car.category === 'passenger' ? 'Легковая' : 'Грузовая'}
						</div>
					</div>

					<!-- Топливо -->
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

				<!-- Дополнительные опции -->
				{#if car.features}
					<div class="mt-8 flex flex-wrap gap-2">
						{#each car.features.split(',') as feature (feature)}
							<div
								class="bg-zinc-50 px-3 py-1.5 rounded-lg text-sm text-zinc-600 border border-zinc-100"
							>
								{feature.trim()}
							</div>
						{/each}
						<div
							class="bg-zinc-50 px-3 py-1.5 rounded-lg text-sm text-zinc-900 border border-zinc-100 font-semibold flex items-center gap-1"
						>
							<Play class="w-3 h-3 fill-current" /> CarPlay
						</div>
					</div>
				{/if}
			</div>
		</div>

		<!-- ПРАВАЯ КОЛОНКА: "Обратите внимание" -->
		<div class="lg:col-span-4">
			<div class="bg-zinc-50 rounded-3xl p-6 lg:p-8 sticky top-4">
				<h3 class="text-lg font-bold mb-6">Обратите внимание</h3>

				<ul class="space-y-6">
					<li class="flex gap-4 items-start">
						<div
							class="min-w-8 h-8 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-400"
						>
							<Fuel class="w-4 h-4" />
						</div>
						<div>
							<div class="font-semibold text-zinc-900">Топливо включено</div>
							<div class="text-sm text-zinc-500 leading-relaxed mt-1">
								Если нужно заправить — мы компенсируем бонусами.
							</div>
						</div>
					</li>

					<li class="flex gap-4 items-start">
						<div
							class="min-w-8 h-8 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-400"
						>
							<ParkingCircle class="w-4 h-4" />
						</div>
						<div>
							<div class="font-semibold text-zinc-900">Бесплатная парковка</div>
							<div class="text-sm text-zinc-500 leading-relaxed mt-1">
								На городских платных парковках Москвы (кроме закрытых шлагбаумами).
							</div>
						</div>
					</li>

					<li class="flex gap-4 items-start">
						<div
							class="min-w-8 h-8 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-400"
						>
							<AlertTriangle class="w-4 h-4" />
						</div>
						<div>
							<div class="font-semibold text-zinc-900">Руль передавать нельзя</div>
							<div class="text-sm text-zinc-500 leading-relaxed mt-1">
								За это предусмотрен штраф и блокировка аккаунта.
							</div>
						</div>
					</li>
				</ul>

				<Separator class="my-6 bg-zinc-200" />

				<div class="text-xs text-zinc-400">
					Нажимая кнопку «Выбрать даты», вы соглашаетесь с условиями сервиса и правилами аренды.
				</div>
			</div>
		</div>
	</div>
</div>
