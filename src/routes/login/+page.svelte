<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Card from '$lib/components/ui/card';
	import { resolve } from '$app/paths';

	let { form } = $props();
</script>

<div class="flex items-center justify-center min-h-[80vh] px-4">
	<Card.Root class="w-full max-w-md">
		<Card.Header>
			<Card.Title class="text-2xl">Вход в аккаунт</Card.Title>
			<Card.Description>Введите свои данные для входа</Card.Description>
		</Card.Header>
		<Card.Content>
			<form method="POST" action="?/login" use:enhance class="space-y-4">
				<div class="space-y-2">
					<Label for="username">Имя пользователя</Label>
					<Input id="username" name="username" type="text" required />
				</div>
				<div class="space-y-2">
					<Label for="password">Пароль</Label>
					<Input id="password" name="password" type="password" required />
				</div>

				{#if form?.message}
					<p class="text-sm text-red-500 font-medium">{form.message}</p>
				{/if}

				<Button type="submit" class="w-full">Войти</Button>
			</form>
		</Card.Content>
		<Card.Footer class="justify-center">
			<p class="text-sm text-muted-foreground">
				Нет аккаунта? <a href={resolve('/register')} class="text-primary hover:underline"
					>Регистрация</a
				>
			</p>
		</Card.Footer>
	</Card.Root>
</div>
