<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { CalendarDays, Clock, Ban, CheckCircle2, Loader2 } from '@lucide/svelte';
	import { resolve } from '$app/paths';

	let { data }: { data: PageData } = $props();
	let { bookings } = $derived(data);

	const formatPrice = (price: number) => (price / 100).toLocaleString('ru-RU');
	const formatDate = (date: Date | string | number) => {
		const d = new Date(date);
		if (isNaN(d.getTime())) return '...';
		return new Intl.DateTimeFormat('ru-RU', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		}).format(d);
	};

	const getStatusConfig = (status: string) => {
		switch (status) {
			case 'confirmed':
				return {
					label: 'Активно',
					color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
					icon: CheckCircle2
				};
			case 'cancelled':
				return { label: 'Отменено', color: 'bg-red-100 text-red-700 border-red-200', icon: Ban };
			case 'completed':
				return {
					label: 'Завершено',
					color: 'bg-zinc-100 text-zinc-700 border-zinc-200',
					icon: CheckCircle2
				};
			default:
				return {
					label: 'Обработка',
					color: 'bg-amber-100 text-amber-700 border-amber-200',
					icon: Clock
				};
		}
	};

	let cancelingId = $state<string | null>(null);
</script>

<div class="container mx-auto py-10 px-4 max-w-4xl">
	<div class="mb-10">
		<h1 class="text-3xl font-bold tracking-tight mb-2">Мои поездки</h1>
		<p class="text-zinc-500">Управляйте своими бронированиями</p>
	</div>

	{#if bookings.length === 0}
		<div class="text-center py-20 bg-zinc-50 rounded-3xl border border-dashed border-zinc-200">
			<CalendarDays class="mx-auto w-12 h-12 text-zinc-300 mb-4" />
			<h3 class="text-lg font-medium text-zinc-900">Пока пусто</h3>
			<Button href={resolve('/')} variant="default" class="mt-4">Найти машину</Button>
		</div>
	{:else}
		<div class="space-y-6">
			{#each bookings as booking (booking.id)}
				{@const status = getStatusConfig(booking.status)}

				<Card.Root class="overflow-hidden hover:shadow-md transition-shadow">
					<div class="flex flex-col md:flex-row">
						<!-- Фото -->
						<div
							class="w-full md:w-64 h-48 md:h-auto bg-zinc-50 flex items-center justify-center p-4 shrink-0"
						>
							<img
								src={booking.car.imageUrl}
								alt={booking.car.model}
								class="w-full h-full object-contain mix-blend-multiply"
							/>
						</div>

						<!-- Инфо -->
						<div class="flex-1 p-6 flex flex-col">
							<div class="flex justify-between items-start mb-4">
								<div>
									<h3 class="text-xl font-bold">{booking.car.brand} {booking.car.model}</h3>
									<div class="text-sm text-zinc-500">№ заказа {booking.id.slice(0, 8)}</div>
								</div>
								<div
									class={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${status.color}`}
								>
									<status.icon class="w-3.5 h-3.5" />
									{status.label}
								</div>
							</div>

							<div class="grid grid-cols-2 gap-4 mb-6 text-sm">
								<div>
									<div class="text-zinc-400 text-xs uppercase font-semibold">Период</div>
									<div class="font-medium">
										{formatDate(booking.startDate)} — {formatDate(booking.endDate)}
									</div>
								</div>
								<div>
									<div class="text-zinc-400 text-xs uppercase font-semibold">Сумма</div>
									<div class="font-medium">{formatPrice(booking.totalPrice)} ₽</div>
								</div>
							</div>

							<!-- Кнопки -->
							<div class="mt-auto pt-4 border-t flex justify-end">
								{#if booking.status === 'confirmed' || booking.status === 'pending'}
									<form
										method="POST"
										action="?/cancelBooking"
										use:enhance={() => {
											cancelingId = booking.id;
											return async ({ update }) => {
												await update();
												cancelingId = null;
											};
										}}
									>
										<input type="hidden" name="bookingId" value={booking.id} />
										<Button
											type="submit"
											variant="ghost"
											disabled={cancelingId === booking.id}
											class="text-red-600 hover:text-red-700 hover:bg-red-50"
										>
											{#if cancelingId === booking.id}
												<Loader2 class="w-4 h-4 mr-2 animate-spin" /> Отменяем...
											{:else}
												Отменить бронирование
											{/if}
										</Button>
									</form>
								{/if}
							</div>
						</div>
					</div>
				</Card.Root>
			{/each}
		</div>
	{/if}
</div>
