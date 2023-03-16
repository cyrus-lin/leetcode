# [剑指 Offer II 018. 有效的回文](https://leetcode.cn/problems/XltzEq)

## 题目描述

<!-- 这里写题目描述 -->

<p>给定一个字符串 <code>s</code> ，验证 <code>s</code>&nbsp;是否是&nbsp;<strong>回文串&nbsp;</strong>，只考虑字母和数字字符，可以忽略字母的大小写。</p>

<p>本题中，将空字符串定义为有效的&nbsp;<strong>回文串&nbsp;</strong>。</p>

<p>&nbsp;</p>

<p><strong>示例 1:</strong></p>

<pre>
<strong>输入: </strong>s =<strong> </strong>&quot;A man, a plan, a canal: Panama&quot;
<strong>输出:</strong> true
<strong>解释：</strong>&quot;amanaplanacanalpanama&quot; 是回文串</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> s = &quot;race a car&quot;
<strong>输出:</strong> false
解释：&quot;raceacar&quot; 不是回文串</pre>

<p>&nbsp;</p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 2 * 10<sup>5</sup></code></li>
	<li>字符串 <code>s</code> 由 ASCII 字符组成</li>
</ul>

<p>&nbsp;</p>

<p><meta charset="UTF-8" />注意：本题与主站 125&nbsp;题相同：&nbsp;<a href="https://leetcode.cn/problems/valid-palindrome/">https://leetcode.cn/problems/valid-palindrome/</a></p>

## 解法

<!-- 这里可写通用的实现逻辑 -->

<!-- tabs:start -->

### **Cyrus**

```javascript
/**
 * 剑指 Offer II 018. 有效的回文
 * 
 * 字符串是字符的数组，判断回文就用头尾双指针
 * 
 * 一些额外的规则：跳过 [0-9a-zA-Z] 和忽略大小写
 * 可以用 ASCII 码转换为数学计算比较快
 * 
 * 执行结果：通过 显示详情 你的代码真是无敌了！
 * 执行用时：52 ms, 在所有 JavaScript 提交中击败了 100.00% 的用户
 * 内存消耗：41.8 MB, 在所有 JavaScript 提交中击败了 98.56% 的用户
 * 
 * ASCII:
 * 0: 48, 9: 57
 * a: 97, z: 122
 * A: 65, Z: 90 
 * 
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    if (!s) return false;
    var isNumber = function(code) {
        return code >= 48 && code <= 57;
    }
    var isValid = function(code) {
        return isNumber(code) || (code >= 97 && code <= 122) || (code >= 65 && code <= 90); 
    }
    for (let l = 0, r = s.length - 1, lc = 0, rc = 0; l < r;) {
        lc = s.codePointAt(l);
        rc = s.codePointAt(r);
        
        if (!isValid(lc)) {
            l++;
            continue;
        }
        if (!isValid(rc)) {
            r--;
            continue;
        }
        if ((lc == rc) || (!isNumber(lc) && !isNumber(rc) && Math.abs(lc - rc) == 32)) {
            l++;
            r--;
            continue;
        }
        return false;
    }
    return true;
};
```

### **Python3**

<!-- 这里可写当前语言的特殊实现逻辑 -->

```python
class Solution:
    def isPalindrome(self, s: str) -> bool:
        i, j = 0, len(s) - 1
        while i < j:
            while i < j and not s[i].isalnum():
                i += 1
            while i < j and not s[j].isalnum():
                j -= 1
            if s[i].lower() != s[j].lower():
                return False
            i += 1
            j -= 1
        return True
```

### **Java**

<!-- 这里可写当前语言的特殊实现逻辑 -->

```java
class Solution {
    public boolean isPalindrome(String s) {
        int i = 0, j = s.length() - 1;
        while (i < j) {
            while (i < j && !Character.isLetterOrDigit(s.charAt(i))) {
                i++;
            }
            while (i < j && !Character.isLetterOrDigit(s.charAt(j))) {
                j--;
            }
            if (Character.toLowerCase(s.charAt(i)) != Character.toLowerCase(s.charAt(j))) {
                return false;
            }
            i++;
            j--;
        }
        return true;
    }
}
```

### **Go**

```go
func isPalindrome(s string) bool {
	i, j := 0, len(s)-1
	for i < j {
		for i < j && !isalnum(s[i]) {
			i++
		}
		for i < j && !isalnum(s[j]) {
			j--
		}
		if tolower(s[i]) != tolower(s[j]) {
			return false
		}
		i++
		j--
	}
	return true
}

func tolower(b byte) byte {
	if b >= 'A' && b <= 'Z' {
		return b - 'A' + 'a'
	}
	return b
}

func isalnum(b byte) bool {
	return b >= '0' && b <= '9' ||
		b >= 'a' && b <= 'z' ||
		b >= 'A' && b <= 'Z'
}
```

### **TypeScript**

```ts
function isPalindrome(s: string): boolean {
    const str = s.replace(/[^a-zA-Z0-9]/g, '');
    let l = 0;
    let r = str.length - 1;
    while (l < r) {
        if (str[l].toLocaleLowerCase() !== str[r].toLocaleLowerCase()) {
            return false;
        }
        l++;
        r--;
    }
    return true;
}
```

### **Rust**

使用 `is_alphabetic()` 与 `is_numeric()` 过滤字符

```rust
impl Solution {
    pub fn is_palindrome(s: String) -> bool {
        let ss: Vec<char> = s.chars().collect();
        let mut l = 0;
        let mut r = ss.len() - 1;
        while l < r {
            while l < r && !(ss[l].is_alphabetic() || ss[l].is_numeric()) {
                l += 1;
            }
            while l < r && !(ss[r].is_alphabetic() || ss[r].is_numeric()) {
                r -= 1;
            }
            if ss[l].to_ascii_lowercase() != ss[r].to_ascii_lowercase() {
                return false;
            }
            // 防止 usize 破界
            if r == 0 {
                return true;
            }
            l += 1;
            r -= 1;
        }
        true
    }
}
```

### **...**

```

```

<!-- tabs:end -->
