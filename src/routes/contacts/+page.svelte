<script lang="ts">
	import { MapPin, Phone, Mail } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
</script>

<div class="container mx-auto py-16 px-4 max-w-6xl">
	<div class="grid md:grid-cols-2 gap-12 items-center">
		<div class="space-y-8">
			<h1 class="text-4xl font-black text-zinc-900 dark:text-white">Заходите на кофе</h1>
			<p class="text-xl text-zinc-500 dark:text-zinc-300">
				Мы находимся в самом центре цифрового пространства, но физически сидим здесь:
			</p>

			<div class="space-y-6">
				<div class="flex items-center gap-4">
					<div
						class="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center text-zinc-900"
					>
						<MapPin class="w-6 h-6" />
					</div>
					<div>
						<div class="text-sm text-zinc-400 font-bold uppercase">Адрес</div>
						<div class="text-lg font-medium">Москва, ул. Виртуальная, д. 404</div>
					</div>
				</div>

				<div class="flex items-center gap-4">
					<div
						class="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center text-zinc-900"
					>
						<Phone class="w-6 h-6" />
					</div>
					<div>
						<div class="text-sm text-zinc-400 font-bold uppercase">Телефон</div>
						<div class="text-lg font-medium">+7 (999) 000-00-00</div>
					</div>
				</div>

				<div class="flex items-center gap-4">
					<div
						class="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center text-zinc-900"
					>
						<Mail class="w-6 h-6" />
					</div>
					<div>
						<div class="text-sm text-zinc-400 font-bold uppercase">Почта</div>
						<div class="text-lg font-medium">love@rental.local</div>
					</div>
				</div>
			</div>

			<Button size="lg" class="bg-zinc-900 text-white rounded-xl mt-4">Построить маршрут</Button>
		</div>

		<!-- Фейковая карта  -->
		<div
			class="bg-zinc-200 w-full h-[400px] rounded-3xl overflow-hidden relative shadow-inner flex items-center justify-center"
		>
			<div class="text-zinc-400 font-bold text-2xl animate-pulse">[Здесь могла быть карта]</div>
		</div>
	</div>
</div>
