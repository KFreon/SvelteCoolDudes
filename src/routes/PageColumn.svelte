<script lang=ts>
	import type { CoolDude } from '$lib/dataService';
  export let title: string;
  import './styles.css'

  export let dudes: CoolDude[];
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
      <form method="post" action="?/remove">
        <span>{dude.name} {dude.isCool ? '😎' : '😭'}</span>
        <input name="id" value={dude.id} style="display: none;"/>
        <button type='submit'>X</button>  
      </form>
    </li>
    {/each}
  </ul>
</div>