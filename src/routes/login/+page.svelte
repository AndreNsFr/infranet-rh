<script lang="js">
    import GetInfo from "$lib/helpers/getInfo.js";
    import CreateStaff from "./CreateStaff.svelte";
    import Funcionarios from "./Funcionarios.svelte";
    import ProfileConfigs from "./ProfileConfigs.svelte";
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

    let status_Funcionario = true;
    let status_Profile = false;
    let status_Criar_funcionario = false;

    function mostrar_funcionarios() {
        status_Funcionario = true;
        status_Criar_funcionario = false;
        status_Profile = false;
    }

    function mostrar_configurações_perfil() {
        status_Profile = true;
        status_Funcionario = false;
        status_Criar_funcionario = false;
    }

    function mostrar_criar_funcionarios() {
        status_Criar_funcionario = true;
        status_Profile = false;
        status_Funcionario = false;
    }
</script>

<main>
    <aside>
        <h3>
            seja bem vindo {Primeiro_nome}
        </h3>

        <button on:click={mostrar_funcionarios}>Funcionarios</button> <br />
        <button on:click={mostrar_configurações_perfil}
            >Configurações de Perfil</button
        ><br />
        <button on:click={mostrar_criar_funcionarios}>Criar funcionarios</button
        >
    </aside>

    <section>
        {#if status_Funcionario}
            <Funcionarios></Funcionarios>
        {/if}
        {#if status_Profile}
            <ProfileConfigs></ProfileConfigs>
        {/if}
        {#if status_Criar_funcionario}
            <CreateStaff></CreateStaff>
        {/if}
    </section>
</main>

<style>
    main {
        background-color: rgb(63, 191, 241);
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
