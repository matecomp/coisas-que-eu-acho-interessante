/**
 * @param {number} num
 * @return {number}
 */
var numberOfSteps  = function(num) {
    let n = num;
    n = n - ((n >> 1) & 0x55555555);                           //Magia negra
    n = (n & 0x33333333) + ((n >> 2) & 0x33333333);            //Aconteceu
    n = ((n + (n >> 4) & 0xF0F0F0F) * 0x1010101) >> 24;        //Aqui
    
    return Math.floor(Math.log2(num)) + n
};