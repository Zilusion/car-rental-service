<script lang="ts">
	import { Car, Send, MessageCircle } from '@lucide/svelte';
	import { resolve } from '$app/paths';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { Input } from '$lib/components/ui/input';
</script>

<footer class="bg-zinc-900 text-zinc-400 py-12 mt-auto">
	<div class="container mx-auto px-4 max-w-7xl">
		<div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
			<!-- Колонка 1: Лого и Описание -->
			<div class="col-span-1 md:col-span-1 space-y-4">
				<a href={resolve('/')} class="flex items-center gap-2 mb-4">
					<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
						<Car class="h-5 w-5 text-zinc-900" />
					</div>
					<span class="text-xl font-bold tracking-tight text-white">Rental</span>
				</a>
				<p class="text-sm leading-relaxed">
					Современный сервис аренды автомобилей в Москве. Без залога, скрытых платежей и лишних
					бумаг.
				</p>
			</div>

			<!-- Колонка 2: Навигация -->
			<div>
				<h4 class="text-white font-bold mb-4">Сервис</h4>
				<ul class="space-y-3 text-sm">
					<li>
						<a href={resolve('/')} class="hover:text-white transition-colors">Каталог авто</a>
					</li>
					<li>
						<a href={resolve('/profile')} class="hover:text-white transition-colors">Мои поездки</a>
					</li>
					<li><a href="#" class="hover:text-white transition-colors">Тарифы</a></li>
					<li><a href="#" class="hover:text-white transition-colors">Зоны парковки</a></li>
				</ul>
			</div>

			<!-- Колонка 3: Помощь -->
			<div>
				<h4 class="text-white font-bold mb-4">Помощь</h4>
				<ul class="space-y-3 text-sm">
					<li><a href="#" class="hover:text-white transition-colors">Частые вопросы</a></li>
					<li><a href="#" class="hover:text-white transition-colors">Правила сервиса</a></li>
					<li><a href="#" class="hover:text-white transition-colors">Служба поддержки</a></li>
					<li><a href="#" class="hover:text-white transition-colors">Контакты</a></li>
				</ul>
			</div>

			<!-- Колонка 4: Подписка (Декор) -->
			<div>
				<h4 class="text-white font-bold mb-4">Скидки и новости</h4>
				<div class="flex gap-2 mb-4">
					<Input
						placeholder="Email"
						class="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-zinc-500"
					/>
					<Button size="icon" class="bg-indigo-600 hover:bg-indigo-500 text-white">
						<Send class="w-4 h-4" />
					</Button>
				</div>
				<div class="flex gap-4">
					<a href="#" class="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-colors">
						<MessageCircle class="w-5 h-5" />
					</a>
				</div>
			</div>
		</div>

		<Separator class="bg-zinc-800 mb-8" />

		<div class="flex flex-col md:flex-row justify-between items-center text-sm gap-4">
			<div>&copy; 2025 Rental Service LLC. Все права защищены.</div>
			<div class="flex gap-6">
				<a href="#" class="hover:text-white">Политика конфиденциальности</a>
				<a href="#" class="hover:text-white">Условия использования</a>
			</div>
		</div>
	</div>
</footer>
