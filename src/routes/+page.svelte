<script>
    import GetInfo from "$lib/helpers/getInfo.js";
    import Cookie from "js-cookie";
    import { goto } from "$app/navigation";

    const get_info = new GetInfo();

    function contato(event) {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const cpf = document.getElementById("cpf").value;
        const senha = document.getElementById("senha").value;

        get_info.connect(email, cpf, senha);
    }
</script>

<main>
    <section>
        <form on:submit={contato} method="post">
            <h1
                style="text-align: center; margin-top: 10px;
            margin-bottom:40px; font-size:30pt;"
            >
                Login
            </h1>
            <label for="email">Digite o seu Email:</label>
            <input
                required
                type="text"
                name="email"
                id="email"
                placeholder="Email"
            />
            <label for="cpf">Digite o seu cpf:</label>
            <input required type="text" name="cpf" id="cpf" placeholder="CPF" />
            <label required for="senha">Digite o sua senha:</label>
            <input
                type="password"
                name="senha"
                id="senha"
                placeholder="Senha"
                required
            />
            <input type="submit" value="Enviar" />
        </form>
    </section>
</main>

<style>
    :global(body) {
        font-family: Arial, Helvetica, sans-serif;
        width: 100vw;
        min-height: 100vh;
        margin: 0;
        padding: 0;
    }

    main {
        display: grid;
        place-items: center;
        background-color: tomato;
        width: 100%;
        min-height: 100vh;
        background: url(/background-login.jpg);
        background-size: cover;
        background-repeat: no-repeat;
    }

    section {
        backdrop-filter: blur(3px);
        background-color: rgba(255, 255, 255, 0.767);
        padding: 15px;
        border-radius: 15px;
        height: 600px;
        box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.705);
    }

    form {
        display: flex;
        flex-direction: column;
        width: 500px;
        gap: 15px;
    }

    form > input {
        height: 50px;
        border-radius: 90px;
        outline: none;
        border: 2px solid rgba(0, 0, 0, 0.363);
        text-indent: 1em;
        font-size: 12pt;
    }
    form > input[type="submit"] {
        font-size: 12pt;
        margin-top: 110px;
    }

    form > input[type="text"]:focus,
    form > input[type="password"]:focus {
        transition: 0.2s ease-out;
        border: 2px solid rgb(0, 0, 0);
    }

    form > input[type="text"]:valid,
    form > input[type="password"]:valid {
        border: 2px solid rgb(0, 0, 0);
    }

    form > input[type="submit"]:active {
        transition: 0.1s;
        background-color: rgba(0, 0, 0, 0.507);
    }
    form > label {
        font-size: 13pt;
        text-indent: 8px;
    }
</style>
