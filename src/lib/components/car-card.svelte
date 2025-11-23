<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import { Badge } from "$lib/components/ui/badge";
	import type { Car } from "$lib/server/db/schema"; // Импортируем тип машины

    // Svelte 5 Props
	let { car }: { car: Car } = $props();

    // Форматтер цены
    const formatPrice = (price: number) => (price / 100).toLocaleString('ru-RU');
</script>

<Card.Root class="group overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-white dark:bg-zinc-900 rounded-3xl flex flex-col h-full">
    <!-- Картинка: Делаем эффект приближения при наведении -->
	<div class="relative h-56 w-full bg-zinc-50 overflow-hidden flex items-center justify-center">
		<img 
			src={car.imageUrl} 
			alt="{car.brand} {car.model}" 
			class="w-auto h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
		/>
        <!-- Год выпуска сверху -->
        <div class="absolute top-4 left-4">
            <Badge variant="secondary" class="bg-white/80 backdrop-blur text-xs font-medium">
                {car.year}
            </Badge>
        </div>
	</div>

	<Card.Content class="grow p-6 flex flex-col gap-4">
        <!-- Заголовок -->
		<div>
			<h3 class="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                {car.brand} <span class="text-zinc-500 font-normal">{car.model}</span>
            </h3>
		</div>

        <!-- Теги характеристик -->
        <div class="flex flex-wrap gap-2 text-xs">
            {#if car.minWorkExperience === 0}
                <span class="px-2 py-1 rounded-md bg-emerald-100 text-emerald-700 font-medium">
                    Без стажа
                </span>
            {:else}
                <span class="px-2 py-1 rounded-md bg-amber-100 text-amber-700 font-medium">
                    Стаж {car.minWorkExperience}+
                </span>
            {/if}
            <span class="px-2 py-1 rounded-md bg-zinc-100 text-zinc-600">
                {car.minAge}+ лет
            </span>
        </div>

        <!-- Цена -->
        <div class="mt-auto pt-4 flex items-baseline gap-1">
            <span class="text-xl font-bold">от {formatPrice(car.pricePerDay)} ₽</span>
            <span class="text-sm text-zinc-400">/день</span>
        </div>
	</Card.Content>

    <!-- Кнопка действия -->
    <!-- Важно: в SvelteKit переходы делают через обычный <a> с prefetch -->
	<div class="p-6 pt-0">
		<Button href="/cars/{car.id}" variant="default" class="w-full rounded-xl py-6 text-md font-semibold bg-zinc-900 hover:bg-zinc-800 text-white">
			Выбрать
		</Button>
	</div>
</Card.Root>