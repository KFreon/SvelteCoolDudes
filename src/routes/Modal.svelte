<script lang=ts>
  export let isVisible: boolean;
  export let title: string;
  export let checkboxLabel: string;
  export let placeholder: string;
  export let submitButtonLabel: string;
  export let afterSubmit: () => Promise<void>;

  import './styles.css'

  let dialog: any;

  $: if (dialog && isVisible) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog 
  bind:this={dialog}
  on:close={() => (isVisible = false)}
  on:click|self={() => dialog.close()}
  >
  <h1>{title}</h1>
  <div class="inputs">
    <input type="text" name="name" id="text-input" placeholder={placeholder} />
    <span>
      <input type="checkbox" name="isCool" id="coolbox"/>
      <label for="coolbox">{checkboxLabel}</label>
    </span>
  </div>
  <button type="button" class="submit-button" on:click={async () => {
    const textElem = document.getElementById('text-input');
    // @ts-ignore
    const name = textElem?.value
    // @ts-ignore
    const isCool = document.getElementById('coolbox')?.checked

    // Genius :/
    const id = Math.floor(Math.random() * 100);
    await fetch('http://localhost:5127/add', {
      method: 'POST',
      body: JSON.stringify({name: name, id: id, isCool: isCool}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    dialog.close();
    await afterSubmit();
  }}>{submitButtonLabel}</button>
</dialog>

<style>
  dialog::backdrop {
    background-color: rgba(0, 0, 0, 0.4);
  }

  dialog {
    border-radius: 1rem;
    border: 2px solid black;
  }

  input[type=text] {
    padding: 0.25rem;
  }

  .inputs {
    display: flex;
    justify-content: space-around;
  }

  .submit-button {
    margin: 1rem;
    padding: 0.2rem 0.5rem;
  }
</style>