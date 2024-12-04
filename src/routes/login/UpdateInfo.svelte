<script>
    import GetInfo from "$lib/helpers/getInfo.js";

    const getInfo = new GetInfo();

    // uso de props

    export let specific_data;

    export let voltar;

    let staff_data = specific_data;

    function DeleteStaffs(cpf) {
        getInfo.deleteStaff(cpf).then();
    }

    function sendNewData(event) {
        event.preventDefault();
        voltar();

        const cpf = staff_data.cpf;

        let nome = document.getElementById("nome").value;
        let email = document.getElementById("email").value;
        let senha = document.getElementById("senha").value;
        let departamento = document.getElementById("departamento").value;
        let imagem = document.getElementById("imagem").files[0];

        getInfo
            .updateInfo(cpf, nome, email, imagem, senha, departamento)
            .then();
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

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<img id="icon-voltar" src="/voltar.png" alt="voltar" on:click={voltar} />
<div class="gerenciador_de_dados">
    <div class="dados-funcionario">
        <img
            src={staff_data.imagem}
            width="200px"
            height="200px"
            alt="imagem-do-funcionario"
            style="border-radius: 900px;"
        />
        <h3>Nome:</h3>
        <span>{staff_data.nome}</span>
        <h3>Departamento:</h3>
        <span>{staff_data.departamento}</span>
        <h3>Data de Nascimento:</h3>
        <span>{staff_data.data}</span>
        <h3>Email:</h3>
        <span>{staff_data.email}</span>
        <h3>Cpf:</h3>
        <span>{staff_data.cpf}</span>
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
        <img
            src="lixo.png"
            id="icon-lixo"
            alt=""
            on:click={(DeleteStaffs(staff_data.cpf), voltar)}
        />
    </div>

    <form on:submit={sendNewData(event)}>
        <h1>Alterar informações:</h1>
        <br />
        <br />
        <label for="nome">Alterar nome:</label>
        <input
            type="text"
            name="nome"
            id="nome"
            placeholder="nome"
            value={staff_data.nome}
        />
        <label for="senha">Alterar senha:</label>
        <input type="password" name="senha" id="senha" placeholder="senha" />
        <label for="email">Alterar email:</label>

        <input
            type="email"
            name="email"
            id="email"
            placeholder="email"
            value={staff_data.email}
        />
        <label for="departamento">Alterar departamento:</label>
        <input
            type="text"
            name="departamento"
            id="departamento"
            placeholder="departamento"
            value={staff_data.departamento}
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
    .gerenciador_de_dados {
        display: flex;
        gap: 15px;
        height: 100%;
    }

    #icon-voltar {
        top: 50px;
        right: 25px;
        width: 50px;
        height: 50px;
        position: absolute;
        cursor: pointer;
    }

    #icon-lixo {
        width: 50px;
        margin: auto;
        cursor: pointer;
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

    .dados-funcionario {
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

    .dados-funcionario > h3 {
        margin: 3px;
    }
</style>
