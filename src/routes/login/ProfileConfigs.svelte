<script>
    import GetInfo from "$lib/helpers/getInfo.js";
    import '../../app.css'
    import Cookies from "js-cookie";

    const getInfo = new GetInfo();

    function formatarTelefone() {
        let campo = document.getElementById("telefone");
        let valor = campo.value;


        valor = valor.replace(/[^\d+]/g, '');

        if (/^[0-9]/.test(valor)) {
            
            // telefone celular: (XX) XXXXX-XXXX
            
            valor = valor.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');

            // caso for fixo : (XX) XXXX-XXXX

            valor = valor.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
            
            
            

        } else if (valor.startsWith('+')){
            
            campo.maxLength = 17

            let label = document.getElementById("label-telefone")


            valor = valor.replace('+', '');

            valor = valor.replace(/(\d{1,3})(\d{1,13})?/, '$1 $2').trim();
            

            label.innerText ="Por favor, siga o exemplo EUA : '+001 (resto do numero)'."
            label.style.color = "red"

            valor = "+" + valor
        }


        campo.value = valor;
    }

    let configs = {};

    getInfo.Show().then((data) => {
        document.getElementById("Carregando-config").style.display = "none"
        document.getElementById("Container").style.display = "flex"
        configs = data;
        return configs;
    });

    function interactive_password(passwords){
        if(passwords === 1){
            let input_password = document.getElementById("senha")
            let img_button = document.getElementById("img_senha")

            if (input_password.type === "password"){
                input_password.setAttribute("type","text")
                img_button.src = "senha_hide.png"
            }else{
                input_password.setAttribute("type","password")
                img_button.src = "senha_show.png"
            }
        }else if(passwords ===2){
            let input_password = document.getElementById("confirmar_senha")
            let img_button = document.getElementById("img_senha2")

            if (input_password.type === "password"){
                input_password.setAttribute("type","text")
                img_button.src = "senha_hide.png"
            }else{
                input_password.setAttribute("type","password")
                img_button.src = "senha_show.png"
            }
        }
    }

    function mostrar_senha_btn(passwords){
        if(passwords === 1){
            let input_password = document.getElementById("senha")
            let img_button = document.getElementById("img_senha")

            if(input_password.value == ""){
                img_button.style.display = "none"
            }else{
                img_button.style.display = "block"
            }
        }else if(passwords === 2){
            let input_password = document.getElementById("confirmar_senha")
            let img_button = document.getElementById("img_senha2")

            if(input_password.value == ""){
                img_button.style.display = "none"
            }else{
                img_button.style.display = "block"
            }
        }
    }

    function sendNewData(event) {
        event.preventDefault();

        const cpf = Cookies.get('cpf');

        let nome = document.getElementById("nome").value;
        let email = document.getElementById("email").value;
        let senha = document.getElementById("senha").value;
        let confirmação_da_senha = document.getElementById("confirmar_senha").value;
        let telefone = document.getElementById("telefone").value;
        let imagem = document.getElementById("imagem").files[0];

        if(senha === confirmação_da_senha){
            getInfo
            .VerifyActions()
            .then((Response) => {
                if (Response) {
                    getInfo.UpdateInfo(cpf, nome.trim(), email.trim(), telefone.trim(), imagem, senha.trim()).then();
                }
            })
            .catch((erro) => {
                console.error(erro);
            });
        }else{
            alert("As senhas não correspondem.")
        }
    }



    
    let file = null; 
    let previewUrl = null; 
    
    function handleFileChange(event) {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            file = selectedFile;
            previewUrl = URL.createObjectURL(selectedFile);
        }
    }


</script>

<div class="configurações">

    <div id="Carregando-config" class="carregando"><div class="loading"></div></div>

    <div class="container-config" id="Container">

        <h1 class="titulo"> Alterar informações pessoais </h1>
        
        <div class="seus-dados">
            <img
                src={configs.imagem}
                width="300px"
                alt="imagem-pessoal"
                style="border-radius: 900px; height: 300px; margin: auto; margin-block: 40px"/>
            <div class="infos">
                <div class="flex" style="gap: 5px;justify-content: space-between;"> 
                    <label style="letter-spacing:0.90px; " for="nome-info">Nome:</label>   
                    <h4 id="nome-info" style="text-align: right;" class="truncate max-w-full"  on:dblclick={copiar("nome")}>{configs.nome}</h4>
                </div>
                <hr >
                <div class="flex" style="gap: 5px; justify-content: space-between; overflow: hidden;"> 
                    <label style="letter-spacing:0.90px;" for="departamento-info">Departamento:</label>   
                    <span id="departamento-info" >{configs.departamento}</span>
                </div>
                <hr>
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <div class="flex" style="gap: 5px; justify-content: space-between;" on:dblclick={copiar("email")} >
                    <label for="email-info" style="letter-spacing:0.90px;">Email:</label>
                    <span id="email-info" class="truncate max-w-full" >{configs.email}</span>
                </div>
                <hr>
                <div class="flex" style="gap: 5px; justify-content: space-between;"> 
                    <label style="letter-spacing:0.90px;" for="cpf-info">Cpf: </label>   
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <span id="cpf-info" >{configs.cpf}</span>
                </div>
                <hr>
                <div class="flex" style="gap: 5px; justify-content: space-between;"> 
                    <label style="letter-spacing:0.90px;" for="telefone-info">N° de celular:</label>   
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <span id="telefone-info" class="truncate max-w-full"  >{configs.telefone}</span>
                </div>
                <hr>
                <div class="flex" style="gap: 5px; justify-content: space-between;"> 
                    <label style="letter-spacing:0.90px;" for="data-info">Data de nascimento:</label>   
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <span id="data-info" class="truncate max-w-full"  >{configs.data}</span>
                </div>
            </div>
    
        </div>
    
        
    
        <div class="form-configs">
            
            <form class="max-w-md mx-auto" on:submit={sendNewData} >
                <div class="relative z-0 w-full mb-5 group">
                    <input type="text" name="nome" value={configs.nome} id="nome" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label for="nome" class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nome completo</label>
                </div>
            
                <div class="relative z-0 w-full mb-5 group">

                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
                    <img src="senha_show.png" id="img_senha" class="botão_senha" on:click={()=>{interactive_password(1)}} alt="">
    
                    <input 
                      type="password" 
                      name="senha" 
                      id="senha" 
                      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                      placeholder=" " 
                      on:input={mostrar_senha_btn(1)}
                    />
                    <label 
                      for="senha" 
                      class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Senha
                    </label>
                </div>
                
                <div class="relative z-0 w-full mb-5 group">

                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
                    <img src="senha_show.png" id="img_senha2" class="botão_senha" on:click={()=>{interactive_password(2)}} alt="">
    
                    <input 
                      type="password" 
                      name="confirmação_senha" 
                      id="confirmar_senha" 
                      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                      placeholder=" " 
                      on:input={mostrar_senha_btn(2)}
                    />
                    <label 
                      for="confirmar_senha" 
                      class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Confirmar senha 
                    </label>
                </div>

            
                <div class="relative z-0 w-full mb-5 group">
                    <input type="tel" name="telefone" maxlength="15" on:input={formatarTelefone} value={configs.telefone} id="telefone" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label for="telefone" id="label-telefone" class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" >Telefone</label>
                </div>
            
                <div class="relative z-0 w-full mb-5 group">
                    <input type="email" name="email" value={configs.email} id="email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label for="email" class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                </div>
            
               
            
                <div class="mb-6">
                    <label for="imagem" class="block text-sm text-gray-700">File</label>
                
                    <label
                        for="imagem"
                        class="flex flex-col items-center w-full max-w-lg p-5 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer rounded-xl"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-8 h-8 text-gray-500"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                            />
                        </svg>
                
                        <h2 class="mt-1 font-medium tracking-wide text-gray-700">Foto de perfil</h2>
                
                        <p class="mt-2 text-xs tracking-wide text-gray-500">
                            Envie a foto de perfil que deseja em seu perfil
                        </p>
                
                        <input
                            id="imagem"
                            type="file"
                            class="hidden"
                            on:change="{handleFileChange}"
                        />
                    </label>
                
                    <!-- Pré-visualização -->
                    {#if previewUrl}
                        <div id="file-preview" class="mt-4">
                            <p class="text-sm text-gray-700 mb-2">Pré-visualização:</p>
                            <img src="{previewUrl}" alt="Pré-visualização" class="max-w-xs rounded-lg visualização" style="margin: auto;" />
                        </div>
                    {/if}
                </div>
                        
                <input type="submit" class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center" value="Enviar"/>
            </form>
        </div>
      
    </div>


</div>

<style>
    .configurações {
        display: flex;
        height: 100%;
        width: 90%;
        align-items: center;
        justify-content: center;
        position: relative;
    }
/* estilização carregamento */
    .carregando{
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        position: absolute;
        z-index: 30;
        align-items: center;
    }

    .loading{
        border: 6px solid rgba(180, 175, 175, 0.63);
        width: 100px;
        height: 100px;
        background-color: rgba(255, 255, 255, 0);
        border-top-color: rgb(24, 128, 212);
        border-radius: 50%;
        animation: rotating 1s infinite;
    }

    @keyframes rotating{
        to{
            transform: rotate(1turn);
        }
    }

/* //////////////////////////////////////////////// */

    .titulo{
        position: absolute;
        font-size: 18pt;
        letter-spacing: 0.90px;
        left: 35%;
        color: rgba(0, 0, 0, 0.753);
    }

    .container-config{
        display: none;
        background-color: rgba(255, 255, 255, 0.712);
        box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.301);
        border: 1px solid rgba(151, 151, 151, 0.76);
        border-radius: 5px;
        padding: 30px;
        position: relative;
    }

    


    .form-configs{

        padding: 5px;
        width: 500px;
        padding-top: 14px;
        padding-bottom: 14px;
        border-radius: 5px;
        margin-top: 15px;
        margin-block: auto;
    }

    .botão_senha{
        display: none;
        position: absolute;
        right: 10px;
        top: 16px;
        width: 17px;
        appearance: none;
        -webkit-appearance: none; 
        -moz-appearance: none;
        cursor: pointer;
    }

    #senha, #confirmar_senha{
        appearance: none;
        -webkit-appearance: none; /* Para navegadores baseados no WebKit (Safari e versões antigas do Chrome) */
        -moz-appearance: none;
    }

    /* para tirar o botão de "mostrar senha" padrão do navegador edge */

    input[type="password"]::-ms-reveal {
        display: none;
    }

    input[type="password"]::-ms-clear { 
        display: none; 
    }
    /* /////////////////////////////////////// */


    input[type="submit"]{
        width: 100%;
        border-radius: 5px;
        transition: all 0.25s ease;
    }


    

    .infos{
        display: flex;
        flex-direction: column;
        gap: 15px;
        width: 100%;
        border-radius: 5px;
        padding: 8px;
        padding-block: 10px;
    }

    hr{
        width: 100%;
    }

    
    .seus-dados {
        padding: 14px;
        width: 480px;
        padding-top: 14px;
        padding-bottom: 14px;
        line-height: 15px;
        margin-top: 15px;
        margin-block: auto;
    }

    
</style>
