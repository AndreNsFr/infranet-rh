<script>
    import GetInfo from "$lib/helpers/getInfo.js";
    import '../../app.css'
    const getInfo = new GetInfo();

    // uso de props

    export let specific_data;
    export let voltar;

    let staff_data = specific_data;


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






    function DeleteStaffs() {

        let cpf = specific_data.cpf

        let confirmar = confirm(
            "Este funcionario será excluido permanentimente, tem certeza disto?",
        );

        if (confirmar) {
            getInfo
                .VerifyActions()
                .then((response) => {
                    if (response) {
                        getInfo
                            .DeleteStaff(cpf)
                            .then(alert("funcionario removido com sucesso"));
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    function sendNewData(event) {
        event.preventDefault();

        
        let cpf = specific_data.cpf
        let nome = document.getElementById("nome").value;
        let email = document.getElementById("email").value;
        let departamento = document.getElementById("departamento").value;
        let telefone = document.getElementById("telefone").value
        let imagem = document.getElementById("imagem").files[0];
        
        getInfo
        .VerifyActions().then((Response) => {
            if (Response) {
                    document.getElementById("Loading-Cursor").style.display = "block"                
                    getInfo.UpdateInfo(cpf, nome.trim(), email.trim(), telefone.trim(), imagem,"",departamento.trim()).then(()=>{
                        document.getElementById("Loading-Cursor").style.display = "none"
                        alert("Informações do funcionário atualizadas com sucesso.")
                    });
                }
            })
            .catch((erro) => {
                console.error(erro);
            });
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


<div id="Loading-Cursor"></div>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="voltar" on:click={voltar()} ><img src="seta-esquerda.png" width="12px" style="height: 12px; margin-block: auto;"  alt="">voltar</div>



<div class="configurações" >
    <div class="container-config">

        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="delete" on:click={DeleteStaffs()}><img src="lixo.png" alt=""></div>
        <h1 class="titulo">Alterar dados do funcionário</h1>
        <div class="seus-dados">
            <img
                src={specific_data.imagem}
                width="300px"
                
                alt="imagem-pessoal"
                style="border-radius: 900px; height: 300px; margin: auto; margin-block: 40px"/>
            <div class="infos">
                <div class="flex" style="gap: 5px;justify-content: space-between;"> 
                    <label style="letter-spacing:0.90px; " for="nome-info">Nome:</label>   
                    <h4 id="nome-info" style="text-align: right;" class="truncate max-w-full"  on:dblclick={copiar("nome")}>{specific_data.nome}</h4>
                </div>
                <hr >
                <div class="flex" style="gap: 5px; justify-content: space-between; overflow: hidden;"> 
                    <label style="letter-spacing:0.90px;" for="departamento-info">Departamento:</label>   
                    <span id="departamento-info" >{specific_data.departamento}</span>
                </div>
                <hr>
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <div class="flex" style="gap: 5px; justify-content: space-between;" on:dblclick={copiar("email")} >
                    <label for="email-info" style="letter-spacing:0.90px;">Email:</label>
                    <span id="email-info" class="truncate max-w-full" >{specific_data.email}</span>
                </div>
                <hr>
                <div class="flex" style="gap: 5px; justify-content: space-between;"> 
                    <label style="letter-spacing:0.90px;" for="cpf-info">Cpf: </label>   
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <span id="cpf-info" >{specific_data.cpf}</span>
                </div>
                <hr>
                <div class="flex" style="gap: 5px; justify-content: space-between;"> 
                    <label style="letter-spacing:0.90px;" for="telefone-info">N° de celular:</label>   
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <span id="telefone-info" class="truncate max-w-full"  >{specific_data.telefone}</span>
                </div>
                <hr>
                <div class="flex" style="gap: 5px; justify-content: space-between;"> 
                    <label style="letter-spacing:0.90px;" for="data-info">Data de nascimento:</label>   
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <span id="data-info" class="truncate max-w-full"  >{specific_data.data}</span>
                </div>
            </div>
    
        </div>
    
        
    
        <div class="form-configs">
            
            <form class="max-w-md mx-auto" on:submit={sendNewData} >
                <div class="relative z-0 w-full mb-5 group">
                    <input type="text" name="nome" id="nome" value={specific_data.nome} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label for="nome" class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nome completo</label>
                </div>

            
               
                <div class="relative z-0 w-full mb-5 group">
                    <input type="text" name="departamento" id="departamento" value={specific_data.departamento} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label for="departamento" class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Departamento</label>
                </div>
            
                
            
                <div class="relative z-0 w-full mb-5 group">
                    <input type="tel" name="telefone" id="telefone" maxlength="15" on:input={formatarTelefone} value={specific_data.telefone} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label for="telefone" id="label-telefone" class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Telefone</label>
                </div>
            
                <div class="relative z-0 w-full mb-5 group">
                    <input type="email" name="email" value={specific_data.email} id="email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
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

    #Loading-Cursor{
        width: 100%;
        height: 100%;
        display: none;
        position: absolute;
        cursor: wait;
        z-index: 50;
    }

    .configurações {
        display: flex;
        height: 100%;
        width: 90%;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    .voltar{
        display: flex;
        padding: 8px;
        border-radius: 5px; 
        z-index: 5;
        position: fixed; 
        gap: 5px;
        font-weight: 600;
        color: rgb(51, 51, 51);
        letter-spacing: 0.90px;
        font-size: 13pt;
        right: 4%; 
        top:4%; 
        cursor:pointer;
        transition: all 0.25s ease;
        img{
            transition: all 0.25s ease;            
        }
    }

    .voltar:hover{
        background-color: rgb(24, 128, 212);
        color: white;
        img{
            filter: invert(1);
        }
    }
    
    .delete{
        width: 58px; 
        height: 58px;
        padding: 8px;
        border-radius: 5px; 
        position: absolute; 
        cursor:pointer;
        transition: all 0.25s ease;
        img{
            transition: all 0.25s ease;
        }
    }
    
    .delete:hover{
        background-color: rgb(212, 24, 24);
        img{
            filter: invert(1);
        }
    }
    
    
        .titulo{
            position: absolute;
            font-size: 18pt;
            letter-spacing: 0.90px;
            left: 35%;
            color: rgba(0, 0, 0, 0.753);
        }


    .container-config{
        display: flex;
        background-color: rgba(255, 255, 255, 0.712);
        box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.301);
        border: 1px solid rgba(151, 151, 151, 0.76);
        border-radius: 5px;
        padding: 30px;
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
