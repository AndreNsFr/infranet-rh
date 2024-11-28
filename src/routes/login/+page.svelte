<script lang="js">
    import GetInfo from "$lib/helpers/getInfo.js";
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
    // colocar load();
    getinfo.GetAllStaffs().then((staff) => {
        funcionarios = staff;
        return (funcionarios = staff);
    });
</script>

<main>
    <aside>
        <h3>
            seja bem vindo {Primeiro_nome}
        </h3>
    </aside>

    <section>
        {#each funcionarios as funcionario}
            <input type="text" value={funcionario.nome} />
        {/each}
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
        display: grid;
        width: 90%;
        gap: 15px;
        margin: 15px;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;
    }
</style>
