<script lang=ts>
  export let title: string;
  import './styles.css'

  export let afterDelete: () => Promise<void>;

  export let dudes: any[];
</script>

<style>
  .col {
    flex: 1;
  }

  .col >h2 {
    text-align: center;
    text-decoration: underline;
    font-size: 1.5rem;
  }

  ul {
    text-align: center;
  }

  li {
    display: flex;
    justify-content: space-around;
  }
</style>

<div class="col">
  <h2>{title}</h2>
  <ul>
    {#each dudes as dude}
    <li>
        <span>{dude.name} {dude.isCool ? '😎' : '😭'}</span>
        <input name="id" value={dude.id} style="display: none;"/>
        <button type='button' on:click={async () => {
          await fetch('http://localhost:5127/delete', {
            method: 'DELETE',
            body: JSON.stringify(dude.id),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          await afterDelete();
        }}>X</button>  
    </li>
    {/each}
  </ul>
</div>