<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css">
	<style lang="scss">
		@import './styles/main.scss';
	</style>
</svelte:head>

<GoogleMap />
{#if $loading}
<Overlay class="d-flex flex-column justify-content-center align-items-center">
	<Spinner id="loading-maps" color="primary" size="md" />
</Overlay>
{/if}
<Overlay class="px-5 d-flex flex-column justify-content-end align-items-center">
	<Options />
	<Address />
</Overlay>
<Overlay class="d-flex flex-column justify-content-center align-items-end">
	<Nearby />
</Overlay>

<script>
	import Address from './components/Address.svelte'
	import GoogleMap from './components/GoogleMap.svelte'
	import Nearby from './components/Nearby.svelte'
	import Options from './components/Options.svelte'
	import Overlay from './components/Overlay.svelte'

	import { loading } from './store'

	import { Spinner } from 'sveltestrap';
</script>