<script>
    export let pesquisar
    export let limpar
</script>

<div class="box-pesquisa">
    <form on:submit={pesquisar(event)}>
        <input
        type="text"
        name="pesquisa"
        id="pesquisa"
        placeholder="pesquisa"
        required
    />

    <span>pesquisar por:</span>

    <div>
        <label for="pesquisa_por_nome">nome:</label>
        <input
            type="radio"
            name="pesquisar_por"
            id="pesquisa_por_nome"
            value="nome"
            required
        />
    </div>
    <div>
        <label for="pesquisa_por_cpf">cpf:</label>
        <input
            type="radio"
            name="pesquisar_por"
            id="pesquisar_por_cpf"
            value="cpf"
            required
        />
    </div>
    <div>
        <label for="pesquisa_por_departamento"
            >derpartamento:</label
        >
        <input
            type="radio"
            name="pesquisar_por"
            id="pesquisa_por_departamento"
            value="cpf"
            required
        />
    </div>
    <input
        type="submit"
        value="pesquisar"
    />
    <input type="button" value="limpar filtro" on:click={limpar}>
    </form>
</div>

<style>
    .box-pesquisa > form {
        background-color: rgb(251, 255, 0);
        padding: 15px;
        gap: 15px;
        border-radius: 1000px;
        box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.452);
        width: 90%;
        display: flex;
        justify-content: space-around;
    }
</style>