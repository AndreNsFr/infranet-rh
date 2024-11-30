<script>
    import GetInfo from "$lib/helpers/getInfo.js";
    import { preventDefault } from "svelte/legacy";

    const getInfo = new GetInfo();

    let configs = {};

    getInfo.Show().then((data) => {
        configs = data;
        return configs;
    });

    function sendNewData(event) {
        event.preventDefault();

        const cpf = configs.cpf;

        let nome = document.getElementById("nome").value;
        let email = document.getElementById("email").value;
        let senha = document.getElementById("senha").value;
        let imagem = document.getElementById("imagem").files[0];

        getInfo.updateSelfInfo(cpf, nome, email, imagem, senha).then();
    }

    let imagem_status = false;
    let imagem_selecionada = null;

    async function imagemSelecionada(event) {
        event.preventDefault();

        let imagem = document.getElementById("imagem").files[0];

        getInfo.toBase64(imagem).then((Imagem) => {
            return (imagem_selecionada = Imagem);
        });
        imagem_status = true;
        return imagem_selecionada;
    }
</script>

<div class="configurações">
    <div class="seus-dados">
        <img
            src={configs.imagem}
            width="200px"
            height="200px"
            alt="imagem-pessoal"
            style="border-radius: 900px;"
        />
        <h3>Nome:</h3>
        <span>{configs.nome}</span>
        <h3>Departamento:</h3>
        <span>{configs.departamento}</span>
        <h3>Data de Nascimento:</h3>
        <span>{configs.data}</span>
        <h3>Email:</h3>
        <span>{configs.email}</span>
        <h3>Cpf:</h3>
        <span>{configs.cpf}</span>
    </div>

    <form on:submit={sendNewData(event)}>
        <h1>Alterar suas informações:</h1>
        <br />
        <br />
        <label for="nome">Alterar nome:</label>
        <input
            type="text"
            name="nome"
            id="nome"
            placeholder="nome"
            value={configs.nome}
        />
        <label for="senha">Alterar senha:</label>
        <input type="password" name="senha" id="senha" placeholder="senha" />
        <label for="email">Alterar email:</label>
        <input
            type="email"
            name="email"
            id="email"
            placeholder="email"
            value={configs.email}
        />
        <div class="env-img">
            <label for="imagem">Alterar imagem:</label>
            <input
                type="file"
                id="imagem"
                name="imagem"
                accept="image/png, image/jpeg, image/jpg"
                on:change={imagemSelecionada(event)}
            />

            <!-- ALTERAR ISTO -->
            {#if imagem_status}
                <img
                    src={imagem_selecionada}
                    alt=""
                    width="250px"
                    height="250px"
                    style="border-radius: 1000px;
                    "
                />
            {/if}
        </div>
        <input type="submit" value="enviar" />
    </form>
</div>

<style>
    .configurações {
        display: flex;

        gap: 15px;
        height: 100%;
    }
    form {
        display: flex;
        flex-direction: column;
        gap: 15px;
        background-color: white;
        height: 90%;
        width: 100%;
        padding: 20px;
        margin-block: auto;
        border-radius: 15px;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.808);

        && input[type="text"],
        input[type="password"],
        input[type="email"] {
            font-size: large;
            text-indent: 1em;
            height: 70px;
            border-radius: 90px;
        }

        && input[type="submit"] {
            font-size: large;
            margin-top: auto;
            text-indent: 1em;
            height: 70px;
            border-radius: 90px;
        }
    }

    form > div.env-img {
        background-color: gray;
        padding: 5px;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }

    form > div.env-img > label {
        font-size: 20pt;
    }

    form > label {
        font-size: larger;
    }

    .seus-dados {
        border-radius: 15px;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.808);
        display: flex;
        flex-direction: column;
        gap: 15px;
        background-color: white;
        width: 300px;
        height: 91%;
        margin-block: auto;
        padding: 15px;
        align-items: center;
    }

    .seus-dados > h3 {
        margin: 3px;
    }
</style>
