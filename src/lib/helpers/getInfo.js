import Cookies from "js-cookie";
import { goto } from "$app/navigation";
import { error } from "@sveltejs/kit";


class GetInfo {

    constructor() {
        this.info = null
    }

    connect(email, cpf, senha) {
        fetch("http://localhost:3000/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email, cpf: cpf, senha: senha }),
        })
            .then((response) => response.json())
            .then((data) => {
                const { token, refreshToken } = data;
                Cookies.set("token", `${token}`, { expires: 1, path: "/" });
                Cookies.set("refreshToken", `${refreshToken}`, {
                    expires: 1,
                    path: "/",
                });
                Cookies.set("cpf", `${cpf}`, {
                    path: "/",
                });

                try {
                    this.#Get(cpf).then((info) => {
                        if (info) {
                            goto("login");
                        }
                    }).catch((error) => {
                        alert('Email/Cpf ou senha errados')
                        console.error(error)
                    })
                } catch (error) {

                }
            })

            .catch((error) => {
                console.error("Erro na requisição:", error);
                alert("Erro ao conectar ao servidor.");
            });
    }

    async  #Get(cpf) {
        await fetch(`http://localhost:3000/?cpf=${cpf}`).then(response => {
            return response.json();
        }).then(response => {
            if (response) {

                const { nome, departamento, email, cpf, erro } = response

                if (erro) {
                    throw new Error('usuario não encotrado')
                }

                return this.info = { nome: nome, departamento: departamento, email: email, cpf: cpf };
            } else {
                alert('usuario não encontrado')
            }
        })
        return this.info
    }

    async Show() {
        const cpf = Cookies.get('cpf')

        await this.#Get(cpf).then((data) => {
            return this.info = data
        })

        return this.info

    }

    async GetAllStaffs() {
        await fetch("http://localhost:3000/staff").then((response) => {
            return response.json();
        }).then((response) => {
            return this.info = response 
        }).catch((error) => { console.log(error) })
        return this.info
    }

}

export default GetInfo
