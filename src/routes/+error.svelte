<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { resolve } from '$app/paths';
	import { Frown } from '@lucide/svelte';
</script>

<div class="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
	<div class="relative">
		<h1 class="text-[10rem] font-black text-zinc-100 leading-none select-none">404</h1>
		<div class="absolute inset-0 flex items-center justify-center">
			<Frown class="w-24 h-24 text-zinc-900" />
		</div>
	</div>

	<h2 class="text-3xl font-bold mt-8 mb-4">Вы свернули не туда</h2>
	<p class="text-zinc-500 max-w-md mx-auto mb-8 text-lg">
		Похоже, этой страницы не существует. Возможно, она уехала на мойку или её эвакуировали.
	</p>

	<div class="flex gap-4">
		<Button href={resolve('/')} size="lg" class="rounded-xl">На главную</Button>
		<Button variant="outline" href="javascript:history.back()" size="lg" class="rounded-xl"
			>Вернуться назад</Button
		>
	</div>
</div>
