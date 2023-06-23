import { Component } from '@angular/core';

@Component({
  selector: 'app-tabuleiro',
  templateUrl: './tabuleiro.component.html',
  styleUrls: ['./tabuleiro.component.css'],
})
export class TabuleiroComponent {
  estadoTabuleiro: any[][] = [];
  casaSelecionada: HTMLElement | null = null;
  
  ngOnInit() {
    this.colorirCasas();
    this.resetaTabuleiro();
  }

  colorirCasas(){
    const casasEscuras =
      ['b8', 'd8', 'f8', 'h8'
      ,'a7', 'c7', 'e7', 'g7'
      , 'b6', 'd6', 'f6', 'h6'
      , 'a5', 'c5', 'e5', 'g5'
      , 'b4', 'd4', 'f4', 'h4'
      , 'a3', 'c3', 'e3', 'g3'
      , 'b2', 'd2', 'f2', 'h2'
      , 'a1', 'c1', 'e1', 'g1'];
    
    const casasClaras =
      ['a8', 'c8', 'e8', 'g8'
      , 'b7', 'd7', 'f7', 'h7'
      , 'a6', 'c6', 'e6', 'g6'
      , 'b5', 'd5', 'f5', 'h5'
      , 'a4', 'c4', 'e4', 'g4'
      , 'b3', 'd3', 'f3', 'h3'
      , 'a2', 'c2', 'e2', 'g2'
      , 'b1', 'd1', 'f1', 'h1'];
  
    const casas = document.querySelectorAll('.casa');
  
    casas.forEach((casa: Element) =>{
      if (casasClaras.includes(casa.id)){
        (casa as HTMLElement).style.backgroundColor = '#FFFFE0';
      }
  
      if (casasEscuras.includes(casa.id)){
        (casa as HTMLElement).style.backgroundColor = '#008000';
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

  inserirPecas(){
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
    const imagens: {[key: string]: string} = {
      '' : '',
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
    if (selecao instanceof HTMLElement){
     this.preMovePeca(selecao) 
    }
  }
 
  preMovePeca(selecao: HTMLElement) {
    // Caso clique em cima da imagem, pega a casa da imagem
    const casa = selecao.closest('li');

    if(casa){
      
      // Caso selecione uma casa diverente da selecionada
      if(!(this.casaSelecionada === null)) {
        console.log('Casa diverente selecionada!')
        const casaDestino =  casa.id;
        const casaOriginal = this.casaSelecionada.id;
    
        //Metodo que move a peça no tabuleiro
        this.movePeca(casaOriginal, casaDestino);

        // Limpa a seleção
        this.casaSelecionada = null;
      } else {
        //Nenhuma casa tinha sido selecionada ainda
        this.casaSelecionada = casa;
        console.log('Nova casa selecionada!')
        //TODO: Implementar logica de mostrar movimentos legais
      }

    }        
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

    if (true) {
      // Atualiza o estado do tabuleiro
      this.estadoTabuleiro[indexFileiraDestino][indexColunaDestino] = peca;
      this.estadoTabuleiro[indexFileiraOriginal][indexColunaOriginal] = ''
      this.inserirPecas();
    }
  }

}
