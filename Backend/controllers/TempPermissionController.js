const TempPermission = require("../models/TempPermission");
const validator = require("validator");

class TempPermissionController {
    async getTempPermissions (req, res) {
        const tempPermissions = await TempPermission.find();

        res.status(200).json(tempPermissions);
        return
    }

    async getTempPermission (req, res) {
        const id = req.params.id;
        const tempPermission = await TempPermission.find({ _id: id });

        res.status(200).json(tempPermission[0]);
        return
    }

    async newTempPermission (req, res) {
        const { userId, solicitationId } = req.body;

        const tempPermissionExists = await TempPermission.find({ userId, solicitationId, used: false });

        if (!validator.isEmpty(userId) || !validator.isEmpty(solicitationId)){
            res.status(400).json({ err: "Os campos userId e solicitationID não podem ser vazios" });
        }

        if (tempPermissionExists.length === 0) {
            const result = await TempPermission.create(userId, solicitationId);

            if (result.sucess) {
                res.status(201).json({ msg: "Permissão temporaria criada com sucesso!." });
                return
            }
        } else {
            res.status(403).json({ err: "Permissão temporaria já cadastrada!" });
            return;
        }
    }

    async updateTempPermission (req, res) { 
        const id = req.params.id;
        const { used } = req.body;

        if (!validator.isEmpty(used)){
            const result = await TempPermission.update(id, used);

            if (result.sucess) {
                res.status(200).json({ msg: "Permissão temporaria atualizada com sucesso" });
                return;
            } else {
                res.status(404).json({ err: "Permissão temporaria não encontrada" });
                return
            }
        } else {
            res.status(400).json({ err: "O campo used não pode ser vazio."});
        }
    }

    async deleteTempPermission(req, res) {
        const id = req.params.id;

        try {
            const result = await TempPermission.delete(id);

            if (result.sucess) {
                res.status(200).json({ msg: "Permissão temporaria deletada com sucesso!" });
            } else {
                res.status(404).json({ msg: "Permissão temporaria não encontrada!" });
            }
        } catch (error) {
            res.status(400).json({ msg: "Erro ao deletar!." });
        }
    }
}

module.exports = new TempPermissionController();
