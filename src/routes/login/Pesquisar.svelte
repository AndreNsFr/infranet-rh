
<script>
    export let pesquisar
    import '../../app.css'
    export let limpar


    function Limpar(){
        limpar()
        document.getElementById("pesquisa").value = null
        document.getElementById("btn-limpar").style.display = "none"
    }

    function mostrar_o_x(){
        document.getElementById("btn-limpar").style.display = "block"
    }

    function nome(){
        document.getElementById("pesquisa_por_nome").checked = true
        
    }

    function cpf(){
        document.getElementById("pesquisar_por_cpf").checked = true
    }
    
    function departamento(){
        document.getElementById("pesquisa_por_departamento").checked = true
    }

</script>

<slot />

<form class="max-w-4xl mx-auto tamanho" on:submit={pesquisar}>
    <div class="flex relative">
        <label for="search-dropdown" class="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
        <!-- Botão Dropdown -->
        <button id="dropdown-button" class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-800 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300" style="letter-spacing:0.90px;" type="button">
            Filtrar por
            <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
            </svg>
        </button>
        <!-- Dropdown -->
        <div id="dropdown" class="absolute top-full left-0 z-10 hidden bg-white divide-y divide-gray-200 rounded-lg shadow w-44">
            <ul class="py-2 text-sm text-gray-800">
                <li class="flex items-center px-4 py-2 hover:bg-gray-100">
                    <input type="radio" name="tipo_pesquisa" id="pesquisa_por_nome" class="mr-2" checked >
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
                    <label for="pesquisa_por_nome" class="w-full cursor-pointer"  style="letter-spacing:0.90px;" on:click={nome}> Nome</label>
                </li>
                <li class="flex items-center px-4 py-2 hover:bg-gray-100">
                    <input type="radio" name="tipo_pesquisa" id="pesquisar_por_cpf" class="mr-2" >
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
                    <label for="pesquisar_por_cpf" class="w-full cursor-pointer"  style="letter-spacing:0.90px;" on:click={cpf}> Cpf</label>
                </li>
                <li class="flex items-center px-4 py-2 hover:bg-gray-100">
                    <input type="radio" name="tipo_pesquisa" id="pesquisa_por_departamento" class="mr-2">
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
                    <label for="pesquisa_por_departamento" class="w-full cursor-pointer"  style="letter-spacing:0.90px;" on:click={departamento} > Departamento</label>
                </li>
            </ul>
        </div>
        <!-- Input de Pesquisa -->
        <div class="relative w-full">
            <input type="search" id="pesquisa" class="block p-2.5 w-full z-20 text-sm text-gray-800 bg-white rounded-e-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500" placeholder="Pesquisar funcionário..." on:input={mostrar_o_x} required />
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
            <img src="x.png" class="limpar-icon" id="btn-limpar" width="15px" on:click={Limpar} alt="">
            <button type="submit" class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-600 rounded-e-lg border border-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300" >
                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
                <span class="sr-only">Search</span>
            </button>
        </div>
    </div>
    
    
   
</form>



<style>

#dropdown {
  display: none;
}

#dropdown-button:focus + #dropdown,
#dropdown-button:hover + #dropdown {
  display: block; 
}

#dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 10;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

#dropdown:hover{
    display: block;
}

.limpar-icon{
    position: absolute;
    top: 34%; 
    right: 48px;
    filter: opacity(0.5);
    cursor: pointer;
}

.tamanho {
    width: 1000px;
}


</style>