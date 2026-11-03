# Portfólio de Pedro Henrique Menezes

Código-fonte em `source/`. O GitHub Pages publica a raiz da branch `master`; `index.html` e `assets/` são os arquivos gerados para o site.

```sh
npm ci
npm run dev
```

Antes de enviar alterações ao site:

```sh
npm run build
```

O build verifica o TypeScript, gera `dist/` e atualiza os arquivos publicados na raiz. Inclua `index.html` e `assets/` no mesmo commit das alterações de código.
