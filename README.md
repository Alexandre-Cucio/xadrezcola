# Xadrezcola: uma jogada tecnológica no ensino de xadrez

Projeto feito como pesquisa apresentada ao curso de análise e desenvolvimento de sistemas, apresentado na disciplina de Atividade Extensionista do Centro Universitário Internacional UNINTER.

## Objetivo Geral

Disponibilizar um meio de ensino de Xadrez para crianças que seja independente do auxílio de um professor.

## Objetivos específicos

- Armazenar diferentes dados de jogadas de Xadrez;
- Desenvolver uma I.A. que identifique, classifique e responda diferentes jogadas de Xadrez;
- Apresentar feedback didático ao final de toda partida realizada.

## Estrutura

O projeto será desenvolvido em 2 aplicações separadas:
- Aplicação front-end em Angular onde o usuário irá interagir com o projeto
- Aplicação back-end responsável por interagir com o LLM e fazer o CRUD do projeto

## Progresso

### Front-end
#### Tabuleiro de Xadrez
- [x] Gerar Tabuleiro
- [x] Tabuleiro Dinâmico para Jogar com Pretas ou Brancas
- [x] Adicionar imagem das peças
- [ ] Validar Estado do jogo por jogada
    - [x] Avaliar de qual Jogador é o turno
    - [ ] Xeque
    - [ ] Xeque-Mate
    - [ ] Disponibilidade de Roque
    - [ ] Gerar objeto de Estado do jogo para análise do back-end
- [ ] Regras de Movimentos
    - [x] Peões: Básico
    - [ ] Peões: en-passant
    - [ ] Peões: Promoção
    - [x] Cavalos
    - [x] Torres
    - [x] Bispos
    - [x] Rainha
    - [ ] Rei: Básico
    - [ ] Rei: Roque

#### Interface
- TODO

### Back-End
- TODO
