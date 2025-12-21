<script lang="ts">
	import { Check } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import { resolve } from '$app/paths';
	import { Badge } from '$lib/components/ui/badge';
</script>

<div class="container mx-auto py-16 px-4 max-w-5xl">
	<div class="text-center mb-16">
		<h1 class="text-4xl font-black mb-4 text-zinc-900 dark:text-white">Честные тарифы</h1>
		<p class="text-xl text-zinc-500 dark:text-zinc-300">
			Платите за время, а не за воздух в салоне.
		</p>
	</div>

	<div class="grid md:grid-cols-3 gap-8">
		<div
			class="border rounded-3xl p-8 flex flex-col hover:shadow-xl transition-shadow bg-zinc-50 opacity-75"
		>
			<div class="flex justify-between items-start">
				<h3 class="text-xl font-bold mb-2 dark:text-black">Телепортация</h3>
				<Badge variant="secondary">Скоро</Badge>
			</div>
			<div class="text-3xl font-black mb-6 text-zinc-400">??? ₽</div>
			<ul class="space-y-4 mb-8 flex-1">
				<li class="flex gap-3 text-sm text-zinc-500">Мгновенное перемещение</li>
				<li class="flex gap-3 text-sm text-zinc-500">Без пробок на МКАДе</li>
				<li class="flex gap-3 text-sm text-zinc-500">Возможна тошнота</li>
			</ul>
			<Button disabled variant="outline" class="w-full rounded-xl dark:text-black">В разработке</Button>
		</div>

		<!-- Суточный (Акцент) -->
		<div
			class="border-2 border-indigo-600 rounded-3xl p-8 flex flex-col relative bg-indigo-50/50 transform md:-translate-y-4 shadow-2xl shadow-indigo-200/50"
		>
			<div
				class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-bold"
			>
				Хит сезона
			</div>
			<h3 class="text-xl font-bold mb-2 text-indigo-900">Суточный</h3>
			<div class="text-3xl font-black mb-6 text-indigo-900">
				от 2 500 ₽ <span class="text-lg font-normal text-indigo-400">/ день</span>
			</div>
			<ul class="space-y-4 mb-8 flex-1">
				<li class="flex gap-3 text-sm text-zinc-700 font-medium">
					<Check class="w-5 h-5 text-indigo-600" /> Полный бак при старте
				</li>
				<li class="flex gap-3 text-sm text-zinc-700 font-medium">
					<Check class="w-5 h-5 text-indigo-600" /> Пробег не ограничен (почти)
				</li>
				<li class="flex gap-3 text-sm text-zinc-700 font-medium">
					<Check class="w-5 h-5 text-indigo-600" /> Мойка за наш счет
				</li>
			</ul>
			<Button
				href={resolve('/')}
				class="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white py-6 text-lg"
				>Взять авто</Button
			>
		</div>

		<!-- Навсегда -->
		<div
			class="border rounded-3xl p-8 flex flex-col hover:shadow-xl transition-shadow bg-zinc-900 text-white"
		>
			<h3 class="text-xl font-bold mb-2">Свой автопарк</h3>
			<div class="text-3xl font-black mb-6">
				∞ ₽ <span class="text-lg font-normal text-zinc-500">/ жизнь</span>
			</div>
			<ul class="space-y-4 mb-8 flex-1">
				<li class="flex gap-3 text-sm text-zinc-300">
					<Check class="w-5 h-5 text-zinc-500" /> ОСАГО/КАСКО сами
				</li>
				<li class="flex gap-3 text-sm text-zinc-300">
					<Check class="w-5 h-5 text-zinc-500" /> Заправка за свои
				</li>
				<li class="flex gap-3 text-sm text-zinc-300">
					<Check class="w-5 h-5 text-zinc-500" /> Парковку ищите сами
				</li>
			</ul>
			<Button variant="secondary" disabled class="w-full rounded-xl opacity-50 cursor-not-allowed"
				>Не рекомендуем</Button
			>
		</div>
	</div>
</div>
