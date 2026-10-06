# Produtos via Google Sheets

O site carrega os produtos por uma única função, `getProducts()` (`src/lib/products.ts`).
Nenhum componente acessa a planilha diretamente:

```
Google Sheets → CSV publicado → getProducts() → interface (Products / ProductCard)
```

Enquanto nenhuma planilha estiver configurada, `getProducts()` usa os **produtos demonstrativos**
de `src/data/products.ts`. Esses registros servem apenas para visualizar o layout e
**não representam estoque real**.

---

## Planilha e pasta em uso

- **Planilha:** [https://docs.google.com/spreadsheets/d/1Nbdiw9G8l6Zr-WNv2FxjALliIgeeXwj3IQ31GDtzFrE/edit](https://docs.google.com/spreadsheets/d/1Nbdiw9G8l6Zr-WNv2FxjALliIgeeXwj3IQ31GDtzFrE/edit)
- **CSV lido pelo site:** `https://docs.google.com/spreadsheets/d/1Nbdiw9G8l6Zr-WNv2FxjALliIgeeXwj3IQ31GDtzFrE/export?format=csv` (configurado em `VITE_PRODUCTS_CSV_URL`, arquivo `.env`)
- **Pasta de imagens:** [https://drive.google.com/drive/folders/11aUz5eBTMwuwsWMg1uTQuRcCmg3Qvr7z](https://drive.google.com/drive/folders/11aUz5eBTMwuwsWMg1uTQuRcCmg3Qvr7z)

Os dois ficam no Google Drive pessoal do Iggor, compartilhados como
"Qualquer pessoa com o link: Leitor".

## Atalho: importar a planilha pronta

O arquivo [`planilha/produtos.csv`](planilha/produtos.csv) já tem todas as colunas e os 13 produtos atuais.

1. No Google Drive, abra a pasta da planilha e clique em **Novo → Upload de arquivo**, escolhendo `produtos.csv`.
2. Clique com o botão direito no arquivo enviado → **Abrir com → Planilhas Google**. Isso cria a planilha.
3. Opcional: apague o arquivo `.csv` original e renomeie a planilha (ex.: `Vinícius Celulares — Produtos`).
4. Siga a partir do passo 4 (publicar os dados).

Se a planilha abrir com acentos quebrados, use **Arquivo → Importar → Upload** dentro de uma planilha em branco
e escolha "Detectar automaticamente" no separador.

## 1. Criar a planilha

1. Acesse [sheets.google.com](https://sheets.google.com) e crie uma planilha em branco.
2. Dê um nome, por exemplo: `Vinícius Celulares — Produtos`.
3. Use **apenas a primeira aba** para os produtos.

## 2. Criar as colunas

A **linha 1** deve conter exatamente estes cabeçalhos (sem acentos, em minúsculas):

| Coluna      | Obrigatória | Descrição                                                                         |
| ----------- | ----------- | --------------------------------------------------------------------------------- |
| `id`        | sim         | Identificador único (ex.: `1`, `2`, `3`...)                                       |
| `nome`      | sim         | Nome exibido no card e na mensagem do WhatsApp                                    |
| `categoria` | sim         | `Celulares`, `Acessórios` ou `Eletrônicos` (outras categorias também funcionam)  |
| `descricao` | não         | Texto curto (1 linha)                                                             |
| `preco`     | não         | `2999.90`, `2.999,90` ou `R$ 2.999,90`. **Vazio exibe "Consulte o valor"**        |
| `imagem`    | não         | URL pública da imagem. Vazio usa a logo como imagem                               |
| `destaque`  | não         | `SIM` para aparecer na vitrine **Destaques**                                      |
| `ativo`     | sim         | `SIM` para exibir no site. `NÃO` esconde o produto sem apagá-lo                   |
| `ordem`     | não         | Número para ordenar (menor aparece primeiro)                                      |

Colunas opcionais usadas na **página do produto** (`/produtos/nome-do-produto`):

| Coluna           | Descrição                                                                                   |
| ---------------- | ------------------------------------------------------------------------------------------- |
| `marca`          | Ex.: `Apple`, `Xiaomi`                                                                      |
| `condicao`       | Ex.: `Novo`, `Seminovo`, `Seminovo — 2 meses de uso`                                        |
| `detalhes`       | Texto completo da página. Vazio usa a `descricao`                                           |
| `imagens`        | URLs extras para a galeria, separadas por `\|`                                              |
| `especificacoes` | Pares `Rótulo: valor` separados por `\|`. Ex.: `Armazenamento: 128GB \| Bateria: 76%`       |

A ordem das colunas não importa — o site lê pelo nome do cabeçalho.

### URLs geradas

- Cada produto ganha uma página em `/produtos/<nome-em-minusculas-sem-acentos>`
  (ex.: `iPhone 13 Pro 128GB` → `/produtos/iphone-13-pro-128gb`).
  **Alterar o nome muda a URL** do produto.
- Cada categoria ganha uma página em `/produtos/categoria/<categoria>` (ex.: `/produtos/categoria/acessorios`).

## 3. Inserir produtos

Exemplo (dados fictícios, apenas para ilustrar o formato):

| id | nome             | categoria   | descricao              | preco   | imagem        | destaque | ativo | ordem |
| -- | ---------------- | ----------- | ---------------------- | ------: | ------------- | -------- | ----- | ----: |
| 1  | iPhone 13        | Celulares   | Smartphone Apple 128GB | 2999.90 | URL_DA_IMAGEM | SIM      | SIM   | 1     |
| 2  | Galaxy A55       | Celulares   | Smartphone Samsung     | 1899.90 | URL_DA_IMAGEM | SIM      | SIM   | 2     |
| 3  | Carregador USB-C | Acessórios  | Carregador rápido      | 89.90   | URL_DA_IMAGEM | NÃO      | SIM   | 3     |
| 4  | Cabo USB-C       | Acessórios  | Cabo de carregamento   | 39.90   | URL_DA_IMAGEM | NÃO      | SIM   | 4     |
| 5  | Fone Bluetooth   | Eletrônicos | Fone sem fio           | 149.90  | URL_DA_IMAGEM | NÃO      | SIM   | 5     |

**Valores aceitos em `destaque` e `ativo`:** `SIM`, `S`, `X`, `TRUE`, `1` (qualquer outro valor = não).

### Imagens

A coluna `imagem` precisa de uma URL **pública e direta** para o arquivo. Opções:

- **Arquivos do próprio site:** coloque a imagem em `public/images/produtos/` e use
  `/images/produtos/nome-do-arquivo.webp`.
- **Serviço de imagens** (Cloudinary, ImgBB, Imgur etc.): use o link direto do arquivo.
- **Google Drive:** deixe a pasta de imagens como **"Qualquer pessoa com o link: Leitor"**
  (Compartilhar → Acesso geral). Depois, clique com o botão direito na foto → **Compartilhar → Copiar link**
  e cole na coluna `imagem`. O site converte o link do Drive automaticamente.

  Como o Google Drive limita o acesso direto às imagens (erro 429), o site exibe as fotos do Drive
  pelo proxy de imagens [wsrv.nl](https://wsrv.nl), que guarda uma cópia em cache e entrega a foto
  redimensionada em WebP. O endereço do proxy fica em `DRIVE_IMAGE_PROXY` (`src/lib/products.ts`).

> Os produtos atuais usam imagens do próprio site (`/images/produtos/...`). Elas continuam funcionando;
> troque pelo link do Drive apenas se quiser gerenciar as fotos pela pasta.

Recomendado: imagens verticais 4:5 (ex.: 800×1000 px), até ~200 KB.

## 4. Publicar os dados

**Opção mais simples (usada no site):** com a planilha compartilhada como
"Qualquer pessoa com o link: Leitor", use o link de exportação:

```
https://docs.google.com/spreadsheets/d/ID_DA_PLANILHA/export?format=csv
```

`ID_DA_PLANILHA` é o trecho entre `/d/` e `/edit` no endereço da planilha. A exportação lê a primeira aba.

**Alternativa:** publicar a planilha.

1. Na planilha: **Arquivo → Compartilhar → Publicar na Web**.
2. Em "Link", escolha a **aba dos produtos** e o formato **Valores separados por vírgula (.csv)**.
3. Clique em **Publicar** e copie a URL gerada. Ela tem este formato:

   ```
   https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?gid=0&single=true&output=csv
   ```

A planilha publicada é somente leitura: ninguém consegue editá-la pelo link.
Não coloque informações sensíveis nela.

## 5. Configurar a URL

Crie (ou edite) o arquivo `.env.local` na raiz do projeto:

```bash
VITE_PRODUCTS_CSV_URL=https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?gid=0&single=true&output=csv
```

Na hospedagem (Vercel, Netlify etc.), cadastre a mesma variável `VITE_PRODUCTS_CSV_URL`
nas configurações de variáveis de ambiente do projeto.

## 6. Mapeamento dos campos

A conversão linha → produto está em `mapRowToProduct()` (`src/lib/products.ts`):

| Planilha    | `Product`     | Regra                                         |
| ----------- | ------------- | --------------------------------------------- |
| `id`        | `id`          | texto; se vazio usa o nome                    |
| `nome`      | `name`        | texto                                         |
| `categoria` | `category`    | texto                                         |
| `descricao` | `description` | texto                                         |
| `preco`     | `price`       | número ou `null` (exibe "Consulte o valor")  |
| `imagem`    | `image`       | URL; se vazia usa a logo                      |
| `destaque`  | `featured`    | `SIM` → `true`                                |
| `ativo`     | `active`      | `SIM` → `true`; inativos não são exibidos     |
| `ordem`     | `order`       | número; vazio vai para o final                |
| `nome`      | `slug`        | gerado automaticamente para a URL             |
| `marca`     | `brand`       | texto                                         |
| `condicao`  | `condition`   | texto                                         |
| `detalhes`  | `details`     | texto; se vazio usa `descricao`               |
| `imagens`   | `images`      | lista (a `imagem` principal vem primeiro)     |
| `especificacoes` | `specs`  | lista de `{ label, value }`                   |

Para adicionar uma nova coluna, inclua-a em `ProductSheetRow` e `Product`
(`src/data/products.ts`), em `COLUMNS` e em `mapRowToProduct()`.

## 7. Usar `getProducts()`

```ts
import { getProducts } from './lib/products';

const products = await getProducts(); // Product[] ativos, ordenados por `ordem`
```

A interface já usa a função através do hook `useProducts()` (`src/hooks/useProducts.ts`),
que trata os estados de **carregando**, **erro** (com botão "Tentar novamente"),
**vazio** e **sucesso**. Nenhum componente precisa ser alterado ao trocar a fonte de dados.

## 8. Atualizar o site

Se o Google recusar a leitura da planilha (ex.: limite de requisições), o site tenta um
endereço alternativo e, se ainda falhar, mostra a última versão carregada naquele navegador.

- **Alterações de produtos:** basta editar a planilha. O Google atualiza o CSV publicado
  em alguns minutos (cache de ~5 min) e o site passa a exibir os novos dados no próximo
  carregamento da página — sem novo deploy.
- **Alteração da URL da planilha:** atualize `VITE_PRODUCTS_CSV_URL` e faça um novo build/deploy
  (`npm run build`).

### Checklist rápido

- [ ] Cabeçalhos da linha 1 idênticos aos da tabela acima
- [ ] `ativo = SIM` nos produtos que devem aparecer
- [ ] URLs de imagens públicas
- [ ] Planilha publicada em CSV
- [ ] `VITE_PRODUCTS_CSV_URL` configurada no ambiente
