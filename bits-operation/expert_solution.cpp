class Solution {
public:
    int numberOfSteps (int num) {
        return log2(num) + __builtin_popcount(num);
    }
};