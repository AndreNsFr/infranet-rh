<script>
    import GetInfo from "$lib/helpers/getInfo.js";
    import UpdateInfo from "./UpdateInfo.svelte";
    import { createEventDispatcher } from 'svelte';

    const getinfo = new GetInfo();

    export let funcionarios;

    export let nav_status;

    const dispatch = createEventDispatcher();
   

    let staffs = true;
    let update_specific_data = false;
    let specific_data = {};

    function editar(data) {
        nav_status();
        dispatch("customEvent", true);
        specific_data = data;
        update_specific_data = true;
        staffs = false;
        return specific_data;
    }

    function copiar(id){

        let texto_a_ser_copiado = document.getElementById(id).innerText

        navigator.clipboard.writeText(texto_a_ser_copiado).then(()=>{
            alert("texto copiado")
        }).catch((error)=>{
            console.log("erro ao copiar:", error)
        })

    }


</script>


    {#if staffs}
        <div class="grid-staff">
            {#each funcionarios as funcionario}
                <div class="staff">
                    <img src={funcionario.imagem} alt="" />
                    
                    <div class="info-staff">
                        <div class="flex" style="gap: 5px;justify-content: space-between; cursor:pointer;"> 
                            <label style="letter-spacing:0.90px; " for="nome">Nome:</label>   
                            <h4 id="nome" style="text-align: right;" class="truncate max-w-full"  on:dblclick={copiar("nome")}>{funcionario.nome}</h4>
                        </div>
                        <hr>
                        <div class="flex" style="gap: 5px; justify-content: space-between; overflow: hidden;"> 
                            <label style="letter-spacing:0.90px;" for="departamento">Departamento:</label>   
                            <span id="departamento" class="truncate max-w-full" >{funcionario.departamento}</span>
                        </div>
                        <hr>
                        <!-- svelte-ignore a11y_no_static_element_interactions -->
                        <div class="flex" style="gap: 5px; justify-content: space-between; cursor:pointer;" on:dblclick={copiar("email")} >
                            <label for="email" style="letter-spacing:0.90px;">Email:</label>
                            <span id="email" class="truncate max-w-full" >{funcionario.email}</span>
                        </div>
                        <hr>
                        <div class="flex" style="gap: 5px; justify-content: space-between; cursor:pointer;"> 
                            <label style="letter-spacing:0.90px;" for="cpf">Cpf: </label>   
                            <!-- svelte-ignore a11y_no_static_element_interactions -->
                            <span id="cpf"  on:dblclick={copiar("cpf")} >{funcionario.cpf}</span>
                        </div>
                        <hr>
                        <div class="flex" style="gap: 5px; justify-content: space-between; cursor:pointer;"> 
                            <label style="letter-spacing:0.90px;" for="telefone">N° de celular:</label>   
                            <!-- svelte-ignore a11y_no_static_element_interactions -->
                            <span id="telefone" class="truncate max-w-full"  on:dblclick={copiar("telefone")}>{funcionario.telefone}</span>
                        </div>
                    
                        
                        
                    </div>

                    <button
                        cpf={funcionario.cpf}
                        id="update"
                        on:click={editar(funcionario)}>Editar</button
                    >
                </div>
            {/each}
        </div>
    {/if}

    {#if update_specific_data}
        <UpdateInfo
            {specific_data}
            voltar={() => {
                update_specific_data = false;
                staffs = true;
                dispatch("customEvent", false);
                nav_status();
            }}
        ></UpdateInfo>
    {/if}


<style>
    .grid-staff {
        display: grid;
        place-items: center;
        height: 100%;
        gap: 20px;
        grid-template-columns: repeat(5, 1fr);
        box-sizing: border-box;
    }

    .staff {
        border: 1px solid rgba(151, 151, 151, 0.76);
        margin-top: 15px;
        background-color: rgba(255, 255, 255, 0.712);
        display: flex;
        flex-direction: column;
        gap: 15px;
        padding: 5px;
        padding-top: 14px;
        padding-bottom: 6px;
        width: 300px;
        box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.301);
        justify-content: center;
        align-items: center;
        border-radius: 5px;
    }

    .staff > img {
        display: block;
        width: 200px;
        height: 200px;
        border-radius: 5px;
    }

    .staff > button {
        background-color:#407cf4;
        color: white;
        padding: 5px;
        padding-inline: 18px;
        border-radius: 5px;
        cursor: pointer;
        width: 100%;
        letter-spacing:0.90px;
        font-weight: 600;
        transition: all 0.25s ease;
    }

    .staff > button:hover {
        box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.178);
        background-color: #2464ec;
    }



    .info-staff{
        display: flex;
        flex-direction: column;
        gap: 15px;
        width: 100%;
        border-radius: 5px;
        padding: 8px;
        padding-block: 10px;
    }

    @media screen and (max-width: 1650px) {
        .grid-staff {
            grid-template-columns: repeat(2, 1fr);
            gap: 50px;
        }
    }

    @media screen and (max-width: 1200px) {
        .grid-staff {
            display: grid;
            place-items: center;
            height: 100%;
            gap: 15px;
            grid-template-columns: repeat(2, 1fr);
            box-sizing: border-box;
        }
    }
    @media screen and (max-width: 890px) {
        .grid-staff {
            display: grid;
            place-items: center;
            height: 100%;
            gap: 15px;
            grid-template-columns: repeat(1, 1fr);
            box-sizing: border-box;
        }
    }
</style>
