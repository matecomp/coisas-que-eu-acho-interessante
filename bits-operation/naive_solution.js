var numberOfSteps  = function(num) {
    let count = 0;
    while (num > 1) {
        count += num%2 + 1;
        num = Math.floor(num / 2);
    }
    return count + 1
};