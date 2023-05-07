const bcrypt = require("bcrypt");
const Solicitation = require("../models/Solicitation");

class SolicitationController{

    async getSolicitations (req, res) {
        const solicitations = await Solicitation.find();
        let filteredSolicitations = [];

        for (let solicitation of solicitations) {
            let { data, ...resultObject } = solicitation._doc;

            delete data.password;
            resultObject.data = data

            filteredSolicitations.push(resultObject);
        }

        res.status(200).json(solicitations);
        return
    }

    async getSolicitation (req, res) {
        const id = req.params.id;
        const solicitations = await Solicitation.find({ _id: id });

        if (solicitations[0]){
            solicitations[0] = solicitations[0]._doc;
            delete solicitations[0].data.password;

            res.status(200).json(solicitations[0]);
            return

        } else {
            res.status(404).json({ err: "Solicitação não encontrado" });
            return;
        }
    }

    async newSolicitation (req, res) {
        let { type, data } = req.body

        if (type === 'newUser') {
            const { password } = data;

            const salt = await bcrypt.genSalt(10);
            const passwordCripted = await bcrypt.hash(password, salt);
            data['password'] = passwordCripted;
        } 

        const result = await Solicitation.create(type, "pending" , data);
        
        if (result.sucess) {
            res.status(201).json({ msg: "Solicitação criado com sucesso!." });
            return

        } else {
            res.status(400).json({ err: "Erro ao cadastrar." });
            return;
        }
    }

    async updateSolicitation (req, res) {
        const id = req.params.id;
        const status = req.body.status;
        const solicitation = await Solicitation.find({ _id: id });

        if (solicitation[0]) {
            if (status === "pending" || status === "accepted" || status === "rejected" ){
                await Solicitation.update(id, status);
    
                res.status(200).json({ msg: "Solicitação Atualizada com sucesso" });
                return;
                
            } else {
                res.status(400).json({ err: "Tipo de status invalido!." });
                return;
            }

        } else {
            res.status(404).json({ err: "Solicitação Não encontrada" });
            return
        }   
    }

    async deleteSolicitation (req, res) {
        const { id } = req.params;
        const solicitation = await Solicitation.find({ _id: id });

        if (solicitation[0]) {
            try {
                await Solicitation.delete(id);
    
                res.status(200).json({ msg: "Solicitação deletada com sucesso!" });
                return;

            } catch (err) {
                res.status(400).json({ msg: "Erro ao deletar!." });
            }

        } else {
            res.status(404).json({ err: "Solicitação Não encontrada" });
            return
        }   
    }
}

module.exports = new SolicitationController();
