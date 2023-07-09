# Sistema de gestão de imagens médicas
<div align="center">
<img src="https://cdn.discordapp.com/attachments/1125892268138713201/1127297435899809943/med.png" width="700px" />
</div>

## Visão Geral
O front-end deste projeto é responsável por fornecer uma interface intuitiva e eficiente para o sistema de gestão de imagens médicas voltado à prevenção do câncer de mama. Ele permite que os usuários visualizem, pesquisem e filtrem imagens relacionadas a exames mamográficos, contribuindo para a detecção precoce e o diagnóstico preciso dessa doença.

## Índice
- [Visão Geral do Front-end](#visão-geral-do-front-end)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Arquitetura e Estrutura](#arquitetura-e-estrutura)
- [Funcionalidades](#funcionalidades)
- [Integração com o Back-end](#integração-com-o-back-end)
- [Fluxo de Trabalho de Desenvolvimento](#fluxo-de-trabalho-de-desenvolvimento)
- [Testes](#testes)
- [Estilo de Código e Convenções](#estilo-de-código-e-convenções)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Contato](#contato)

## Visão Geral do Front-end
O front-end desempenha um papel crucial no sistema de gestão de imagens médicas para prevenção do câncer de mama, pois é a interface através da qual os usuários interagem com o sistema. Ele é responsável por fornecer uma experiência de usuário intuitiva, permitindo a visualização rápida e precisa das imagens mamográficas, bem como a realização de pesquisas e filtros para facilitar a análise e o diagnóstico médico.

O front-end se comunica com o back-end através de APIs ou serviços, obtendo os dados necessários para exibir as imagens e realizar operações, como pesquisas e filtros. Ele utiliza uma arquitetura de componentes para organizar o código e garantir uma manutenção mais fácil e escalabilidade do sistema.

## Tecnologias Utilizadas
### - Vue.js: 

Vue.js é um framework JavaScript progressivo usado para construir interfaces de usuário interativas. Ele é focado em ser adotável gradualmente, o que significa que você pode começar a utilizá-lo em partes específicas do seu projeto e, aos poucos, expandir sua utilização para toda a aplicação.

Algumas das principais características e conceitos do Vue.js incluem:

Reatividade, Componentes, Diretivas, Renderização do Template, Ecossistema Extensível, Desempenho

O Vue.js tem ganhado popularidade rapidamente devido à sua facilidade de aprendizado, flexibilidade e ótima documentação. Ele é usado tanto para projetos pequenos quanto para grandes aplicações e é suportado por uma comunidade ativa de desenvolvedores.

<div align="center"> 
<img src="https://cdn.discordapp.com/attachments/1125892268138713201/1127290837831798834/vuejs-original-wordmark.png" width="40" height="40" />
</div>

### -  Bootstrap: 
O Bootstrap é um framework front-end popular e amplamente utilizado para o desenvolvimento de sites e aplicações web. Ele fornece um conjunto abrangente de estilos CSS pré-definidos e componentes JavaScript interativos, que permitem criar interfaces responsivas e visualmente atraentes com facilidade.

Algumas características do Bootstrap incluem:

Grid System, Componentes Prontos, Estilos Responsivos, Personalização Flexível, Suporte Multiplataforma

O Bootstrap é amplamente adotado pela comunidade de desenvolvimento web devido à sua facilidade de uso, flexibilidade e eficiência. Ele permite o desenvolvimento rápido de interfaces de usuário atraentes e responsivas, além de promover a consistência visual e a usabilidade.

<div align="center"> 
<img src="https://cdn.discordapp.com/attachments/1125892268138713201/1127291044648730665/bootstrap-original-wordmark.png" width="40" height="40" />
</div>

### - HTML5: 

HTML é uma abreviação de Hypertext Markup Language - Linguagem de Marcação de Hiperxteto, é uma linguagem de marcação para publicação de conteúdo na web, consistindo em um conjunto de regras e códigos para definir como o conteúdo da web vai ser definido e como uma página será exibida e formatada.

Baseado no conceito de hipertexto, onde hipertexto são conjuntos de elementos ligados por conexões, onde estes elementos podem ser palavras, imagens vídeos, áudios, etc. Estes elementos conectados formam uma grande rede de informação, onde a conexão feita permite a comunicação de dados, organizando conhecimentos e guardando informações relacionadas.

O HTML5 é a versão mais recente, onde um dos principais objetivos é facilitar a manipulação dos elementos, possibilitando ao desenvolvedor modificar as características dos objetos de forma não invasiva e de maneira que seja transparente ao usuário final.

Ao contrário das versões anteriores, o HTML5 fornece ferramentas para o CSS e o JavaScript fazerem suas funções de forma otimizada, permitindo por meio de suas APIs (as APIs são um conjunto de padrões que fazem parte de uma interface e que permitem a criação de plataformas de maneira mais simples e prática para desenvolvedores) a manipulação das características destes elementos de forma que o website ou a aplicação continue leve e funcional.
<div align="center"> 
<img src="https://cdn.discordapp.com/attachments/1125892268138713201/1127290436839559249/html5-original.png" width="40" height="40" />
</div>

### - CSS3: 
CSS ou Cascading Style Sheets - Folhas de Estilo em Cascata, é uma linguagem de estilo utilizada para descrever a apresentação de um documento escrito em HTML. O CSS descreve como os elementos são apresentados, onde o mesmo possibilita ser adicionado estilos ao website, através de tipos de formatações, como bordas, cores, funcho, elementos textuais estilizados e layouts diferentes que mudam a forma de organização das páginas.
<div align="center"> 
<img src="https://cdn.discordapp.com/attachments/1125892268138713201/1127291670015262820/css3-original.png" width="40" height="40" />
</div>

### - JavaScript: 
JavaScript é uma linguagem de programação amplamente utilizada no front-end para diversas finalidades. Baseada em linguagem de programação orienta a objetos, a linguagem é empregada para controlar HTML e CSS e manipular comportamentos na página. Desde a validação de campos à criação de menus, é possível fazer muita coisa usando essa linguagem que adiciona algum dinamismo às páginas que apenas com HTML e CSS são consideradas estáticas. “O uso primário de JavaScript é escrever funções que são embarcadas ou incluídas em páginas HTML e que interagem com o Modelo de Objeto de Documentos da página”. (RAMOS et al., 2009).
<div align="center"> 
<img src="https://cdn.discordapp.com/attachments/1125892268138713201/1127291955202773062/javascript-original.png" width="40" height="40" />
</div>

### - Visual Studio Code

IDE Integrated Development Environment - Ambiente de Desenvolvimento Integrado, é uma ferramenta utilizada no desenvolvimento de aplicações, que combina diferentes funcionalidades em uma única interface gráfica do usuário.

Essa ferramenta permite ao desenvolvedor digitar todas as codificações e regras do software a serem criadas a partir de uma linguagem específica. O desenvolvimento de sistemas pode ser realizado de diversas formas. Neste contexto, o IDE garante uma maior produtividade e precisão do processo, uma vez que várias funcionalidades não precisarão ser personalizadas a cada demanda.

O Visual Studio Code (VS Code) é um editor de código de código aberto desenvolvido pela Microsoft, tem funcionalidades que facilitam o processo de desenvolvimento, facilitando o trabalho de desenvolvedores. Sendo uma ferramenta de fácil entendimento, possui uma loja de extensões imensas, e que continua crescendo.

Ou seja, com essa enorme coleção de extensões, podemos adicionar diversas funcionalidades ao VS Code de forma bem simples. Qualquer um pode criar uma extensão e publicar na loja. Desse modo, sempre há novas ferramentas que podem ser interessantes para alguém.
<div align="center"> 
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" width="40" height="40" />
</div>




Essas tecnologias foram escolhidas por sua ampla adoção e suporte na comunidade de desenvolvimento web, bem como pela sua capacidade de fornecer uma interface responsiva, flexível e agradável ao usuário. A combinação do Vue.js e Bootstrap permite um desenvolvimento mais rápido e eficiente, com componentes reutilizáveis e estilos pré-definidos.

## Arquitetura e Estrutura
O front-end é baseado na arquitetura de componentes do Vue.js. Os principais conceitos utilizados são:

- Componentes: blocos de construção reutilizáveis que encapsulam a lógica e a apresentação de uma parte da interface.
- Roteamento: gerencia a navegação entre diferentes páginas e componentes dentro do aplicativo.
- Estados: gerencia o estado da aplicação e a comunicação entre os componentes.

O código está organizado em uma estrutura de diretórios modular, seguindo as boas práticas de desenvolvimento do Vue.js. Cada componente possui seu próprio arquivo, facilitando a manutenção e reutilização. Além disso, são adotadas convenções de nomenclatura claras e descritivas para facilitar a compreensão do código por outros desenvolvedores.

## Funcionalidades
O front-end do projeto de gestão de imagens médicas para prevenção do câncer de mama possui as seguintes funcionalidades principais:

- Autenticação de usuário: permite que os usuários façam login e acessem o sistema.
- Visualização de imagens: exibe as imagens mamográficas de forma clara e organizada, permitindo a análise detalhada.
- Pesquisas e filtros: possibilita a busca por imagens específicas com base em critérios como data, idade, resultados de exames, entre outros.
- Exibição de relatórios: apresenta relatórios estatísticos e análises sobre os dados das imagens, auxiliando na tomada de decisões médicas.

A interface é projetada de forma responsiva e amigável, adaptando-se a diferentes dispositivos e tamanhos de tela. As funcionalidades são apresentadas de maneira clara e intuitiva, com o uso de elementos visuais adequados, como botões, formulários e gráficos.

## Integração com o Back-end
O front-end se comunica com o back-end através de APIs RESTful. São utilizados endpoints específicos para obter dados das imagens, enviar pesquisas e filtros, autenticar usuários, entre outras operações relacionadas ao sistema de gestão de imagens médicas.

Os dados retornados pelo back-end são consumidos pelo front-end e exibidos na interface de forma adequada. O front-end também pode enviar dados ao back-end para armazenamento ou atualização, conforme necessário.

## Fluxo de Trabalho de Desenvolvimento
Para configurar o ambiente de desenvolvimento do front-end, siga as instruções abaixo:

1. Clone este repositório em sua máquina local.
2. Certifique-se de ter o Node.js instalado em sua máquina.
3. Navegue até o diretório raiz do projeto e execute o seguinte comando para instalar as dependências:

## Sistema de gestão de imagens médicas setup

```bash
npm install
```

### Compiles and hot-reloads for development

```bash
npm run serve
```

### Compiles and minifies for production

```bash
npm run build
```

### Lints and fixes files

```bash
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

---





<p> Create by Matheus, Alessandro,  Cleber, Tauan,Vinicius, Victor </p>


<div align="center">
<img src="https://cdn.discordapp.com/attachments/1125892268138713201/1126574420861923438/picasion.com_0ac37155c681abdc7a8b79f8f034ebf7.gif" width="150" height="150" border="0" />
</div>