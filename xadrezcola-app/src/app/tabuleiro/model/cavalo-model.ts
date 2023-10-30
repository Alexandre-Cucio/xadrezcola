import { CorDaPeca } from "./enum/cor-da-peca-enum";
import { TabuleiroUtil} from "../util/tabuleiro-util";

export class Cavalo {

    static getImgPeca(corDaPeca: CorDaPeca): string {
        return corDaPeca === CorDaPeca.brancas ?
            'assets/pecas/brancas-cavalo.png' :
            'assets/pecas/pretas-cavalo.png'
    }

    static getMovValidos(corDaPeca: CorDaPeca, casaOriginal: string, estadoTabuleiro: any[][]): string[] {
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
            const casaFor = colunaDestino + fileiraDestino;

            const casaExiste = TabuleiroUtil.casaExiste(casaFor);
            const casaPossuiPecaBranca = TabuleiroUtil.casaPossuiPecaBranca(casaFor, estadoTabuleiro);
            const casaPossuiPecaPreta = TabuleiroUtil.casaPossuiPecaPreta(casaFor, estadoTabuleiro);

            if(!casaExiste){
                continue;
            }

            if(corDaPeca === CorDaPeca.brancas && !casaPossuiPecaBranca){
                movimentos.push(casaFor);
            }

            if(corDaPeca === CorDaPeca.pretas && !casaPossuiPecaPreta){
                movimentos.push(casaFor);
            }
        }

        return movimentos;
    }
}