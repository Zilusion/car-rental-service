<script lang="ts">
	import { ShieldCheck, AlertTriangle, Smile } from '@lucide/svelte';
</script>

<div class="container mx-auto py-16 px-4 max-w-3xl">
	<h1 class="text-4xl font-black mb-8 text-zinc-900 dark:text-white">Кодекс чести водителя</h1>

	<div class="space-y-12">
		<section class="flex gap-6">
			<div
				class="shrink-0 w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center"
			>
				<ShieldCheck class="w-6 h-6" />
			</div>
			<div>
				<h3 class="text-xl font-bold mb-3">1. Берегите машину</h3>
				<p class="text-zinc-600 leading-relaxed dark:text-zinc-300">
					Относитесь к автомобилю как к своему (или как к маминому сервизу). Не дрифтите на парковке
					"Ашана", даже если очень хочется и идет снег. Мы все видим через телеметрию.
				</p>
			</div>
		</section>

		<section class="flex gap-6">
			<div
				class="shrink-0 w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center"
			>
				<AlertTriangle class="w-6 h-6" />
			</div>
			<div>
				<h3 class="text-xl font-bold mb-3">2. Не курите в салоне</h3>
				<p class="text-zinc-600 leading-relaxed dark:text-zinc-300">
					Серьезно. Штраф 5000 рублей и вечное осуждение со стороны следующих арендаторов. Вейп тоже
					считается. И IQOS. И палочки с благовониями.
				</p>
			</div>
		</section>

		<section class="flex gap-6">
			<div
				class="shrink-0 w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center"
			>
				<Smile class="w-6 h-6" />
			</div>
			<div>
				<h3 class="text-xl font-bold mb-3">3. Будьте вежливы</h3>
				<p class="text-zinc-600 leading-relaxed dark:text-zinc-300">
					Пропускайте пешеходов, моргайте аварийкой в знак благодарности и не сигнальте без повода.
					Хорошая карма снижает риск проколов колес (научно не доказано, но мы верим).
				</p>
			</div>
		</section>

		<div class="bg-zinc-50 p-6 rounded-2xl border border-zinc-200 mt-8">
			<h4 class="font-bold mb-2 dark:text-black">Юридическая сноска</h4>
			<p class="text-xs text-zinc-500">
				Настоящие правила являются обязательными к исполнению. Нарушение правил влечет за собой
				штрафы согласно договору оферты, который вы подписали, не читая, при регистрации.
			</p>
		</div>
	</div>
</div>
