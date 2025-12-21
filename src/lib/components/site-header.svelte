<script lang="ts">
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Avatar from '$lib/components/ui/avatar';
	import { LogOut, User, Car } from '@lucide/svelte';
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';

	// Получаем юзера из глобального стора страницы
	let user = $derived(page.data.user);
</script>

<header class="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
	<div class="container mx-auto flex h-16 items-center justify-between px-4 max-w-7xl">
		<!-- Логотип -->
		<a href={resolve('/')} class="flex items-center gap-2">
			<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900">
				<Car class="h-5 w-5 text-white" />
			</div>
			<span class="text-xl font-bold tracking-tight text-zinc-900">Rental</span>
		</a>

		<!-- Навигация / Юзер -->
		<div class="flex items-center gap-4">
			{#if user}
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<Avatar.Root
							class="h-9 w-9 cursor-pointer border ring-zinc-200 transition-all hover:ring-2"
						>
							<Avatar.Fallback class="bg-zinc-100 font-medium text-zinc-700">
								{user.username.slice(0, 2).toUpperCase()}
							</Avatar.Fallback>
						</Avatar.Root>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content align="end" class="w-56">
						<DropdownMenu.Label class="font-normal">
							<div class="flex flex-col space-y-1">
								<p class="text-sm font-medium leading-none">{user.username}</p>
								<p class="text-xs leading-none text-zinc-500">Пользователь</p>
							</div>
						</DropdownMenu.Label>
						<DropdownMenu.Separator />
						
						<!-- Ссылка Профиля: a тег внутри Item -->
						<DropdownMenu.Item class="p-0">
							<a href={resolve('/profile')} class="flex w-full items-center px-2 py-1.5">
								<User class="mr-2 h-4 w-4" /> Профиль
							</a>
						</DropdownMenu.Item>
						
						<DropdownMenu.Separator />
						
						<DropdownMenu.Item class="p-0">
							<form action="/login?/logout" method="POST" use:enhance class="w-full">
								<button class="flex w-full items-center px-2 py-1.5 text-red-600">
									<LogOut class="mr-2 h-4 w-4" /> Выйти
								</button>
							</form>
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			{:else}
				<div class="flex gap-2">
					<Button variant="ghost" href={resolve('/login')}>Войти</Button>
					<Button href={resolve('/register')}>Регистрация</Button>
				</div>
			{/if}
		</div>
	</div>
</header>