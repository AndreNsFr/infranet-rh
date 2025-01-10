<script lang="js">
    import { goto } from "$app/navigation";
    import Cookies from "js-cookie";
    import GetInfo from "$lib/helpers/getInfo.js";
    import CreateStaff from "./CreateStaff.svelte";
    import Funcionarios from "./Funcionarios.svelte";
    import ProfileConfigs from "./ProfileConfigs.svelte";
    import Pesquisar from "./Pesquisar.svelte";
    const getinfo = new GetInfo();

    ///////////////////////////////começo da logica de navegação//////////////////////////////
    let info = {};
    let Primeiro_nome = "";
    let cpf_pessoal = ""
    getinfo
        .Show()
        .then((x) => {
            info = x;
            return info;
        })
        .then((x) => {
            Primeiro_nome = x.nome.split(" ")[0];
            let cpf_nao_formatado =  x.cpf.toString().padStart(11, '0');
            cpf_pessoal = cpf_nao_formatado.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
            
            return Primeiro_nome, cpf_pessoal;
        });
    //para "forçar" o reinicio do componente funcionarios

    let status_update_in_funcionarios = false

    function handleChildEvent(event) {
        status_update_in_funcionarios = event.detail;
    }



    let status_Funcionario = true;
    let status_Profile = false;
    let status_Criar_funcionario = false;

    function mostrar_funcionarios() {
        
        if(!status_update_in_funcionarios){
            funcionarios_nav_status = true
        }else if(status_update_in_funcionarios){
            funcionarios_nav_status = false
        }

        status_Funcionario = true;
        status_Criar_funcionario = false;
        status_Profile = false;
        
        
    }

    function mostrar_configurações_perfil() {

        document.body.style.cursor = "wait"
        setTimeout(()=>{
            document.body.style.cursor = "default"
        }, 3000)
        
        status_Profile = true;
        status_Funcionario = false;
        status_Criar_funcionario = false;
        status_update_in_funcionarios = false
    }

    function mostrar_criar_funcionarios() {
        status_Criar_funcionario = true;
        status_Profile = false;
        status_Funcionario = false;
        status_update_in_funcionarios = false
    }

    function logout() {
        Cookies.remove("token");
        Cookies.remove("refreshToken");
        Cookies.remove("cpf");
        goto("/");
    }
    ///////////////////////////////fim da logica de navegação///////////////////////////////////

    /////////////////////////////começo da logica de mostrar os funcionarios//////////////////////////////
    let funcionarios = [];
    let total_pages = null;
    let pagina_atual = null;

    function pagina({ Num_pagina, nome, cpf, departamento }) {

        

        getinfo.GetAllStaffs().then((staff) => {

            if(Num_pagina === '...'){
                let pagina_desejada = prompt("digite a pagina desejada")
                if(pagina_desejada === null || pagina_desejada.trim() === ''){
                    Num_pagina = 1
                }else{
                    if(isNaN(pagina_desejada) || pagina_desejada <= 0){
                        alert("Por favor, insira um número válido e maior que zero.")
                        Num_pagina = 1
                    }else{
                        Num_pagina = parseInt(pagina_desejada)
                    }
                }
                
            }

            

            funcionarios = staff;
            let pagina_atual_final = Num_pagina * 10;
            let pagina_atual_começo = pagina_atual_final - 10;


            if(Num_pagina > Math.round(funcionarios.length / 10 + 0.4)){
                pagina({ Num_pagina: Math.round(funcionarios.length / 10 + 0.4), nome:nome, cpf:cpf, departamento:departamento })
            }

            if(Num_pagina === 0){
                pagina({ Num_pagina: 1 , nome:nome, cpf:cpf, departamento:departamento })
            }

            if (funcionarios.length >= 10) {
                let pages = Math.round(funcionarios.length / 10 + 0.4);
                total_pages = Array.from({ length: pages }, (_, i) => i + 1);

                //logica de paginação com mais de uma 5 paginas de funcionarios (para não aparecer infinitos botões)
                if(pages >= 5){

                    let primeira_parte_paginacao = null

                    if(Num_pagina === 1){
                        primeira_parte_paginacao = total_pages.slice(0 , 3+Num_pagina-1)
                    }else if (Num_pagina >= 1){
                        primeira_parte_paginacao = total_pages.slice(Num_pagina-2 , 3+Num_pagina-1)
                    }
                    
                    
                    let ultimo_numero_paginacao = parseInt(total_pages.slice(-1))
                   

                    let array_paginação = []

                    primeira_parte_paginacao.forEach(numero_pagina => {
                        array_paginação[numero_pagina-1] = numero_pagina 
                    });

                   
                    let filtrado = array_paginação.filter((numeros)=>{
                        return numeros !== null && numeros !== undefined
                    })

                    let array_final = filtrado

                    array_final[3] = '...'
                    array_final[4] = ultimo_numero_paginacao
                   

                    total_pages = array_final

                }

            }

            let show_only = funcionarios.slice(
                pagina_atual_começo,
                pagina_atual_final,
            );

            if (cpf) {
                let filter_by_cpf = funcionarios.filter((funcionario) => {
                    return funcionario.cpf === cpf;
                });
                if (filter_by_cpf.length !== 0) {
                    show_only = filter_by_cpf;
                } else {
                    alert("funcionário não encontrado");
                }
            }

            if (nome) {
                let filter_by_name = funcionarios.filter((funcionario) => {
                    return funcionario.nome == nome;
                });
                if (filter_by_name.length !== 0) {
                    show_only = filter_by_name;
                } else {
                    alert("funcionário não encontrado");
                }
            }

            if (departamento) {
                let filter_by_departamento = funcionarios.filter(
                    (funcionario) => {
                        return funcionario.departamento === departamento;
                    },
                );
                if (filter_by_departamento.length !== 0) {
                    if (filter_by_departamento.length >= 10) {
                        let pages = Math.round(filter_by_departamento.length / 10 + 0.4,);
                        if(pages >= 5){
                            let primeira_parte_paginacao = null

                            if(Num_pagina === 1){
                                primeira_parte_paginacao = total_pages.slice(0,3+Num_pagina-1)
                            }else if (Num_pagina >= 1){
                                primeira_parte_paginacao = total_pages.slice(Num_pagina-2,3+Num_pagina-1)
                            }
                            
                            
                            
                            let ultimo_numero_paginacao = parseInt(total_pages.slice(-1))

                            

                            let array = []

                            primeira_parte_paginacao.forEach(numero_pagina => {
                                array[numero_pagina-1] = numero_pagina 
                            });

                        
                            let filtrado = array.filter((numeros)=>{
                                return numeros !== null && numeros !== undefined
                            })

                            let array_final = filtrado

                            array_final[3] = '...'
                            array_final[4] = ultimo_numero_paginacao
                        
                            total_pages = array_final
                        }
                        total_pages = Array.from(
                            { length: pages },
                            (_, i) => i + 1,
                        );
                    }
                    show_only = filter_by_departamento.slice(
                        pagina_atual_começo,
                        pagina_atual_final,
                    );
                } else {
                    alert("funcionário não encontrado");
                }
            }
            // transforma o cpf que é apenas um numero de 11 digitos para a padronização correta do cpf
            show_only.map(funcionario => funcionario.cpf = funcionario.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') )
            show_only.map(funcionario => funcionario.telefone = funcionario.telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3'))

            return (funcionarios = show_only), total_pages;

        });
        
        return funcionarios, total_pages, pagina_atual = Num_pagina;
    }

    pagina({ Num_pagina: 1 });

    
    /////////////////////////////fim da logica de mostrar os funcionarios////////////////////////////////
    /////////////////////////////Começo da logica de pesquisar/filtrar funcionarios//////////////////////

    let valor_de_pesquisa = false;

    function pesquisar(event) {
        event.preventDefault();

        let valor_de_pesquisa_sujo = document.getElementById("pesquisa").value;
        valor_de_pesquisa = valor_de_pesquisa_sujo.trim()

        let cpf = document.getElementById("pesquisar_por_cpf").checked
        let nome = document.getElementById("pesquisa_por_nome").checked
        let departamento = document.getElementById("pesquisa_por_departamento").checked



        if (cpf) {
            pagina({ Num_pagina: 1, cpf: valor_de_pesquisa });
            return valor_de_pesquisa;
        }
        if (nome) {
            pagina({ Num_pagina: 1, nome: valor_de_pesquisa });
            return valor_de_pesquisa;
        }
        if (departamento) {
            pagina({ Num_pagina: 1, departamento: valor_de_pesquisa });
            return valor_de_pesquisa;
        }
        
    }
    /////////////////////////////fim da logica de pesquisar/filtrar funcionarios/////////////////////////
    
    
    let funcionarios_nav_status = true; // serve para ocutar a barra de pesquisa e de navegação de paginas quando entra na pagina para atualizar informações de um funcionario
</script>

<main>
    <aside>
        <nav>

            <div class="bem-vindo">
                <img src={info.imagem} width="180px"style="border-radius: 99999px; display:block ;margin:auto;" alt="">
                <h3>{info.nome}</h3>
                <span>{cpf_pessoal}</span>
            </div>

            <div class="botoes">
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <div class="navigation" on:click={mostrar_funcionarios}> 
                    <img src="todos_funcionarios.png" width="15%" alt="" >
                    <button> Funcionários</button>
                </div>
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <div class="navigation" on:click={mostrar_configurações_perfil}>
                    <img src="engrenagem.png" width="15%" alt="">
                    <button>Configurações de Perfil</button>
                </div>
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <div class="navigation"on:click={mostrar_criar_funcionarios}>
                    <img src="adicionar-funcionario.png"  width="15%" alt="">
                    <button>Criar funcionários</button>
                </div>

                <hr class="barra-navegação">

                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <div class="navigation" on:click={logout} >
                    <img src="logout.png" width="15%" alt="">
                    <button>logout</button>
                </div>
            </div>
            
            
            <div class="made"> 
                <hr class="barra-credito">
                <a href="https://github.com/AndreNsFr" target="_blank">Made by André do Nascimento Ferreira.</a>
                
            </div>
        </nav>

    </aside>

    <section>
        {#if status_Funcionario}
            {#if funcionarios_nav_status}
                <Pesquisar {pesquisar} limpar={
                        () => {
                            pagina({Num_pagina: 1})
                            valor_de_pesquisa = false
                        }
                    }>
                </Pesquisar>
            {/if}
            <!-- nav_status serve para tirar a barra de pesquisa e a quantidade de paginas, e tambem para colocar devolta quando voltar para a pagina padrão -->
            <Funcionarios
                {funcionarios}
                nav_status={() => {
                    if (funcionarios_nav_status === true) {
                        return (funcionarios_nav_status = false);
                    } else if (funcionarios_nav_status === false) {
                        return (funcionarios_nav_status = true);
                    }
                    }}
                
                
                status_first_part = {funcionarios_nav_status}

                on:customEvent={handleChildEvent}

            ></Funcionarios>

            {#if funcionarios_nav_status}
                <div class="numpages">
                    <button on:click={pagina({Num_pagina:pagina_atual - 1})} ><img src="seta-esquerda.png" width="10px" alt=""> anterior</button>
                    {#if total_pages}
                        {#each total_pages as page}
                            <!-- o departamento esta declarado para navegar pelas paginas dos funcionarios filtrados pelo departamento, sem isso só parece a primeira pagina -->
                            <button on:click={pagina({Num_pagina: page, departamento:valor_de_pesquisa})} > {page} </button>
                        {/each}
                    {/if}
                    <button on:click={pagina({Num_pagina:pagina_atual + 1})} >seguinte <img src="seta-direita.png" width="10px" alt=""></button>
                </div>
            {/if}
        {/if}
        {#if status_Profile}
            <ProfileConfigs></ProfileConfigs>
        {/if}
        {#if status_Criar_funcionario}
            <CreateStaff></CreateStaff>
        {/if}
    </section>
</main>

<style>
    main {
        background-color: #f4f4f4;
        display: flex;
        min-height: 100vh;
    }

    aside{
        display: flex;
        
        flex-direction: column;
        align-items: center;
        background-color: #f4f4f4;
        width: 260px;
        border-right: solid 1px rgba(0, 0, 0, 0.199);
        left: 0px;
        
    }

    nav{
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: left;
        align-items: start;
        position: fixed;
        gap: 15px;
    }
    

    .bem-vindo{
        margin-top: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-inline: auto;
        gap: 13px;
        letter-spacing:0.90px;
    }


    .bem-vindo > h3{
        text-align: center;
        font-weight: 100;
        color: rgb(31, 31, 31);
    }

    .bem-vindo > span {
        color: rgb(51, 51, 51);
    }

    .bem-vindo > img {
        height: 180px;
    }

    .botoes{
    
        display: flex;
        flex-direction: column;
        gap: 15px;
    }



    .navigation{
        width: 83%;
        display: flex;

        align-items: center;
        margin: auto;
        border-radius: 5px;
        height: 40px;
        padding: 8px;
        gap: 7px;
        transition: all 0.25s ease;
        button{
            transition: all 0.25s ease;
        }
        img{
            transition: all 0.25s ease;
        }
    }


    .navigation:hover:last-child{
        background-color:  rgb(212, 24, 24);
        color: white;
        cursor: pointer;
        button{
            color: white;
            cursor: pointer;
            
            background-color:rgb(212, 24, 24);
        }
        img{
            cursor: pointer;
            
            filter: invert(1);
        }
    }



    .navigation:hover{
        
        background-color:  rgb(24, 128, 212);
        color: white;
        cursor: pointer;
        button{
            color: white;
            cursor: pointer;
            
            background-color:rgb(24, 128, 212);
        }
        img{
            cursor: pointer;
            
            filter: invert(1);
        }
    }

    .navigation > button {
        border: none;
        background-color:#f4f4f4;
        letter-spacing:0.90px;
        font-weight: 600;
        font-size: 10pt;
        color: rgb(51, 51, 51);
        text-align: start;
    }

    .barra-navegação{
        width: 90%; 
        height: 1px; 
        border: none; 
        background-color: #d4d7dd; 
        margin-inline:auto;
    }

    .barra-credito{
        margin-bottom: 25px;
        width: 100%; 
        height: 1px; 
        border: none; 
        background-color: #d4d7dd; 
        margin: 1.5rem 1.5;
    }

    .made{
        margin-top: auto ;
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
        width: 100%;
        text-align: center;
    }

    .made > a {
        text-decoration: none;
        margin: 0;
        padding-inline: 8px;
        font-size: 9pt;
        color: #000000d2;
        letter-spacing:0.90px;
    }

    

    section {
        
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
        width: 100%;
        margin: 15px;
    }


    .numpages {
        display: flex;
        gap: 10px;
    }

    .numpages > button{
        border: none;
        background-color: #f4f4f4;
        letter-spacing:0.90px;
        font-weight: 600;
        font-size: 11pt;
        color: rgb(51, 51, 51);
        text-align: start;
        padding: 14px;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 4px;
        transition:0.25s ease;
        img{
            transition: 0.25s ease;
        }
    }


    .numpages > button:hover{
        color: white;
        background-color: rgb(24, 128, 212);
       img{
            filter: invert(1);
        }
            
    }

</style>