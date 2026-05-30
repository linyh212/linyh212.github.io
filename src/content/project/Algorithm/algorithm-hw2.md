---
slug: algorithm-hw2
title: Algorithm HW2
date: 2026-05-30
description: Algorithm HW2
---

``` c++
#include <iostream>
#include <vector>
#include <algorithm>
#include <chrono>
using namespace std;
using namespace std::chrono;

// Bottom-up DP method
int knapsackBottomUp(int W, const vector<int> &weights, const vector<int> &profits) {
    int n = weights.size();
    vector<vector<int>> dp(n + 1, vector<int>(W + 1, 0));
    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            if (weights[i - 1] <= w) dp[i][w] = max(dp[i - 1][w], dp[i - 1][w - weights[i - 1]] + profits[i - 1]);
            else dp[i][w] = dp[i - 1][w];
        }
    }
    return dp[n][W];
}
// Top-down DP method with memoization
int knapsackTopDownHelper(int i, int W, const vector<int> &weights, const vector<int> &profits, vector<vector<int>> &memo) {
    if (i < 0 || W <= 0) return 0;
    if (memo[i][W] != -1) return memo[i][W];
    if (weights[i] > W) memo[i][W] = knapsackTopDownHelper(i - 1, W, weights, profits, memo);
    else {
        memo[i][W] = max(knapsackTopDownHelper(i - 1, W, weights, profits, memo),
        profits[i] + knapsackTopDownHelper(i - 1, W - weights[i], weights, profits, memo));
    }
    return memo[i][W];
}
int knapsackTopDown(int W, const vector<int> &weights, const vector<int> &profits) {
    int n = weights.size();
    vector<vector<int>> memo(n, vector<int>(W + 1, -1));
    return knapsackTopDownHelper(n - 1, W, weights, profits, memo);
}
// Greedy method
int knapsackGreedy(int W, vector<int> weights, vector<int> profits) {
    int n = weights.size();
    vector<pair<double, int>> ratio(n);
    for (int i = 0; i < n; i++) {
        ratio[i] = {static_cast<double>(profits[i]) / weights[i], i};
    }
    sort(ratio.rbegin(), ratio.rend());
    int totalProfit = 0;
    for (size_t i = 0; i < ratio.size(); i++) {
        double r = ratio[i].first;
        int idx = ratio[i].second;
        if (weights[idx] <= W) {
            W -= weights[idx];
            totalProfit += profits[idx];
        }
        else {
            totalProfit += profits[idx] * W / weights[idx];
            break;
        }
    }
    return totalProfit;
}
// Test and compare methods
void testKnapsackMethods() {
    vector<int> itemCounts = {10, 20, 30};
    vector<int> weightRanges = {1, 10, 100, 1000};
    for (int n : itemCounts) {
        for (int range : weightRanges) {
            vector<int> weights(n), profits(n);
            for (int i = 0; i < n; i++) {
                weights[i] = rand() % range + 1;
                profits[i] = rand() % range + 1;
            }
            int W = range * n / 2;
            cout << "Items: " << n << ", Weight range: [1-" << range << "], Capacity: " << W << endl;
            auto start = high_resolution_clock::now();
            int bottomUpResult = knapsackBottomUp(W, weights, profits);
            auto end = high_resolution_clock::now();
            cout << "Bottom-up DP result: " << bottomUpResult << ", Time: " << duration_cast<nanoseconds>(end - start).count() << " ms" << endl;
            start = high_resolution_clock::now();
            int topDownResult = knapsackTopDown(W, weights, profits);
            end = high_resolution_clock::now();
            cout << "Top-down DP result: " << topDownResult << ", Time: " << duration_cast<nanoseconds>(end - start).count() << " ms" << endl;
            start = high_resolution_clock::now();
            int greedyResult = knapsackGreedy(W, weights, profits);
            end = high_resolution_clock::now();
            cout << "Greedy result: " << greedyResult << ", Time: " << duration_cast<nanoseconds>(end - start).count() << " ms" << endl;
            cout << "-----------------------------------" << endl;
        }
    }
}

int main() {
    testKnapsackMethods();
    return 0;
}
```
## Code Overview
#### Bottom-Up Dynamic Programming
Function: int knapsackBottomUp(int W, const vector<int>& weights, const vector<int>& profits)
- Uses a 2D table dp[i][w], where i is the number of items and w is the capacity.
- Iteratively fills the table using standard DP recurrence.
- Time complexity: $O(nW)$
- Space complexity: $O(nW)$

#### Top-Down Dynamic Programming with Memoization
Function: int knapsackTopDown(int W, const vector<int>& weights, const vector<int>& profits)
- Uses recursion with memoization to cache subproblem results.
- Only computes values that are required for the final solution.
- Time complexity: $O(nW)$ worst-case, but often faster in practice.
- Space complexity: $O(nW)$ for memo table + stack depth.

#### Greedy Approximation Algorithm
Function: int knapsackGreedy(int W, vector<int> weights, vector<int> profits)
- Calculates profit-to-weight ratio for each item.
- Sorts items by decreasing ratio and picks them until capacity is full.
- Allows fractional selection only in the final item if needed (approximate for 0/1 knapsack).
- Time complexity: O(n log n)
- Space complexity: O(n) for sorting.
## Input Design and Testing Methodology
We systematically tested each method across different input configurations:
Item Counts: 10, 20, 30
- Weight/Profit Ranges: [1,1], [1,10], [1,100], [1,1000]
- Capacity: $W = range * n / 2$
- Metrics: Solution quality and runtime measured with std::chrono

## Sample Results and Analysis
Below are the results of the test:
![圖片](https://hackmd.io/_uploads/rk5RrpYlgl.png)
| Items | Range    | Capacity | Bottom-Up Profit | Bottom-Up Time (ms) | Top-Down Profit | Top-Down Time (ms) | Greedy Profit | Greedy Time (ms) |
|-------|----------|----------|------------------|----------------------|------------------|---------------------|---------------|------------------|
| 10    | 1-1      | 5        | 5                | 6610                 | 5                | 4137                | 5             | 5482             |
| 10    | 1-10     | 50       | 59               | 19073                | 59               | 14460               | 59            | 4384             |
| 10    | 1-100    | 500      | 538              | 158546               | 538              | 38206               | 544           | 4634             |
| 10    | 1-1000   | 5000     | 6274             | 1070276              | 6274             | 92860               | 6274          | 5006             |
| 20    | 1-1      | 10       | 10               | 12651                | 10               | 13061               | 10            | 8027             |
| 20    | 1-10     | 100      | 121              | 63464                | 121              | 61252               | 121           | 8230             |
| 20    | 1-100    | 1000     | 912              | 453685               | 912              | 262079              | 912           | 9146             |
| 20    | 1-1000   | 10000    | 11894            | 4886643              | 11894            | 2791800             | 11929         | 10817            |
| 30    | 1-1      | 15       | 15               | 21106                | 15               | 25450               | 15            | 10188            |
| 30    | 1-10     | 150      | 159              | 144169               | 159              | 99179               | 159           | 15170            |
| 30    | 1-100    | 1500     | 1465             | 1106677              | 1465             | 844649              | 1466          | 16023            |
| 30    | 1-1000   | 15000    | 14510            | 9415899              | 14510            | 5687323             | 14510         | 19193            |

## Conclusion
The experimental results demonstrate the trade offs between accuracy and computational efficiency among the three knapsack solution methods:

#### 1. Optimality vs. Speed:

Both DP methods (bottom-up and top-down) consistently found optimal solutions, while the greedy method occasionally produced suboptimal results (e.g., for 20 items with range 1-1000, greedy found 11929 vs. optimal 11894).

The greedy method was significantly faster (often by 1-2 orders of magnitude) but sacrificed optimality, especially noticeable in larger problems.

#### 2. DP Variant Comparison:

Top-down DP showed better performance than bottom-up in most cases, particularly for larger problems (e.g., 30 items with range 1-1000: 5.68ms vs 9.42ms), likely due to memoization avoiding computation of unnecessary subproblems.

Bottom-up DP maintained more consistent performance characteristics but required full table computation.

#### 3. Scalability Observations:

All methods showed polynomial time growth with problem size, but the greedy method scaled best (near-linear).

DP methods became impractical for very large W (capacity) due to $O(nW)$ complexity, while greedy remained efficient.

#### 4. Practical Recommendations:

Use bottom-up DP when optimality is critical and problem sizes are moderate.

Prefer top-down DP for problems with sparse solution spaces where memoization can provide advantages.

Consider the greedy method when (a) near-optimal solutions are sufficient, or (b) problem sizes make DP infeasible.

The choice of method should depend on problem constraints and requirements - whether optimality or speed is more critical for the application at hand. For the 0/1 knapsack problem, the DP approaches remain the gold standard when exact solutions are required, while the greedy method provides a fast approximation suitable for many practical scenarios.
