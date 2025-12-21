<script lang="ts">
	import { Car, Send, Heart, Github } from '@lucide/svelte';
	import { resolve } from '$app/paths';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { Input } from '$lib/components/ui/input';
	import { toast } from 'svelte-sonner';

	// Пасхалка для подписки
	function handleSubscribe() {
		const promise = new Promise((resolve) => setTimeout(resolve, 1000));
		toast.promise(promise, {
			loading: 'Отправляем голубя...',
			success: 'Вы подписаны! (Но мы вам ничего не пришлем)',
			error: 'Голубь устал'
		});
	}

	// Пасхалка для "Службы поддержки"
	function handleSupport() {
		toast('Операторы спят 😴', {
			description: 'Помощи не будет, пока',
			action: {
				label: 'Понятно',
				onClick: () => console.log('User accepted fate')
			}
		});
	}
</script>

<footer class="bg-zinc-950 text-zinc-400 py-16 mt-auto border-t border-zinc-900">
	<div class="container mx-auto px-4 max-w-7xl">
		<div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
			<!-- Колонка 1: Бренд -->
			<div class="col-span-1 md:col-span-1 space-y-6">
				<a href={resolve('/')} class="flex items-center gap-2 group">
					<div
						class="flex h-10 w-10 items-center justify-center rounded-xl bg-white transition-all group-hover:bg-indigo-500 group-hover:text-white"
					>
						<Car class="h-6 w-6 text-zinc-950 group-hover:text-white transition-colors" />
					</div>
					<span class="text-2xl font-black tracking-tighter text-white">Rental</span>
				</a>
				<p class="text-sm leading-relaxed text-zinc-500">
					Мы даем машины, вы даете газ. Простой обмен ценностями в черте МКАД и немного за ней.
				</p>
			</div>

			<!-- Колонка 2: Навигация -->
			<div>
				<h4 class="text-white font-bold mb-6">Гараж</h4>
				<ul class="space-y-4 text-sm">
					<li>
						<a href={resolve('/')} class="hover:text-indigo-400 transition-colors">Весь автопарк</a>
					</li>
					<li>
						<a href={resolve('/bookings')} class="hover:text-indigo-400 transition-colors"
							>Мои бронирования</a
						>
					</li>
					<li>
						<a
							href={resolve('/tariffs')}
							class="hover:text-indigo-400 transition-colors flex items-center gap-2"
							>Тарифы <span
								class="text-[10px] bg-indigo-500/20 text-indigo-400 px-1.5 py-0.5 rounded border border-indigo-500/30"
								>Выгодно</span
							></a
						>
					</li>
				</ul>
			</div>

			<!-- Колонка 3: Помощь (с пасхалками) -->
			<div>
				<h4 class="text-white font-bold mb-6">Инфо</h4>
				<ul class="space-y-4 text-sm">
					<li>
						<a href={resolve('/rules')} class="hover:text-indigo-400 transition-colors"
							>Правила (скучные)</a
						>
					</li>
					<li>
						<button
							onclick={handleSupport}
							class="hover:text-indigo-400 transition-colors text-left"
							>Психологическая помощь</button
						>
					</li>
					<li>
						<a href={resolve('/contacts')} class="hover:text-indigo-400 transition-colors"
							>Где нас найти</a
						>
					</li>
				</ul>
			</div>

			<!-- Колонка 4: Подписка -->
			<div>
				<h4 class="text-white font-bold mb-6">Никакого спама</h4>
				<div class="flex gap-2 mb-6">
					<Input
						placeholder="email@domain.com"
						class="bg-zinc-900/50 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-indigo-500 focus-visible:border-indigo-500"
					/>
					<Button
						size="icon"
						onclick={handleSubscribe}
						class="bg-white text-zinc-950 hover:bg-indigo-500 hover:text-white transition-all"
					>
						<Send class="w-4 h-4" />
					</Button>
				</div>
				<div class="flex gap-4">
					<a
						href="https://github.com/Zilusion"
						target="_blank"
						class="p-2 bg-zinc-900 rounded-full hover:bg-white hover:text-black transition-colors border border-zinc-800"
					>
						<Github class="w-5 h-5" />
					</a>
					<div
						class="p-2 bg-zinc-900 rounded-full text-rose-500 border border-zinc-800 cursor-help"
						title="Сделано с любовью"
					>
						<Heart class="w-5 h-5 fill-current" />
					</div>
				</div>
			</div>
		</div>

		<Separator class="bg-zinc-900 mb-8" />

		<div class="flex flex-col md:flex-row justify-between items-center text-sm gap-4 text-zinc-600">
			<div>&copy; 2025 Rental Inc. Мы знаем, где вы припарковались.</div>
			<div class="flex gap-6">
				<a href={resolve('/legal/offer')} class="hover:text-white transition-colors">Оферта</a>
				<a href={resolve('/legal/privacy')} class="hover:text-white transition-colors"
					>Конфиденциальность</a
				>
			</div>
		</div>
	</div>
</footer>
