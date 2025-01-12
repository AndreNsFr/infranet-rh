import Cookies from "js-cookie";
import { goto } from "$app/navigation";




class GetInfo {

    constructor() {
        this.info = null
        this.token = Cookies.get("token")
        this.refreshToken = Cookies.get("refreshToken")
    }

    Login(email, cpf, senha) {
        fetch("https://api-rest-sistema-de-gerenciament-production.up.railway.app/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email, cpf: cpf, senha: senha }),
        })
            .then((response) => response.json())
            .then((data) => {

                if(data.erro){
                    alert(data.erro)
                }

                const { token, refreshToken, status } = data;
                if (status === true) {

                    this.#delete_cookies()

                    this.#create_cookies(token, refreshToken, cpf)

                    goto("login");

                }

            })

            .catch((error) => {
                console.error("Erro na requisição:", error);
                alert("Erro ao conectar ao servidor.");
            });
    }

    #create_cookies(token, refreshToken, cpf) {

        Cookies.set("token", token, { expires: 40 / (24 * 60), path: "/" })
        Cookies.set("refreshToken", refreshToken, { expires: 70 / (24 * 60), path: "/" })

        if (cpf) {
            Cookies.set("cpf", cpf, { expires: 70 / (24 * 60), path: "/" });
        }

    }

    #delete_cookies() {
        Cookies.remove("token")
        Cookies.remove("refreshToken")
        Cookies.remove("cpf")
    }

    #redirect() {
        goto('/')
    }

    async  #Get(cpf) {
        await fetch(`https://api-rest-sistema-de-gerenciament-production.up.railway.app/funcionarios/?cpf=${cpf}`, {
            headers: { "Content-Type": "application/json", "Authorization": this.token, "refresh_token": this.refreshToken }
        }).then(response => {

            if (response.status === 405) {
                alert("sessão expirada.")
                this.#redirect()
            }

            const token = response.headers.get("token");
            const refreshToken = response.headers.get("refreshToken");

            if (token !== null && refreshToken !== null) {
                this.#create_cookies(token, refreshToken)
                return response.json();
            }


            return response.json();
        }).then(response => {

            
            if (response) {


                const { nome, departamento, email, cpf, imagem, data, telefone, erro } = response


                if (erro) {
                    throw new Error('usuario não encotrado')
                }


                return this.info = { nome: nome, departamento: departamento, email: email, cpf: cpf, telefone: telefone, imagem: imagem, data: data };
            } else {
                alert('usuario não encontrado')
            }
        })
        return this.info
    }

    // mostra os dados de quem esta logado no momento
    async Show() {
        const cpf = Cookies.get('cpf')

        await this.#Get(cpf).then((data) => {
            return this.info = data
        })

        return this.info

    }

    async GetAllStaffs() {


        await fetch("https://api-rest-sistema-de-gerenciament-production.up.railway.app/staff", {
            headers: { "Content-Type": "application/json", "Authorization": this.token, "refresh_token": this.refreshToken }
        }).then((response) => {


            if (response.status === 405) {
                alert("sessão expirada.")
                this.#redirect()
            }

            const token = response.headers.get("token");
            const refreshToken = response.headers.get("refreshToken");

            if (token !== null && refreshToken !== null) {
                this.#create_cookies(token, refreshToken)
                return response.json();
            }

            return response.json();

        }).then((response) => {            


            return this.info = response

        }).catch((error) => { console.log(error) })

        return this.info
    }


    async toBase64(imagem) {
        if (!imagem) {
            return "";
        }

        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();

            fileReader.onload = () => {
                resolve(fileReader.result); // Resolve com o resultado Base64
            };

            fileReader.onerror = (error) => {
                reject(error); // Rejeita caso ocorra algum erro
            };

            fileReader.readAsDataURL(imagem); // Lê a imagem como DataURL
        });
    }


    async UpdateInfo(cpf, nome, email, telefone, imagem, senha, departamento) {


        const imagem64 = await this.toBase64(imagem)


        let NewData = {
            nome: nome,
            email: email,
            imagem: imagem64,
            telefone:telefone,
            senha: senha,
            departamento: departamento
        }

        let sanitized_data = {}

        for (let info in NewData) {
            if (NewData[info] !== "") {
                sanitized_data[info] = NewData[info]
            }
        }



        try {
            await fetch(`https://api-rest-sistema-de-gerenciament-production.up.railway.app/funcionarios/?cpf=${cpf}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", "Authorization": this.token, "refresh_token": this.refreshToken },
                body: JSON.stringify(sanitized_data)
            }).then((response) => {

                if (response.status === 405) {
                    alert("sessão expirada.")
                    this.#redirect()
                }

                const token = response.headers.get("token");
                const refreshToken = response.headers.get("refreshToken");

                if (token !== null && refreshToken !== null) {
                    this.#create_cookies(token, refreshToken)
                    return response.json();
                }

                return response.json()
            }).then((data_retornada) => {

                alert(data_retornada.status)

                
            }).catch((error) => {
                console.log(error)
            })
        } catch (error) {
            console.log(error)
        }


    }

    async DeleteStaff(cpf) {
        try {
            await fetch(`https://api-rest-sistema-de-gerenciament-production.up.railway.app/funcionarios/?cpf=${cpf}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json", "Authorization": this.token, "refresh_token": this.refreshToken },
            }).then((response) => {

                if (response.status === 405) {
                    alert("sessão expirada.")
                    this.#redirect()
                }

                const token = response.headers.get("token");
                const refreshToken = response.headers.get("refreshToken");

                if (token !== null && refreshToken !== null) {
                    this.#create_cookies(token, refreshToken)
                    return response.json();
                }


                return response.json();
            }).then((data) => {
                //! para testes (basta descomentar):
                //console.log(data.status)
            }).catch((error) => {
                console.log(error)
            })
        } catch (error) {
            console.error(error.erro)
        }
    }


    async CreateStaff(nome, senha, departamento, cpf, telefone, email, data_nas, imagem) {

        const imagem64 = await this.toBase64(imagem)


        try {
            fetch("https://api-rest-sistema-de-gerenciament-production.up.railway.app/funcionarios", {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": this.token, "refresh_token": this.refreshToken },
                body: JSON.stringify({
                    nome: nome,
                    senha: senha,
                    departamento: departamento,
                    cpf: cpf,
                    telefone:telefone,
                    data: data_nas,
                    email: email,
                    imagem: imagem64
                })
            }).then((response) => {

                const token = response.headers.get("token");
                const refreshToken = response.headers.get("refreshToken");

                if (response.status === 405) {
                    alert("sessão expirada.")
                    this.#redirect()
                }

                if (token !== null && refreshToken !== null) {
                    this.#create_cookies(token, refreshToken)
                    return response.json();
                }


                return response.json()
            }).then((data) => {

                alert(data.status.status)

                if(data.status.error){

                    let erro_funcionario = data.status.error.meta.target

                    erro_funcionario.split('_')[1]

                    alert("informação duplicada: " + erro_funcionario.split('_')[1])
                }


            }).catch((erro) => {
                console.log({ error: erro })
            })
        } catch (error) {
            console.log(error)
        }
    }

    async VerifyActions() {

        // ? teoricamente isso ta funcionando, basta testar

        let senha = prompt(
            "Esta alteração será aplicada, você tem certeza ? \n \n Digite a sua senha:",
        );

        const cpf = Cookies.get("cpf")

        let email = null

        await this.Show(cpf).then((response) => {
            return email = response.email
        })


        await fetch("https://api-rest-sistema-de-gerenciament-production.up.railway.app/auth", {
            method: "post",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ email: email, senha: senha, cpf: cpf })
        }).then((response) => {
            return response.json()
        }).then((data) => {
            if ((data.token && data.refreshToken) && !(data === "a senha precisa de no minimo 8 cacateres")) {
                return this.info = true
            } else if (data === "a senha precisa de no minimo 8 cacateres" && !(data.token && data.refreshToken)) {
                alert(data)
                return this.info = false
            } else {
                alert("senha incorreta")
                return this.info = false
            }
        }).catch((error) => {
            return console.error(error)
        })

        return this.info
    }

}

export default GetInfo
