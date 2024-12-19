<script>
    import GetInfo from "$lib/helpers/getInfo.js";
    import UpdateInfo from "./UpdateInfo.svelte";

    const getinfo = new GetInfo();

    export let funcionarios;
    export let nav_status;

    let staffs = true;
    let update_specific_data = false;
    let specific_data = {};

    function editar(data) {
        nav_status();
        specific_data = data;
        update_specific_data = true;
        staffs = false;
        return specific_data;
    }
</script>

<main>
    {#if staffs}
        <div class="grid-staff">
            {#each funcionarios as funcionario}
                <div class="staff">
                    <img src={funcionario.imagem} alt="" />
                    <h4>Nome: {funcionario.nome}</h4>
                    <span>Departamento: {funcionario.departamento}</span>
                    <span>Cpf: {funcionario.cpf}</span>
                    <span>Data de nascimento: {funcionario.data}</span>
                    <button
                        cpf={funcionario.cpf}
                        id="update"
                        on:click={editar(funcionario)}>editar</button
                    >
                </div>
            {/each}
        </div>
    {/if}

    {#if update_specific_data}
        <UpdateInfo
            {specific_data}
            voltar={() => {
                update_specific_data = false;
                staffs = true;
                nav_status();
            }}
        ></UpdateInfo>
    {/if}
</main>

<style>
    .grid-staff {
        display: grid;
        place-items: center;
        height: 100%;
        gap: 15px;
        grid-template-columns: repeat(5, 1fr);
        box-sizing: border-box;
    }

    .staff {
        background-color: white;
        display: flex;
        flex-direction: column;
        gap: 15px;
        padding: 5px;
        width: 300px;
        height: 400px;
        box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.452);
        justify-content: center;
        align-items: center;
        border-radius: 3px;
    }

    .staff > img {
        display: block;
        width: 190px;
        height: 190px;
        border-radius: 5000px;
    }

    @media screen and (max-width: 1650px) {
        .grid-staff {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    @media screen and (max-width: 1200px) {
        .grid-staff {
            display: grid;
            place-items: center;
            height: 100%;
            gap: 15px;
            grid-template-columns: repeat(2, 1fr);
            box-sizing: border-box;
        }
    }
    @media screen and (max-width: 890px) {
        .grid-staff {
            display: grid;
            place-items: center;
            height: 100%;
            gap: 15px;
            grid-template-columns: repeat(1, 1fr);
            box-sizing: border-box;
        }
    }
</style>
