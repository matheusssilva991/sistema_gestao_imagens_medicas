const TempPermission = require("../models/TempPermission");
const validator = require("validator");
const User = require("../models/User");

class TempPermissionController {

    async getTempPermissions (req, res) {
        const tempPermissions = await TempPermission.find();

        res.status(200).json(tempPermissions);
        return
    }

    async getTempPermission (req, res) {
        const id = req.params.id;
        const tempPermission = await TempPermission.find({ _id: id });
        
        if (tempPermission[0]) {
            res.status(200).json(tempPermission[0]);
            return

        } else {
            res.status(404).json({ err: "Permissão temporaria não encontrado" });
            return;
        }
    }

    async newTempPermission (req, res) {
        const { userId } = req.body;
        const user = await User.find({ _id: userId });

        if (!user[0]) {
            res.status(404).json({ err: "Usuário não existe!" });
            return;
        }
        
        if (validator.isEmpty(userId)){
            res.status(400).json({ err: "O campo userId não pode ser vazio" });
            return;
        }

        const tempPermissionExists = await TempPermission.find({ userId, used: false });

        if (tempPermissionExists.length === 0) {
            const result = await TempPermission.create(userId);

            if (result.sucess) {
                res.status(201).json({ msg: "Permissão temporaria criada com sucesso!." });
                return

            } else {
                res.status(400).json({ err: "Erro ao cadastrar." });
                return;
            }

        } else {
            res.status(403).json({ err: "Permissão temporaria já cadastrada!" });
            return;
        }
    }

    async updateTempPermission (req, res) { 
        const id = req.params.id;
        const { used } = req.body;
        const tempPermission = await TempPermission.find({ _id: id });

        if (tempPermission[0]) {
            if(used !== true && used !== false) {
                res.status(400).json({ err: "O valor inválido para o campo Used!" });
                return;

            }  else {
                await TempPermission.update(id, used);

                res.status(200).json({ msg: "Permissão temporaria atualizada com sucesso!" });
                return;
            }

        } else {
            res.status(404).json({ err: "Permissão temporaria não encontrada!" });
            return
        }
    }

    async deleteTempPermission(req, res) {
        const id = req.params.id;
        const tempPermission = await TempPermission.find({ _id: id });

        if (tempPermission[0]) {
            try {
                await TempPermission.delete(id);
                res.status(200).json({ msg: "Permissão temporaria deletada com sucesso!" });
                return;
    
            } catch (error) {
                res.status(400).json({ msg: "Erro ao deletar!." });
                return;
            }

        } else {
            res.status(404).json({ msg: "Permissão temporaria não encontrada!" });
            return;
        }
    }
}

module.exports = new TempPermissionController();
