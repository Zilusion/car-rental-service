<script lang="ts">
	import type { PageData } from './$types';
	import { Avatar, AvatarFallback } from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import {
		Card,
		CardContent,
		CardHeader,
		CardTitle,
		CardDescription
	} from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Separator } from '$lib/components/ui/separator';
	import { Badge } from '$lib/components/ui/badge';
	import { Trophy, Wallet, History } from '@lucide/svelte';
	import { resolve } from '$app/paths';

	let { data }: { data: PageData } = $props();
	let { user, stats } = data;

	const getLevel = (rides: number) => {
		if (rides > 10) return { title: 'Шумахер', color: 'bg-red-500' };
		if (rides > 3) return { title: 'Опытный драйвер', color: 'bg-indigo-500' };
		return { title: 'Новичок', color: 'bg-emerald-500' };
	};

	let level = $derived(getLevel(stats.count));
</script>

<div class="container mx-auto py-10 px-4 max-w-3xl">
	<div class="flex items-center gap-6 mb-8">
		<Avatar class="h-24 w-24 border-4 border-white shadow-xl">
			<AvatarFallback class="text-2xl font-bold bg-zinc-900 text-white">
				{user.username.slice(0, 2).toUpperCase()}
			</AvatarFallback>
		</Avatar>
		<div>
			<h1 class="text-3xl font-black text-zinc-900 flex items-center gap-3 dark:text-white">
				{user.username}
				<Badge class="{level.color} hover:{level.color} text-white border-none shadow-sm">
					{level.title}
				</Badge>
			</h1>
			<p class="text-zinc-500">ID пилота: {user.id}</p>
		</div>
	</div>

	<div class="grid gap-6 md:grid-cols-2 mb-8">
		<!-- Статистика -->
		<Card class="border-none shadow-lg bg-linear-to-br from-zinc-900 to-zinc-800 text-white">
			<CardHeader class="pb-2">
				<CardTitle class="text-lg font-medium text-zinc-300 flex items-center gap-2">
					<Wallet class="w-4 h-4" /> Потрачено
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div class="text-3xl font-bold">
					{((stats.totalSpent || 0) / 100).toLocaleString('ru-RU')} ₽
				</div>
				<p class="text-xs text-zinc-400 mt-1">Инвестиции в эмоции</p>
			</CardContent>
		</Card>

		<Card class="border-none shadow-lg bg-white">
			<CardHeader class="pb-2">
				<CardTitle class="text-lg font-medium text-zinc-500 flex items-center gap-2">
					<Trophy class="w-4 h-4 text-amber-500" /> Поездок
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div class="text-3xl font-bold text-zinc-900">
					{stats.count}
				</div>
				<p class="text-xs text-zinc-400 mt-1">Километры свободы</p>
			</CardContent>
		</Card>
	</div>

	<!-- Настройки  -->
	<Card>
		<CardHeader>
			<CardTitle>Личные данные</CardTitle>
			<CardDescription>Здесь можно поменять данные, но пока нельзя.</CardDescription>
		</CardHeader>
		<CardContent class="space-y-4">
			<div class="grid gap-2">
				<Label>Имя пользователя</Label>
				<Input value={user.username} disabled class="bg-zinc-50" />
			</div>
			<div class="grid gap-2">
				<Label>Роль</Label>
				<Input
					value={user.role === 'admin' ? 'Властелин колец' : 'Водитель'}
					disabled
					class="bg-zinc-50"
				/>
			</div>

			<Separator class="my-4" />

			<div class="flex justify-between items-center">
				<div class="text-sm text-zinc-500">Хотите посмотреть историю?</div>
				<Button href={resolve('/bookings')} variant="outline">
					<History class="w-4 h-4 mr-2" /> История бронирований
				</Button>
			</div>
		</CardContent>
	</Card>
</div>
