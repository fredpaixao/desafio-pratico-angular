# Desafio Prático Angular - Módulo Contábil

Um módulo de contabilidade completo desenvolvido em **Angular 22.1** com funcionalidades para gerenciar lançamentos contábeis, pesquisa de lotes e validações avançadas.

## 📋 Requisitos Implementados

### ✅ Funcionalidades Principais

- **Página de Pesquisa**: Busca avançada de créditos/débitos com filtros por ID, valor, data e situação
- **Modal de Lançamentos**: Formulário reativo para criar/editar lançamentos contábeis
- **Seleção de Lotes**: Checkboxes para seleção individual e em massa de lotes
- **Paginação Customizada**: Componente de paginação reusável
- **Filtros Reutilizáveis**: Painel de filtros com projeção de conteúdo

### ✅ Tecnologias & Padrões

- **TypeScript com tipagem explícita** - Interfaces e tipos bem definidos
- **Formulários Reativos** - FormBuilder, FormGroup, validadores customizados
- **RxJS** - Observables, debounce, distinctUntilChanged
- **Angular Material** - Componentes, ícones, diálogos
- **Standalone Components** - Arquitetura moderna do Angular
- **SCSS com variáveis centralizadas** - Temas consistentes
- **Jasmine + Karma** - Testes unitários completos

### ✅ Validações

- **Validadores de Range** - Validação de intervalos (De/Até)
- **Validadores de Data** - Validação de datas com range
- **Validadores Customizados** - Validações específicas do domínio
- **Indicadores de Carregamento** - UX melhorada durante requisições
- **Tratamento de Erros** - Mensagens claras ao usuário

### ✅ Acessibilidade

- **ARIA labels** - Labels acessíveis para elementos
- **Role attributes** - Semântica correta para leitores de tela
- **Focus management** - Navegação por teclado
- **Mensagens de erro** - Alertas acessíveis com role="alert"

## 🚀 Como Começar

### Pré-requisitos
- Node.js 18+
- npm 11+

### Instalação

```bash
# Clonar o repositório
git clone <repository-url>
cd desafio-pratico-angular

# Instalar dependências
npm install
```

### Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm start

# Acessar em http://localhost:4200
```

### Testes

```bash
# Rodar testes unitários
npm test

# Testes com Jasmine/Karma em modo headless
# Cobertura: 57 testes, todos passando
```

### Build

```bash
# Build para produção
npm run build

# Output em dist/
```

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── contabil/                    # Módulo contábil
│   │   ├── components/
│   │   │   ├── entry-modal/        # Modal de lançamentos
│   │   │   └── other-credits-debits-page/  # Página de pesquisa
│   │   ├── service/
│   │   │   └── contabil.service.ts # Serviço de contabilidade
│   │   └── models/
│   │       └── lote.model.ts       # Interfaces de dados
│   ├── shared/                      # Componentes reutilizáveis
│   │   ├── components/
│   │   │   ├── header/             # Cabeçalho
│   │   │   ├── sidebar/            # Barra lateral
│   │   │   ├── filter-panel/       # Painel de filtros
│   │   │   └── pagination/         # Paginação
│   │   └── pipes/
│   │       └── currency-br.pipe.ts # Formatação de moeda
│   ├── layouts/
│   │   └── components/
│   │       └── home/               # Layout principal
│   ├── app.ts                       # Componente raiz
│   └── app.routes.ts               # Rotas da aplicação
├── styles-variables.scss           # Variáveis de estilo globais
└── test.ts                          # Configuração de testes
```

## 🧪 Testes

### Cobertura

- **ContabilService** - 16 testes
- **OtherCreditsDebitsPageComponent** - 19 testes
- **EntryModalComponent** - 18 testes
- **FilterPanelComponent** - 4 testes

**Total: 57 testes ✅ Todos passando**

## 🎨 Temas e Cores

Variáveis em `styles-variables.scss`:

```scss
$color-primary-dark: #1a7a7a;    // Verde escuro
$color-primary: #20c997;          // Verde claro
$color-primary-light: #e8f8f5;    // Verde bem claro
```

## 📦 Dependências Principais

- `@angular/core` - Framework
- `@angular/material` - Componentes UI
- `@angular/forms` - Formulários reativos
- `rxjs` - Programação reativa
- `typescript` - Tipagem estática

## 📝 Padrões de Código

### Type Safety

```typescript
// ✅ Bom
function pesquisarLotes(filtros: FiltrosPesquisa): Observable<ResultadoPesquisa>

// ❌ Evitar
function pesquisarLotes(filtros: any): any
```

## 🚦 Status

| Recurso | Status |
|---------|--------|
| Estrutura | ✅ |
| Componentes | ✅ |
| Serviços | ✅ |
| Modelos | ✅ |
| Validações | ✅ |
| Testes (57/57) | ✅ |
| Documentação | ✅ |

---

**Última atualização**: 2026-09-02
