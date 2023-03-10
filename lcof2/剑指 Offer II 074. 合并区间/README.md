# [剑指 Offer II 074. 合并区间](https://leetcode.cn/problems/SsGoHC)

## 题目描述

<!-- 这里写题目描述 -->

<p>以数组 <code>intervals</code> 表示若干个区间的集合，其中单个区间为 <code>intervals[i] = [start<sub>i</sub>, end<sub>i</sub>]</code> 。请你合并所有重叠的区间，并返回一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间。</p>

<p>&nbsp;</p>

<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>intervals = [[1,3],[2,6],[8,10],[15,18]]
<strong>输出：</strong>[[1,6],[8,10],[15,18]]
<strong>解释：</strong>区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
</pre>

<p><strong>示例&nbsp;2：</strong></p>

<pre>
<strong>输入：</strong>intervals = [[1,4],[4,5]]
<strong>输出：</strong>[[1,5]]
<strong>解释：</strong>区间 [1,4] 和 [4,5] 可被视为重叠区间。</pre>

<p>&nbsp;</p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>1 &lt;= intervals.length &lt;= 10<sup>4</sup></code></li>
	<li><code>intervals[i].length == 2</code></li>
	<li><code>0 &lt;= start<sub>i</sub> &lt;= end<sub>i</sub> &lt;= 10<sup>4</sup></code></li>
</ul>

<p>&nbsp;</p>

<p><meta charset="UTF-8" />注意：本题与主站 56&nbsp;题相同：&nbsp;<a href="https://leetcode.cn/problems/merge-intervals/">https://leetcode.cn/problems/merge-intervals/</a></p>

## 解法

<!-- 这里可写通用的实现逻辑 -->

**方法一：区间合并**

区间合并，将所有存在交集的区间进行合并。方法是：先对区间**按照左端点升序排列**，然后遍历区间进行合并。

模板：

```python
def merge(intervals):
    ans = []
    intervals.sort()
    st, ed = intervals[0]
    for s, e in intervals[1:]:
        if ed < s:
            ans.append([st, ed])
            st, ed = s, e
        else:
            ed = max(ed, e)
    ans.append([st, ed])
    return ans
```

<!-- tabs:start -->

### **Cyrus**

```javascript
/**
 * 目标：合并所有有交集的区间（返回的区间两两不能有交集）
 * 明确区间合并的三种情况：
 *   ---- | ---- | ---- 
 * ----   |  --  |    ----
 * 
 * 如果不排序，需要两两对比
 * 
 * 对区间的开始位置排序后，将区间集合遍历一次即可，前后两个相邻区间进行合并操作
 * 相当于将上面的三种情况减少到后两种情况
 * 如果 i 和 i + 1 不能合并，那么 i 与 i + 2 及之后的区间也不能合并，因为区间的起始位置是升序排序的
 * 
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    if (!intervals || intervals.length < 2) return intervals;

    intervals.sort((l, r) => l[0] - r[0]);
    var ret = new Array(), cur = intervals[0];
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] > cur[1]) {
            ret.push(cur);
            cur = intervals[i];
            continue;
        }
        cur[1] = intervals[i][1] > cur[1] ? intervals[i][1] : cur[1];
    }
    ret.push(cur);
    return ret;
};
```

### **Python3**

<!-- 这里可写当前语言的特殊实现逻辑 -->

```python
class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        intervals.sort()
        ans = []
        st, ed = intervals[0]
        for s, e in intervals[1:]:
            if ed < s:
                ans.append([st, ed])
                st, ed = s, e
            else:
                ed = max(ed, e)
        ans.append([st, ed])
        return ans
```

### **Java**

<!-- 这里可写当前语言的特殊实现逻辑 -->

```java
class Solution {
    public int[][] merge(int[][] intervals) {
        Arrays.sort(intervals, Comparator.comparingInt(a -> a[0]));
        int st = intervals[0][0], ed = intervals[0][1];
        List<int[]> ans = new ArrayList<>();
        for (int i = 1; i < intervals.length; ++i) {
            int s = intervals[i][0], e = intervals[i][1];
            if (ed < s) {
                ans.add(new int[] {st, ed});
                st = s;
                ed = e;
            } else {
                ed = Math.max(ed, e);
            }
        }
        ans.add(new int[] {st, ed});
        return ans.toArray(new int[ans.size()][]);
    }
}
```

### **C++**

```cpp
class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end());
        int st = intervals[0][0], ed = intervals[0][1];
        vector<vector<int>> ans;
        for (int i = 1; i < intervals.size(); ++i) {
            int s = intervals[i][0], e = intervals[i][1];
            if (ed < s) {
                ans.push_back({st, ed});
                st = s, ed = e;
            } else
                ed = max(ed, e);
        }
        ans.push_back({st, ed});
        return ans;
    }
};
```

### **Go**

```go
func merge(intervals [][]int) [][]int {
	sort.Slice(intervals, func(i, j int) bool {
		return intervals[i][0] < intervals[j][0]
	})
	st, ed := intervals[0][0], intervals[0][1]
	var ans [][]int
	for _, e := range intervals[1:] {
		if ed < e[0] {
			ans = append(ans, []int{st, ed})
			st, ed = e[0], e[1]
		} else if ed < e[1] {
			ed = e[1]
		}
	}
	ans = append(ans, []int{st, ed})
	return ans
}
```

### **C#**

```cs
public class Solution {
    public int[][] Merge(int[][] intervals) {
        intervals = intervals.OrderBy(a => a[0]).ToArray();
        int st = intervals[0][0], ed = intervals[0][1];
        var ans = new List<int[]>();
        for (int i = 1; i < intervals.Length; ++i)
        {
            int s = intervals[i][0], e = intervals[i][1];
            if (ed < s)
            {
                ans.Add(new int[]{st, ed});
                st = s;
                ed = e;
            }
            else
            {
                ed = Math.Max(ed, e);
            }
        }
        ans.Add(new int[]{st, ed});
        return ans.ToArray();
    }
}
```

### **...**

```

```

<!-- tabs:end -->
