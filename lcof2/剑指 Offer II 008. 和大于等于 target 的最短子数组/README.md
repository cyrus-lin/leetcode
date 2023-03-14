# [剑指 Offer II 008. 和大于等于 target 的最短子数组](https://leetcode.cn/problems/2VG8Kg)

## 题目描述

<!-- 这里写题目描述 -->

<p>给定一个含有&nbsp;<code>n</code><strong>&nbsp;</strong>个正整数的数组和一个正整数 <code>target</code><strong> 。</strong></p>

<p>找出该数组中满足其和<strong> </strong><code>&ge; target</code><strong> </strong>的长度最小的 <strong>连续子数组</strong>&nbsp;<code>[nums<sub>l</sub>, nums<sub>l+1</sub>, ..., nums<sub>r-1</sub>, nums<sub>r</sub>]</code> ，并返回其长度<strong>。</strong>如果不存在符合条件的子数组，返回 <code>0</code> 。</p>

<p>&nbsp;</p>

<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>target = 7, nums = [2,3,1,2,4,3]
<strong>输出：</strong>2
<strong>解释：</strong>子数组&nbsp;<code>[4,3]</code>&nbsp;是该条件下的长度最小的子数组。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>target = 4, nums = [1,4,4]
<strong>输出：</strong>1
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>target = 11, nums = [1,1,1,1,1,1,1,1]
<strong>输出：</strong>0
</pre>

<p>&nbsp;</p>

<p>提示：</p>

<ul>
	<li><code>1 &lt;= target &lt;= 10<sup>9</sup></code></li>
	<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= nums[i] &lt;= 10<sup>5</sup></code></li>
</ul>

<p>&nbsp;</p>

<p>进阶：</p>

<ul>
	<li>如果你已经实现<em> </em><code>O(n)</code> 时间复杂度的解法, 请尝试设计一个 <code>O(n log(n))</code> 时间复杂度的解法。</li>
</ul>

<p>&nbsp;</p>

<p><meta charset="UTF-8" />注意：本题与主站 209&nbsp;题相同：<a href="https://leetcode.cn/problems/minimum-size-subarray-sum/">https://leetcode.cn/problems/minimum-size-subarray-sum/</a></p>

## 解法

<!-- 这里可写通用的实现逻辑 -->

<!-- tabs:start -->


### **Cyrus**

```javascript
/**
 * 求连续子数组、区间的问题一般可以用：滑动窗口、双指针、前缀和
 * 
 * 此问题虽然数组未排序，但其元素都是正整数就保证了：增加窗口 sum 增大，减小窗口 sum 减小
 * 而滑动窗口的关键操作就是增大/减小窗口
 * 
 * 前缀和解法
 * 指针 j 遍历数组，其作为目标区间的结束标志
 * 当区间和 sum >= k 时，即存在和 >= k 的一个或多个区间，此时只要二分搜索前缀和数组，找到小于 sum - k 的极大值 pres[i]
 * [i + 1, j] 就是区间 [0, j] 里满足条件的最短区间
 * 
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(target, nums) {
    var ret = Number.MAX_VALUE;
    for (let i = 0, j = 0, sum = 0; j < nums.length; j++) {
        sum += nums[j];
        while (sum >= target && i <= j) {
            ret = Math.min(ret, j - i + 1);
            sum -= nums[i];
            i++;
        }
    }
    return ret == Number.MAX_VALUE ? 0 : ret;
};
```

### **Python3**

<!-- 这里可写当前语言的特殊实现逻辑 -->

```python
class Solution:
    def minSubArrayLen(self, target: int, nums: List[int]) -> int:
        n = len(nums)
        ans = inf
        sum = 0
        left, right = 0, 0
        while right < n:
            sum += nums[right]
            right += 1
            while sum >= target:
                ans = min(ans, right - left)
                sum -= nums[left]
                left += 1
        return 0 if ans == inf else ans
```

### **Java**

<!-- 这里可写当前语言的特殊实现逻辑 -->

```java
class Solution {
    public int minSubArrayLen(int target, int[] nums) {
        int n = nums.length;
        int ans = Integer.MAX_VALUE;
        int sum = 0;
        int left = 0, right = 0;
        while (right < n) {
            sum += nums[right++];
            while (sum >= target) {
                ans = Math.min(ans, right - left);
                sum -= nums[left++];
            }
        }
        return ans == Integer.MAX_VALUE ? 0 : ans;
    }
}
```

### **Go**

```go
func minSubArrayLen(target int, nums []int) int {
	n := len(nums)
	ans := math.MaxInt32
	sum := 0
	left, right := 0, 0
	for right < n {
		sum += nums[right]
		right++
		for sum >= target {
			ans = min(ans, right-left)
			sum -= nums[left]
			left++
		}
	}
	if ans == math.MaxInt32 {
		return 0
	}
	return ans
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}
```

### **C++**

```cpp
class Solution {
public:
    int minSubArrayLen(int target, vector<int>& nums) {
        int left = 0, right;
        int sum = 0;
        int minlen = INT_MAX;

        for (right = 0; right < nums.size(); right++) {
            sum += nums[right];
            while (left <= right && sum >= target) {
                minlen = min(minlen, right - left + 1);
                sum -= nums[left++];
            }
        }

        return minlen == INT_MAX ? 0 : minlen;
    }
};
```

### **...**

```

```

<!-- tabs:end -->
