import { CorDaPeca } from "./enum/cor-da-peca-enum";
import { TabuleiroUtil} from "../util/tabuleiro-util";

export class Rainha {

    static getImgPeca(corDaPeca: CorDaPeca): string {
        return corDaPeca === CorDaPeca.brancas ?
            'assets/pecas/brancas-rainha.png' :
            'assets/pecas/pretas-rainha.png'
    }

    static getMovValidos(corDaPeca: CorDaPeca, casaOriginal: string, estadoTabuleiro: any[][]): string[] {
        const movimentos: string[] = [];
        const colunaOriginal =  casaOriginal.charCodeAt(0);
        const fileiraOriginal =  parseInt(casaOriginal.charAt(1));
    
        const moveEmDirecao = (deltaColuna: number, deltaFileira: number) => {
            for (let mov = 1; mov <= 8; mov++ ){
                const fileiraFor = deltaFileira != 0 ? fileiraOriginal + (mov * deltaFileira) : fileiraOriginal;
                const colunaFor = deltaColuna != 0 ? String.fromCharCode(colunaOriginal + (mov * deltaColuna)) : String.fromCharCode(colunaOriginal);
                const casaFor = colunaFor + (fileiraFor);

                const casaExiste = TabuleiroUtil.casaExiste(casaFor);
                const casaPossuiPecaBranca = TabuleiroUtil.casaPossuiPecaBranca(casaFor, estadoTabuleiro);
                const casaPossuiPecaPreta = TabuleiroUtil.casaPossuiPecaPreta(casaFor, estadoTabuleiro);

                if (!casaExiste) {
                    break;
                }

                if(corDaPeca == CorDaPeca.brancas){
                    if(!casaPossuiPecaBranca){    
                        if(casaPossuiPecaPreta){
                            movimentos.push(casaFor);
                            break;
                        }

                        movimentos.push(casaFor);
                        continue;
                    } 

                    break;
                }
                
                if(corDaPeca == CorDaPeca.pretas){
                    if(!casaPossuiPecaPreta){  
                        if(casaPossuiPecaBranca){
                            movimentos.push(casaFor);
                            break;
                        }

                        movimentos.push(casaFor);
                        continue;
                    } 

                    break;
                }
            }
        }
    
        moveEmDirecao(1, 1);
        moveEmDirecao(-1, 1);
        moveEmDirecao(-1, -1); 
        moveEmDirecao(1, -1);
        moveEmDirecao(1, 0);
        moveEmDirecao(-1, 0);
        moveEmDirecao(0, -1); 
        moveEmDirecao(0, -1);

        return movimentos;
    }

}