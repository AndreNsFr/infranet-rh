<script>
    import GetInfo from "$lib/helpers/getInfo.js";

    const getInfo = new GetInfo();

    function create() {
        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const senha = document.getElementById("senha").value;
        const departamento = document.getElementById("departamento").value;
        const cpf = document.getElementById("cpf").value;
        const email = document.getElementById("email").value;
        const data = document.getElementById("data-nas").value;
        const [ano, mes, dia] = data.split("-");
        let data_nas = `${dia}-${mes}-${ano}`;
        const imagem = document.getElementById("imagem").files[0];

        getInfo
            .createStaff(
                nome,
                senha,
                departamento,
                cpf,
                email,
                data_nas,
                imagem,
            )
            .then();
    }
    let imagem_preview_status = false;
    let new_src = null;

    function preview(event) {
        event.preventDefault();
        imagem_preview_status = true;
        const imagem = document.getElementById("imagem").files[0];
        let toBase64 = getInfo.toBase64(imagem).then((imagem_64) => {
            new_src = imagem_64;
        });
    }
</script>

<main>
    <form on:submit={create(event)}>
        <label for="nome">Digite o nome:</label>
        <input required type="text" name="nome" id="nome" placeholder="nome" />
        <label for="senha">Digite a senha</label>
        <input
            required
            type="password"
            name="senha"
            id="senha"
            placeholder="senha"
        />
        <label for="departamento">Digite o Departamento</label>
        <input
            required
            type="text"
            name="departamento"
            id="departamento"
            placeholder="departamento"
        />
        <label for="cpf">Digite o cpf:</label>
        <input required type="text" name="cpf" id="cpf" placeholder="cpf" />
        <label for="email">Digite o email</label>
        <input
            required
            type="email"
            name="email"
            id="email"
            placeholder="email"
        />
        <label for="data-nas">Data de nascimento:</label>
        <input
            required
            type="date"
            name="data-nas"
            id="data-nas"
            placeholder="data"
        />
        <div class="env-img">
            <label for="imagem">escolha a imagem:</label>
            <input
                required
                type="file"
                id="imagem"
                name="imagem"
                accept="image/png, image/jpeg, image/jpg"
                on:change={preview(event)}
            />
            {#if imagem_preview_status}
                <img
                    src={new_src}
                    id="imagem_selecionada"
                    alt=""
                    width="250px"
                    height="250px"
                    style="border-radius: 1000px;"
                />
            {/if}
        </div>

        <input type="submit" value="enviar" />
    </form>
</main>

<style>
    main {
        display: flex;
        height: 100%;
    }
    form {
        display: flex;
        flex-direction: column;
        gap: 8px;
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
        input[type="email"],
        #data-nas {
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
</style>
