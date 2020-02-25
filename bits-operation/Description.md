## Como tudo começou...

Todas as quartas feiras, no trabalho, a gente se reune para fazer resolver um problema de programação. E neste dia resolvemos o seguinte problema:

- https://leetcode.com/problems/number-of-steps-to-reduce-a-number-to-zero/

É um problema simples, ele quer saber quantas operações são necessárias para reduzir o número até zero. As operações disponíveis são:

- Se for ímpar: subtrai 1
- Se for par: divide por 2

Ex:
```
14 # divide por 2
7  # subtrai 1
6  # divide por 2
3  # subtrai 1
2  # divide por 2
1  # subtrai 1
0

Resposta: 6 operações
```
A solução simples é simular as operações e contar quantas operações são necessárias para que o número chegue a zero. Eu fiz uma leves otimizações, mas no geral estamos simulando. Pode ver no código abaixo que eu sempre divido por 2 como inteiro e incremento 2 quando é ímpar, eu simplesmente estou realizando as duas operações na mesma iteração do while quando o número é ímpar.

```
/**
 * @param {number} num
 * @return {number}
 */
var numberOfSteps  = function(num) {
    let count = 0;
    while (num > 1) {
        count += num%2 + 1;
        num = Math.floor(num / 2);
    }
    return count + 1
};
```

Isso já resolve e na plataforma do leetcode teve o seguinte rendimento:

[![Image from Gyazo](https://i.gyazo.com/ed41f87a45163b8e8434cc07b7024a15.png)](https://gyazo.com/ed41f87a45163b8e8434cc07b7024a15)


Então eu pensei... podemos melhorar o tempo de execução senão precisar operar todas as divisões. Talvez analisando a sua representacão binária, podemos obter a quantidade de operações sem que seja necessário realizar todas as operações.

Para transformar o número 1110 em 0, temos que deslocar para direita quando terminado em 0 e subtrair por 1 quando terminado em 1 que logo virará zero e será deslocado novamente. Então cada bit 1 vale duas operações e cada bit 0 vale apenas uma operação. O único ponto de atenção é o bit 1 mais a esquerda, pois quando o subtrairmos não será necessário deslocar o número à direita, pois já teremos zero.

Ex:
```
14 = 1110 na base 2

#ENTÃO...
Resposta: 2 * (bits 1) + (bits 0) - 1
```

** Como contar a quantidade de bits 1 num número inteiro? **