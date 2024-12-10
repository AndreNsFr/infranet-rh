<script>
    import GetInfo from "$lib/helpers/getInfo.js";
    import UpdateInfo from "./UpdateInfo.svelte";

    const getinfo = new GetInfo();

    let funcionarios = null;

    getinfo.GetAllStaffs().then((staff) => {
        return (funcionarios = staff);
    });

    let staffs = true;
    let update_specific_data = false;
    let specific_data = {};

    function mostrar_cpf(data) {
        specific_data = data;
        update_specific_data = true;
        staffs = false;
        return specific_data;
    }

    
</script>


{#if staffs}
    <div class="grid-staff">
        {#each funcionarios as funcionario}
            <div class="staff">
                <img
                    src={funcionario.imagem}
                    width="190px"
                    height="190px"
                    alt=""
                />
                <h4>Nome: {funcionario.nome}</h4>
                <span>Departamento: {funcionario.departamento}</span>
                <span>Cpf: {funcionario.cpf}</span>
                <span>Data de nascimento: {funcionario.data}</span>
                <button
                    cpf={funcionario.cpf}
                    id="update"
                    on:click={mostrar_cpf(funcionario)}>editar</button
                >
            </div>
        {/each}
    </div>
{/if}

{#if update_specific_data}
    <UpdateInfo {specific_data} voltar={()=>{
        update_specific_data = false;
        staffs = true;
    }}></UpdateInfo>
{/if}

<style>
    .grid-staff {
        display: grid;
        place-items: center;
        height: 100%;
        width: 100%;
        gap: 15px;
        grid-template-columns: repeat(5, 1fr);
    }

    @media screen and (max-width: 950px) {
        .grid-staff {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    .staff {
        background-color: white;
        display: flex;
        flex-direction: column;
        gap: 15px;
        padding: 10px;
        width: 300px;
        height: 400px;
        box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.452);
        justify-content: center;
        align-items: center;
        border-radius: 3px;
    }

    .staff > img {
        display: block;
        border-radius: 2000px;
    }
</style>
