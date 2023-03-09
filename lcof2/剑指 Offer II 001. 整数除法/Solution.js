/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var divide = function (a, b) {
    if (a == 0 || b == 0) return 0;

    var ret = 0;
    if (b == 1) {
        ret = a;
    } else if (b == -1) {
        ret = -a;
    } else {
        var negative = (a < 0 && b > 0) || (a > 0 && b < 0);
        a = Math.abs(a);
        b = Math.abs(b);
        while (a >= b) {
            a -= b;
            ret++;
        }
        ret = negative ? -ret : ret;
    }

    var max = 1 << 31 - 1;
    var min = -1 << 31;
    return Math.max(Math.min(max, ret), min);
};