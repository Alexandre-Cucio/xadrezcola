import { CorDaPeca } from "./enum/cor-da-peca-enum";
import { TabuleiroUtil} from "../util/tabuleiro-util";

// TO DO 
export class Peao {

    static getImgPeca(corDaPeca: CorDaPeca): string {
        return corDaPeca === CorDaPeca.brancas ?
            'assets/pecas/brancas-peao.png' :
            'assets/pecas/pretas-peao.png'
    }

    static getMovValidos(corDaPeca: CorDaPeca, casaOriginal: string, estadoTabuleiro: any[][]): string[] {
        const movimentos = [];
        const colunaOriginal =  casaOriginal.charCodeAt(0);
        const fileiraOriginal =  casaOriginal.charAt(1);

        // Cria e Valida se os movimentos são validos
    
        // Caso não possua uma peça no destino pode mover 1 casa para frente
        const casaUmaAFrente = colunaOriginal + (fileiraOriginal + 1);

        if(TabuleiroUtil.casaPossuiPeca(casaUmaAFrente, estadoTabuleiro)) {
            movimentos.push(casaUmaAFrente);
        }
        
        // Caso na casa original e não possua uma peça no destino pode mover 2 casas para frente
        const casaDuasAFrente = colunaOriginal + (fileiraOriginal + 2);
        if(parseInt(fileiraOriginal) === 2 && !TabuleiroUtil.casaPossuiPeca(casaDuasAFrente, estadoTabuleiro) && !TabuleiroUtil.casaPossuiPeca(casaUmaAFrente, estadoTabuleiro)){
            movimentos.push(casaDuasAFrente);
        }

        // Capturar peças pretas nas Direita
        // Converta 'a' para 'b' e assim por diante
        const casaDiagonalDireita = (String.fromCharCode(casaOriginal.charCodeAt(0) + 1)) + (fileiraOriginal + 1)
        
        if(TabuleiroUtil.casaPossuiPecaPreta(casaDiagonalDireita, estadoTabuleiro)){
            movimentos.push(casaDiagonalDireita)
        }
        
        // Capturar peças pretas nas Direita
        // Converta 'h' para 'g' e assim por diante
        const casaDiagonalEsquerda = (String.fromCharCode(casaOriginal.charCodeAt(0) - 1)) + (fileiraOriginal + 1)
        
        if(TabuleiroUtil.casaPossuiPecaPreta(casaDiagonalEsquerda, estadoTabuleiro)){
            movimentos.push(casaDiagonalEsquerda)
        }

        return movimentos;
    }
}