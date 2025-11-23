<script lang="ts">
	import type { PageData } from './$types';
	import CarCard from "$lib/components/car-card.svelte"; // Импортируем компонент
	import { Button } from "$lib/components/ui/button";
    import { Settings2 } from '@lucide/svelte';

	let { data }: { data: PageData } = $props();
	let { passengerNoExperience, passengerExperienced, cargo } = data.cars;
    
    // Просто состояние для визуализации табов фильтра
    let activeTab = $state('popular'); 
</script>

<div class="container mx-auto py-8 px-4 max-w-7xl">
	
	<!-- Header как на Делимобиль -->
    <div class="bg-zinc-50 rounded-3xl p-8 mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 class="text-3xl md:text-4xl font-extrabold text-zinc-900 mb-2">
                Машины в Москве
            </h1>
            <p class="text-zinc-500">
                Выберите даты, чтобы увидеть точные цены
            </p>
        </div>
        <!-- Кнопки фильтров (заглушки для стиля) -->
        <div class="flex gap-2">
            <Button variant="outline" class="rounded-xl border-zinc-200 bg-white">
                <Settings2 class="w-4 h-4 mr-2"/> Фильтры
            </Button>
            <div class="bg-zinc-200/50 p-1 rounded-xl flex">
                <button 
                    class="px-4 py-2 rounded-lg text-sm font-medium transition-all {activeTab === 'popular' ? 'bg-white shadow-sm text-black' : 'text-zinc-500 hover:text-black'}"
                    onclick={() => activeTab = 'popular'}
                >
                    Популярные
                </button>
                <button 
                    class="px-4 py-2 rounded-lg text-sm font-medium transition-all {activeTab === 'class' ? 'bg-white shadow-sm text-black' : 'text-zinc-500 hover:text-black'}"
                    onclick={() => activeTab = 'class'}
                >
                    Класс
                </button>
            </div>
        </div>
    </div>

    <!-- Секция 1: Начинающим (VW Polo, Rapid...) -->
    <div class="mb-16">
        <h2 class="text-2xl font-bold text-zinc-300 mb-6 uppercase tracking-wider">Начинающим водителям</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {#each passengerNoExperience as car (car.id)}
                <CarCard {car} />
            {/each}
        </div>
    </div>

    <!-- Секция 2: Бизнес / Комфорт -->
    {#if passengerExperienced.length > 0}
        <div class="mb-16">
            <h2 class="text-2xl font-bold text-zinc-300 mb-6 uppercase tracking-wider">Комфорт и Бизнес</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {#each passengerExperienced as car (car.id)}
                    <CarCard {car} />
                {/each}
            </div>
        </div>
    {/if}

    <!-- Секция 3: Грузовые -->
    {#if cargo.length > 0}
        <div class="mb-16">
            <h2 class="text-2xl font-bold text-zinc-300 mb-6 uppercase tracking-wider">Грузовые</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {#each cargo as car (car.id)}
                    <CarCard {car} />
                {/each}
            </div>
        </div>
    {/if}
</div>