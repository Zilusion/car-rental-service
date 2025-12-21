<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import * as Card from "$lib/components/ui/card";
	import type { ActionData } from './$types';
	import { resolve } from '$app/paths';

	let { form }: { form: ActionData } = $props();
</script>

<div class="flex items-center justify-center min-h-[80vh] px-4">
	<Card.Root class="w-full max-w-md">
		<Card.Header>
			<Card.Title class="text-2xl">Регистрация</Card.Title>
			<Card.Description>Создайте аккаунт, чтобы арендовать машины</Card.Description>
		</Card.Header>
		<Card.Content>
			<form method="POST" action="?/register" use:enhance class="space-y-4">
				<!-- Имя пользователя -->
				<div class="space-y-2">
					<Label for="username">Имя пользователя</Label>
					<Input 
						id="username" 
						name="username" 
						type="text" 
						placeholder="user123" 
						required 
						minlength={3}
					/>
				</div>

				<!-- Пароль -->
				<div class="space-y-2">
					<Label for="password">Пароль</Label>
					<Input 
						id="password" 
						name="password" 
						type="password" 
						required 
						minlength={6}
					/>
				</div>

				<!-- Подтверждение пароля -->
				<div class="space-y-2">
					<Label for="confirm-password">Повторите пароль</Label>
					<Input 
						id="confirm-password" 
						name="confirm-password" 
						type="password" 
						required 
						minlength={6}
					/>
				</div>
				
				<!-- Ошибки с сервера -->
				{#if form?.message}
					<p class="text-sm text-red-500 font-medium bg-red-50 p-3 rounded-md border border-red-100">
						{form.message}
					</p>
				{/if}

				<Button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700">
					Создать аккаунт
				</Button>
			</form>
		</Card.Content>
		<Card.Footer class="justify-center">
			<p class="text-sm text-muted-foreground">
				Уже есть аккаунт? <a href={resolve("/login")} class="text-primary hover:underline font-medium">Войти</a>
			</p>
		</Card.Footer>
	</Card.Root>
</div>