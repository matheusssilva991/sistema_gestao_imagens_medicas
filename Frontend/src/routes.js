import PrincipaisInformacoes from "@/views/PrincipaisInformacoes.vue";
import GerenciarUsuarios from "@/views/GerenciarUsuarios.vue";
import CadastroUsuario from  "@/views/CadastroUsuario";

const routes = [
  // Outras rotas...
  {
    path: "/informacoes",
    component: PrincipaisInformacoes,
    name: "PrincipaisInformacoes",
  },
  {
    path: "/usuarios",
    component: GerenciarUsuarios,
    name: "GerenciarUsuarios",
  },
  {
    path: "/solicitacoes",
    component: CadastroUsuario,
    name: "CadastroUsuario",
  },
];

export default routes;
