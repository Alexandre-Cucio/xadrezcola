export class TabuleiroUtil {
    static pecasPretas: string[] = ['k', 'q', 'r', 'b', 'n', 'p'];
    static pecasClaras: string[] = ['K', 'Q', 'R', 'B', 'N', 'P'];
    
    static casasEscuras = ['b8', 'd8', 'f8', 'h8', 'a7', 'c7', 'e7', 'g7', 'b6', 'd6', 'f6', 'h6', 'a5', 'c5', 'e5', 'g5'
    , 'b4', 'd4', 'f4', 'h4', 'a3', 'c3', 'e3', 'g3', 'b2', 'd2', 'f2', 'h2', 'a1', 'c1', 'e1', 'g1'];

    static casasClaras = ['a8', 'c8', 'e8', 'g8', 'b7', 'd7', 'f7', 'h7', 'a6', 'c6', 'e6', 'g6', 'b5', 'd5', 'f5', 'h5'
    , 'a4', 'c4', 'e4', 'g4', 'b3', 'd3', 'f3', 'h3', 'a2', 'c2', 'e2', 'g2', 'b1', 'd1', 'f1', 'h1'];


    static retornoPecaPorCasa(casa: string, estadoTabuleiro: any[][]): string {
      const coluna = casa.charCodeAt(0) - 97; // converte 'a' pra 0, 'b' pra 1, assim por diante
      const fileira = 8 - parseInt(casa.charAt(1)); // converte '8' pra 0, '7' pra 1, assim por diante
    
      return estadoTabuleiro[fileira][coluna];
    }

    static casaExiste(casa: string){
      return this.casasClaras.includes(casa) || this.casasEscuras.includes(casa);
    }

    static casaPossuiPecaBranca(casa: string, estadoTabuleiro: any[][]){
      if(this.casaExiste(casa)){
          const peca = this.retornoPecaPorCasa(casa, estadoTabuleiro);
    
          return this.pecasClaras.includes(peca);
      }
        
      return false;
    }

    static casaPossuiPecaPreta(casa: string, estadoTabuleiro: any[][]){
      if(this.casaExiste(casa)){
        const peca = this.retornoPecaPorCasa(casa, estadoTabuleiro);
    
        return this.pecasPretas.includes(peca);
      }
        
      return false;
    }

    static casaPossuiPeca(casa: string, estadoTabuleiro: any[][]){
      if(TabuleiroUtil.casaExiste(casa)){
        return ((TabuleiroUtil.casaPossuiPecaPreta(casa, estadoTabuleiro) || TabuleiroUtil.casaPossuiPecaBranca(casa, estadoTabuleiro)));
      }
      
      return false;
    }
}