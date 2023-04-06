const bcrypt = require("bcrypt");
const validator = require("validator");
const Solicitation = require("../models/Solicitation");
const User = require("../models/User");

class SolicitationController{
    async getSolicitations (req, res) {
        const solicitations = await Solicitation.find();

        res.status(200).json(solicitations);
        return
    }

    async getSolicitation (req, res) {
        const id = req.params.id;
        const solicitations = await Solicitation.find({ _id: id });

        res.status(200).json(solicitations[0]);
        return
    }

    async newSolicitation (req, res) {
        let { type, status, data } = req.body

        if (type === 'newUser') {
            const { password } = data;

            const salt = await bcrypt.genSalt(10);
            const passwordCripted = await bcrypt.hash(password, salt);
            data['password'] = passwordCripted;
        } 

        const result = await Solicitation.create(type, status, data);
        
        if (result.sucess) {
            res.status(201).json({ msg: "Solicitação criado com sucesso!.", result });
            return
        }
    }

    async updateSolicitation (req, res) {
        const id = req.params.id;
        const status = req.body.status;

        if (status === "pending" || status === "accept" || status === "reject" || status === "progress" ){
            const result = await Solicitation.update(id, status);

            if (result.sucess){
                res.status(200).json({ msg: "Solicitação Atualizada com sucesso" });
                return;
            } else {
                res.status(404).json({ err: "Solicitação Não encontrada" });
                return
            }
        } else {
            res.status(400).json({ err: "Tipo de status invalido!." });
        }
    }

    async deleteSolicitation (req, res) {
        const { id } = req.params;

        try {
            const result = await Solicitation.delete(id);

            if (result.sucess) {
                res.status(200).json({ msg: "Solicitação deletada com sucesso!" });
            } else {
                res.status(404).json({ msg: "Solicitação não encontrado!" });
            }
        } catch (error) {
            res.status(400).json({ msg: "Erro ao deletar!." });
        }
    }
}

module.exports = new SolicitationController();
