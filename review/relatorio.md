# Relatório de trabalho · Site do Instituto Joãosinho Trinta

Última atualização: 22 de setembro de 2026, de madrugada.

Você foi dormir e pediu para eu seguir sozinho, tomando a opção recomendada em cada decisão e registrando tudo. É isto.

## O que existe agora

Duas versões completas do mesmo site, com as mesmas seções, os mesmos textos e as mesmas funções. O que muda é a identidade visual.

| Pasta | O que é |
|---|---|
| `joaosinho-trinta/` | **Versão 1, escura.** O barroco subversivo do seu primeiro pedido: preto de teatro, dourado, vermelho cardeal, plástico preto rasgado, asfalto molhado. |
| `joaosinho-trinta-instituto/` | **Versão 2, clara.** A identidade do site atual do Instituto: fundo claro, Roboto Slab, roxo, magenta, laranja, as curvas do logo e o círculo vermelho desenhado à mão. |
| `review/` | O que não vai para o ar: fotos originais, texturas, prévias, pacote de design e este relatório. |
| `review/relatorio.md` | Este arquivo. |
| `review/pacote-de-design.md` | Cada decisão criativa e cada linha de texto. |
| `review/ijt-fotos/` | As fotos baixadas do site do Instituto, nos arquivos originais. |
| `publicar.ps1` e `hostgator.env` | A publicação, pronta para quando a hospedagem existir. |
| `ver-sites.bat` | Dois cliques para abrir as duas versões no navegador. |

## Como olhar as duas versões

Dê dois cliques em **`ver-sites.bat`**. Ele liga o servidor local e abre as duas no navegador:

- Versão escura: http://localhost:8080/joaosinho-trinta/index.html
- Versão clara: http://localhost:8080/joaosinho-trinta-instituto/index.html

Deixe a janela preta aberta enquanto estiver vendo. Para fechar, Ctrl+C nela. Se você abrir o `index.html` com dois cliques, sem o servidor, o hero aparece parado: é o estado desenhado para celular, e é proposital.

## O caminho do site, seção por seção

1. **Hero** conduzido pelo scroll. Na versão escura, um plástico preto rasga ao meio e abre como cortina, revelando a escultura dourada. Na clara, o logo do Instituto vira cenário: a linha vertical, as curvas amarela e verde, e o arco (que é o arco da Apoteose) crescendo com a foto dentro. As quatro frases: "O povo gosta de luxo.", "Quem gosta de miséria é intelectual.", "Isopor, sucata e purpurina. Na avenida, virava ouro." e o assentamento com o logo e o botão.
2. **Ato I, O artista.** Biografia, retrato dele, linha do tempo e três fotos de arquivo dos desfiles de 1976, 1978 e 1983.
3. **Ato II, Os títulos.** "O Pelé do Carnaval." em letra monumental, com os oito títulos abaixo.
4. **Ato III, 1989.** A foto real da faixa "Mesmo proibido, olhai por nós" na avenida, Joãosinho vestido de gari com a mangueira, o trono dourado entre o lixo, e dois documentos da Censura de 1982.
5. **Ato IV, O segredo.** O momento interativo: segure o botão e a palavra LIXO, feita de cacos, vira LUXO, feita de lantejoulas. Ao completar, acendem os três verbos do Instituto: disseminar, replicar, compartilhar.
6. **Ato V, A avenida.** Galeria assimétrica com sete fotos grandes sangrando pelas bordas.
7. **Quem somos.** A história (criado em 21 de outubro de 2008 pelo próprio Joãosinho com José Ricardo Marques), o presépio de Brasília, missão, visão, valores, a faixa de compromisso e os cinco valores.
8. **A equipe.** As seis pessoas, com retrato, cargo e uma linha de história.
9. **Acervo.** Oito fotos do acervo do Instituto.
10. **Projetos.** Presépio de Brasília, Carnaval de Cavalcante e São Gonçalo.
11. **Coluna IJT.** Os quatro textos, com link para o original.
12. **Perguntas.** Quatro objeções reais respondidas.
13. **Junte-se a nós.** Formulário, WhatsApp, telefone, e-mail e endereço.
14. **Rodapé.** Logo, CNPJ, contatos, redes e os créditos de todas as fotos com autor e licença.

## Decisões que eu tomei sozinho

1. **Higgsfield de lado e foto no lugar do vídeo**, como você pediu. Custo zero de créditos.
2. **Fotos de uso livre** (14, do Wikimedia Commons), tratadas e creditadas.
3. **Fotos do próprio Instituto** (você pediu): seis retratos da equipe, a faixa de 1989, o gari com a mangueira, o presépio, o retrato dele e oito do acervo.
4. **Logo oficial** baixado do site deles. Na versão escura, dourado no menu e no fim do hero, colorido no rodapé. Na clara, colorido em todo lugar.
5. **"O Pelé do Carnaval" em destaque**, abrindo o ato dos títulos. A frase é do próprio site do Instituto.
6. **Formulário por e-mail.** Sem servidor por trás, o envio abre o programa de e-mail do visitante com a mensagem pronta para contato@institutojoaosinhotrinta.com.br.
7. **O menu segue o do site atual**: O artista, Quem somos, Projetos, Coluna IJT, mais o botão Junte-se.
8. **Textos do Instituto reescritos em linguagem simples**, mantendo o sentido do que está no site deles. Missão, visão e valores estão fiéis ao conteúdo original.
9. **Compressão das imagens.** Reduzi de 6,7 MB para 4,6 MB por versão sem perda visível.
10. **Cor quente nas fotos do acervo na versão escura**, para elas conversarem com o preto e o ouro.

## O que eu testei, e o resultado

Tudo isto rodou no Chrome da sua máquina, em modo invisível, nas duas versões.

- **Teste de flick** (rolar como gente de verdade, em passos de 120, 240 e 360 pixels): cada frase do hero fica inteira na tela por 6 a 7 roladas normais, e nenhuma é pulável na rolada agressiva. A regra pede 5.
- **Legibilidade no pior quadro** (escondo as letras, fotografo o fundo atrás delas e meço o pixel mais crítico): versão escura entre 4,2 e 17 para 1; versão clara entre 5 e 11,6 para 1. A regra pede 3,5 para 1.
- **Celular** (375 por 812, com toque): as duas entregam o hero parado e composto, sem rolagem lateral, com botões de 48 pixels de altura. O celular baixa só a foto leve.
- **Movimento reduzido**: liga e desliga no meio da sessão. Tudo fixa no estado final e volta a funcionar quando o movimento retorna, sem sobras.
- **Sem JavaScript**: a página inteira aparece, com o hero parado.
- **Fotos bloqueadas**: a página continua completa e legível.
- **Formulário**: valida campos vazios, avisa e-mail errado, e mostra o estado de sucesso.
- **Momento interativo**: segurar completa, soltar cedo desfaz devagar, concluir acende os verbos, e o "ver de novo" recomeça.
- **Console do navegador**: zero erros nas duas, no desktop e no celular.
- **Rolagem lateral**: nenhuma, em nenhuma largura.
- **Gate de texto**: zero travessões e zero palavras de escritório nas duas.

**Números de velocidade, medidos aqui no computador** (os números de verdade só saem com o site no ar):

- Página, folha de estilo e código: 109 KB na versão escura, 107 KB na clara.
- Carregamento completo: cerca de 1,2 segundo.
- Foto do hero: 449 KB. Todas as imagens da página inteira somadas: 4,6 MB, e cada visitante baixa só o que vê, porque as fotos carregam conforme a rolagem.

## Consertos que fiz durante os testes

- A metade direita do plástico estava invisível (espelhar a textura espelhava também o recorte).
- A sombra do texto apagava o dourado da manchete.
- As frases 2, 3 e 4 do hero encostavam nas plumas douradas: abri mais céu preto e escureci o lado do texto.
- A linha preta do logo e o confete escuro passavam atrás do texto na versão clara.
- As legendas da galeria eram cobertas pela foto ao rolar.
- Os números romanos dos projetos ficavam confusos em contorno.
- O "Ver de novo" do LIXO/LUXO às vezes não desfazia.
- O pé do L desaparecia no LUXO.
- No celular, a versão escura baixava a foto grande do hero por causa do fundo da seção de contato.

## O que ficou para você decidir

1. **Qual versão fica no ar.** Ou as duas, uma delas num endereço tipo `/escura`.
2. **Publicação na HostGator.** Precisa de um plano ativo. Quando tiver, você abre o arquivo `hostgator.env`, preenche o endereço do servidor, o usuário e a senha do cPanel (nada disso passa pelo chat), e eu rodo o `publicar.ps1`. Também preciso trocar duas etiquetas de pré-visualização de link pelo endereço real, que estão marcadas no código com o comentário `DEPLOY STEP`.
3. **E-mail com duas grafias.** Na página de contato do site atual está `contato@institutojoasinhotrinta.com.br` (sem o "o" no meio) e no rodapé `contato@institutojoaosinhotrinta.com.br`. Usei a segunda. Confirme qual recebe de verdade.
4. **Textos e cargos da equipe.** Escrevi a partir do site atual. Vale uma leitura para confirmar cargos, datas e grafias.
5. **A página Projetos do site atual está com texto de exemplo.** Usei só os projetos citados em Quem Somos e nas notícias. Se você tiver a lista real, eu completo.
6. **A Coluna IJT** leva para os textos no site atual. Se o site novo substituir o antigo no mesmo endereço, esses links precisam de outro destino.
