<script>
    import GetInfo from "$lib/helpers/getInfo.js";

    const getinfo = new GetInfo();

    let funcionarios = null;

    getinfo.GetAllStaffs().then((staff) => {
        funcionarios = staff;
        return (funcionarios = staff);
    });
</script>

<div class="grid-staff">
    {#each funcionarios as funcionario}
        <div class="staff">
            <img src={funcionario.imagem} alt="" />
            <h4>Nome: {funcionario.nome}</h4>
            <span>Departamento: {funcionario.departamento}</span>
            <span>Cpf: {funcionario.cpf}</span>
            <span>Data de nascimento: {funcionario.data}</span>
        </div>
    {/each}
</div>

<style>
    .grid-staff {
        place-items: center;
        height: 100%;
        width: 100%;
        gap: 15px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        grid-template-rows:  1fr 1fr;
    }

    .staff {
        background-color: white;
        display: flex;
        flex-direction: column;
        gap: 15px;
        padding: 8px;
        width: 300px;
        height: 400px;
        box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.452);
        justify-content: center;
        align-items: center;
        border-radius: 3px;
    }

    .staff > img {
        width: 200px;
        height: 200px;
    }
</style>
