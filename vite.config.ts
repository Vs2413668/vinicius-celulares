import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: { target: 'es2020' },
  // Build de pré-renderização (src/entry-server.tsx): empacota as dependências
  // para que o script rode em Node sem depender do formato de cada pacote.
  ssr: { noExternal: true },
});
