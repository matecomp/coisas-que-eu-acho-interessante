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
A solução simples é simular as operações e contar quantas operações são necessárias para que o número chegue a zero.

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