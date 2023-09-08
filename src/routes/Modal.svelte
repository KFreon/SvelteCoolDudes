<script lang=ts>
  export let isVisible: boolean;
  export let title: string;
  export let checkboxLabel: string;
  export let placeholder: string;
  export let submitButtonLabel: string;

  export let action: string;

  import './styles.css'

  let dialog: any;

  $: if (dialog && isVisible) dialog.showModal();
</script>

<dialog 
  bind:this={dialog}
  on:close={() => (isVisible = false)}
  on:click|self={() => dialog.close()}
  >
  <h1>{title}</h1>
  <form method="post" action={action}>
    <div class="inputs">
      <input type="text" name="name" placeholder={placeholder} />
      <span>
        <input type="checkbox" name="isCool" id="coolbox"/>
        <label for="coolbox">{checkboxLabel}</label>
      </span>
    </div>
    <button type="submit" class="submit-button">{submitButtonLabel}</button>
  </form>
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