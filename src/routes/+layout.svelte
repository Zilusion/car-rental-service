<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import SiteHeader from '$lib/components/site-header.svelte';
	import SiteFooter from '$lib/components/site-footer.svelte';
	import { Toaster } from "$lib/components/ui/sonner";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex min-h-screen flex-col dark:bg-[#000107]">
	<SiteHeader />

	<main class="flex-1">
		{@render children()}
	</main>

	<SiteFooter />
</div>

<Toaster />