<script lang="ts">
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Avatar from '$lib/components/ui/avatar';
	import { LogOut, Car, User } from '@lucide/svelte';
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	import ThemeToggle from './theme-toggle.svelte';

	let user = $derived(page.data.user);
</script>

<header class="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md dark:bg-zinc-900/80 dark:border-zinc-700 dark:text-white">
	<div class="container mx-auto flex h-16 items-center justify-between px-4 max-w-7xl">
		<!-- Логотип -->
		<a href={resolve('/')} class="flex items-center gap-2 group">
			<div
				class="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-900 transition-transform group-hover:rotate-12 dark:bg-white"
			>
				<Car class="h-5 w-5 text-white dark:text-black" />
			</div>
			<span class="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">Rental</span>
		</a>

		<!-- Навигация / Юзер -->
		<div class="flex items-center gap-4">
			<ThemeToggle />
			{#if user}
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<div class="flex items-center gap-3 cursor-pointer group">
							<!-- Имя пользователя рядом с аватаркой для уюта -->
							<span
								class="hidden md:block text-sm font-medium text-zinc-700 group-hover:text-zinc-900 transition-colors dark:text-zinc-300 dark:group-hover:text-white"
							>
								{user.username}
							</span>
							<Avatar.Root
								class="h-9 w-9 border ring-zinc-200 transition-all group-hover:ring-2 group-hover:scale-105"
							>
								<Avatar.Fallback class="bg-indigo-100 font-bold text-indigo-700">
									{user.username.slice(0, 2).toUpperCase()}
								</Avatar.Fallback>
							</Avatar.Root>
						</div>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content align="end" class="w-56 rounded-xl p-2">
						<DropdownMenu.Label class="font-normal px-2 py-1.5">
							<div class="flex flex-col space-y-1">
								<p class="text-sm font-medium leading-none">Личный кабинет</p>
								<p class="text-xs leading-none text-zinc-400">Пилот болида</p>
							</div>
						</DropdownMenu.Label>
						<DropdownMenu.Separator class="my-1" />

						<DropdownMenu.Item class="p-0 rounded-lg focus:bg-indigo-50 text-zinc-700 dark:text-white">
							<a href={resolve('/bookings')} class="flex w-full items-center px-2 py-2">
								<Car class="mr-2 h-4 w-4 text-indigo-600" /> Мои поездки
							</a>
						</DropdownMenu.Item>

						<DropdownMenu.Item class="p-0 rounded-lg focus:bg-zinc-100 text-zinc-700 dark:text-white">
							<a href={resolve('/profile')} class="flex w-full items-center px-2 py-2">
								<User class="mr-2 h-4 w-4 text-zinc-500 dark:text-white" /> Настройки профиля
							</a>
						</DropdownMenu.Item>

						<DropdownMenu.Separator class="my-1" />

						<DropdownMenu.Item class="p-0 rounded-lg focus:bg-red-50 text-red-600">
							<form action="/login?/logout" method="POST" use:enhance class="w-full">
								<button class="flex w-full items-center px-2 py-2">
									<LogOut class="mr-2 h-4 w-4 dark:text-white" /> Выйти
								</button>
							</form>
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			{:else}
				<div class="flex gap-2">
					<Button variant="ghost" href={resolve('/login')} class="hover:bg-zinc-100">Войти</Button>
					<Button
						href={resolve('/register')}
						class="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20"
						>Регистрация</Button
					>
				</div>
			{/if}
		</div>
	</div>
</header>
