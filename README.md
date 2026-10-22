# Vocalis — Landing Page

Protótipo acadêmico de uma landing page para uma plataforma introdutória de canto e musicalidade. A página apresenta a proposta do Vocalis, seus módulos demonstrativos e perguntas frequentes.

O projeto é uma demonstração de interface: não possui backend, cadastro, pagamento ou aulas reais. Os depoimentos são fictícios e os módulos são ilustrativos, conforme indicado no próprio conteúdo da página.

## Jornada de desenvolvimento

A implementação foi organizada em etapas que podem ser verificadas diretamente no código atual:

1. **Definição do conteúdo** — textos de navegação, benefícios, módulos, etapas e perguntas frequentes foram reunidos em `src/models/landingPageModel.js`, separando o conteúdo da interface.
2. **Preparação dos dados de apresentação** — `src/viewmodels/landingPageViewModel.js` transforma o modelo em dados prontos para a tela: gera os links de âncora da navegação e numera módulos e etapas. A view permanece focada apenas na renderização.
3. **Composição da página** — `src/views/LandingPageView.jsx` organiza as seções (cabeçalho, hero, benefícios, módulos, como funciona, depoimentos ilustrativos, oferta, FAQ, chamada final e rodapé) e consome o view model.
4. **Componentização** — `ButtonLink` e `SectionHeading` foram extraídos para `src/components/`, com variações de estilo e alinhamento reutilizadas ao longo da página.
5. **Identidade visual e estilos** — as cores, tipografia, superfícies e raios foram definidos como variáveis CSS em `src/index.css`. Os estilos específicos de cada view/componente ficam em arquivos CSS Modules, evitando colisões de nomes.
6. **Responsividade e acessibilidade** — o layout se adapta em dois pontos principais (900 px e 680 px), com reorganização do cabeçalho, grades e seções. A interface inclui foco visível, textos alternativos, rótulos ARIA e respeito à preferência por movimento reduzido.
7. **Configuração do Vite** — a configuração mantém React, Tailwind CSS e o alias `@` para `src`, sem integrações específicas de plataformas externas. O projeto usa exclusivamente npm.
8. **Consolidação do repositório** — a aplicação foi mantida na raiz do projeto, com uma única configuração npm (`package-lock.json`), JavaScript/JSX sem dependências de TypeScript e documentação unificada.

## Tecnologias utilizadas

- React 19 e React DOM 19
- Vite 8
- Tailwind CSS v4 por meio de `@tailwindcss/vite`
- CSS Modules para os estilos das views e componentes
- JavaScript/JSX
- oxfmt para formatação
- Node.js 22 (versão definida em `.mise.toml`)

Não há suíte de testes automatizados configurada neste repositório.

## Estrutura do projeto

```text
vocalis-landing-page/
├── public/                   # Ícone e logotipo servidos estaticamente
├── src/
│   ├── components/           # Componentes reutilizáveis + CSS Modules
│   ├── models/               # Conteúdo e dados de domínio da landing page
│   ├── viewmodels/           # Transformação dos dados para a view
│   ├── views/                # Composição da página + CSS Module
│   ├── App.jsx
│   ├── index.css             # Tailwind e variáveis globais
│   └── main.jsx
├── index.html                # Shell HTML da aplicação
├── package.json
├── vite.config.js
└── README.md
```

### Arquitetura MVVM

- **Model** (`src/models/`): conteúdo estruturado da página.
- **ViewModel** (`src/viewmodels/`): deriva links, numeração e demais dados de apresentação.
- **View** (`src/views/`): renderiza a página e usa CSS Modules.
- **Components** (`src/components/`): elementos reutilizáveis da interface.

## Como executar

```bash
npm install
npm run dev
```

O servidor de desenvolvimento usa as configurações padrão do Vite (`http://localhost:5173`).

Para gerar e visualizar o build de produção:

```bash
npm run build
npm run preview
```

Para formatar os arquivos:

```bash
npm run format
```

O build de produção é gerado em `dist/`.

## Escopo e limitações

- A página é um protótipo acadêmico e não oferece aulas reais.
- Os depoimentos exibidos são fictícios, criados para a demonstração.
- A navegação usa âncoras internas; não há rotas, autenticação ou persistência de dados.
- O conteúdo e o design existentes devem ser preservados em alterações futuras.
