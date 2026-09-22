# Pacote de design · Instituto Joãosinho Trinta

Nível 1 adaptado: sem vídeo (Higgsfield deixado de lado a pedido do usuário). O hero é uma foto real (#92, Beija-Flor 2016, Tomaz Silva/Agência Brasil, CC BY 3.0 BR) conduzida pelo scroll: um plástico preto rasgado abre como cortina, a câmera se aproxima do ouro. Desvio dito em voz alta ao usuário.

## 1. Premissa

**Luxo.** Joãosinho Trinta provou que o luxo é do povo e que se faz com o que se tem: isopor, sucata e purpurina, transformados por ofício. Em 1989, quando proibiram o Cristo mendigo, ele cobriu a escultura com plástico preto e desfilou assim mesmo. O Instituto que leva o nome dele continua o mesmo trabalho: boas práticas de produção cultural que transformam pouco em muito. Cada seção serve a essa ideia, e a página termina no convite para fazer parte disso.

## 2. Paleta (amostrada da foto #92 e do briefing)

```css
:root{
  --canvas:#0b0a09;        /* preto de teatro, tingido quente */
  --panel:#141210;
  --panel-2:#1c1916;
  --asphalt:#2b2c2e;       /* asfalto molhado */
  --asphalt-hi:#4b4e52;
  --plastic:#070709;
  --gold:#d4af37;
  --gold-hi:#f3dc8f;
  --gold-deep:#8c6a1d;
  --accent:#990000;        /* vermelho cardeal: CTA, carimbo PROIBIDO */
  --accent-hover:#b3100f;
  --accent-ring:#ff4a3d;   /* foco visível (5.9:1 sobre a tela) */
  --accent-muted:rgba(153,0,0,.35);
  --text-primary:#f1e8d8;
  --text-secondary:#a99f90;
}
```

## 3. Trio de fontes

- Display: **Noto Serif Display**, largura 62.5 (condensada, alta, de cartaz de ópera), pesos 300 e 600, itálico 300.
- Texto: **Archivo** 400, 500, 600.
- Rótulos: **Courier Prime** 400 e 700, a máquina de escrever dos documentos da Censura.

## 4. Mapa de faixas (hero de 560vh, pontos de partida)

| Faixa | Intervalo | Momento da foto | Texto (ao pé da letra) | Entrada |
|---|---|---|---|---|
| 1 | 0.00 a 0.22 | Escultura coberta pelo plástico, uma fresta de luz no meio | kicker "Joãosinho Trinta · 1933 a 2011" / título "O povo gosta de luxo." / dica "Role para rasgar o plástico" | lantejoula: caracteres pousam com brilho (rampa de carregamento) |
| 2 | 0.25 a 0.49 | O plástico rasga e abre para os lados | "Quem gosta de miséria é intelectual." / "Joãosinho Trinta, carnavalesco" | metades se abrindo, eco do rasgo |
| 3 | 0.52 a 0.74 | Aproximação do ouro, poeira dourada no ar | "Isopor, sucata e purpurina." / "Na avenida, virava ouro." | dispersão: cacos que se juntam |
| 4 | 0.78 a 1.00 | Repouso no ouro, escultura inteira à mostra | logo oficial do Instituto em dourado / título "Onde houver cultura, haverá desenvolvimento humano." / sub "Desde 2008, a gente leva o ofício dele para quem faz cultura no Brasil." / botões "Junte-se a nós" e "Conheça a história" | subida palavra por palavra em etapas |

## 5. Hero estático (celular e movimento reduzido)

Foto #92 com o plástico já rasgado e aberto. Kicker "Joãosinho Trinta · 1933 a 2011", título "O povo gosta de luxo.", linha "Quem gosta de miséria é intelectual.", botão "Junte-se a nós".

## 6. Abaixo da dobra

**Ato I · O artista** (triptico de arquivo 1976, 1978, 1983)
- Título: "Do palco do Municipal para a avenida."
- Texto: "Nasceu em São Luís, no Maranhão, em 1933. Chegou ao Rio aos 17 anos, numa terça-feira de Carnaval. Foi bailarino do Theatro Municipal por trinta anos, dançando Aida e O Guarani. Em 1961 entrou no Salgueiro. Levou para a Sapucaí o que aprendeu na ópera: cenário, luz e grandeza."
- Linha do tempo: 1933 São Luís, Maranhão / 1951 Chega ao Rio numa terça de Carnaval / 1961 Entra no Salgueiro / 1974 Primeiro título como carnavalesco / 1976 Começa a era Beija-Flor / 2011 Morre em São Luís, aos 78 anos
- Legendas: "1976 · Sonhar com rei dá leão. Beija-Flor. Foto: Anibal Philot" / "1978 · A criação do mundo na tradição Nagô. Beija-Flor. Foto: Luiz Pinto" / "1983 · A grande constelação das estrelas negras. Beija-Flor. Foto: Ricardo Chaves"

**Ato II · Os títulos** (letreiro monumental)
- Título (destaque pedido pelo usuário): "O Pelé do Carnaval." / linha: "Era assim que o chamavam. Foram oito títulos como carnavalesco."
- 1974 Salgueiro, O Rei de França na Ilha da Assombração / 1975 Salgueiro, O Segredo das Minas do Rei Salomão / 1976 Beija-Flor, Sonhar com Rei dá Leão / 1977 Beija-Flor, Vovó e o Rei da Saturnália na Corte Egipciana / 1978 Beija-Flor, A Criação do Mundo na Tradição Nagô / 1980 Beija-Flor, O Sol da Meia-Noite, uma Viagem ao País das Maravilhas / 1983 Beija-Flor, A Grande Constelação das Estrelas Negras / 1997 Viradouro, Trevas! Luz! A Explosão do Universo

**Ato III · 1989** (asfalto, plástico, carimbo PROIBIDO)
- Título: "Mesmo proibido, olhai por nós."
- Texto: "Rio, 7 de fevereiro de 1989. A Beija-Flor entra na Sapucaí com Ratos e Urubus, Larguem Minha Fantasia. Mendigos, sucata e lixo na avenida. No alto, um Cristo mendigo que a Justiça tinha proibido de desfilar. Ele passou assim mesmo, coberto de plástico preto, com uma faixa: mesmo proibido, olhai por nós."
- "Joãosinho desfilou vestido de gari, com uma mangueira na mão. A escola ficou em segundo lugar. O desfile ficou na história."
- Foto #21 legenda: "2010 · A Grande Rio homenageia Joãosinho. Ele passa num trono dourado, entre lixo e ratos. Foto: Carnaval.com Studios"
- Documentos #48 e #53 legenda: "Tudo passava pela Censura. Desenho de fantasia e samba-enredo da Beija-Flor, carimbados em 1982. Arquivo Nacional, domínio público."

**Ato IV · O segredo** (o momento interativo)
- Título: "Ele fazia luxo com o que a cidade jogava fora."
- Texto: "Isopor, garrafa, sucata e brilho. Nas mãos dele, tudo virava ouro. É esse ofício que o Instituto leva adiante."
- Botão: "Segure para transformar" / concluído: "Ver de novo"
- Revelado ao concluir: "Disseminar. Os princípios de planejamento e produção cultural, para diferentes públicos, com os recursos que cada lugar tem." / "Replicar. Técnicas, conhecimento e lições aprendidas, para projetos públicos e privados de todos os tamanhos." / "Compartilhar. Práticas e casos de sucesso com quem trabalha com cultura."

**Ato V · A avenida** (galeria assimétrica, fotos sangrando)
- Título: "O luxo que ele defendeu continua desfilando."
- 7 fotos (#89, #65, #85, #100, #29, #84, #104) com legenda e crédito.

**Ato VI · O instituto**
- Título grande: "O apoio à cultura é a força que o nosso país precisa."
- Texto: "O Instituto Joãosinho Trinta é uma organização da sociedade civil criada em 2008. A missão é levar boas práticas ao setor cultural e ajudar a estruturar a economia criativa, qualificando quem faz cultura em todas as linguagens."
- Letreiro de valores: Transparência · Inovação e inclusão · Ética e justiça · Sustentabilidade · Dinamismo
- Projetos: "Presépio de Brasília. Projeto do Instituto na capital, mostrado no Fantástico." / "Carnaval de Cavalcante. Em Goiás, um carnaval pensado a partir das vocações da região." / "São Gonçalo. Consultoria para a Secretaria de Cultura da cidade, no Rio de Janeiro."

**Perguntas**
1. "O Instituto só trabalha com Carnaval?" / "Não. O Carnaval é a escola de onde a gente vem, mas o trabalho vale para todas as linguagens: teatro, música, dança, cinema, festas populares e patrimônio."
2. "A minha cidade pode contratar o Instituto?" / "Pode. Já prestamos consultoria à Secretaria de Cultura de São Gonçalo e fizemos projetos em Brasília e em Cavalcante, Goiás. Conte o que a sua cidade quer fazer e a gente desenha o caminho junto."
3. "Como a minha empresa pode apoiar?" / "Apoiando um projeto, levando uma ação cultural para a sua comunidade ou propondo uma parceria. A gente cuida do planejamento e mostra o resultado de cada etapa."
4. "Como vocês prestam contas?" / "Transparência é o primeiro valor da casa. Cada recurso é gerido com cuidado, e os resultados ficam públicos para que as lições sirvam a todos."

**Junte-se a nós (a única chamada para ação)**
- Título: "Junte-se a nós."
- Texto: "Tem um projeto, uma cidade ou uma empresa que quer fazer cultura com luxo de verdade? Conte para a gente."
- Campos: Nome ("Como você se chama"), E-mail ("seu@email.com"), Você é (Produtor ou artista / Gestor público / Empresa ou patrocinador / Outro), Mensagem ("Conte o que você quer fazer")
- Botão: "Fale com a gente"
- Microtexto: "Ao enviar, o seu programa de e-mail abre com a mensagem pronta para contato@institutojoaosinhotrinta.com.br."
- Sucesso: "Pronto. A mensagem abriu no seu e-mail. É só apertar enviar."
- Destino: link mailto para o e-mail do Instituto.
- Contatos diretos: WhatsApp (21) 98960-0559, e-mail, Rua Acre 83, sala 1106, Centro, Rio de Janeiro, RJ.

**Rodapé**: marca IJT, endereço, contatos, Instagram e Facebook, créditos de todas as fotos com licença, nota "Imagens tratadas (corte e cor)".

## 7. Camada vetorial

- Plástico preto rasgado (a assinatura): textura renderizada com filtro de luz especular, bordas rasgadas geradas com semente, usado no hero e como faixas divisórias entre atos.
- Ornamento barroco dourado (volutas em C espelhadas) que se traça no scroll, abrindo cada ato.
- Poeira dourada no hero (partículas em nível de sussurro saindo do rasgo).
- Camada de ambiente fixa: concreto rachado que vira lantejoula, com deriva de 90s e grão.

## 8. Engenharia

Palco sticky com progresso 0 a 1, interpolação normalizada por dt que descansa, escritas de DOM só na mudança, faixas com platô e rampas suavizadas, sistema de legibilidade de quatro camadas, os cinco portões do hero estático vivos com listeners, movimento reduzido ao vivo nas duas direções, pausa em aba escondida, completo sem JavaScript.

## 9. Gate de texto

Cada linha acima embarca ao pé da letra. Antes de mostrar: zero travessões, zero palavras de estoque, varredura de sinais de IA. Dispositivos deliberados ("Isopor, sucata e purpurina.", "Disseminar. Replicar. Compartilhar.") são ofício e ficam.


---

## Atualizações depois da primeira construção

**Duas versões.** A pasta `joaosinho-trinta/` mantém o barroco subversivo. A pasta `joaosinho-trinta-instituto/` traz a mesma estrutura na identidade do site do Instituto: fundo #fbf9f6, Roboto Slab, roxo #65225e, magenta #e4054c, laranja #f08700, amarelo #ffd200 e verde #4da82f do logo. A assinatura muda de mídia: no lugar do plástico rasgado, o logo vira cenário (linha vertical, curvas amarela e verde, e o arco da Apoteose com a foto dentro) e o círculo vermelho desenhado à mão marca as palavras-chave, como no site deles.

**Destaque pedido pelo usuário.** "O Pelé do Carnaval." abre o Ato II, em letra monumental. Na versão escura, um brilho de medalha atravessa as letras; na clara, o círculo à mão envolve "Pelé".

**Logo oficial.** Arquivos `marca-03.png` (colorida) e `marca-04.png` (uma cor) baixados do site do Instituto. Versão escura: dourado no menu e no assentamento (máscara sobre o degradê de ouro), colorida no rodapé sobre placa clara. Versão clara: colorida em todo lugar.

**Fotos do acervo do Instituto** (pedido do usuário), todas com a legenda "Foto do acervo do Instituto":
- Retrato de Joãosinho na biografia do Ato I.
- No Ato III: a foto real da faixa "Mesmo proibido, olhai por nós" na avenida e Joãosinho vestido de gari com a mangueira.
- Presépio de Brasília no Quem somos.
- Seis retratos da equipe.
- Oito fotos na seção Acervo.

**Seções novas, com o conteúdo do menu do site atual.** Quem somos (história, missão, visão, valores), A equipe (seis pessoas), Acervo, Projetos e Coluna IJT (quatro textos com link para o original). O texto de cada uma está no `relatorio.md` e no HTML, e foi escrito a partir das páginas do Instituto em linguagem simples.

**Ajuste de texto pelo gate:** "Soluções simples para os desafios da cultura" virou "Caminhos simples para os desafios da cultura", porque "soluções" está na lista de palavras de escritório proibidas.
