<script lang="js">
    import GetInfo from "$lib/helpers/getInfo.js";
    import Funcionarios from "./Funcionarios.svelte";
    const getinfo = new GetInfo();

    // TODO: fazer aparecer pelomenos um valor retornado do Json do Show();
    let funcionarios = null;
    let info = {};
    let Primeiro_nome = "";
    getinfo
        .Show()
        .then((x) => {
            info = x;
            return info;
        })
        .then((x) => {
            Primeiro_nome = x.nome.split(" ")[0];
            return Primeiro_nome;
        });

    let status_Funcionario = false;
    function MostrarFuncionarios() {
        status_Funcionario = true;
    }

    function tirar() {
        status_Funcionario = false;
    }

    // colocar load();
</script>

<main>
    <aside>
        <h3>
            seja bem vindo {Primeiro_nome}
        </h3>

        <button on:click={MostrarFuncionarios}>Funcionarios</button> <br />
        <button on:click={tirar}>tirar Funcionarios (teste)</button>
    </aside>

    <section>
        {#if status_Funcionario}
            <Funcionarios></Funcionarios>
        {/if}
    </section>
</main>

<style>
    main {
        background-color: tomato;
        height: 100vh;
        display: flex;
    }

    aside {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: white;
        height: 100vh;
        width: 260px;
        left: 0px;
    }

    section {
        width: 100%;
        margin: 15px;
    }
</style>
