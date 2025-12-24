<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import faviconPng from '$lib/assets/favicon-96x96.png';
	import faviconShortcut from '$lib/assets/favicon.ico';
	import appleTouchIcon from '$lib/assets/apple-touch-icon.png';
	import siteManifest from '$lib/assets/site.webmanifest';
	import SiteHeader from '$lib/components/site-header.svelte';
	import SiteFooter from '$lib/components/site-footer.svelte';
	import { Toaster } from '$lib/components/ui/sonner';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="icon" type="image/png" href={faviconPng} sizes="96x96" />
	<link rel="shortcut icon" href={faviconShortcut} />
	<link rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon} />
	<meta name="apple-mobile-web-app-title" content="Rental" />
	<link rel="manifest" href={siteManifest} />
</svelte:head>

<div class="flex min-h-screen flex-col dark:bg-[#000107]">
	<SiteHeader />

	<main class="flex-1">
		{@render children()}
	</main>

	<SiteFooter />
</div>

<Toaster />
