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
    getinfo
        .Show()
        .then((x) => {
            info = x;
            return info;
        })
        .then((x) => {
            Primeiro_nome = x.nome.split(" ")[0];
            return Primeiro_nome;
        });

    let status_Funcionario = true;
    let status_Profile = false;
    let status_Criar_funcionario = false;

    function mostrar_funcionarios() {
        status_Funcionario = true;
        status_Criar_funcionario = false;
        status_Profile = false;
    }

    function mostrar_configurações_perfil() {
        status_Profile = true;
        status_Funcionario = false;
        status_Criar_funcionario = false;
    }

    function mostrar_criar_funcionarios() {
        status_Criar_funcionario = true;
        status_Profile = false;
        status_Funcionario = false;
    }

    function loggout() {
        Cookies.remove("token");
        Cookies.remove("refreshToken");
        Cookies.remove("cpf");
        goto("/");
    }
    ///////////////////////////////fim da logica de navegação///////////////////////////////////

    /////////////////////////////começo da logica de mostrar os funcionarios//////////////////////////////
    let funcionarios = [];
    let total_pages = null;

    function pagina({ Num_pagina, nome, cpf, departamento }) {
        getinfo.GetAllStaffs().then((staff) => {
            funcionarios = staff;
            let pagina_atual_final = Num_pagina * 10;
            let pagina_atual_começo = pagina_atual_final - 10;

            if (funcionarios.length >= 10) {
                let pages = Math.round(funcionarios.length / 10 + 0.4);
                total_pages = Array.from({ length: pages }, (_, i) => i + 1);
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
                        let pages = Math.round(
                            filter_by_departamento.length / 10 + 0.4,
                        );
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

            return (funcionarios = show_only), total_pages;
        });
        return funcionarios, total_pages;
    }

    pagina({ Num_pagina: 1 });
    /////////////////////////////fim da logica de mostrar os funcionarios////////////////////////////////
    
    /////////////////////////////Começo da logica de pesquisar/filtrar funcionarios//////////////////////

    let valor_de_pesquisa = false;

    function pesquisar(event) {
        event.preventDefault();

        valor_de_pesquisa = document.getElementById("pesquisa").value;

        let cpf = document.getElementById("pesquisar_por_cpf").checked
        let nome = document.getElementById("pesquisa_por_nome").checked
        let departamento = document.getElementById("pesquisa_por_departamento").checked

        if (cpf) {
            pagina({ Num_pagina: 1, cpf: valor_de_pesquisa });
        }
        if (nome) {
            pagina({ Num_pagina: 1, nome: valor_de_pesquisa });
        }
        if (departamento) {
            pagina({ Num_pagina: 1, departamento: valor_de_pesquisa });
        }
        return valor_de_pesquisa;
    }
    /////////////////////////////fim da logica de pesquisar/filtrar funcionarios/////////////////////////
    
    
    let funcionarios_nav_status = true; // serve para ocutar a barra de pesquisa e de navegação de paginas quando entra na pagina para atualizar informações de um funcionario
</script>

<main>
    <aside>
        <nav>
            <h3>
                seja bem vindo {Primeiro_nome}
            </h3>
    
            <button on:click={mostrar_funcionarios}>Funcionarios</button> <br />
            <button on:click={mostrar_configurações_perfil}
                >Configurações de Perfil</button
            ><br />
            <button on:click={mostrar_criar_funcionarios}>Criar funcionarios</button
            ><br />
            <button on:click={loggout}>loggout</button>
        </nav>
    </aside>

    <section>
        {#if status_Funcionario}
            {#if funcionarios_nav_status}
                <Pesquisar {pesquisar} limpar={()=>{
                    pagina({Num_pagina: 1})
                }}></Pesquisar>
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
            ></Funcionarios>

            {#if funcionarios_nav_status}
                <div class="numpages">
                    {#if total_pages}
                        {#each total_pages as page}
                            <!-- o departamento esta declarado para navegar pelas paginas dos funcionarios filtrados pelo departamento, sem isso só parece a primeira pagina -->
                            <button on:click={pagina({Num_pagina: page, departamento:valor_de_pesquisa})}>
                                {page}
                            </button>
                        {/each}
                    {/if}
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
        background-color: rgb(0, 255, 13);
        display: flex;
        min-height: 100vh;
    }

    aside{
        display: flex;
        
        flex-direction: column;
        align-items: center;
        background-color: white;
        width: 260px;
        
        left: 0px;
        
    }

    nav{
        display: flex;
        flex-direction: column;
        position: fixed;
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
        background-color: rgb(0, 140, 255);
        width: 90%;
        box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.452);
        display: flex;
        border-radius: 200px;
        justify-content: space-around;
        margin-top: 15px;
        padding: 15px;
    }
</style>
