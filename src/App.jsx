
import { useEffect, useMemo, useState } from "react";

const Icon = ({ path, className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d={path} />
  </svg>
);
const ICONS = {
  home: "M10 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3.25a.5.5 0 0 1-.22.414l-4 3.2a.5.5 0 0 1-.56 0l-4-3.2A.5.5 0 0 1 5 5.75V2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V4h2V2.5z M6 6.945l4 3.2 4-3.2V19.5a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5V6.945z",
  profile: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
  podium: "M12 2L8 7H16L12 2ZM6 8V22H18V8H20V22H4V8H6ZM8 10V20H16V10H8Z",
  theme: "M12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12C21 7.03 16.97 3 12 3ZM12 19C8.13 19 5 15.87 5 12C5 8.13 8.13 5 12 5C15.87 5 19 8.13 19 12C19 15.87 15.87 19 12 19Z M12 6V18C8.69 18 6 15.31 6 12C6 8.69 8.69 6 12 6Z",
  pdf: "M20 2H8C6.9 2 6 2.9 6 4V16C6 17.1 6.9 18 8 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H8V4H20V16ZM4 6H2V20C2 21.1 2.9 22 4 22H18V20H4V6Z",
  check: "M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z",
  x: "M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
};

const shuffle = (arr) => arr.slice().sort(() => Math.random() - 0.5);

const AVATARS = ["🦊","🐱","🐼","🐯","🦉","🐨","🐙","🦄","🐵","🐢","🐳","🐝"];

const LEVELS = [
  {
    id: 1,
    title: "Nível 1 – Pensamento Computacional",
    pdfUrl: "/pdfs/nivel1.pdf",
    questions: [
      { q: "O que é um algoritmo?", options: ["Um robô que executa tarefas", "Uma sequência de passos para resolver um problema", "Um tipo de linguagem de programação", "Um erro no computador"], correct: 1, explain: "Algoritmo é um passo a passo claro e finito para resolver um problema ou executar uma tarefa." },
      { q: "Qual é a melhor descrição de decomposição de problemas?", options: ["Juntar vários problemas em um só", "Ignorar as partes difíceis", "Dividir um problema grande em partes menores", "Pedir ajuda ao computador"], correct: 2, explain: "Decompor é quebrar um problema complexo em partes menores e mais fáceis de gerenciar e resolver." },
      { q: "Reconhecer padrões em problemas ajuda a…", options: ["Deixar o código mais lento", "Reutilizar soluções conhecidas e eficientes", "Evitar qualquer tipo de repetição", "Apagar variáveis desnecessárias"], correct: 1, explain: "Identificar padrões permite aplicar soluções que já funcionaram para problemas semelhantes, economizando tempo." },
      { q: "O que é abstração no contexto da programação?", options: ["Ignorar todos os detalhes de um problema", "Focar nos detalhes importantes e ignorar os irrelevantes", "Escrever código muito complicado", "Usar apenas números e matemática"], correct: 1, explain: "Abstração é o processo de simplificar, focando no que é essencial para resolver o problema." },
      { q: "Qual destes é um exemplo de um algoritmo no dia a dia?", options: ["Sentir fome", "Uma receita de bolo", "O céu ser azul", "Um pensamento aleatório"], correct: 1, explain: "Uma receita de bolo é uma sequência de passos finita para atingir um objetivo (fazer o bolo)." },
      { q: "Qual o principal objetivo do Pensamento Computacional?", options: ["Apenas criar jogos de computador", "Resolver problemas de forma eficaz e sistemática", "Fazer o computador pensar como um humano", "Consertar impressoras e hardware"], correct: 1, explain: "O objetivo é usar conceitos da computação para formular e resolver problemas em diversas áreas." },
      { q: "Se você precisa organizar uma lista de nomes em ordem alfabética, qual conceito você está aplicando?", options: ["Um algoritmo de ordenação", "Decomposição", "Abstração", "Um bug de sistema"], correct: 0, explain: "Organizar dados segue um conjunto de regras e passos, que é a definição de um algoritmo de ordenação." },
      { q: "O que significa 'depurar' (debug) um programa?", options: ["Adicionar mais funcionalidades", "Deixar o programa mais rápido", "Encontrar e corrigir erros no código", "Desenhar a interface do usuário"], correct: 2, explain: "Depuração é o processo de identificar e remover 'bugs' (erros) que impedem o programa de funcionar corretamente." },
      { q: "Qual destes NÃO é um pilar do Pensamento Computacional?", options: ["Decomposição", "Reconhecimento de Padrões", "Memorização", "Algoritmos"], correct: 2, explain: "Memorização não é um pilar; o foco está em resolver problemas, não em decorar informações." },
      { q: "Ao criar um personagem em um jogo, você define atributos como 'vida' e 'força', ignorando detalhes como a cor dos seus sapatos. Isso é um exemplo de:", options: ["Algoritmo", "Abstração", "Padrão", "Decomposição"], correct: 1, explain: "Você está abstraindo os detalhes, focando apenas nas características relevantes para a mecânica do jogo." },
      { q: "Qual a diferença entre um programa e um algoritmo?", options: ["Não há diferença", "Um algoritmo é a ideia, um programa é a implementação em uma linguagem", "Um programa é sempre maior que um algoritmo", "Algoritmos não podem ter erros, programas sim"], correct: 1, explain: "O algoritmo é o plano lógico, enquanto o programa é a tradução desse plano para uma linguagem que o computador entende." },
      { q: "O que é um 'input' (entrada) em um processo computacional?", options: ["O resultado final do programa", "A energia que o computador consome", "Os dados fornecidos para o programa processar", "A tela do computador"], correct: 2, explain: "Input são os dados que o algoritmo ou programa recebe para trabalhar com eles." },
      { q: "E o que é um 'output' (saída)?", options: ["O resultado gerado após o processamento dos dados", "O código-fonte do programa", "Um erro de digitação", "A memória do computador"], correct: 0, explain: "Output é a informação ou resultado que o programa retorna após processar o input." },
      { q: "Qual a importância da clareza em um algoritmo?", options: ["Nenhuma, o computador adivinha", "Ajuda outros programadores a entender o código", "Garante que os passos sejam executados sem ambiguidade", "Torna o programa mais bonito"], correct: 2, explain: "Um algoritmo deve ser preciso e sem ambiguidades para que a máquina (ou outra pessoa) possa segui-lo corretamente." },
      { q: "Se um algoritmo para fazer café não incluir o passo 'adicionar água', o que acontecerá?", options: ["O café ficará mais forte", "O algoritmo está incompleto e falhará", "O computador corrigirá automaticamente", "Nada, a água não é importante"], correct: 1, explain: "A falta de um passo essencial torna o algoritmo incorreto e incapaz de produzir o resultado esperado." }
    ]
  },
  {
    id: 2,
    title: "Nível 2 – Lógica e Fluxogramas",
    pdfUrl: "/pdfs/nivel2.pdf",
    questions: [
      { q: "Em um fluxograma, um losango normalmente representa…", options: ["Início/Fim", "Processo", "Decisão", "Entrada/Saída"], correct: 2, explain: "O losango é usado para pontos de decisão, onde o fluxo pode seguir por caminhos diferentes (ex: Sim/Não)." },
      { q: "Qual instrução faz algo acontecer várias vezes?", options: ["Condição", "Comentário", "Loop (laço)", "Atribuição"], correct: 2, explain: "Loops (como 'enquanto' ou 'para') são estruturas de repetição que executam um bloco de código múltiplas vezes." },
      { q: "Qual símbolo inicia ou termina um fluxograma?", options: ["Retângulo", "Círculo/Oval", "Losango", "Seta"], correct: 1, explain: "A forma oval ou de pílula (terminador) é usada para indicar os pontos de início e fim do fluxo." },
      { q: "O que um retângulo representa em um fluxograma?", options: ["Uma pergunta com 'sim' ou 'não'", "Um cálculo ou uma ação a ser executada", "A exibição de um resultado na tela", "O início do programa"], correct: 1, explain: "Retângulos representam processos, como 'somar A + B' ou 'salvar o arquivo'." },
      { q: "O que as setas indicam em um fluxograma?", options: ["A ordem de importância das tarefas", "A direção do fluxo lógico do programa", "Onde o código pode ter erros", "A velocidade de execução"], correct: 1, explain: "As setas (linhas de fluxo) conectam as formas e mostram a sequência em que as operações devem ser executadas." },
      { q: "O símbolo de paralelogramo em um fluxograma é usado para:", options: ["Decisões complexas", "Operações de entrada (input) e saída (output) de dados", "Conectar partes diferentes do fluxograma", "Marcar o fim do algoritmo"], correct: 1, explain: "Ele representa ações como 'ler um número do teclado' (entrada) ou 'imprimir resultado na tela' (saída)." },
      { q: "O que é uma condição lógica?", options: ["Uma instrução que sempre é verdadeira", "Uma expressão que pode ser avaliada como verdadeira ou falsa", "Um comentário no código", "O nome de uma variável"], correct: 1, explain: "Condições, como 'idade > 18', são a base das estruturas de decisão." },
      { q: "Em um 'loop infinito', o que acontece?", options: ["O programa termina mais rápido", "O programa executa uma tarefa e depois para", "O programa fica preso repetindo os mesmos passos para sempre", "O computador desliga sozinho"], correct: 2, explain: "Ocorre quando a condição de parada do loop nunca é satisfeita, fazendo com que ele nunca termine." },
      { q: "O que é pseudocódigo?", options: ["Uma linguagem de programação real", "Uma forma de escrever a lógica de um programa usando linguagem humana", "Um fluxograma desenhado com código", "Código com erros propositais"], correct: 1, explain: "É um rascunho do algoritmo, mais estruturado que a linguagem comum, mas menos rígido que uma linguagem de programação." },
      { q: "Qual a saída do seguinte fluxograma: Início -> Leia A=5 -> A = A + 3 -> Escreva A -> Fim", options: ["5", "3", "8", "A"], correct: 2, explain: "O fluxograma começa com A valendo 5, depois soma 3 (A se torna 8) e finalmente exibe o valor final de A." },
      { q: "Uma estrutura 'Se-Então-Senão' (If-Then-Else) corresponde a qual forma no fluxograma?", options: ["Retângulo", "Oval", "Losango", "Paralelogramo"], correct: 2, explain: "O Losango (Decisão) representa o 'Se', e as duas saídas (Sim/Não) representam os blocos 'Então' e 'Senão'." },
      { q: "O que é um 'bug' lógico?", options: ["Um erro de digitação no código", "O programa funciona, mas produz um resultado incorreto", "Falta de comentários no código", "O computador trava"], correct: 1, explain: "Diferente de um erro de sintaxe, um bug lógico significa que a lógica do programador estava falha, levando a resultados inesperados." },
      { q: "O que faz a operação 'resto da divisão' (módulo, %)?", options: ["Retorna a parte inteira da divisão", "Retorna o que sobra de uma divisão inteira", "Arredonda o resultado da divisão", "Sempre retorna zero"], correct: 1, explain: "Por exemplo, 10 % 3 é 1, porque 10 dividido por 3 dá 3 e sobra 1." },
      { q: "Se um programa precisa decidir entre três ou mais caminhos, qual estrutura é comum?", options: ["Um único 'Se-Então'", "Um 'loop' infinito", "Vários 'Se' aninhados ou uma estrutura 'Caso'", "Apenas processos em sequência"], correct: 2, explain: "Para múltiplas escolhas, pode-se usar um 'Se' dentro de outro ou uma estrutura de seleção como 'Escolha-Caso' (Switch-Case)." },
      { q: "Qual é a principal vantagem de usar um fluxograma?", options: ["Ele compila e executa o código diretamente", "É a única forma de programar", "Facilita a visualização e o entendimento da lógica do algoritmo", "Garante que não haverá bugs"], correct: 2, explain: "A representação gráfica ajuda a planejar, documentar e comunicar a lógica de um programa de forma clara." }
    ]
  },
  {
    id: 3,
    title: "Nível 3 – Variáveis e Tipos",
    pdfUrl: "/pdfs/nivel3.pdf",
    questions: [
      { q: "Uma variável serve para…", options: ["Armazenar valores que podem mudar", "Desenhar gráficos na tela", "Conectar o programa à internet", "Repetir blocos de código"], correct: 0, explain: "Variáveis são como 'caixas' na memória que guardam dados que podem ser alterados durante a execução do programa." },
      { q: "Qual conjunto tem apenas tipos de dados numéricos?", options: ["inteiro, flutuante", "string, booleano", "array, objeto", "if, while"], correct: 0, explain: "'inteiro' (int) armazena números sem casas decimais, e 'flutuante' (float) armazena números com casas decimais." },
      { q: "'true' e 'false' pertencem a qual tipo de dado?", options: ["string", "booleano", "número", "lista"], correct: 1, explain: "O tipo booleano (boolean) representa valores lógicos, que só podem ser verdadeiro ou falso." },
      { q: "O que é uma 'string'?", options: ["Um número muito grande", "Um tipo de erro", "Uma sequência de caracteres, como texto", "Uma variável que não pode mudar"], correct: 2, explain: "Strings são usadas para armazenar texto, como nomes, frases, etc., e geralmente são delimitadas por aspas." },
      { q: "O que é uma constante?", options: ["Uma variável que muda o tempo todo", "Um tipo de dado para textos", "Um valor que, uma vez definido, não pode ser alterado", "Um erro no programa"], correct: 2, explain: "Constantes são usadas para armazenar valores fixos, como o valor de PI (3.14159)." },
      { q: "Se você declara `idade = 25`, qual o tipo de dado mais provável para a variável 'idade'?", options: ["String", "Booleano", "Inteiro", "Flutuante"], correct: 2, explain: "25 é um número inteiro, sem casas decimais." },
      { q: "Para que serve um array (ou vetor)?", options: ["Para armazenar um único valor", "Para armazenar uma coleção de valores em uma única variável", "Para fazer cálculos matemáticos complexos", "Para criar condições"], correct: 1, explain: "Arrays permitem agrupar múltiplos itens, como uma lista de nomes ou de números, sob um mesmo nome." },
      { q: "O que significa 'declarar' uma variável?", options: ["Atribuir um valor a ela", "Apagar a variável da memória", "Criar a variável, dando-lhe um nome e um tipo", "Imprimir o valor da variável"], correct: 2, explain: "A declaração 'reserva' o espaço na memória para a variável antes que ela possa ser usada." },
      { q: "Qual a diferença entre '=' e '==' na maioria das linguagens?", options: ["Nenhuma, são iguais", "'=' atribui um valor, '==' compara dois valores", "'=' compara, '==' atribui", "'==' é usado apenas para textos"], correct: 1, explain: "O sinal de igual único (=) é para atribuição (ex: x = 5), enquanto o igual duplo (==) é para comparação (ex: se x == 5)." },
      { q: "O que é 'concatenação'?", options: ["Dividir um texto em dois", "Converter um número para texto", "Juntar duas ou mais strings em uma só", "Um tipo de loop"], correct: 2, explain: "Por exemplo, concatenar 'Olá' com 'Mundo' resulta em 'OláMundo'." },
      { q: "Qual o valor da variável `resultado` após: `x = 10; y = 5; resultado = x * y;`?", options: ["10", "5", "15", "50"], correct: 3, explain: "A operação é 10 multiplicado por 5, cujo resultado é 50." },
      { q: "Um tipo de dado 'nulo' (null) significa:", options: ["O mesmo que o número zero", "A variável contém um texto vazio", "A ausência intencional de um valor", "Que a variável tem um erro"], correct: 2, explain: "'Nulo' é um valor especial que indica que uma variável não aponta para nenhum objeto ou valor." },
      { q: "O que é 'escopo' de uma variável?", options: ["O tipo de dado que ela armazena", "A região do código onde a variável é acessível", "O valor máximo que a variável pode ter", "O nome da variável"], correct: 1, explain: "Uma variável pode ser local (acessível apenas dentro de uma função) ou global (acessível em todo o programa)." },
      { q: "Qual seria o tipo de dado ideal para armazenar o preço de um produto, como R$ 19,99?", options: ["Inteiro", "Booleano", "Flutuante", "String"], correct: 2, explain: "Como o preço tem casas decimais, um tipo de ponto flutuante (float ou double) é o mais adequado." },
      { q: "Se `a = '5'` e `b = '3'`, e você concatena `a + b`, qual o resultado?", options: ["8", "53", "Erro", "2"], correct: 1, explain: "Quando se usa o operador '+' com strings, ele as junta (concatena), resultando no texto '53', e não na soma matemática 8." }
    ]
  },
  {
    id: 4,
    title: "Nível 4 – Condições e Operadores",
    pdfUrl: "/pdfs/nivel4.pdf",
    questions: [
      { q: "O que a condição 'if' (Se) faz?", options: ["Repete algo infinitamente", "Executa um bloco de código apenas se a condição for verdadeira", "Declara uma variável nova", "Imprime algo na tela sempre"], correct: 1, explain: "A estrutura 'if' é a principal forma de controle de fluxo, permitindo que programas tomem decisões." },
      { q: "Qual operador é usado para verificar se dois valores são IGUAIS?", options: ["=", "==", "=>", "<>"], correct: 1, explain: "'==' é o operador de comparação de igualdade. '=' é para atribuição de valor." },
      { q: "Qual o resultado da expressão lógica: `(5 > 3) E (10 < 20)`?", options: ["Verdadeiro", "Falso", "Erro", "Depende"], correct: 0, explain: "Ambas as condições são verdadeiras (5 é maior que 3, e 10 é menor que 20). O operador 'E' (AND) só retorna verdadeiro se ambos os lados forem verdadeiros." },
      { q: "O operador 'OU' (OR, ||) retorna Falso somente quando:", options: ["Ambas as condições são verdadeiras", "A primeira condição é falsa", "A segunda condição é falsa", "Ambas as condições são falsas"], correct: 3, explain: "Para o 'OU' ser falso, todas as partes da condição precisam ser falsas. Se ao menos uma for verdadeira, o resultado é verdadeiro." },
      { q: "Qual o papel da cláusula 'else' (Senão)?", options: ["Executar um código se a condição do 'if' for falsa", "Repetir a condição do 'if'", "Terminar o programa", "Declarar uma nova condição"], correct: 0, explain: "O bloco 'else' fornece um caminho alternativo de execução para quando a condição principal não é atendida." },
      { q: "O que o operador de negação 'NÃO' (NOT, !) faz?", options: ["Confirma o valor de uma condição", "Inverte o valor de uma condição booleana", "Compara dois números", "Sempre retorna falso"], correct: 1, explain: "Ele transforma 'verdadeiro' em 'falso' e 'falso' em 'verdadeiro'." },
      { q: "Qual o resultado de `! (10 == 10)`?", options: ["Verdadeiro", "Falso", "10", "Erro"], correct: 1, explain: "`10 == 10` é verdadeiro. O operador `!` (NÃO) inverte isso para falso." },
      { q: "O operador `!=` significa:", options: ["Menor ou igual", "Exatamente igual", "Diferente de", "Maior ou igual"], correct: 2, explain: "É o operador de 'não igual', usado para verificar se dois valores são diferentes." },
      { q: "O que é um 'if aninhado'?", options: ["Um 'if' escrito de forma errada", "Um 'if' dentro de outro 'if'", "Um 'if' que nunca é executado", "Um 'loop' que parece um 'if'"], correct: 1, explain: "Permite criar lógicas de decisão mais complexas, onde uma segunda condição é verificada apenas se a primeira for verdadeira." },
      { q: "Para que serve o operador `%` (módulo)?", options: ["Calcular porcentagem", "Calcular o resto de uma divisão", "Elevar um número a uma potência", "Dividir dois números"], correct: 1, explain: "É muito útil para verificar se um número é par ou ímpar, por exemplo `numero % 2 == 0`." },
      { q: "Qual o valor de `x` após o código: `x = 10; if (x > 5) { x = x + 5; }`?", options: ["10", "5", "15", "Erro"], correct: 2, explain: "A condição (10 > 5) é verdadeira, então o bloco de código dentro do 'if' é executado, e `x` se torna 10 + 5." },
      { q: "Qual o valor de `y` após o código: `y = 20; if (y < 10) { y = 5; } else { y = 1; }`?", options: ["20", "5", "10", "1"], correct: 3, explain: "A condição (20 < 10) é falsa, então o código do bloco 'else' é executado, e `y` recebe o valor 1." },
      { q: "O que são operadores de curto-circuito (short-circuit)?", options: ["Operadores que causam erro", "O código para de executar", "Em uma expressão 'E' ou 'OU', a segunda parte pode não ser avaliada", "Operadores que funcionam mais rápido"], correct: 2, explain: "Por exemplo, em `(false E X)`, o `X` nunca é verificado, pois a expressão já será falsa. Isso otimiza o código." },
      { q: "Qual a diferença entre `else if` e um novo `if`?", options: ["Nenhuma, são idênticos", "`else if` só é verificado se o `if` anterior for falso", "`else if` é mais rápido", "Um novo `if` não pode ter `else`"], correct: 1, explain: "`else if` cria uma cadeia de condições exclusivas. Um novo `if` separado será sempre verificado, independentemente do anterior." },
      { q: "Em `a = 5; b = 10; c = 15;`, qual resultado de `(a < b) OU (b > c)`?", options: ["Verdadeiro", "Falso", "Erro", "15"], correct: 0, explain: "`a < b` (5 < 10) é verdadeiro. Como o operador é 'OU', não é preciso nem verificar a segunda parte, o resultado já é verdadeiro." }
    ]
  }
];

const STORAGE_KEYS = { profile: "tp_profile_v3", progress: "tp_progress_v3", leaderboard: "tp_leaderboard_v3", achievements: "tp_achievements_v3" };
const defaultProfile = { name: "", avatar: AVATARS[0] };
function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : initialValue; }
        catch { return initialValue; }
    });
    useEffect(() => {
        try { localStorage.setItem(key, JSON.stringify(value)); } catch { }
    }, [key, value]);
    return [value, setValue];
}


function Card({ children, className = "" }) {
    return <div className={`bg-white/5 dark:bg-slate-900/60 border border-lime-500/20 rounded-xl shadow-lg shadow-lime-500/10 backdrop-blur-xl ${className}`}>{children}</div>;
}

function AnimatedView({ children, className = "" }) {
    return <div className={`animate-[fadeIn_0.5s_ease-in-out] ${className}`}>{children}</div>;
}

function IconButton({ onClick, children, text }) {
    return (
        <button onClick={onClick} className="flex items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white/10 dark:bg-slate-800/50 px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-white/20 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-600 transition-colors duration-200">
            {children}
            <span>{text}</span>
        </button>
    );
}

function Badge({ children, className = "" }) {
    return <span className={`inline-flex items-center rounded-md border border-lime-500/30 bg-lime-500/10 px-3 py-1 text-xs font-semibold text-lime-700 dark:text-lime-300 shadow-sm ${className}`}>{children}</span>;
}

function Modal({ open, onClose, title, children }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-[fadeIn_0.3s_ease-in-out]" onClick={onClose}>
            <div className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-xl bg-slate-50 dark:bg-slate-900 border border-lime-500/30 p-6 shadow-2xl shadow-lime-500/20 animate-[slideUp_0.4s_ease-out]" onClick={(e) => e.stopPropagation()}>
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-lime-600 dark:text-lime-400">{title}</h3>
                    <button className="rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-1 text-sm font-semibold hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors" onClick={onClose}>Fechar</button>
                </div>
                {children}
            </div>
        </div>
    );
}

function Header({ profile, onGoHome, onChangeProfile, onOpenLeaderboard, onToggleTheme }) {
    return (
        <header className="sticky top-4 z-40 mb-8 flex items-center justify-between rounded-xl border border-slate-200/80 dark:border-lime-500/20 bg-white/70 dark:bg-slate-900/70 p-3 shadow-md backdrop-blur-lg animate-[slideDown_0.5s_ease-out]">
            <div className="flex items-center gap-4">
                <span className="text-4xl">{profile?.avatar}</span>
                <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">JOGADOR(A)</p>
                    <p className="font-bold text-lg text-slate-800 dark:text-white">{profile?.name || "Convidado"}</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                {onGoHome && <IconButton onClick={onGoHome} text="Home"><Icon path={ICONS.home} /></IconButton>}
                {onChangeProfile && <IconButton onClick={onChangeProfile} text="Trocar Perfil"><Icon path={ICONS.profile} /></IconButton>}
                <IconButton onClick={onOpenLeaderboard} text="Ranking"><Icon path={ICONS.podium} /></IconButton>
                <IconButton onClick={onToggleTheme} text="Tema"><Icon path={ICONS.theme} /></IconButton>
            </div>
        </header>
    );
}

function StartScreen({ onStart, profile, setProfile }) {
    const [name, setName] = useState(profile.name);
    const [avatar, setAvatar] = useState(profile.avatar);
    const canStart = name.trim().length >= 2;
    return (
        <AnimatedView className="flex flex-col items-center justify-center min-h-[80vh]">
            <Card className="p-8 max-w-3xl w-full">
                <h1 className="text-5xl font-black text-center mb-2 bg-gradient-to-r from-lime-500 to-green-600 bg-clip-text text-transparent [text-shadow:0_0_10px_rgba(163,230,53,0.5)]">TRILHAS DE PROGRAMAÇÃO</h1>
                <p className="mb-8 text-center text-slate-600 dark:text-slate-400">Prepare-se para uma jornada de código e lógica. Desafie-se e suba no ranking!</p>
                <div className="grid gap-8 md:grid-cols-2">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-lime-700 dark:text-lime-400">SEU NOME DE JOGADOR</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Digite seu Bruna, Luiza..." className="w-full rounded-lg border-2 border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 px-4 py-3 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-lime-700 dark:text-lime-400">ESCOLHA SEU AVATAR</label>
                        <div className="grid grid-cols-6 gap-2">
                            {AVATARS.map((a) => (<button key={a} onClick={() => setAvatar(a)} className={`aspect-square rounded-lg border-2 text-3xl transition-transform duration-200 hover:scale-110 ${avatar === a ? "border-lime-500 ring-2 ring-lime-500/50" : "border-slate-300 dark:border-slate-700 hover:border-slate-500"}`}>{a}</button>))}
                        </div>
                    </div>
                </div>
                <div className="mt-8"><button disabled={!canStart} onClick={() => { setProfile({ name, avatar }); onStart(); }} className={`w-full rounded-lg px-8 py-4 font-bold text-xl shadow-lg transition-all duration-300 ${canStart ? "bg-gradient-to-br from-lime-500 to-green-600 text-slate-900 hover:shadow-xl hover:shadow-lime-500/30 hover:scale-105" : "bg-slate-300 dark:bg-slate-700 text-slate-500 cursor-not-allowed"}`}>INICIAR JOGO</button></div>
            </Card>
        </AnimatedView>
    );
}

function LevelCard({ level, locked, progress, onOpen }) {
    const pct = Math.round(((progress?.correct || 0) / (progress?.total || level.questions.length)) * 100) || 0;
    const isComplete = pct === 100;
    return (
        <div className={`rounded-lg border p-5 shadow-sm transition-all duration-300 ${locked ? "opacity-60 bg-slate-200/30 dark:bg-slate-900/50" : "bg-white/30 dark:bg-slate-800/30 hover:bg-white/80 dark:hover:bg-slate-800/80 hover:border-lime-500/50 hover:-translate-y-1"} border-slate-300 dark:border-slate-800`}>
            <div className="mb-3 flex items-start justify-between">
                <h3 className="font-bold text-lg pr-4 text-slate-800 dark:text-white">{level.title}</h3>
                <span className={`text-sm font-bold ${isComplete ? 'text-green-600 dark:text-green-400' : 'text-slate-500 dark:text-slate-400'}`}>{pct}% {isComplete && '✅'}</span>
            </div>
            <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                <div className="h-full bg-gradient-to-r from-lime-500 to-green-500 transition-all duration-500" style={{ width: `${pct}%` }} />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2">
                <a className="flex items-center gap-2 text-sm text-lime-700 dark:text-lime-400 underline-offset-4 hover:underline" href={level.pdfUrl} target="_blank" rel="noreferrer"><Icon path={ICONS.pdf} /> Material de Apoio</a>
                <button disabled={locked} onClick={onOpen} className={`rounded-lg px-4 py-2 text-sm font-semibold transition-transform duration-200 ${locked ? "bg-slate-300 dark:bg-slate-700 text-slate-500 dark:text-slate-400" : "bg-lime-600 text-slate-900 font-bold hover:bg-lime-500 active:scale-95"}`}>{locked ? "Bloqueado" : "Jogar"}</button>
            </div>
        </div>
    );
}

function Quiz({ level, onFinish, updateAchievements }) {
    const timePerQ = 35; 
    const [order] = useState(() => shuffle(level.questions.map((_, i) => i)));
    const [idx, setIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [timeLeft, setTimeLeft] = useState(timePerQ);
    const [locked, setLocked] = useState(false);
    const qIndex = order[idx];
    const q = level.questions[qIndex];

    useEffect(() => {
        if (idx >= order.length) return;
        setTimeLeft(timePerQ);
        const t = setInterval(() => setTimeLeft(v => {
            if (v <= 1) {
                clearInterval(t);
                if (!locked) handleAnswer(-1)
            }
            return v - 1
        }), 1e3);
        return () => clearInterval(t)
    }, [idx]);

    const timerWidth = (timeLeft / timePerQ) * 100;
    let timerColorClass = 'bg-green-500';
    if (timerWidth < 50) timerColorClass = 'bg-yellow-500';
    if (timerWidth < 25) timerColorClass = 'bg-red-500';

    function handleAnswer(optIdx) {
        if (locked) return;
        setLocked(true);
        const correct = optIdx === q.correct;
        setAnswers(a => [...a, { i: qIndex, correct, optIdx }]);
        if (correct) {
            const bonus = timeLeft >= 20 ? 5 : 2;
            setScore(s => s + 10 + bonus);
            setStreak(s => s + 1)
        } else {
            setStreak(0)
        }
        setTimeout(() => {
            if (idx + 1 < order.length) {
                setIdx(idx + 1);
                setLocked(false)
            } else {
                const finalCorrectCount = answers.filter(a => a.correct).length + (correct ? 1 : 0);
                const finalScore = score + (correct ? 10 + (timeLeft >= 20 ? 5 : 2) : 0);
                updateAchievements({ score: finalScore, correct: finalCorrectCount, total: order.length, streak: correct ? streak + 1 : 0 });
                onFinish({ score: finalScore, correct: finalCorrectCount, total: order.length })
            }
        }, 2500)
    }
    return (
        <AnimatedView className="space-y-4">
            <Card className="p-4"><div className="flex flex-wrap items-center justify-between gap-4"><div className="flex items-center gap-3"><Badge>PONTOS: {score}</Badge><Badge>STREAK: {streak} 🔥</Badge></div><div className="flex items-center gap-2 w-full sm:w-auto"><span className="text-sm text-slate-500 dark:text-slate-400">Tempo</span><div className="h-2 w-full flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700"><div className={`h-full ${timerColorClass} transition-all duration-1000 linear`} style={{ width: `${timerWidth}%` }} /></div><span className="w-8 text-right font-semibold tabular-nums text-slate-800 dark:text-white">{timeLeft}s</span></div></div></Card>
            <Card className="p-6 relative"><p className="mb-5 text-xl font-semibold text-slate-800 dark:text-white">{idx + 1}. {q.q}</p><div className="grid gap-3">{q.options.map((opt, i) => { const isCorrect = i === q.correct; const lastAnswer = answers[answers.length - 1]; const isSelectedWrong = locked && !isCorrect && lastAnswer?.optIdx === i; let buttonClass = "border-slate-300 dark:border-slate-700 hover:border-lime-500 hover:bg-lime-500/10"; if (locked && isCorrect) buttonClass = "border-green-500 bg-green-500/10 text-slate-800 dark:text-white animate-[pulse_0.5s_ease-in-out]"; if (isSelectedWrong) buttonClass = "border-red-500 bg-red-500/10 text-slate-800 dark:text-white"; return (<button key={i} onClick={() => handleAnswer(i)} disabled={locked} className={`flex items-center justify-between w-full rounded-lg border-2 p-4 text-left text-slate-700 dark:text-slate-300 transition-all duration-200 disabled:opacity-80 ${buttonClass}`}><span>{String.fromCharCode(65 + i)}) {opt}</span>{locked && isCorrect && <Icon path={ICONS.check} className="w-6 h-6 text-green-500" />}{isSelectedWrong && <Icon path={ICONS.x} className="w-6 h-6 text-red-500" />}</button>) })}</div>{locked && (<div className="mt-4 p-3 rounded-lg bg-slate-100 dark:bg-slate-800/70 animate-[fadeIn_0.5s]"><p className="text-sm text-slate-600 dark:text-slate-300"><strong className="font-bold text-lime-700 dark:text-lime-400">Explicação:</strong> {q.explain}</p></div>)}</Card>
            <p className="text-center text-sm text-slate-500">Pergunta {idx + 1} de {order.length}</p>
        </AnimatedView>
    );
}

function Leaderboard({ open, onClose, leaderboard }) {
    const top = leaderboard.slice(0, 10);
    const medals = ['🥇', '🥈', '🥉'];
    return (
        <Modal open={open} onClose={onClose} title="Ranking – Top 10">
            <ol className="space-y-2">
                {top.map((row, i) => (<li key={i} className={`flex items-center justify-between rounded-lg border p-3 text-sm border-slate-200 dark:border-slate-800 ${i < 3 ? 'bg-lime-500/10' : ''}`}><span className="flex items-center gap-3"><strong className="text-lg w-8 text-center text-slate-800 dark:text-white">{medals[i] || `#${i + 1}`}</strong><span className="text-2xl">{row.avatar}</span><span className="font-semibold text-slate-800 dark:text-white">{row.name}</span></span><span className="font-bold tabular-nums text-lime-600 dark:text-lime-400">{row.score} pts</span></li>))}
                {top.length === 0 && <p className="text-center text-sm text-slate-500 py-8">Ainda não há pontuações. Jogue um nível para aparecer aqui!</p>}
            </ol>
        </Modal>
    );
}

function Achievements({ achievements }) {
    const list = []; if (achievements.firstPlay) list.push({ label: "Primeira partida", desc: "Você iniciou sua jornada!" }); if (achievements.fastThinker) list.push({ label: "Raciocínio Rápido", desc: "Acertou com rapidez em várias questões." }); if (achievements.perfectLevel) list.push({ label: "Nível Perfeito", desc: "Gabaritou um nível." }); if (achievements.hundredPoints) list.push({ label: "Cem+, bora!", desc: "Passou de 100 pontos em um nível." }); if (list.length === 0) return null;
    return (
        <Card className="p-6">
            <h4 className="mb-3 font-bold text-lg text-lime-700 dark:text-lime-400">Conquistas</h4>
            <ul className="grid gap-3 md:grid-cols-2">
                {list.map((b, i) => (<li key={i} className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white/20 dark:bg-slate-800/50 p-3 text-sm shadow-sm"><p className="font-semibold text-base text-slate-800 dark:text-white">🏅 {b.label}</p><p className="text-slate-600 dark:text-slate-400">{b.desc}</p></li>))}
            </ul>
        </Card>
    );
}

export default function App() {
    const [theme, setTheme] = useState(() => localStorage.getItem("tp_theme") || "dark");
    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("tp_theme", theme);
    }, [theme]);

    const [profile, setProfile] = useLocalStorage(STORAGE_KEYS.profile, defaultProfile);
    const [progress, setProgress] = useLocalStorage(STORAGE_KEYS.progress, {});
    const [leaderboard, setLeaderboard] = useLocalStorage(STORAGE_KEYS.leaderboard, []);
    const [achievements, setAchievements] = useLocalStorage(STORAGE_KEYS.achievements, {});

    const [screen, setScreen] = useState(profile.name ? "levels" : "start");
    const [currentLevel, setCurrentLevel] = useState(null);
    const [result, setResult] = useState(null);
    const [lbOpen, setLbOpen] = useState(false);

    const unlockedLevels = useMemo(() => {
        const unlocked = new Set([LEVELS[0].id]);
        LEVELS.forEach((lv, i) => { const stat = progress[lv.id]; const ok = stat && stat.correct / stat.total >= 0.5; if (ok && LEVELS[i + 1]) unlocked.add(LEVELS[i + 1].id); });
        return unlocked;
    }, [progress]);

    function startGame() { setScreen("levels"); }
    function openLevel(level) { setCurrentLevel(level); setScreen("playing"); }

    function finishLevel({ score, correct, total }) {
        setProgress(p => { const prev = p[currentLevel.id] || { bestScore: 0, correct: 0, total }; return { ...p, [currentLevel.id]: { bestScore: Math.max(prev.bestScore, score), correct: Math.max(prev.correct, correct), total } } });
        setLeaderboard(lb => shuffle([...lb.filter(e => e.name !== profile.name), { name: profile.name || "Convidado", avatar: profile.avatar, score, ts: Date.now() }]).sort((a, b) => b.score - a.score).slice(0, 50));
        setResult({ score, correct, total }); setScreen("result");
    }

    function updateAchievements({ score, correct, total, streak }) { setAchievements(a => ({ ...a, firstPlay: true, fastThinker: a.fastThinker || score >= 30 && streak >= 2 ? 1 : 0, perfectLevel: a.perfectLevel || correct === total ? 1 : 0, hundredPoints: a.hundredPoints || score >= 100 ? 1 : 0 })) }

    return (
        <div className="min-h-dvh bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans transition-colors duration-300">
            <div className="fixed inset-0 -z-10 h-full w-full bg-slate-50 dark:bg-slate-950 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]"></div>
            <div className="fixed inset-0 -z-10 h-full w-full bg-[radial-gradient(circle_800px_at_100%_200px,#a3e63522,transparent)]"></div>

            <main className="mx-auto max-w-7xl p-4 sm:p-6">
                {screen !== "start" && (<Header profile={profile} onGoHome={screen !== 'levels' ? () => setScreen("levels") : null} onChangeProfile={screen === 'levels' ? () => setScreen("start") : null} onOpenLeaderboard={() => setLbOpen(true)} onToggleTheme={() => setTheme(t => t === "light" ? "dark" : "light")} />)}
                {screen === "start" && <StartScreen onStart={startGame} profile={profile} setProfile={setProfile} />}
                {screen === "levels" && (<AnimatedView className="space-y-8"><Card className="p-6 text-center"><h2 className="text-3xl font-black text-slate-800 dark:text-white">Escolha seu próximo desafio</h2><p className="text-slate-600 dark:text-slate-400 mt-1">Complete níveis para desbloquear os próximos. Estude pelo PDF quando precisar!</p></Card><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">{LEVELS.map(lv => <LevelCard key={lv.id} level={lv} locked={!unlockedLevels.has(lv.id)} progress={progress[lv.id]} onOpen={() => openLevel(lv)} />)}</div><Achievements achievements={achievements} /></AnimatedView>)}
                {screen === "playing" && currentLevel && (<AnimatedView className="space-y-6"><Card className="p-6"><div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-2xl font-black text-slate-800 dark:text-white">{currentLevel.title}</h2><a className="text-sm underline underline-offset-4 text-lime-600 dark:text-lime-400" href={currentLevel.pdfUrl} target="_blank" rel="noreferrer">Revisar PDF do nível</a></div><p className="text-slate-600 dark:text-slate-400 mt-1">Responda rápido, mantenha o streak e some pontos extras!</p></Card><Quiz level={currentLevel} onFinish={finishLevel} updateAchievements={updateAchievements} /></AnimatedView>)}
                {screen === "result" && result && (<AnimatedView className="space-y-6 text-center"><Card className="p-8"><h2 className="text-3xl font-black text-slate-800 dark:text-white">Resultado do Nível</h2><p className="text-lg text-slate-600 dark:text-slate-400 mt-2">Pontuação: <strong className="text-3xl text-lime-600 dark:text-lime-400">{result.score}</strong> • Acertos: <strong className="text-3xl text-slate-800 dark:text-white">{result.correct}/{result.total}</strong></p><div className="mt-6 flex flex-wrap justify-center gap-4"><button onClick={() => setScreen("levels")} className="rounded-lg border border-slate-300 dark:border-slate-700 px-6 py-3 font-semibold hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">Voltar aos níveis</button><button onClick={() => openLevel(currentLevel)} className="rounded-lg bg-lime-600 px-6 py-3 font-semibold text-slate-900 hover:bg-lime-500 transition-all hover:scale-105">Jogar novamente</button></div></Card><Card className="p-6 text-left"><h3 className="mb-2 font-bold text-lg text-lime-700 dark:text-lime-400">Compartilhe sua pontuação</h3><p className="text-sm text-slate-600 dark:text-slate-400">Copie o texto abaixo e cole onde quiser:</p><pre className="mt-2 w-full overflow-auto rounded-lg bg-slate-100 dark:bg-slate-800/80 p-4 text-sm text-slate-800 dark:text-white">{`${profile.avatar} ${profile.name} fez ${result.score} pontos no "Trilhas de Programação"! 🚀`}</pre></Card></AnimatedView>)}
                <Leaderboard open={lbOpen} onClose={() => setLbOpen(false)} leaderboard={leaderboard} />
                <footer className="mt-12 text-center text-xs text-slate-500"><p>© {new Date().getFullYear()} Trilhas de Programação • <a className="underline hover:text-lime-500" href="https://github.com" target="_blank" rel="noreferrer"></a></p></footer>
            </main>
        </div>
    );
}