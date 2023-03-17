# [剑指 Offer II 095. 最长公共子序列](https://leetcode.cn/problems/qJnOS7)

## 题目描述

<!-- 这里写题目描述 -->

<p>给定两个字符串&nbsp;<code>text1</code> 和&nbsp;<code>text2</code>，返回这两个字符串的最长 <strong>公共子序列</strong> 的长度。如果不存在 <strong>公共子序列</strong> ，返回 <code>0</code> 。</p>

<p>一个字符串的&nbsp;<strong>子序列</strong><em>&nbsp;</em>是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。</p>

<ul>
	<li>例如，<code>&quot;ace&quot;</code> 是 <code>&quot;abcde&quot;</code> 的子序列，但 <code>&quot;aec&quot;</code> 不是 <code>&quot;abcde&quot;</code> 的子序列。</li>
</ul>

<p>两个字符串的 <strong>公共子序列</strong> 是这两个字符串所共同拥有的子序列。</p>

<p>&nbsp;</p>

<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>text1 = &quot;abcde&quot;, text2 = &quot;ace&quot; 
<strong>输出：</strong>3  
<strong>解释：</strong>最长公共子序列是 &quot;ace&quot; ，它的长度为 3 。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>text1 = &quot;abc&quot;, text2 = &quot;abc&quot;
<strong>输出：</strong>3
<strong>解释：</strong>最长公共子序列是 &quot;abc&quot; ，它的长度为 3 。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>text1 = &quot;abc&quot;, text2 = &quot;def&quot;
<strong>输出：</strong>0
<strong>解释：</strong>两个字符串没有公共子序列，返回 0 。
</pre>

<p>&nbsp;</p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>1 &lt;= text1.length, text2.length &lt;= 1000</code></li>
	<li><code>text1</code> 和&nbsp;<code>text2</code> 仅由小写英文字符组成。</li>
</ul>

<p>&nbsp;</p>

<p><meta charset="UTF-8" />注意：本题与主站 1143&nbsp;题相同：&nbsp;<a href="https://leetcode.cn/problems/longest-common-subsequence/">https://leetcode.cn/problems/longest-common-subsequence/</a></p>

## 解法

<!-- 这里可写通用的实现逻辑 -->

**方法一：动态规划**

定义 `dp[i][j]` 表示 `text1[0:i-1]` 和 `text2[0:j-1]` 的最长公共子序列（闭区间）。

递推公式如下：

![](https://fastly.jsdelivr.net/gh/doocs/leetcode@main/lcof2/剑指%20Offer%20II%20095.%20最长公共子序列/images/gif.gif)

时间复杂度 O(mn)。

<!-- tabs:start -->

### **Cyrus**

```javascript
/**
 * 剑指 Offer II 095. 最长公共子序列
 * 
 * 动态规划的典型例题，可以作为一个模板，通过这道题了解动态规划的流程个概念
 * 
 * 1）定义 dp 数组
 * 
 * dp 是个二维数组，dp[i][j] 表示 text1 长度为 i 的前缀，和 text2 长度为 j 的前缀，的最长公共子序列
 * 所以 max(i) = text1.length + 1
 * 
 * 2）状态转移方程
 * 
 * 考虑如何计算任一格子的值 dp[i][j]
 * dp[i - 1][j - 1]、dp[i - 1][j] 和 dp[i][j - 1] 是已知的，我们需要找出规律（状态转移方程），通过它们计算出 dp[i][j]
 * 对于 text1[i - 1] 和 text2[j - 1]，如果它们相等，那么相当于使 text1[i - 2] 和 text2[j - 2] 的最长公共子序列 + 1，即 dp[i - 1][j - 1] + 1
 * 如果不相等则不能使 dp[i - 1][j - 1] 增长，此时应该取 dp[i][j - 1] 和 dp[i - 1][j] 的最大值
 * 如果 i == 0 or j == 0 表示空前缀，取 0
 * 
 * 
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function(text1, text2) {
    if (!text1 || !text2) return 0;

    var m = text1.length + 1, n = text2.length + 1;
    var dp = new Array(m);
    for (let i = 0; i < dp.length; i++) {
        dp[i] = new Array(n);
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i == 0 || j == 0) {
                dp[i][j] = 0;
                continue;
            }

            if (text1[i - 1] == text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
                continue;
            }

            dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
    }
    return dp[m - 1][n - 1];
};

/**
 * 3）压缩 dp 数组
 * 
 * 考虑到每次计算 dp[i][j] 只需用到当前行和上一行，那么可以用两行替代二维数组 dp
 * 
 * 每次计算 Math.max(左边, 上边) 时，左边就是 dp[j - 1]，上边就是 dp[j]
 * 
 * 但计算【左上 + 1】时就有问题了，此时【左上】已经被【左】覆盖了，所以需要用 prev 保留上一行 
 * 
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function(text1, text2) {
    if (!text1 || !text2) return 0;

    var m = text1.length + 1, n = text2.length + 1;
    var dp = new Array(n);

    for (let i = 0, prev; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i == 0 || j == 0) {
                dp[j] = 0;
            } else if (text1[i - 1] == text2[j - 1]) {
                dp[j] = prev[j - 1] + 1;
            } else {
                dp[j] = Math.max(dp[j], dp[j - 1]);
            }
            tmp = dp[j];
        }
        prev = Array.from(dp);
    }
    return dp[n - 1];
};
```

### **Python3**

<!-- 这里可写当前语言的特殊实现逻辑 -->

```python
class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        m, n = len(text1), len(text2)
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if text1[i - 1] == text2[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1] + 1
                else:
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
        return dp[-1][-1]
```

### **Java**

<!-- 这里可写当前语言的特殊实现逻辑 -->

```java
class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        int m = text1.length(), n = text2.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 1; i <= m; ++i) {
            for (int j = 1; j <= n; ++j) {
                if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        return dp[m][n];
    }
}
```

### **C++**

```cpp
class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        int m = text1.size(), n = text2.size();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1));
        for (int i = 1; i <= m; ++i) {
            for (int j = 1; j <= n; ++j) {
                if (text1[i - 1] == text2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        return dp[m][n];
    }
};
```

### **Go**

```go
func longestCommonSubsequence(text1 string, text2 string) int {
	m, n := len(text1), len(text2)
	dp := make([][]int, m+1)
	for i := 0; i <= m; i++ {
		dp[i] = make([]int, n+1)
	}
	for i := 1; i <= m; i++ {
		for j := 1; j <= n; j++ {
			if text1[i-1] == text2[j-1] {
				dp[i][j] = dp[i-1][j-1] + 1
			} else {
				dp[i][j] = max(dp[i-1][j], dp[i][j-1])
			}
		}
	}
	return dp[m][n]
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}
```

### **JavaScript**

```js
/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
    const m = text1.length;
    const n = text2.length;
    const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));
    for (let i = 1; i <= m; ++i) {
        for (let j = 1; j <= n; ++j) {
            if (text1[i - 1] == text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[m][n];
};
```

### **...**

```

```

<!-- tabs:end -->
