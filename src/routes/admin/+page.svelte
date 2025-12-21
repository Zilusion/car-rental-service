<script lang="ts">
	import type { PageData } from './$types';
	import { Badge } from '$lib/components/ui/badge';
	import { ShieldAlert } from '@lucide/svelte';

	let { data }: { data: PageData } = $props();

	// Форматирование цены
	const formatPrice = (p: number) => (p / 100).toLocaleString('ru-RU');

	const formatDate = (date: Date | string | number | null) => {
		if (!date) return '—';

		try {
			const d = new Date(date);
			if (isNaN(d.getTime())) return 'Ошибка данных';

			return new Intl.DateTimeFormat('ru-RU', {
				day: 'numeric',
				month: 'long',
				year: 'numeric',
				hour: '2-digit',
				minute: '2-digit'
			}).format(d);
		} catch {
			return 'Ошибка';
		}
	};

	// Перевод статусов
	const statusMap: Record<
		string,
		{ label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }
	> = {
		confirmed: { label: 'Подтверждено', variant: 'default' }, // Зеленый/Черный (в зависимости от темы)
		pending: { label: 'Ожидает', variant: 'secondary' },
		cancelled: { label: 'Отменено', variant: 'destructive' }, // Красный
		completed: { label: 'Завершено', variant: 'outline' },
		maintenance: { label: 'Ремонт', variant: 'destructive' }
	};

	// Функция для получения конфига статуса (с фоллбэком)
	const getStatus = (status: string) => {
		return statusMap[status] || { label: status, variant: 'outline' };
	};
</script>

<div class="container mx-auto py-10 px-4">
	<!-- Заголовок -->
	<div class="flex items-center gap-4 mb-8">
		<div class="p-3 bg-red-100 text-red-600 rounded-xl dark:bg-red-900/30 dark:text-red-400">
			<ShieldAlert class="w-8 h-8" />
		</div>
		<div>
			<h1 class="text-3xl font-black text-zinc-900 dark:text-white">Центр управления</h1>
			<p class="text-zinc-500 dark:text-zinc-400">Секретная зона администратора</p>
		</div>
	</div>

	<!-- Таблица -->
	<div
		class="bg-white border rounded-xl overflow-hidden shadow-sm dark:bg-zinc-900 dark:border-zinc-800"
	>
		<div class="overflow-x-auto">
			<table class="w-full text-sm text-left">
				<thead
					class="bg-zinc-50 text-zinc-500 font-medium border-b dark:bg-zinc-800/50 dark:text-zinc-400 dark:border-zinc-800"
				>
					<tr>
						<th class="px-6 py-4 whitespace-nowrap">Клиент</th>
						<th class="px-6 py-4 whitespace-nowrap">Автомобиль</th>
						<th class="px-6 py-4 whitespace-nowrap">Сумма</th>
						<th class="px-6 py-4 whitespace-nowrap">Статус</th>
						<th class="px-6 py-4 whitespace-nowrap">Дата создания</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-zinc-100 dark:divide-zinc-800">
					{#each data.bookings as booking (booking.id)}
						{@const statusConfig = getStatus(booking.status)}
						<tr class="hover:bg-zinc-50 transition-colors dark:hover:bg-zinc-800/50">
							<!-- Клиент -->
							<td class="px-6 py-4 font-medium text-zinc-900 dark:text-zinc-200">
								{booking.username}
							</td>

							<!-- Авто -->
							<td class="px-6 py-4 text-zinc-700 dark:text-zinc-300">
								{booking.carBrand}
								{booking.carModel}
							</td>

							<!-- Сумма -->
							<td class="px-6 py-4 font-semibold text-zinc-900 dark:text-white">
								{formatPrice(booking.totalPrice)} ₽
							</td>

							<!-- Статус (с переводом) -->
							<td class="px-6 py-4">
								<Badge variant={statusConfig.variant}>
									{statusConfig.label}
								</Badge>
							</td>

							<!-- Дата (исправленная) -->
							<td class="px-6 py-4 text-zinc-400 dark:text-zinc-500 whitespace-nowrap">
								{formatDate(booking.createdAt)}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
