import { Component } from '@angular/core';

@Component({
  selector: 'app-tabuleiro',
  templateUrl: './tabuleiro.component.html',
  styleUrls: ['./tabuleiro.component.css'],
})

export class TabuleiroComponent {

  colunas: string[] = [];
  fileiras: string[] = [];
  
  estadoTabuleiro: any[][] = [];
  casaSelecionada: HTMLElement | null = null;
  movimentosValidos: string[] = [];
  pecasPretas: string[] = ['k', 'q', 'r', 'b', 'n', 'p'];
  pecasClaras: string[] = ['K', 'Q', 'R', 'B', 'N', 'P'];
  turnoDe: string = 'Brancas';
  jogandoComo: string = 'Brancas';
  casasEscuras =
    ['b8', 'd8', 'f8', 'h8'
    , 'a7', 'c7', 'e7', 'g7'
    , 'b6', 'd6', 'f6', 'h6'
    , 'a5', 'c5', 'e5', 'g5'
    , 'b4', 'd4', 'f4', 'h4'
    , 'a3', 'c3', 'e3', 'g3'
    , 'b2', 'd2', 'f2', 'h2'
    , 'a1', 'c1', 'e1', 'g1'];
  casasClaras =
    ['a8', 'c8', 'e8', 'g8'
    , 'b7', 'd7', 'f7', 'h7'
    , 'a6', 'c6', 'e6', 'g6'
    , 'b5', 'd5', 'f5', 'h5'
    , 'a4', 'c4', 'e4', 'g4'
    , 'b3', 'd3', 'f3', 'h3'
    , 'a2', 'c2', 'e2', 'g2'
    , 'b1', 'd1', 'f1', 'h1'];

  ngOnInit() {
    this.defineColunasFileiras();
  }

  ngAfterViewInit(){
    this.colorirCasas();
    this.resetaTabuleiro();
  }
  
  defineColunasFileiras() {
    if(this.jogandoComo === 'Brancas'){
      this.colunas = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
      this.fileiras = ['8', '7', '6', '5', '4', '3', '2', '1'];
    } else { // Jogando como 'Pretas'
      this.colunas = ['h', 'g', 'f', 'e', 'd', 'c', 'b', 'a'];
      this.fileiras = ['1', '2', '3', '4', '5', '6', '7', '8'];
    }
  }

  colorirCasas() {
    const casas = document.querySelectorAll('.casa');

    casas.forEach((casa: Element) => {
      if (this.casasClaras.includes(casa.id)) {
        (casa as HTMLElement).style.backgroundColor = '#FFFFE0';
        (casa as HTMLElement).style.border = '';
      }

      if (this.casasEscuras.includes(casa.id)) {
        (casa as HTMLElement).style.backgroundColor = '#008000';
        (casa as HTMLElement).style.border = '';
      }
    })
  }

  resetaTabuleiro() {
    this.estadoTabuleiro = [
      ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
      ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
      ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
    ];

    this.inserirPecas();
  }

  inserirPecas() {
    document.querySelectorAll('.casa').forEach(casa => {
      var posicaoCasa = (casa as HTMLElement).id;
      var idPeca = this.retornoPecaPorCasa(posicaoCasa);

      casa.innerHTML = ` <img src="${this.getImagensPecas(idPeca)}" alt=""> `

    })
  }

  retornoPecaPorCasa(casa: string): string {
    const coluna = casa.charCodeAt(0) - 97; // converte 'a' pra 0, 'b' pra 1, assim por diante
    const fileira = 8 - parseInt(casa.charAt(1)); // converte '8' pra 0, '7' pra 1, assim por diante

    return this.estadoTabuleiro[fileira][coluna];
  }

  getImagensPecas(peca: string): string {
    const imagens: { [key: string]: string } = {
      '': '',
      'k': 'assets/pecas/pretas-rei.png',
      'q': 'assets/pecas/pretas-rainha.png',
      'r': 'assets/pecas/pretas-torre.png',
      'b': 'assets/pecas/pretas-bisbo.png',
      'n': 'assets/pecas/pretas-cavalo.png',
      'p': 'assets/pecas/pretas-peao.png',
      'K': 'assets/pecas/brancas-rei.png',
      'Q': 'assets/pecas/brancas-rainha.png',
      'R': 'assets/pecas/brancas-torre.png',
      'B': 'assets/pecas/brancas-bispo.png',
      'N': 'assets/pecas/brancas-cavalo.png',
      'P': 'assets/pecas/brancas-peao.png'
    };

    return imagens[peca];
  }

  onCasaClick(selecao: EventTarget | null) {
    if (selecao instanceof HTMLElement) {
      
      // Caso clique em cima da imagem, pega a casa da imagem
      const casa = selecao.closest('li');
      
      if (casa) {
        this.selecionaPeca(casa);
      }
    }
  }

  selecionaPeca(casa: HTMLElement) {
    
    if (this.casaSelecionada == null) {
      console.log('Nova casa selecionada!')
      this.casaSelecionada = casa;
      this.movimentosValidos = this.selecionaMovimentosValidos(this.casaSelecionada);

      this.movimentosValidos.forEach(casa => {
        const casaHtml = document.getElementById(casa);
        (casaHtml as HTMLElement).style.backgroundColor = '#FFD700'
      } );
      casa.style.borderStyle = 'solid'
      
    } else { // Caso selecione uma casa diverente da selecionada
      console.log('Casa diverente selecionada!')
      const casaDestino = casa.id;
      const casaOriginal = this.casaSelecionada.id;

      // Valida se a casa selecionada é um movimento valido 
      if (this.validaMovimento(casaOriginal, casaDestino)) {
        this.movePeca(casaOriginal, casaDestino);
      }

      // Limpa a seleção
      this.colorirCasas();
      this.casaSelecionada = null;

    }
  }

  selecionaMovimentosValidos(casaSelecionada: HTMLElement): string[] {
    const peca = this.retornoPecaPorCasa(casaSelecionada.id);

    // Seleciona uma lista de casas que o movimento é valido
    switch (peca){
      case 'P':
        return this.validaMovPeaoBranco(casaSelecionada.id);
        
      case 'p':
        return this.validaMovPeaoPreto(casaSelecionada.id);

      case 'N':
        return this.validaMovCavaloBranco(casaSelecionada.id);
      
      case 'n':
        return this.validaMovCavaloPreto(casaSelecionada.id);
      
      case 'R':
        return this.validaMovTorreBranca(casaSelecionada.id);

      case 'r':
          return this.validaMovTorrePreta(casaSelecionada.id);

      case 'B':
          return this.validaMovBispoBranco(casaSelecionada.id);
      
      case 'b':
          return this.validaMovBispoPreto(casaSelecionada.id);

      case 'Q':
          return this.validaMovRainhaBranca(casaSelecionada.id);
      
      case 'q':
          return this.validaMovRainhaPreta(casaSelecionada.id);
    }

    return [];
  }

  validaMovimento(casaOriginal: string, casaDestino: string) {

    const peca = this.retornoPecaPorCasa(casaOriginal);
    const pecaDestino = this.retornoPecaPorCasa(casaDestino);

    if(!peca){
      console.log('Nenhuma peça selecionada!');
      return false;
    }

    // Verifica se peça destino é da mesma cor da Origem
    if((this.pecasClaras.includes(peca) && (this.pecasClaras.includes(pecaDestino)))
      || ((this.pecasPretas.includes(peca)) && (this.pecasPretas.includes(pecaDestino)))){
        console.log('Destino inválido!');
        return false;
    }

    //Verifica se é a vez da peça selecionada
    if(this.pecasClaras.includes(peca) && this.turnoDe === 'Pretas'
    || this.pecasPretas.includes(peca) && this.turnoDe === 'Brancas'){
      console.log(`Jogam as ${this.turnoDe}!`);
      return false;
    }

    return this.movimentosValidos.includes(casaDestino);
  
  }

  movePeca(casaOriginal: string, casaDestino: string) {
    //Pega as cordenadas das duas Casas
    const colunaOriginal = casaOriginal.charAt(0);
    const fileiraOriginal = parseInt(casaOriginal.charAt(1));
    const colunaDestino = casaDestino.charAt(0);
    const fileiraDestino = parseInt(casaDestino.charAt(1));

    // Converte as Cordenadas em indices pro Array
    const indexColunaOriginal = colunaOriginal.charCodeAt(0) - 97;
    const indexFileiraOriginal = 8 - fileiraOriginal;
    const indexColunaDestino = colunaDestino.charCodeAt(0) - 97;
    const indexFileiraDestino = 8 - fileiraDestino;

    //Busca a peca
    const peca = this.retornoPecaPorCasa(casaOriginal);

    // Atualiza o estado do tabuleiro
    this.estadoTabuleiro[indexFileiraDestino][indexColunaDestino] = peca;
    this.estadoTabuleiro[indexFileiraOriginal][indexColunaOriginal] = ''
    this.inserirPecas();
    
    // 'passa' o turno
    this.turnoDe = (this.turnoDe == 'Brancas') ? 'Pretas' : 'Brancas';

  }

  // Validação de movimentos

  casaExiste(casa: string){
    return this.casasClaras.includes(casa) || this.casasEscuras.includes(casa);
  }

  casaPossuiPecaBranca(casa: string){
    if(this.casaExiste(casa)){
      const peca = this.retornoPecaPorCasa(casa);

      return this.pecasClaras.includes(peca);
    }
    
    return false;
  }

  casaPossuiPecaPreta(casa: string){
    if(this.casaExiste(casa)){
      const peca = this.retornoPecaPorCasa(casa);

      return this.pecasPretas.includes(peca);
    }
    
    return false;
  }

  casaPossuiPeca(casa: string){
    if(this.casaExiste(casa)){
      return ((this.casaPossuiPecaPreta(casa) || this.casaPossuiPecaBranca(casa)));
    }
    
    return false;
  }

  // TODO: en-passant
  // TODO: promotion
  validaMovPeaoBranco(casaOriginal: string): string[] {
    const movimentos = [];
    const colunaOriginal =  casaOriginal.charAt(0);
    const fileiraOriginal =  parseInt(casaOriginal.charAt(1));

    // Cria e Valida se os movimentos são validos
    
    // Caso não possua uma peça no destino pode mover 1 casa para frente
    const casaUmaAFrente = colunaOriginal + (fileiraOriginal + 1);
    if(!this.casaPossuiPeca(casaUmaAFrente)) {
      movimentos.push(casaUmaAFrente);
    }
    
    // Caso na casa original e não possua uma peça no destino pode mover 2 casas para frente
    const casaDuasAFrente = colunaOriginal + (fileiraOriginal + 2);
    if(fileiraOriginal === 2 && !this.casaPossuiPeca(casaDuasAFrente) && !this.casaPossuiPeca(casaUmaAFrente)){
      movimentos.push(casaDuasAFrente);
    }

    // Capturar peças pretas nas Direita
    // Converta 'a' para 'b' e assim por diante
    const casaDiagonalDireita = (String.fromCharCode(casaOriginal.charCodeAt(0) + 1)) + (fileiraOriginal + 1)
      
    if(this.casaPossuiPecaPreta(casaDiagonalDireita)){
      movimentos.push(casaDiagonalDireita)
    }
    
    // Capturar peças pretas nas Direita
    // Converta 'h' para 'g' e assim por diante
    const casaDiagonalEsquerda = (String.fromCharCode(casaOriginal.charCodeAt(0) - 1)) + (fileiraOriginal + 1)
      
    if(this.casaPossuiPecaPreta(casaDiagonalEsquerda)){
      movimentos.push(casaDiagonalEsquerda)
    }
    
    return movimentos;
  }

  // TODO: en-passant
  // TODO: promotion
  validaMovPeaoPreto(casaOriginal: string): string[] {
    const movimentos = [];
    const colunaOriginal =  casaOriginal.charAt(0);
    const fileiraOriginal =  parseInt(casaOriginal.charAt(1));

    // Cria e Valida se os movimentos são validos
    
    // Caso não possua uma peça no destino pode mover 1 casa para frente
    const casaUmaAFrente = colunaOriginal + (fileiraOriginal - 1);
    if(!this.casaPossuiPeca(casaUmaAFrente)) {
      movimentos.push(casaUmaAFrente);
    }
    
    // Caso na casa original e não possua uma peça no destino pode mover 2 casas para frente
    const casaDuasAFrente = colunaOriginal + (fileiraOriginal - 2);
    if(fileiraOriginal === 7 && !this.casaPossuiPeca(casaDuasAFrente) && !this.casaPossuiPeca(casaUmaAFrente)){
      movimentos.push(casaDuasAFrente);
    }

    // Capturar peças pretas nas Direita
    // Converta 'a' para 'b' e assim por diante
    const casaDiagonalDireita = (String.fromCharCode(casaOriginal.charCodeAt(0) + 1)) + (fileiraOriginal - 1)
      
    if(this.casaPossuiPecaBranca(casaDiagonalDireita)){
      movimentos.push(casaDiagonalDireita)
    }
    
    // Capturar peças pretas nas Direita
    // Converta 'h' para 'g' e assim por diante
    const casaDiagonalEsquerda = (String.fromCharCode(casaOriginal.charCodeAt(0) - 1)) + (fileiraOriginal - 1)
      
    if(this.casaPossuiPecaBranca(casaDiagonalEsquerda)){
      movimentos.push(casaDiagonalEsquerda)
    }
    
    return movimentos;
  }

  validaMovCavaloBranco(casaOriginal: string): string[]{
    const movimentos = [];
    const colunaOriginal =  casaOriginal.charCodeAt(0);
    const fileiraOriginal =  parseInt(casaOriginal.charAt(1));
    
    const possiveisMovimentos: [number, number][] = [
      [2, 1], [2, -1], [-2, 1], [-2, -1],
      [1, 2], [1, -2], [-1, 2], [-1, -2]
    ];
    
    for (const [variavelColuna, variavelFileira] of possiveisMovimentos){
      const colunaDestino = String.fromCharCode(colunaOriginal + variavelColuna);
      const fileiraDestino = (fileiraOriginal + variavelFileira).toString();

      if(this.casaExiste(colunaDestino + fileiraDestino) && !this.casaPossuiPecaBranca(colunaDestino + fileiraDestino)){
        movimentos.push(colunaDestino + fileiraDestino);
      }
    }

    return movimentos;
  }

  validaMovCavaloPreto(casaOriginal: string): string[]{
    const movimentos = [];
    const colunaOriginal =  casaOriginal.charCodeAt(0);
    const fileiraOriginal =  parseInt(casaOriginal.charAt(1));
    
    const possiveisMovimentos: [number, number][] = [
      [2, 1], [2, -1], [-2, 1], [-2, -1],
      [1, 2], [1, -2], [-1, 2], [-1, -2]
    ];
    
    for (const [variavelColuna, variavelFileira] of possiveisMovimentos){
      const colunaDestino = String.fromCharCode(colunaOriginal + variavelColuna);
      const fileiraDestino = (fileiraOriginal + variavelFileira).toString();

      if(this.casaExiste(colunaDestino + fileiraDestino) && !this.casaPossuiPecaPreta(colunaDestino + fileiraDestino)){
        movimentos.push(colunaDestino + fileiraDestino);
      }
    }

    return movimentos;
  }

  validaMovTorreBranca(casaOriginal: string): string[]{
    const movimentos = [];
    const colunaOriginal =  casaOriginal.charCodeAt(0);
    const fileiraOriginal =  parseInt(casaOriginal.charAt(1));

    // For (X,0)
    for(let co = 1; co <= 8; co++){
      const colunaFor = String.fromCharCode(colunaOriginal + co);
      const casaFor = colunaFor + fileiraOriginal

      if(this.casaExiste(casaFor) && !this.casaPossuiPecaBranca(casaFor)){
        if(this.casaPossuiPecaPreta(casaFor)){
          movimentos.push(casaFor);
          break;
        }
        
        movimentos.push(casaFor);
        continue;
      }

      break;
    }

    // For (-X,0)
    for(let co = -1; co >= -8; co--){
      const colunaFor = String.fromCharCode(colunaOriginal + co);
      const casaFor = colunaFor + fileiraOriginal

      if(this.casaExiste(casaFor) && !this.casaPossuiPecaBranca(casaFor)){
        if(this.casaPossuiPecaPreta(casaFor)){
          movimentos.push(casaFor);
          break;
        }
        
        movimentos.push(casaFor);
        continue;
      }

      break;
    }

    // For (0,Y)
    for(let li = 1; li <= 8; li++){
      const fileiraFor = fileiraOriginal + li;
      const casaFor = String.fromCharCode(colunaOriginal) + fileiraFor;

      if(this.casaExiste(casaFor) && !this.casaPossuiPecaBranca(casaFor)){
        if(this.casaPossuiPecaPreta(casaFor)){
          movimentos.push(casaFor);
          break;
        }
        
        movimentos.push(casaFor);
        continue;
      }
        
      break;
    }

    // For (0,-Y)
    for(let li = 1; li <= 8; li++){ 
      const fileiraFor = fileiraOriginal - li;
      const casaFor = String.fromCharCode(colunaOriginal) + fileiraFor;

      if(this.casaExiste(casaFor) && !this.casaPossuiPecaBranca(casaFor)){
        if(this.casaPossuiPecaPreta(casaFor)){
          movimentos.push(casaFor);
          break;
        }
        
        movimentos.push(casaFor);
        continue;
      }
        
      break;
    }

    return movimentos;
  }

  validaMovTorrePreta(casaOriginal: string): string[]{
    const movimentos = [];
    const colunaOriginal =  casaOriginal.charCodeAt(0);
    const fileiraOriginal =  parseInt(casaOriginal.charAt(1));

    // For (X,0)
    for(let co = 1; co <= 8; co++){
      const colunaFor = String.fromCharCode(colunaOriginal + co);
      const casaFor = colunaFor + fileiraOriginal

      if(this.casaExiste(casaFor) && !this.casaPossuiPecaPreta(casaFor)){
        if(this.casaPossuiPecaBranca(casaFor)){
          movimentos.push(casaFor);
          break;
        }
        
        movimentos.push(casaFor);
        continue;
      }

      break;
    }

    // For (-X,0)
    for(let co = -1; co >= -8; co--){
      const colunaFor = String.fromCharCode(colunaOriginal + co);
      const casaFor = colunaFor + fileiraOriginal

      if(this.casaExiste(casaFor) && !this.casaPossuiPecaPreta(casaFor)){
        if(this.casaPossuiPecaBranca(casaFor)){
          movimentos.push(casaFor);
          break;
        }
        
        movimentos.push(casaFor);
        continue;
      }

      break;
    }

    // For (0,Y)
    for(let li = 1; li <= 8; li++){
      const fileiraFor = fileiraOriginal + li;
      const casaFor = String.fromCharCode(colunaOriginal) + fileiraFor;

      if(this.casaExiste(casaFor) && !this.casaPossuiPecaPreta(casaFor)){
        if(this.casaPossuiPecaBranca(casaFor)){
          movimentos.push(casaFor);
          break;
        }
        
        movimentos.push(casaFor);
        continue;
      }
        
      break;
    }

    // For (0,-Y)
    for(let li = 1; li <= 8; li++){
      const fileiraFor = fileiraOriginal - li;
      const casaFor = String.fromCharCode(colunaOriginal) + fileiraFor;

      if(this.casaExiste(casaFor) && !this.casaPossuiPecaPreta(casaFor)){
        if(this.casaPossuiPecaBranca(casaFor)){
          movimentos.push(casaFor);
          break;
        }
        
        movimentos.push(casaFor);
        continue;
      }
        
      break;
    }

    return movimentos;
  }

  validaMovBispoBranco(casaOriginal: string): string[]{
    const movimentos = [];
    const colunaOriginal =  casaOriginal.charCodeAt(0);
    const fileiraOriginal =  parseInt(casaOriginal.charAt(1));

    // For (X,Y)
    for(let diag = 1; diag <= 8; diag++){
      const colunaFor = String.fromCharCode(colunaOriginal + diag);
      const fileiraFor = fileiraOriginal + diag;
      const casaFor = colunaFor + fileiraFor

      if(this.casaExiste(casaFor) && !this.casaPossuiPecaBranca(casaFor)){
        if (this.casaPossuiPecaPreta(casaFor)){
          movimentos.push(casaFor);
          break;
        }
        
        movimentos.push(casaFor);
        continue;
      }
        
      break;
    }

    // For (-X,Y)
    for(let diag = 1; diag <= 8; diag++){
      const colunaFor = String.fromCharCode(colunaOriginal - diag);
      const fileiraFor = fileiraOriginal + diag;
      const casaFor = colunaFor + fileiraFor

      if(this.casaExiste(casaFor) && !this.casaPossuiPecaBranca(casaFor)){
        if (this.casaPossuiPecaPreta(casaFor)){
          movimentos.push(casaFor);
          break;
        }
        
        movimentos.push(casaFor);
        continue;
      }
        
      break;
    }

    // For (X,-Y)
    for(let diag = 1; diag <= 8; diag++){
      const colunaFor = String.fromCharCode(colunaOriginal + diag);
      const fileiraFor = fileiraOriginal - diag;
      const casaFor = colunaFor + fileiraFor

      if(this.casaExiste(casaFor) && !this.casaPossuiPecaBranca(casaFor)){
        if (this.casaPossuiPecaPreta(casaFor)){
          movimentos.push(casaFor);
          break;
        }
        
        movimentos.push(casaFor);
        continue;
      }
        
      break;
    }

    // For (-X,-Y)
    for(let diag = 1; diag <= 8; diag++){
      const colunaFor = String.fromCharCode(colunaOriginal - diag);
      const fileiraFor = fileiraOriginal - diag;
      const casaFor = colunaFor + fileiraFor

      if(this.casaExiste(casaFor) && !this.casaPossuiPecaBranca(casaFor)){
        if (this.casaPossuiPecaPreta(casaFor)){
          movimentos.push(casaFor);
          break;
        }
        
        movimentos.push(casaFor);
        continue;
      }
        
      break;
    }

    return movimentos;
  }

  validaMovBispoPreto(casaOriginal: string): string[]{
    const movimentos = [];
    const colunaOriginal =  casaOriginal.charCodeAt(0);
    const fileiraOriginal =  parseInt(casaOriginal.charAt(1));

    // For (X,Y)
    for(let diag = 1; diag <= 8; diag++){
      const colunaFor = String.fromCharCode(colunaOriginal + diag);
      const fileiraFor = fileiraOriginal + diag;
      const casaFor = colunaFor + fileiraFor

      if(this.casaExiste(casaFor) && !this.casaPossuiPecaPreta(casaFor)){
        if (this.casaPossuiPecaBranca(casaFor)){
          movimentos.push(casaFor);
          break;
        }
        
        movimentos.push(casaFor);
        continue;
      }
        
      break;
    }

    // For (-X,Y)
    for(let diag = 1; diag <= 8; diag++){
      const colunaFor = String.fromCharCode(colunaOriginal - diag);
      const fileiraFor = fileiraOriginal + diag;
      const casaFor = colunaFor + fileiraFor

      if(this.casaExiste(casaFor) && !this.casaPossuiPecaPreta(casaFor)){
        if (this.casaPossuiPecaBranca(casaFor)){
          movimentos.push(casaFor);
          break;
        }
        
        movimentos.push(casaFor);
        continue;
      }
        
      break;
    }

    // For (X,-Y)
    for(let diag = 1; diag <= 8; diag++){
      const colunaFor = String.fromCharCode(colunaOriginal + diag);
      const fileiraFor = fileiraOriginal - diag;
      const casaFor = colunaFor + fileiraFor

      if(this.casaExiste(casaFor) && !this.casaPossuiPecaPreta(casaFor)){
        if (this.casaPossuiPecaBranca(casaFor)){
          movimentos.push(casaFor);
          break;
        }
        
        movimentos.push(casaFor);
        continue;
      }
        
      break;
    }

    // For (-X,-Y)
    for(let diag = 1; diag <= 8; diag++){
      const colunaFor = String.fromCharCode(colunaOriginal - diag);
      const fileiraFor = fileiraOriginal - diag;
      const casaFor = colunaFor + fileiraFor

      if(this.casaExiste(casaFor) && !this.casaPossuiPecaPreta(casaFor)){
        if (this.casaPossuiPecaBranca(casaFor)){
          movimentos.push(casaFor);
          break;
        }
        
        movimentos.push(casaFor);
        continue;
      }
        
      break;
    }

    return movimentos;
  }

  validaMovRainhaBranca(casaOriginal: string): string[]{
    const movimentos = [];

    for(const movimento of this.validaMovBispoBranco(casaOriginal)){
      movimentos.push(movimento);
    }

    for(const movimento of this.validaMovTorreBranca(casaOriginal)){
      movimentos.push(movimento);
    }

    return movimentos;
  }

  validaMovRainhaPreta(casaOriginal: string): string[]{
    const movimentos = [];

    for(const movimento of this.validaMovBispoPreto(casaOriginal)){
      movimentos.push(movimento);
    }

    for(const movimento of this.validaMovTorreBranca(casaOriginal)){
      movimentos.push(movimento);
    }

    return movimentos;
  }

}
