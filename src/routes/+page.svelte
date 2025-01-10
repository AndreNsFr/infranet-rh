<script>
    import GetInfo from "$lib/helpers/getInfo.js";
    import '../app.css'

    const getInfo = new GetInfo();

    function carregar(){
        document.body.style.cursor = "wait"
        setTimeout(()=>{
            document.body.style.cursor = "default"
        }, 2000)
    }

    function contato(event) {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const cpf = document.getElementById("cpf").value;
        const senha = document.getElementById("senha").value;

        getInfo.Login(email, cpf, senha)
    }
</script>

<main>
    <section>

        <h1 class="titulo">Login</h1>

        <form class="max-w-md mx-auto" on:submit={contato} on:submit{carregar}>

            <div class="relative z-0 w-full mb-5 group">

                <input type="email" name="email" id="email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                <label for="email" class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>

            </div>

            <div class="relative z-0 w-full mb-5 group">

                <input type="text" name="cpf" id="cpf" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                <label for="cpf" class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Cpf</label>

            </div>
        
            <div class="relative z-0 w-full mb-5 group">

                <input type="password" name="senha" id="senha" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                <label for="senha" class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Senha</label>
                
            </div>

            <input type="submit" on:click={carregar} class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center" value="Entrar"/>

        </form>
        
           
    </section>
</main>

<style>
    :global(body) {
        font-family: Arial, Helvetica, sans-serif;
        width: 100vw;
        margin: 0;
        padding: 0;
        overflow-x: hidden;

    }

    main {
        display: grid;
        place-items: center;
        background-color: tomato;
        width: 100%;
        min-height: 100vh;
        background: url(/10-11.jpg);
        background-size: cover;
        background-repeat: no-repeat;
    }

    section {
        display: flex;
        background-color: rgba(255, 255, 255, 0.945);
        backdrop-filter: blur(5px);
        box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.301);
        border: 1px solid rgba(151, 151, 151, 0.76);
        border-radius: 5px;
        padding: 30px;
        position: relative;
    }

    form {
        padding-top: 15px;
        display: flex;
        flex-direction: column;
        width: 500px;
        gap: 15px;
        input[type="submit"]{
            transition: all 0.25s ease;
            border-radius: 5px;
        }
    }

    input[type="submit"]:hover{
        box-shadow: 3px 4px 8px rgba(0, 0, 0, 0.301);
    }

    input[type="submit"]:active{
        cursor: wait;
    }
    

    .titulo{
        position: absolute;
        font-size: 18pt;
        letter-spacing: 0.90px;
        left: 42%;
        top: 10px;
        color: rgba(0, 0, 0, 0.753);
    }


    
</style>
