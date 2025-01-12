<script>
    import { onMount } from "svelte";
    import GetInfo from "$lib/helpers/getInfo.js";
    import '../../app.css'

    const getInfo = new GetInfo();



    function formatarCpf(){
        let campo = document.getElementById("cpf");
        let valor = campo.value

        valor = valor.replace(/[^0-9.-]/g, '');

        valor = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')

        campo.value = valor

    }



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



    function create(event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value.trim()
        const senha = document.getElementById("senha").value.trim()
        const departamento = document.getElementById("departamento").value.trim()
        const cpf = document.getElementById("cpf").value
        const telefone = document.getElementById("telefone").value.trim()
        const email = document.getElementById("email").value.trim()
        const data = document.getElementById("data-nas").value
        const [ano, mes, dia] = data.split("-");
        let data_nas = `${dia} / ${mes} / ${ano}`;
        const imagem = document.getElementById("imagem").files[0];

        if(/(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/.test(cpf)){
            getInfo
                .CreateStaff(
                    nome,
                    senha,
                    departamento,
                    cpf,
                    telefone,
                    email,
                    data_nas,
                    imagem,
                ).then()
        }else {
            alert("Cpf fora do padrão. por favor verificar.")
            document.getElementById("cpf").value = null
        }

    }

    let file = null; // Armazena o arquivo selecionado
    let previewUrl = null; // Armazena o URL para a pré-visualização
    
    function handleFileChange(event) {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            file = selectedFile;
            previewUrl = URL.createObjectURL(selectedFile); // Gera um URL para a visualização
        }
    }



</script>




<div class="container-create">
    <div class="create">

        <h1 class="titulo">Criar novo funcionário</h1>
    
        <br>
        
        
        <form class="max-w-md mx-auto" on:submit={create}>
            <div class="relative z-0 w-full mb-5 group">
                <input type="text" name="nome" id="nome" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="nome" class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nome completo</label>
            </div>
        
            <div class="relative z-0 w-full mb-5 group">
                <input type="password" minlength="8" name="senha" id="senha" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="senha" class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Senha</label>
            </div>
        
            <div class="relative z-0 w-full mb-5 group">
                <input type="text" name="departamento" id="departamento" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="departamento" class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Departamento</label>
            </div>
        
            <div class="relative z-0 w-full mb-5 group">
                <input type="text" name="cpf" minlength="11" maxlength="11" on:input={formatarCpf} id="cpf" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="cpf" class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">CPF</label>
            </div>
        
            <div class="relative z-0 w-full mb-5 group">
                <input type="tel" name="telefone" maxlength="15" id="telefone" on:input={formatarTelefone}  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="telefone" id="label-telefone" class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Telefone</label>
            </div>
        
            <div class="relative z-0 w-full mb-5 group">
                <input type="email" name="email" id="email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="email" class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
            </div>
        
            <div class="relative z-0 w-full mb-5 group">
                <input type="date" name="data-nas" id="data-nas" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="data-nas" class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Data de nascimento</label>
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
                        accept=".jpg, .png , .jpeg"
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

    



<style>

    .container-create{
        letter-spacing:0.90px;
    }

    .container-create{
        display: flex; 
        align-items: center; 
        justify-content: center; 
        height: 100%;
    }

    .create{
        background-color: rgba(255, 255, 255, 0.712);
        box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.301);
        border: 1px solid rgba(151, 151, 151, 0.76);
        padding: 5px;
        width: 500px;
        padding-top: 14px;
        padding-bottom: 14px;
        border-radius: 5px;
        margin-top: 15px;
    }

    .titulo{
        font-size: 18pt;
        color: rgba(0, 0, 0, 0.753);
        text-indent: 1em;
    }

    input[type="submit"]{
        width: 100%;
        border-radius: 5px;
        transition: all 0.25s ease;
    }


    .visualização{
        width: 300px;
        height: 300px;
        border-radius: 9000px;
    }
    
    @media screen and (max-height: 900px){
        .container-create{
            height: auto;
        }
    }


</style>
