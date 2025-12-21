<script lang="ts">
	import type { PageData } from './$types';
	import CarCard from '$lib/components/car-card.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Separator } from '$lib/components/ui/separator';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';
	import { Slider } from '$lib/components/ui/slider';
	import * as Sheet from '$lib/components/ui/sheet';
	import * as Accordion from '$lib/components/ui/accordion';

	import { Settings2, CarFront, Gauge, Briefcase, Truck } from '@lucide/svelte';

	let { data }: { data: PageData } = $props();

	let priceRange = $state([data.filters.minPrice, data.filters.maxPrice]);

	let selectedBrands: string[] = $state([]);

	let transmissionAuto = $state(true);
	let transmissionManual = $state(true);

	let filteredCars = $derived(
		data.cars.filter((car) => {
			const inPrice = car.pricePerDay >= priceRange[0] && car.pricePerDay <= priceRange[1];
			const inBrand = selectedBrands.length === 0 || selectedBrands.includes(car.brand);

			let inTransmission = false;
			if (transmissionAuto && car.transmission === 'automatic') inTransmission = true;
			if (transmissionManual && car.transmission === 'manual') inTransmission = true;

			return inPrice && inBrand && inTransmission;
		})
	);

	let beginnerCars = $derived(
		filteredCars.filter((c) => c.category === 'passenger' && c.minAge < 21)
	);
	let comfortCars = $derived(
		filteredCars.filter((c) => c.category === 'passenger' && c.minAge >= 21 && c.minAge < 24)
	);
	let businessCars = $derived(
		filteredCars.filter((c) => c.category === 'passenger' && c.minAge >= 24)
	);
	let cargoCars = $derived(filteredCars.filter((c) => c.category === 'cargo'));

	const fmtPrice = (p: number) => (p / 100).toLocaleString('ru-RU');

	function toggleBrand(brand: string) {
		if (selectedBrands.includes(brand)) {
			selectedBrands = selectedBrands.filter((b) => b !== brand);
		} else {
			selectedBrands = [...selectedBrands, brand];
		}
	}
</script>

<div class="container mx-auto py-8 px-4 max-w-7xl">
	<!-- PROMO HERO SECTION -->
	<section class="relative overflow-hidden rounded-3xl bg-zinc-900 text-white mb-12 shadow-2xl">
		<div
			class="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-indigo-900/20 to-transparent"
		></div>
		<div
			class="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8"
		>
			<div class="max-w-xl space-y-6">
				<Badge variant="secondary" class="bg-indigo-500/20 text-indigo-200 border-indigo-500/50"
					>Новые поступления</Badge
				>
				<h1 class="text-4xl md:text-6xl font-black tracking-tight leading-tight">
					Свобода <br /><span
						class="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-cyan-400"
						>твоего движения</span
					>
				</h1>
				<p class="text-zinc-400 text-lg md:text-xl">
					Арендуй премиальные авто и фургоны в Москве. Без залога, топливо и парковка включены.
				</p>
			</div>
			<!-- Декоративный элемент (можно вставить 3D картинку машины сюда) -->
			<div class="hidden md:block">
				<CarFront class="w-64 h-64 text-white" />
			</div>
		</div>
	</section>

	<div class="flex flex-col lg:flex-row gap-10">
		<!-- SIDEBAR FILTERS (Desktop) -->
		<aside class="hidden lg:block w-72 shrink-0 space-y-8 sticky top-24 h-fit">
			<div class="flex items-center gap-2 font-bold text-xl">
				<Settings2 class="w-5 h-5" /> Фильтры
			</div>

			<!-- Цена -->
			<div class="space-y-4">
				<div class="flex justify-between text-sm font-medium">
					<span>Цена / день</span>
				</div>
				<Slider
					type="multiple"
					bind:value={priceRange}
					min={data.filters.minPrice}
					max={data.filters.maxPrice}
					step={100}
					class="w-full"
				/>
				<div class="flex justify-between text-xs text-zinc-500">
					<span>{fmtPrice(priceRange[0])} ₽</span>
					<span>{fmtPrice(priceRange[1])} ₽</span>
				</div>
			</div>

			<Separator />

			<!-- Коробка -->
			<div class="space-y-4">
				<h3 class="font-medium text-sm">Коробка передач</h3>
				<div class="flex flex-col gap-3">
					<div class="flex items-center gap-2">
						<Checkbox id="trans-auto" bind:checked={transmissionAuto} />
						<Label for="trans-auto" class="font-normal">Автомат</Label>
					</div>
					<div class="flex items-center gap-2">
						<Checkbox id="trans-manual" bind:checked={transmissionManual} />
						<Label for="trans-manual" class="font-normal">Механика</Label>
					</div>
				</div>
			</div>

			<Separator />

			<!-- Бренды (Accordion) -->
			<Accordion.Root type="single" value="brands">
				<Accordion.Item value="brands" class="border-b-0">
					<Accordion.Trigger class="py-0 hover:no-underline font-medium text-sm">
						Марки автомобилей
					</Accordion.Trigger>
					<Accordion.Content class="pt-4">
						<div class="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto pr-2">
							{#each data.filters.brands as brand (brand)}
								<div class="flex items-center gap-2">
									<Checkbox
										id="brand-{brand}"
										checked={selectedBrands.includes(brand)}
										onCheckedChange={() => toggleBrand(brand)}
									/>
									<Label
										for="brand-{brand}"
										class="font-normal cursor-pointer w-full"
										onclick={() => toggleBrand(brand)}
									>
										{brand}
									</Label>
								</div>
							{/each}
						</div>
					</Accordion.Content>
				</Accordion.Item>
			</Accordion.Root>

			<Button
				variant="outline"
				class="w-full"
				onclick={() => {
					priceRange = [data.filters.minPrice, data.filters.maxPrice];
					selectedBrands = [];
					transmissionAuto = true;
					transmissionManual = true;
				}}
			>
				Сбросить все
			</Button>
		</aside>

		<!-- MOBILE FILTER TRIGGER -->
		<div class="lg:hidden mb-6">
			<Sheet.Root>
				<Sheet.Trigger>
					<Button variant="outline" class="w-full">
						<Settings2 class="w-4 h-4 mr-2" /> Настроить фильтры
					</Button>
				</Sheet.Trigger>
				<Sheet.Content side="bottom" class="h-[80vh] overflow-y-auto">
					<Sheet.Header>
						<Sheet.Title>Фильтры</Sheet.Title>
						<Sheet.Description>Настройте поиск под себя</Sheet.Description>
					</Sheet.Header>
					<div class="py-6 space-y-8">
						<!-- Копия фильтров для мобилки (упрощенно) -->
						<div class="space-y-4">
							<Label>Цена</Label>
							<Slider
								type="multiple"
								bind:value={priceRange}
								min={data.filters.minPrice}
								max={data.filters.maxPrice}
								step={100}
							/>
							<div class="flex justify-between text-sm">
								<span>{fmtPrice(priceRange[0])} ₽</span>
								<span>{fmtPrice(priceRange[1])} ₽</span>
							</div>
						</div>
						<!-- Остальные фильтры аналогично... -->
					</div>
				</Sheet.Content>
			</Sheet.Root>
		</div>

		<!-- CAR LISTINGS -->
		<div class="flex-1 space-y-16">
			{#if filteredCars.length === 0}
				<div class="text-center py-20 bg-zinc-50 rounded-3xl">
					<h3 class="text-xl font-bold text-zinc-900">Ничего не найдено</h3>
					<p class="text-zinc-500 mt-2">Попробуйте изменить параметры фильтров</p>
				</div>
			{/if}

			<!-- 1. Начинающим (Эконом) -->
			{#if beginnerCars.length > 0}
				<section>
					<div class="flex items-center gap-3 mb-6">
						<div class="p-2 bg-emerald-100 rounded-lg text-emerald-700">
							<Gauge class="w-5 h-5" />
						</div>
						<div>
							<h2 class="text-2xl font-bold text-zinc-900">Начинающим водителям</h2>
							<p class="text-sm text-zinc-500">Доступно с 18 лет, стаж не требуется</p>
						</div>
					</div>
					<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
						{#each beginnerCars as car (car.id)}
							<CarCard {car} />
						{/each}
					</div>
				</section>
			{/if}

			<!-- 2. Комфорт -->
			{#if comfortCars.length > 0}
				<section>
					<div class="flex items-center gap-3 mb-6">
						<div class="p-2 bg-blue-100 rounded-lg text-blue-700">
							<CarFront class="w-5 h-5" />
						</div>
						<div>
							<h2 class="text-2xl font-bold text-zinc-900">Комфорт</h2>
							<p class="text-sm text-zinc-500">Повышенный комфорт, с 21 года</p>
						</div>
					</div>
					<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
						{#each comfortCars as car (car.id)}
							<CarCard {car} />
						{/each}
					</div>
				</section>
			{/if}

			<!-- 3. Бизнес -->
			{#if businessCars.length > 0}
				<section>
					<div class="flex items-center gap-3 mb-6">
						<div class="p-2 bg-indigo-100 rounded-lg text-indigo-700">
							<Briefcase class="w-5 h-5" />
						</div>
						<div>
							<h2 class="text-2xl font-bold text-zinc-900">Бизнес и Премиум</h2>
							<p class="text-sm text-zinc-500">Для ценителей, с 24 лет и стажем</p>
						</div>
					</div>
					<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
						{#each businessCars as car (car.id)}
							<CarCard {car} />
						{/each}
					</div>
				</section>
			{/if}

			<!-- 4. Грузовые -->
			{#if cargoCars.length > 0}
				<section>
					<div class="flex items-center gap-3 mb-6">
						<div class="p-2 bg-amber-100 rounded-lg text-amber-700">
							<Truck class="w-5 h-5" />
						</div>
						<div>
							<h2 class="text-2xl font-bold text-zinc-900">Для задач побольше</h2>
							<p class="text-sm text-zinc-500">Фургоны и микроавтобусы</p>
						</div>
					</div>
					<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
						{#each cargoCars as car (car.id)}
							<CarCard {car} />
						{/each}
					</div>
				</section>
			{/if}
		</div>
	</div>
</div>
