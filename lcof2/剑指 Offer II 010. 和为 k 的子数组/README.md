# [剑指 Offer II 010. 和为 k 的子数组](https://leetcode.cn/problems/QTMn0o)

## 题目描述

<!-- 这里写题目描述 -->

<p>给定一个整数数组和一个整数&nbsp;<code>k</code><strong> ，</strong>请找到该数组中和为&nbsp;<code>k</code><strong>&nbsp;</strong>的连续子数组的个数。</p>

<p>&nbsp;</p>

<p><strong>示例 1 :</strong></p>

<pre>
<strong>输入:</strong>nums = [1,1,1], k = 2
<strong>输出:</strong> 2
<strong>解释:</strong> 此题 [1,1] 与 [1,1] 为两种不同的情况
</pre>

<p><strong>示例 2&nbsp;:</strong></p>

<pre>
<strong>输入:</strong>nums = [1,2,3], k = 3
<strong>输出:</strong> 2
</pre>

<p>&nbsp;</p>

<p><strong>提示:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 2 * 10<sup>4</sup></code></li>
	<li><code>1000 &lt;= nums[i] &lt;= 1000</code></li>
	<li>
	<p><code>-10<sup>7</sup>&nbsp;&lt;= k &lt;= 10<sup>7</sup></code></p>
	</li>
</ul>

<p>&nbsp;</p>

<p>注意：本题与主站 560&nbsp;题相同：&nbsp;<a href="https://leetcode.cn/problems/subarray-sum-equals-k/">https://leetcode.cn/problems/subarray-sum-equals-k/</a></p>

## 解法

<!-- 这里可写通用的实现逻辑 -->

数组中既有正数又有负数，无法使用双指针。可以利用前缀和思想，快速判断子数组的和

<!-- tabs:start -->

### **Cyrus**

```javascript
/**
 * 从某一符合条件的情形里推导出规则：
 * 既然是连续的子数组，那么它的样子大概是这样的：
 * |     pre     |  section  | suf |
 * ---------------------------------
 *               x           y
 * 
 * 假设满足条件（和为 k）的连续区间为 section [x, y]，那么 x 和 y 就会把整个数组切分为三部分：
 * 1，前缀区间 pre
 * 2，和为 k 的区间 section
 * 3，后缀区间 suf
 * 
 * 在遍历数组 nums 的过程中，cnt 是已遍历区间 pre + section 的和，将目标区间 section 的 y 固定为当前索引
 * 那么就是要找到这么一个 x 使得：pre + section = cnt = sum(0, x) + k
 * cnt 已知（累加），k 已知，那么 pre = cnt - k，问题就转化为要找到和为 cnt - k 的前缀区间，也即前缀和
 * 而前缀和在遍历数组进行累加操作时已经算出来了，只需要将这些前缀和保存到一个 map 里，方便后续的查找
 * 
 * 直观的解法是使用 i 和 j 两个指针双重循环遍历 nums，计算 [i, j] 的和是否为 k
 * 这种解法相当于固定 section 区间的开始索引 x，计算结束索引 y
 * 想要设计出上面这种思路，必须颠倒一般思路：固定 section 区间的结束索引 y，计算开始索引 x，因为前缀和是可以复用的
 * 
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
    var map = new Map(), cnt = 0, hits = 0, pre = 0;
    map.set(0, 1);
    for (const num of nums) {
        cnt += num;
        pre = cnt - k;
        if (map.get(pre)) {
            hits += map.get(pre);
        }
        map.set(cnt, (map.get(cnt) ? map.get(cnt) : 0) + 1);
    }
    return hits;
};
```

### **Python3**

<!-- 这里可写当前语言的特殊实现逻辑 -->

```python
class Solution:
    def subarraySum(self, nums: List[int], k: int) -> int:
        d = defaultdict(int, {0: 1})
        ans, sum = 0, 0
        for num in nums:
            sum += num
            ans += d[sum - k]
            d[sum] += 1
        return ans
```

### **Java**

<!-- 这里可写当前语言的特殊实现逻辑 -->

```java
class Solution {
    public int subarraySum(int[] nums, int k) {
        Map<Integer, Integer> map = new HashMap<>();
        int ans = 0, sum = 0;
        map.put(0, 1);
        for (int num : nums) {
            sum += num;
            ans += map.getOrDefault(sum - k, 0);
            map.merge(sum, 1, Integer::sum);
        }
        return ans;
    }
}
```

### **Go**

```go
func subarraySum(nums []int, k int) int {
	m := map[int]int{0: 1}
	sum, ans := 0, 0
	for _, num := range nums {
		sum += num
		ans += m[sum-k]
		m[sum]++
	}
	return ans
}
```

### **C++**

```cpp
class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        if (nums.size() < 0) return 0;

        int presum = 0;
        int count = 0;
        unordered_map<int, int> mp;
        mp[0] = 1;

        for (int right = 0; right < nums.size(); right++) {
            presum += nums[right];
            count += mp[presum - k];
            mp[presum]++;
        }

        return count;
    }
};
```

### **...**

```

```

<!-- tabs:end -->
