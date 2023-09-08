<script lang=ts>
	import Modal from './Modal.svelte';
	import PageColumn from './PageColumn.svelte';
  import './styles.css'
  let isVisible = false;

	let dudes: any[] = [];

	export async function loadDudes() {
		const response = await fetch('http://localhost:5127/cooldudes');
		dudes = await response.json();
	}

	loadDudes();
</script>

<nav>
	<h1 style="font-size: 2rem">Flooter</h1>
</nav>

<div class="title">
	<h1>Are you a cool dude?</h1>
	<button type="button" on:click={() => (isVisible = true)}>Add a cooldude</button>
</div>

<div class="main-area">
	<PageColumn title="Cool Dudes 😎" dudes={dudes.filter(x => x.isCool)} afterDelete={() => loadDudes()} />
	<div style="width: 1px; border: 1px solid white;" />
	<PageColumn title="Uncool Dudes 😭" dudes ={dudes.filter(x => !x.isCool)} afterDelete={() => loadDudes()}/>
</div>

<Modal
	title="Are you a Cool Dude?"
	checkboxLabel="Cool?"
	bind:isVisible={isVisible}
	placeholder="Your name"
	submitButtonLabel="Add"
	afterSubmit={() => loadDudes()}
/>

<style>
	nav {
		background-color: darkslategray;
		color: white;
		padding: 0.1rem 0.5rem;
	}

	.title {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.title button {
		padding: 0.75rem;
		background-color: darkgreen;
		color: white;
		border: none;
		border-radius: 5px;
		font-size: 1.2rem;
    cursor: pointer;
	}

	.main-area {
		display: flex;
		justify-content: center;
		width: 100%;
	}
</style>
