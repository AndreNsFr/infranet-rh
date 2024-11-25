<script lang="js">
    import GetInfo from "$lib/helpers/getInfo.js";
    const getinfo = new GetInfo();

    // TODO: fazer aparecer pelomenos um valor retornado do Json do Show();
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
</script>

<main>
    <aside>
        <h3>
            seja bem vindo {Primeiro_nome}
        </h3>
    </aside>
</main>

<style>
    main {
        background-color: tomato;
        height: 100vh;
    }
    aside {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: white;
        height: 100vh;
        width: 260px;
        position: absolute;
        left: 0px;
    }
</style>
