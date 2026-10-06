# Projeto — Vinícius Celulares

Desenvolva um site institucional moderno, premium, tecnológico e responsivo para a assistência técnica **Vinícius Celulares**.

A imagem `logo.jpeg`, anexada ao projeto, deve ser utilizada como **referência visual principal e obrigatória** para toda a identidade do site. Analise a imagem antes de iniciar a implementação.

---

## 1. OBJETIVO

O site deve apresentar a empresa, seus serviços, produtos, diferenciais e formas de contato, tendo como principal objetivo gerar atendimentos e orçamentos pelo WhatsApp.

A experiência deve transmitir:

- Tecnologia
- Confiança
- Profissionalismo
- Precisão
- Qualidade técnica
- Modernidade
- Atendimento próximo
- Credibilidade

O resultado **não deve parecer um template genérico de assistência técnica**.

A identidade deve ser claramente inspirada na logo: /imagens/logo.jpeg.

---

# 2. REFERÊNCIA VISUAL

A imagem `logo.jpeg` possui uma estética:

- Preta
- Grafite
- Metálica
- Tecnológica
- Minimalista
- Premium
- Futurista
- Com circuitos eletrônicos
- Trilhas de placa eletrônica
- Pequenos componentes
- Glow azul
- Elementos brancos/prateados
- Alto contraste
- Muito espaço negativo
- Formas geométricas
- Sensação de precisão e tecnologia

O site deve seguir essa mesma linguagem visual.

### Paleta principal

Utilizar predominantemente:

- #050505
- #080808
- #0D0D0D
- #111111
- #171717
- #222222
- #F5F5F5
- #FFFFFF
- #C5CAD0
- #777F89
- #168BFF
- #2DA8FF

O azul deve ser utilizado como **cor de destaque**, principalmente em:

- Glow
- Linhas
- Circuitos
- Hover
- Bordas
- Elementos interativos
- Pequenas animações
- Detalhes tecnológicos

Não transformar o site em um site predominantemente azul.

A maior parte da interface deve permanecer preta/grafite.

---

# 3. STACK

Utilize uma stack moderna e profissional.

Preferencialmente:

- React
- GSAP
- GSAP ScrollTrigger
- Lucide React

Se o projeto já possuir uma stack definida, preserve a estrutura existente sempre que possível.

Não instale dependências desnecessárias.

---

# 4. NAVEGAÇÃO

A navegação principal deve possuir:

- INÍCIO
- QUEM SOMOS
- SERVIÇOS
- PRODUTOS
- POR QUE NÓS
- CONTATO

No desktop:

- Logo à esquerda
- Links no centro
- CTA do WhatsApp à direita

No mobile:

- Logo
- Menu hamburger
- Menu fullscreen ou drawer
- Navegação confortável para toque

A navegação deve utilizar scroll suave.

A navbar inicialmente deve ser transparente ou extremamente discreta.

Conforme o usuário rolar:

- Adicionar fundo preto/grafite translúcido
- Aplicar backdrop blur
- Adicionar borda inferior sutil
- Criar uma transição suave

---

# 5. HERO — INÍCIO

Criar um Hero extremamente sofisticado e visualmente impactante.

Utilizar a logo fornecida.

Não redesenhar a identidade da logo.

O Hero deve conter:

### Logo / marca

Utilizar a composição real da logo.

### Headline

"TECNOLOGIA QUE FUNCIONA. CONFIANÇA QUE PERMANECE."

### Subheadline

"Assistência técnica especializada em celulares, computadores e eletrônicos."

### CTA principal

"Fale conosco pelo WhatsApp"

Link:

https://wa.me/5561991391350?text=Ol%C3%A1%21%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento.

### CTA secundário

"Conheça nossos serviços"

Este botão deve levar suavemente até a seção de serviços.

---

# 6. HERO — DIREÇÃO ARTÍSTICA

O Hero deve ser a parte mais sofisticada do site.

Criar um background inspirado diretamente na imagem da logo.

Utilizar:

- Circuitos eletrônicos
- Trilhas
- Linhas finas
- Pontos de conexão
- Microcomponentes
- Glow azul
- Gradientes radiais
- Texturas sutis
- Círculos
- Elementos geométricos
- Profundidade
- Vinheta
- Partículas extremamente discretas

Não utilizar imagens clichês de celulares flutuando.

Não utilizar estética gamer.

Não utilizar cyberpunk exagerado.

A sensação desejada é:

Tecnologia premium + Engenharia + Precisão + Minimalismo + Assistência técnica especializada.

---

# 7. GSAP — ANIMAÇÕES

GSAP + ScrollTrigger é obrigatório.

As animações precisam ser sofisticadas, fluidas e discretas.

Evitar efeitos exagerados.

Priorizar:

- opacity
- transform
- scale
- translate
- clip-path
- parallax
- stagger
- scrub
- timelines

Evitar animações que prejudiquem performance.

---

# 8. ANIMAÇÃO INICIAL

Criar uma introdução rápida ao carregar o site.

Possibilidade:

VINICIUS  
CELULARES

Aparecendo com:

- Fade
- Scale
- Linha tecnológica sendo desenhada
- Pequeno glow azul

Depois revelar o Hero.

A intro deve durar aproximadamente 1 a 1.5 segundos.

Não bloquear a navegação.

No mobile, simplificar ou remover a intro se necessário.

---

# 9. ANIMAÇÃO DO HERO

Criar uma timeline GSAP.

Sequência:

1. Logo
2. Headline
3. Subheadline
4. CTA
5. Elementos decorativos

Cada elemento deve entrar suavemente.

Os circuitos do background devem possuir pequenos movimentos de parallax.

Pequenos pontos podem acender sequencialmente.

---

# 10. GSAP DURANTE O SCROLL

Todas as principais seções devem possuir animações com ScrollTrigger.

### QUEM SOMOS

- Título entra lateralmente
- Texto aparece progressivamente
- Número "5+" surge com scale
- Elementos decorativos possuem parallax

### SERVIÇOS

Os cards entram com stagger.

Exemplo conceitual:

Card 01 → Card 02 → Card 03 → Card 04 → etc.

### PRODUTOS

Produtos entram horizontalmente ou com stagger.

### POR QUE NÓS

Diferenciais aparecem sequencialmente.

### CONTATO

Informações aparecem de baixo para cima.

---

# 11. PARALLAX

Criar parallax extremamente sutil em:

- Circuitos
- Linhas
- Partículas
- Círculos
- Glow
- Elementos geométricos

O objetivo é criar profundidade, não chamar atenção para a animação.

---

# 12. REDUCED MOTION

Respeitar `prefers-reduced-motion`.

Quando o usuário solicitar redução de movimento:

- Reduzir animações
- Desabilitar parallax
- Reduzir duração
- Evitar efeitos complexos

---

# 13. COMPONENTE DE CIRCUITOS

Criar um componente reutilizável chamado `CircuitBackground`.

Ele pode ser utilizado em diferentes seções.

Pode ser implementado utilizando:

- SVG
- CSS
- HTML
- SVG animado

Deve possuir:

- Trilhas
- Pontos
- Pequenos componentes
- Glow azul discreto

O componente não deve interferir na legibilidade do conteúdo.

---

# 14. QUEM SOMOS

Criar uma seção premium.

Título:

"QUEM SOMOS"

Texto:

"Há mais de 5 anos no Jardim Ingá, no mesmo local, construímos nossa história com base em confiança, compromisso e qualidade."

"Somos especializados em reparo de celulares e manutenção de computadores, além de trabalharmos com venda de celulares, acessórios e diversos produtos eletrônicos."

"Somos uma assistência requisitada na região, sempre buscando cumprir nossos prazos e entregar um serviço de qualidade em cada atendimento."

Criar um destaque visual:

"5+ ANOS"

E:

"Cuidando da tecnologia dos nossos clientes."

O número "5+" deve possuir uma animação de entrada com GSAP.

---

# 15. FOTO DA LOJA

Preparar uma área para a foto real da loja.

Utilizar:

`/public/images/loja.jpg`

Caso a imagem ainda não exista, criar um placeholder elegante.

Não utilizar uma foto aleatória fingindo ser a loja.

Quando a foto real for adicionada, o layout deve funcionar automaticamente.

A imagem pode ter:

- Máscara
- Borda fina
- Glow
- Pequeno efeito parallax
- Tratamento escuro

---

# 16. SERVIÇOS

Criar uma seção:

"SERVIÇOS"

Título:

"Diagnóstico preciso. Reparo especializado."

Criar cards para:

1. Manutenção de celulares
2. Reparo de placas de celulares
3. Troca e reparo de conectores de carga
4. Troca de baterias
5. Troca de telas e componentes
6. Manutenção de computadores
7. Formatação e instalação de sistemas
8. Configuração e otimização de computadores
9. Diagnóstico e reparos em equipamentos
10. Atualizações e substituição de componentes

Cada card deve possuir:

- Ícone
- Título
- Pequena descrição
- Número do serviço
- Borda fina
- Fundo grafite
- Hover sofisticado
- Glow azul discreto

No hover:

- Card sobe levemente
- Borda fica azul
- Ícone se movimenta alguns pixels
- Glow aparece
- Background muda suavemente

Evitar cards excessivamente arredondados.

Utilizar aproximadamente 12px de border-radius.

---

# 17. DESCRIÇÕES DOS SERVIÇOS

Criar descrições curtas e profissionais.

### Manutenção de celulares

"Diagnóstico e manutenção para devolver o funcionamento ideal ao seu aparelho."

### Reparo de placas

"Análise técnica e reparos especializados em placas e componentes eletrônicos."

### Conectores de carga

"Troca e reparo de conectores com diagnóstico preciso do problema."

### Troca de baterias

"Substituição de baterias para recuperar autonomia e desempenho."

### Telas e componentes

"Troca de telas e componentes danificados com cuidado técnico."

### Manutenção de computadores

"Manutenção preventiva e corretiva para computadores e notebooks."

### Formatação e sistemas

"Formatação, instalação e configuração de sistemas operacionais."

### Otimização

"Configuração para melhorar desempenho, estabilidade e utilização."

### Diagnóstico

"Identificação de falhas e análise técnica dos equipamentos."

### Componentes

"Atualização e substituição de componentes para melhorar o equipamento."

---

# 18. CTA DOS SERVIÇOS

Após os cards:

"PRECISA DE UM REPARO?"

Texto:

"Entre em contato conosco e solicite seu orçamento pelo WhatsApp."

Botão:

"SOLICITAR ORÇAMENTO"

Link:

https://wa.me/5561991391350

---

# 19. PRODUTOS

Criar uma seção de vitrine premium.

Título:

"PRODUTOS"

Subtítulo:

"Tecnologia, acessórios e eletrônicos para o seu dia a dia."

Os produtos serão futuramente carregados de uma planilha do Google Sheets.

Portanto:

**NÃO deixar os produtos diretamente espalhados pelos componentes.**

Criar uma camada de dados.

---

# 20. ARQUITETURA DOS PRODUTOS

Criar uma estrutura equivalente a:

`src/data/products.ts`

Criar uma função:

`getProducts()`

A interface deve receber:

`Product[]`

A origem dos dados deve ser abstraída.

Inicialmente utilizar dados mockados.

Futuramente a fonte será o Google Sheets.

Arquitetura desejada:

Google Sheets → API/CSV → getProducts() → interface.

Não espalhar chamadas ao Google Sheets pelos componentes React.

---

# 21. MODELO DA PLANILHA GOOGLE SHEETS

Criar um arquivo:

`GOOGLE_SHEETS.md`

explicando como cadastrar os produtos.

Utilizar as seguintes colunas:

- id
- nome
- categoria
- descricao
- preco
- imagem
- destaque
- ativo
- ordem

Criar alguns exemplos:

| id | nome | categoria | descricao | preco | imagem | destaque | ativo | ordem |
|---|---|---|---|---:|---|---|---|---:|
| 1 | iPhone 13 | Celulares | Smartphone Apple 128GB | 2999.90 | URL_DA_IMAGEM | SIM | SIM | 1 |
| 2 | Galaxy A55 | Celulares | Smartphone Samsung | 1899.90 | URL_DA_IMAGEM | SIM | SIM | 2 |
| 3 | Carregador USB-C | Acessórios | Carregador rápido | 89.90 | URL_DA_IMAGEM | NÃO | SIM | 3 |
| 4 | Cabo USB-C | Acessórios | Cabo de carregamento | 39.90 | URL_DA_IMAGEM | NÃO | SIM | 4 |
| 5 | Fone Bluetooth | Eletrônicos | Fone sem fio | 149.90 | URL_DA_IMAGEM | NÃO | SIM | 5 |

Esses produtos são apenas exemplos/mock.

Não apresentá-los como estoque real da empresa.

---

# 22. PREPARAÇÃO PARA GOOGLE SHEETS

Criar uma arquitetura que permita futuramente conectar a planilha.

Criar uma função única para obtenção dos produtos.

Exemplo conceitual:

`getProducts()`

Essa função deverá ser a única responsável pela origem dos produtos.

No início:

`getProducts()` → dados mockados.

Posteriormente:

`getProducts()` → Google Sheets.

A interface não deve precisar ser alterada quando a fonte de dados mudar.

---

# 23. CARD DE PRODUTO

Cada produto deve apresentar:

- Imagem
- Categoria
- Nome
- Descrição
- Preço
- Botão "Tenho interesse"

O botão deve abrir o WhatsApp.

Mensagem dinâmica:

"Olá! Tenho interesse no produto: [NOME DO PRODUTO]. Gostaria de saber mais informações."

Utilizar URL encoded corretamente.

---

# 24. PRODUTOS EM DESTAQUE

Criar uma área:

"DESTAQUES"

Mostrar somente produtos onde:

`destaque = SIM`

Criar uma vitrine horizontal elegante.

Desktop:

3 ou 4 produtos visíveis.

Mobile:

1 produto por vez com navegação confortável.

Pode utilizar GSAP para animações de entrada.

Não utilizar um carrossel automático exagerado.

---

# 25. FILTROS DE PRODUTOS

Se fizer sentido visualmente, adicionar filtros por categoria.

Categorias:

- Todos
- Celulares
- Acessórios
- Eletrônicos

A troca de categoria deve possuir uma pequena animação.

Não deixar a interface poluída.

---

# 26. POR QUE NÓS

Criar uma seção visualmente forte.

Título:

"POR QUE ESCOLHER A VINÍCIUS CELULARES?"

Diferenciais:

### Atendimento de confiança

"Atendimento próximo e transparente em cada etapa."

### Qualidade nos serviços

"Experiência e cuidado em cada reparo."

### Transparência

"Você sabe o que está sendo feito no seu equipamento."

### Atendimento personalizado

"Cada cliente e cada equipamento recebem uma avaliação individual."

### Garantia oferecida pela empresa

"Mais segurança depois do serviço realizado."

---

# 27. DESIGN DOS DIFERENCIAIS

Não criar apenas uma lista simples.

Criar uma composição visual sofisticada.

Pode utilizar:

- Números
- Ícones
- Linhas conectando os itens
- Elementos de circuito
- Glow azul
- Animação de progressão
- Parallax

Exemplo conceitual:

01 ───────── Atendimento de confiança

02 ───────── Qualidade nos serviços

03 ───────── Transparência

04 ───────── Atendimento personalizado

05 ───────── Garantia

Os elementos devem aparecer progressivamente durante o scroll.

---

# 28. CONTATO

Criar uma seção final forte.

Título:

"VAMOS CUIDAR DA SUA TECNOLOGIA?"

Subtítulo:

"Entre em contato com a Vinícius Celulares."

Informações:

### Endereço

"Rua Joaquim Gilberto, Quadra 79 lote 21"

### WhatsApp

"(61) 99139-1350"

### Horário

"Segunda a sexta: 08:30 às 18:30"

"Sábado: 08:30 às 14:00"

Botão:

"FALE CONOSCO PELO WHATSAPP"

Link:

https://wa.me/5561991391350

---

# 29. MAPA

Adicionar uma área de localização.

Endereço informado pelo cliente:

"Rua Joaquim Gilberto, Quadra 79 lote 21"

Não inventar informações adicionais de endereço.

Deixar a localização configurável em um único local do projeto.

Se for necessário definir cidade/UF para o mapa e essa informação não estiver disponível, não inventar.

Criar uma constante/configuração para que isso possa ser preenchido posteriormente.

O mapa deve possuir estética compatível com o site:

- Dark mode
- Baixa saturação
- Visual escuro
- Bordas sutis

---

# 30. WHATSAPP FLUTUANTE

Criar um botão flutuante de WhatsApp no canto inferior direito.

Características:

- Sempre visível
- Discreto
- Pequena animação de entrada
- Pulse extremamente sutil
- Não ocupar muito espaço
- Excelente funcionamento no mobile

Link:

https://wa.me/5561991391350

---

# 31. FOOTER

Criar footer escuro e elegante.

Conteúdo:

"VINÍCIUS CELULARES"

"Manutenção e Acessórios"

Links:

- Início
- Quem Somos
- Serviços
- Produtos
- Por Que Nós
- Contato

Contato:

"(61) 99139-1350"

Horário:

"Segunda a sexta: 08:30–18:30"

"Sábado: 08:30–14:00"

Rodapé:

"© 2026 Vinícius Celulares. Todos os direitos reservados."

---

# 32. TIPOGRAFIA

Utilizar tipografia moderna e tecnológica.

Preferências:

- Space Grotesk
- Manrope
- Inter
- DM Sans

Sugestão:

Headings → Space Grotesk

Body → Inter

Evitar fontes excessivamente futuristas que prejudiquem a leitura.

A tipografia deve parecer premium e tecnológica.

---

# 33. ESTILO DOS ELEMENTOS

Preferir:

- Bordas finas
- Linhas técnicas
- Transparências
- Glassmorphism muito sutil
- Sombras profundas
- Glow azul
- Preto/grafite
- Branco
- Prata

Evitar:

- Gradientes coloridos exagerados
- Roxo
- Rosa
- Verde
- Excesso de azul
- Sombras coloridas exageradas
- Cards gigantes
- Excesso de border-radius
- Estética gamer
- Cyberpunk exagerado

A inspiração deve ser:

**TECNOLOGIA PREMIUM**, não "site gamer".

---

# 34. MICROINTERAÇÕES

Adicionar microinterações em:

- Links
- Botões
- Cards
- Produtos
- Ícones
- Navbar
- WhatsApp

Exemplo de botão:

Normal:

"Fale conosco →"

Hover:

- Botão aumenta levemente
- Glow azul discreto
- Seta se movimenta alguns pixels
- Transição suave

Todas as transições devem ser rápidas e naturais.

---

# 35. RESPONSIVIDADE

O site precisa ser excelente em:

- Desktop
- Notebook
- Tablet
- Smartphone

Testar pelo menos:

- 390px
- 768px
- 1024px
- 1440px
- 1920px

No mobile:

- Não deixar textos gigantes
- Não gerar overflow horizontal
- Reduzir complexidade das animações
- Cards devem funcionar com toque
- Menu deve ser confortável
- WhatsApp deve permanecer acessível
- Mapa deve se adaptar corretamente

---

# 36. PERFORMANCE

O site precisa ser rápido.

Boas práticas:

- Otimizar imagens
- Lazy loading
- Usar `next/image` quando aplicável
- Evitar animações pesadas
- Não executar GSAP desnecessariamente
- Utilizar transform/opacity para animações
- Evitar layout thrashing
- Evitar dependências desnecessárias
- Reduzir efeitos no mobile

GSAP deve ser utilizado de maneira performática.

---

# 37. SEO

Adicionar:

- Title
- Description
- Open Graph
- Favicon
- Metadata
- Estrutura semântica
- Headings corretos
- Alt text nas imagens

Title:

"Vinícius Celulares | Assistência Técnica no Jardim Ingá"

Description:

"Vinícius Celulares — assistência técnica especializada em celulares, computadores, acessórios e eletrônicos. Reparo, manutenção e atendimento de confiança no Jardim Ingá."

---

# 38. ACESSIBILIDADE

Garantir:

- Contraste adequado
- Navegação por teclado
- `aria-label` quando necessário
- Foco visível
- Botões semanticamente corretos
- Imagens com alt
- Redução de movimento
- Textos legíveis
- Elementos interativos com área de toque adequada

---

# 39. ARQUITETURA SUGERIDA

Organizar o projeto de forma limpa.

Estrutura sugerida:

src/
  components/
    Navbar/
    Hero/
    About/
    Services/
    Products/
    ProductCard/
    WhyUs/
    Contact/
    Footer/
    WhatsAppButton/
    CircuitBackground/

  data/
    products.ts

  lib/
    whatsapp.ts
    products.ts
    config.ts

  hooks/
    useGsap.ts

  app/
    page.tsx

Adapte a estrutura caso a stack existente utilize outra convenção.

---

# 40. CONFIGURAÇÕES CENTRALIZADAS

Criar um arquivo de configuração para as informações da empresa.

Centralizar:

- Nome
- WhatsApp
- Endereço
- Horários
- Links
- Configuração do mapa

Exemplo conceitual:

company.name = "Vinícius Celulares"

company.whatsapp = "5561991391350"

company.whatsappDisplay = "(61) 99139-1350"

company.address = "Rua Joaquim Gilberto, Quadra 79 lote 21"

company.hours.weekdays = "08:30 às 18:30"

company.hours.saturday = "08:30 às 14:00"

Não duplicar essas informações em vários componentes.

---

# 41. LOGO

A imagem `logo.jpeg` deve ser considerada a fonte principal da identidade visual.

Não recriar uma logo diferente.

Utilizar a logo real fornecida pelo cliente.

Preparar uma estrutura equivalente a:

`/public/images/logo.jpeg`

caso faça sentido para o projeto.

Também criar uma versão adequada para a navbar caso seja necessário utilizar uma versão reduzida, mas sem alterar a identidade da marca.

---

# 42. EXPERIÊNCIA DE SCROLL

O site deve parecer uma experiência contínua.

Fluxo:

HERO
↓
QUEM SOMOS
↓
SERVIÇOS
↓
PRODUTOS
↓
POR QUE NÓS
↓
CONTATO
↓
FOOTER

Cada seção deve possuir sua própria personalidade, mas todas precisam parecer parte do mesmo sistema visual.

Criar transições suaves entre seções.

Utilizar quando fizer sentido:

- Linhas horizontais
- Circuitos
- Gradientes
- Máscaras
- Parallax
- Fade
- Scale
- Clip-path
- Pequenos deslocamentos

Sempre com moderação.

---

# 43. ELEMENTOS DECORATIVOS

Criar um sistema visual consistente inspirado na placa eletrônica da logo.

Utilizar:

- Circuitos
- Linhas finas
- Pequenos pontos
- Microchips
- Conectores
- Círculos
- Grid
- Glow azul
- Linhas horizontais

Esses elementos devem aparecer principalmente nas bordas e backgrounds.

Não colocar elementos decorativos sobre textos importantes.

---

# 44. TRANSIÇÕES ENTRE SEÇÕES

Evitar simplesmente empilhar blocos de conteúdo.

Criar transições visuais entre as seções.

Por exemplo:

- Uma linha azul percorre a tela
- Circuitos aparecem no background
- Um elemento circular passa para a próxima seção
- Gradientes escuros fazem a transição
- Elementos tecnológicos atravessam o viewport

Tudo de forma extremamente sutil.

---

# 45. NÚMEROS E DADOS VISUAIS

Utilizar números como elemento visual.

Exemplo:

01 / 02 / 03 / 04 / 05

Para:

- Serviços
- Diferenciais
- Etapas

Isso deve reforçar a estética técnica.

---

# 46. BOTÕES

Todos os botões principais devem seguir uma linguagem visual consistente.

CTA principal:

- Fundo branco ou branco/prata
- Texto preto
- Hover com glow azul
- Pequeno movimento

CTA secundário:

- Transparente
- Border branca/grafite
- Hover azul

WhatsApp:

- Utilizar a identidade visual apropriada do botão
- Não exagerar no verde na interface
- O verde pode aparecer apenas no ícone ou em pequenos detalhes

---

# 47. IMAGENS

Todas as imagens devem possuir tratamento visual compatível com a identidade.

Preferir:

- Contraste alto
- Tons escuros
- Saturação controlada
- Bordas
- Máscaras
- Glow sutil

Não aplicar filtros exagerados.

---

# 48. CONTEÚDO

Não inventar informações sobre a empresa.

Não criar:

- Depoimentos falsos
- Avaliações falsas
- Quantidade falsa de clientes
- Quantidade falsa de aparelhos reparados
- Prêmios inexistentes
- Certificações inexistentes
- Parceiros inexistentes
- Endereço adicional
- Horários diferentes
- Garantias com prazo inventado

Utilizar somente as informações fornecidas.

---

# 49. PRODUTOS MOCK

Os produtos utilizados durante o desenvolvimento são apenas dados demonstrativos.

Deixar claramente estruturado no código que os dados serão substituídos posteriormente pela integração com Google Sheets.

Não afirmar que os produtos estão disponíveis em estoque.

---

# 50. WHATSAPP

Centralizar a criação dos links de WhatsApp em uma função.

Criar algo equivalente a:

`createWhatsAppLink(message)`

Essa função deve:

1. Receber uma mensagem
2. Fazer URL encoding
3. Retornar a URL correta
4. Utilizar o número centralizado na configuração

Exemplos de mensagens:

Orçamento:

"Olá! Gostaria de solicitar um orçamento."

Produto:

"Olá! Tenho interesse no produto: [NOME]. Gostaria de saber mais informações."

Contato:

"Olá! Gostaria de entrar em contato com a Vinícius Celulares."

---

# 51. EXPERIÊNCIA MOBILE

O mobile deve ser tratado como uma experiência própria e não apenas uma versão reduzida do desktop.

No mobile:

- Hero deve ocupar a tela de maneira elegante
- Logo deve permanecer legível
- Headline deve possuir boa hierarquia
- Botões devem ocupar largura confortável
- Cards devem funcionar perfeitamente
- Produtos devem utilizar scroll horizontal quando necessário
- Navbar deve ser simplificada
- Circuitos devem ser reduzidos
- Glow deve ser mais discreto
- Animações GSAP devem ser menos complexas

---

# 52. DESKTOP

No desktop, aproveitar o espaço horizontal.

Criar:

- Grandes áreas de respiro
- Tipografia grande
- Grid assimétrico
- Imagens grandes
- Elementos decorativos
- Parallax
- Composições premium

Evitar deixar o site parecendo apenas uma sequência centralizada de cards.

---

# 53. GRID VISUAL

Utilizar grid moderno.

Exemplos:

Quem Somos:

Texto de um lado + imagem do outro.

Serviços:

Grid 2x5 ou 3x3 adaptável.

Produtos:

Grid ou carrossel horizontal.

Por que Nós:

Layout assimétrico com números e linhas.

Contato:

Informações de um lado + mapa do outro.

---

# 54. DETALHES PREMIUM

Adicionar detalhes que aumentem a percepção de qualidade:

- Linha azul de 1px
- Micro glow
- Hover com deslocamento de 2–4px
- Pequenas animações de circuito
- Tipografia com letter-spacing controlado
- Separadores minimalistas
- Números monoespaçados
- Pequenos labels em uppercase

Exemplos de labels:

"ASSISTÊNCIA TÉCNICA"

"DESDE 2019"

"JARDIM INGÁ"

"MANUTENÇÃO & ACESSÓRIOS"

Não inventar ano de fundação caso não seja possível confirmar.

Como o cliente informou apenas "há mais de 5 anos", utilizar preferencialmente "MAIS DE 5 ANOS".

---

# 55. CURSOR / INTERAÇÕES

No desktop, se fizer sentido, pode existir uma interação muito sutil no cursor.

Exemplo:

- Pequeno ponto luminoso
- Glow azul
- Reação ao hover

Não implementar cursor customizado exagerado.

Não prejudicar acessibilidade.

Desabilitar no mobile.

---

# 56. LOADING DE PRODUTOS

Preparar estados:

- Loading
- Empty
- Error
- Success

Caso a planilha não retorne produtos:

Mostrar uma mensagem elegante.

Não quebrar a interface.

---

# 57. GOOGLE SHEETS

A implementação inicial pode utilizar mock data.

Entretanto, a documentação deve explicar claramente como substituir posteriormente por Google Sheets.

Documentar:

1. Criar a planilha
2. Criar as colunas
3. Inserir produtos
4. Publicar ou disponibilizar os dados
5. Configurar a URL/API
6. Mapear os campos
7. Utilizar `getProducts()`
8. Atualizar o site

Evitar acoplar a interface diretamente ao Google Sheets.

---

# 58. QUALIDADE DE CÓDIGO

Seguir boas práticas:

- TypeScript bem tipado
- Componentes pequenos
- Responsabilidade única
- Evitar duplicação
- Nomes semânticos
- Código organizado
- Comentários somente quando necessários
- Evitar `any`
- Evitar código morto
- Evitar dependências desnecessárias

---

# 59. GSAP — ORGANIZAÇÃO

Organizar as animações de forma que não fiquem espalhadas aleatoriamente.

Criar hooks/utilitários quando necessário.

Garantir cleanup correto das animações e ScrollTriggers.

Evitar memory leaks.

Se utilizar React, considerar corretamente o ciclo de vida dos componentes.

Utilizar `gsap.context()` ou abordagem equivalente quando apropriado.

---

# 60. GSAP — PERFORMANCE

Preferir animar:

- transform
- opacity

Evitar animar constantemente:

- width
- height
- top
- left
- propriedades que provoquem layout

Utilizar `will-change` somente quando realmente necessário.

Não criar centenas de ScrollTriggers desnecessários.

---

# 61. ACESSIBILIDADE DOS BOTÕES

Todos os botões devem possuir:

- Estado hover
- Estado focus
- Estado active
- Contraste adequado

Não depender apenas de cor para indicar estado.

---

# 62. MAPA

O mapa deve ser carregado de maneira que não prejudique a performance inicial.

Se necessário, utilizar lazy loading.

No mobile, garantir que o mapa não impeça o scroll da página.

---

# 63. META / OPEN GRAPH

Criar metadata adequada.

Open Graph:

- Título
- Descrição
- Imagem da marca
- URL configurável

Utilizar a logo quando apropriado.

---

# 64. FAVICON

Utilizar a identidade da marca para o favicon.

Se possível, criar uma versão simplificada do símbolo da logo.

Não modificar a identidade.

---

# 65. ESTRUTURA FINAL DA PÁGINA

A ordem final deve ser:

1. Navbar
2. Hero
3. Quem Somos
4. Serviços
5. CTA de orçamento
6. Produtos
7. Por Que Nós
8. Contato
9. Mapa
10. Footer
11. WhatsApp flutuante

---

# 66. RESULTADO VISUAL ESPERADO

O resultado deve parecer uma empresa de assistência técnica moderna e estabelecida.

A primeira impressão deve ser:

"Essa empresa entende de tecnologia."

Não deve parecer:

"Uma assistência técnica simples feita com template."

A referência visual deve combinar:

- Tecnologia
- Luxo discreto
- Engenharia
- Eletrônica
- Precisão
- Minimalismo
- Preto
- Prata
- Branco
- Azul elétrico

---

# 67. INSPIRAÇÃO VISUAL

Use como referências conceituais:

- Interfaces de tecnologia premium
- Placas eletrônicas
- Equipamentos de precisão
- Laboratórios de eletrônica
- Design industrial
- Produtos tecnológicos premium
- Interfaces minimalistas
- Arquitetura moderna

Não copiar nenhuma marca específica.

---

# 68. NÃO FAZER

Não quero:

- Template genérico
- Design branco
- Excesso de azul
- Visual gamer
- Cyberpunk exagerado
- Emojis na interface
- Gradientes roxos
- Gradientes coloridos exagerados
- Imagens genéricas de celular flutuando
- Excesso de glassmorphism
- Cards excessivamente arredondados
- Animações exageradas
- Textos inventados
- Informações falsas
- Depoimentos fictícios
- Avaliações fictícias
- Números fictícios
- Produtos fictícios apresentados como estoque real
- Informações falsas sobre a empresa

---

# 69. CRITÉRIO PRINCIPAL DE DESIGN

Antes de considerar o projeto finalizado, faça esta avaliação:

"Este site parece pertencer à mesma marca da imagem `logo.jpeg`?"

Se a resposta for não, ajuste o design.

A identidade visual da logo deve ser claramente percebida através de:

- Preto
- Grafite
- Branco
- Prata
- Azul elétrico
- Circuitos
- Tecnologia
- Precisão
- Minimalismo
- Premium

---

# 70. CHECKLIST FINAL

Antes de finalizar o trabalho, verificar:

- [ ] Logo utilizada corretamente
- [ ] Identidade visual baseada na imagem
- [ ] Navbar funcionando
- [ ] Scroll suave funcionando
- [ ] Hero implementado
- [ ] Quem Somos implementado
- [ ] Serviços implementados
- [ ] CTA de WhatsApp funcionando
- [ ] Produtos implementados
- [ ] Mock de produtos criado
- [ ] Arquitetura preparada para Google Sheets
- [ ] `GOOGLE_SHEETS.md` criado
- [ ] Botão "Tenho interesse" funcionando
- [ ] Por Que Nós implementado
- [ ] Contato implementado
- [ ] Mapa implementado/preparado
- [ ] WhatsApp flutuante funcionando
- [ ] Footer implementado
- [ ] GSAP instalado/configurado
- [ ] ScrollTrigger implementado
- [ ] Animações de entrada implementadas
- [ ] Parallax implementado
- [ ] Hover states implementados
- [ ] Reduced Motion implementado
- [ ] Responsividade implementada
- [ ] Mobile revisado
- [ ] Desktop revisado
- [ ] SEO configurado
- [ ] Accessibility revisada
- [ ] Imagens otimizadas
- [ ] Sem overflow horizontal
- [ ] Sem erros de TypeScript
- [ ] Sem imports quebrados
- [ ] Build executado com sucesso

---

# 71. PRIMEIRO PASSO

Antes de começar a escrever o código:

1. Analise cuidadosamente `logo.jpeg`.
2. Identifique cores, formas, proporções, textura e linguagem visual.
3. Planeje a hierarquia visual.
4. Planeje a estrutura dos componentes.
5. Planeje as animações GSAP.
6. Planeje o comportamento responsivo.
7. Depois implemente.

Não fique apenas descrevendo o que faria.

**Implemente o projeto completo.**

Ao terminar, execute o build/testes disponíveis no projeto, corrija todos os erros encontrados e deixe a aplicação pronta para produção.