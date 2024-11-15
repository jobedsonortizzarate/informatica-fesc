"use strict"; function q(a) { throw a; } var t = void 0, u = !1; var sjcl = { cipher: {}, hash: {}, keyexchange: {}, mode: {}, misc: {}, codec: {}, exception: { corrupt: function (a) { this.toString = function () { return "CORRUPT: " + this.message }; this.message = a }, invalid: function (a) { this.toString = function () { return "INVALID: " + this.message }; this.message = a }, bug: function (a) { this.toString = function () { return "BUG: " + this.message }; this.message = a }, notReady: function (a) { this.toString = function () { return "NOT READY: " + this.message }; this.message = a } } };
"undefined" !== typeof module && module.exports && (module.exports = sjcl); "function" === typeof define && define([], function () { return sjcl });
sjcl.cipher.aes = function (a) {
    this.k[0][0][0] || this.D(); var b, c, d, e, f = this.k[0][4], g = this.k[1]; b = a.length; var h = 1; 4 !== b && (6 !== b && 8 !== b) && q(new sjcl.exception.invalid("invalid aes key size")); this.b = [d = a.slice(0), e = []]; for (a = b; a < 4 * b + 28; a++) { c = d[a - 1]; if (0 === a % b || 8 === b && 4 === a % b) c = f[c >>> 24] << 24 ^ f[c >> 16 & 255] << 16 ^ f[c >> 8 & 255] << 8 ^ f[c & 255], 0 === a % b && (c = c << 8 ^ c >>> 24 ^ h << 24, h = h << 1 ^ 283 * (h >> 7)); d[a] = d[a - b] ^ c } for (b = 0; a; b++ , a--)c = d[b & 3 ? a : a - 4], e[b] = 4 >= a || 4 > b ? c : g[0][f[c >>> 24]] ^ g[1][f[c >> 16 & 255]] ^ g[2][f[c >> 8 & 255]] ^ g[3][f[c &
        255]]
};
sjcl.cipher.aes.prototype = {
    encrypt: function (a) { return y(this, a, 0) }, decrypt: function (a) { return y(this, a, 1) }, k: [[[], [], [], [], []], [[], [], [], [], []]], D: function () {
        var a = this.k[0], b = this.k[1], c = a[4], d = b[4], e, f, g, h = [], l = [], k, n, m, p; for (e = 0; 0x100 > e; e++)l[(h[e] = e << 1 ^ 283 * (e >> 7)) ^ e] = e; for (f = g = 0; !c[f]; f ^= k || 1, g = l[g] || 1) { m = g ^ g << 1 ^ g << 2 ^ g << 3 ^ g << 4; m = m >> 8 ^ m & 255 ^ 99; c[f] = m; d[m] = f; n = h[e = h[k = h[f]]]; p = 0x1010101 * n ^ 0x10001 * e ^ 0x101 * k ^ 0x1010100 * f; n = 0x101 * h[m] ^ 0x1010100 * m; for (e = 0; 4 > e; e++)a[e][f] = n = n << 24 ^ n >>> 8, b[e][m] = p = p << 24 ^ p >>> 8 } for (e =
            0; 5 > e; e++)a[e] = a[e].slice(0), b[e] = b[e].slice(0)
    }
};
function y(a, b, c) {
    4 !== b.length && q(new sjcl.exception.invalid("invalid aes block size")); var d = a.b[c], e = b[0] ^ d[0], f = b[c ? 3 : 1] ^ d[1], g = b[2] ^ d[2]; b = b[c ? 1 : 3] ^ d[3]; var h, l, k, n = d.length / 4 - 2, m, p = 4, s = [0, 0, 0, 0]; h = a.k[c]; a = h[0]; var r = h[1], v = h[2], w = h[3], x = h[4]; for (m = 0; m < n; m++)h = a[e >>> 24] ^ r[f >> 16 & 255] ^ v[g >> 8 & 255] ^ w[b & 255] ^ d[p], l = a[f >>> 24] ^ r[g >> 16 & 255] ^ v[b >> 8 & 255] ^ w[e & 255] ^ d[p + 1], k = a[g >>> 24] ^ r[b >> 16 & 255] ^ v[e >> 8 & 255] ^ w[f & 255] ^ d[p + 2], b = a[b >>> 24] ^ r[e >> 16 & 255] ^ v[f >> 8 & 255] ^ w[g & 255] ^ d[p + 3], p += 4, e = h, f = l, g = k; for (m = 0; 4 >
        m; m++)s[c ? 3 & -m : m] = x[e >>> 24] << 24 ^ x[f >> 16 & 255] << 16 ^ x[g >> 8 & 255] << 8 ^ x[b & 255] ^ d[p++], h = e, e = f, f = g, g = b, b = h; return s
}
sjcl.bitArray = {
    bitSlice: function (a, b, c) { a = sjcl.bitArray.P(a.slice(b / 32), 32 - (b & 31)).slice(1); return c === t ? a : sjcl.bitArray.clamp(a, c - b) }, extract: function (a, b, c) { var d = Math.floor(-b - c & 31); return ((b + c - 1 ^ b) & -32 ? a[b / 32 | 0] << 32 - d ^ a[b / 32 + 1 | 0] >>> d : a[b / 32 | 0] >>> d) & (1 << c) - 1 }, concat: function (a, b) { if (0 === a.length || 0 === b.length) return a.concat(b); var c = a[a.length - 1], d = sjcl.bitArray.getPartial(c); return 32 === d ? a.concat(b) : sjcl.bitArray.P(b, d, c | 0, a.slice(0, a.length - 1)) }, bitLength: function (a) {
        var b = a.length; return 0 ===
            b ? 0 : 32 * (b - 1) + sjcl.bitArray.getPartial(a[b - 1])
    }, clamp: function (a, b) { if (32 * a.length < b) return a; a = a.slice(0, Math.ceil(b / 32)); var c = a.length; b &= 31; 0 < c && b && (a[c - 1] = sjcl.bitArray.partial(b, a[c - 1] & 2147483648 >> b - 1, 1)); return a }, partial: function (a, b, c) { return 32 === a ? b : (c ? b | 0 : b << 32 - a) + 0x10000000000 * a }, getPartial: function (a) { return Math.round(a / 0x10000000000) || 32 }, equal: function (a, b) {
        if (sjcl.bitArray.bitLength(a) !== sjcl.bitArray.bitLength(b)) return u; var c = 0, d; for (d = 0; d < a.length; d++)c |= a[d] ^ b[d]; return 0 ===
            c
    }, P: function (a, b, c, d) { var e; e = 0; for (d === t && (d = []); 32 <= b; b -= 32)d.push(c), c = 0; if (0 === b) return d.concat(a); for (e = 0; e < a.length; e++)d.push(c | a[e] >>> b), c = a[e] << 32 - b; e = a.length ? a[a.length - 1] : 0; a = sjcl.bitArray.getPartial(e); d.push(sjcl.bitArray.partial(b + a & 31, 32 < b + a ? c : d.pop(), 1)); return d }, l: function (a, b) { return [a[0] ^ b[0], a[1] ^ b[1], a[2] ^ b[2], a[3] ^ b[3]] }, byteswapM: function (a) { var b, c; for (b = 0; b < a.length; ++b)c = a[b], a[b] = c >>> 24 | c >>> 8 & 0xff00 | (c & 0xff00) << 8 | c << 24; return a }
};
sjcl.codec.utf8String = { fromBits: function (a) { var b = "", c = sjcl.bitArray.bitLength(a), d, e; for (d = 0; d < c / 8; d++)0 === (d & 3) && (e = a[d / 4]), b += String.fromCharCode(e >>> 24), e <<= 8; return decodeURIComponent(escape(b)) }, toBits: function (a) { a = unescape(encodeURIComponent(a)); var b = [], c, d = 0; for (c = 0; c < a.length; c++)d = d << 8 | a.charCodeAt(c), 3 === (c & 3) && (b.push(d), d = 0); c & 3 && b.push(sjcl.bitArray.partial(8 * (c & 3), d)); return b } };
sjcl.codec.hex = { fromBits: function (a) { var b = "", c; for (c = 0; c < a.length; c++)b += ((a[c] | 0) + 0xf00000000000).toString(16).substr(4); return b.substr(0, sjcl.bitArray.bitLength(a) / 4) }, toBits: function (a) { var b, c = [], d; a = a.replace(/\s|0x/g, ""); d = a.length; a += "00000000"; for (b = 0; b < a.length; b += 8)c.push(parseInt(a.substr(b, 8), 16) ^ 0); return sjcl.bitArray.clamp(c, 4 * d) } };
sjcl.codec.base64 = {
    J: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", fromBits: function (a, b, c) { var d = "", e = 0, f = sjcl.codec.base64.J, g = 0, h = sjcl.bitArray.bitLength(a); c && (f = f.substr(0, 62) + "-_"); for (c = 0; 6 * d.length < h;)d += f.charAt((g ^ a[c] >>> e) >>> 26), 6 > e ? (g = a[c] << 6 - e, e += 26, c++) : (g <<= 6, e -= 6); for (; d.length & 3 && !b;)d += "="; return d }, toBits: function (a, b) {
        a = a.replace(/\s|=/g, ""); var c = [], d, e = 0, f = sjcl.codec.base64.J, g = 0, h; b && (f = f.substr(0, 62) + "-_"); for (d = 0; d < a.length; d++)h = f.indexOf(a.charAt(d)),
            0 > h && q(new sjcl.exception.invalid("this isn't base64!")), 26 < e ? (e -= 26, c.push(g ^ h >>> e), g = h << 32 - e) : (e += 6, g ^= h << 32 - e); e & 56 && c.push(sjcl.bitArray.partial(e & 56, g, 1)); return c
    }
}; sjcl.codec.base64url = { fromBits: function (a) { return sjcl.codec.base64.fromBits(a, 1, 1) }, toBits: function (a) { return sjcl.codec.base64.toBits(a, 1) } }; sjcl.hash.sha256 = function (a) { this.b[0] || this.D(); a ? (this.r = a.r.slice(0), this.o = a.o.slice(0), this.h = a.h) : this.reset() }; sjcl.hash.sha256.hash = function (a) { return (new sjcl.hash.sha256).update(a).finalize() };
sjcl.hash.sha256.prototype = {
    blockSize: 512, reset: function () { this.r = this.N.slice(0); this.o = []; this.h = 0; return this }, update: function (a) { "string" === typeof a && (a = sjcl.codec.utf8String.toBits(a)); var b, c = this.o = sjcl.bitArray.concat(this.o, a); b = this.h; a = this.h = b + sjcl.bitArray.bitLength(a); for (b = 512 + b & -512; b <= a; b += 512)z(this, c.splice(0, 16)); return this }, finalize: function () {
        var a, b = this.o, c = this.r, b = sjcl.bitArray.concat(b, [sjcl.bitArray.partial(1, 1)]); for (a = b.length + 2; a & 15; a++)b.push(0); b.push(Math.floor(this.h /
            4294967296)); for (b.push(this.h | 0); b.length;)z(this, b.splice(0, 16)); this.reset(); return c
    }, N: [], b: [], D: function () { function a(a) { return 0x100000000 * (a - Math.floor(a)) | 0 } var b = 0, c = 2, d; a: for (; 64 > b; c++) { for (d = 2; d * d <= c; d++)if (0 === c % d) continue a; 8 > b && (this.N[b] = a(Math.pow(c, 0.5))); this.b[b] = a(Math.pow(c, 1 / 3)); b++ } }
};
function z(a, b) {
    var c, d, e, f = b.slice(0), g = a.r, h = a.b, l = g[0], k = g[1], n = g[2], m = g[3], p = g[4], s = g[5], r = g[6], v = g[7]; for (c = 0; 64 > c; c++)16 > c ? d = f[c] : (d = f[c + 1 & 15], e = f[c + 14 & 15], d = f[c & 15] = (d >>> 7 ^ d >>> 18 ^ d >>> 3 ^ d << 25 ^ d << 14) + (e >>> 17 ^ e >>> 19 ^ e >>> 10 ^ e << 15 ^ e << 13) + f[c & 15] + f[c + 9 & 15] | 0), d = d + v + (p >>> 6 ^ p >>> 11 ^ p >>> 25 ^ p << 26 ^ p << 21 ^ p << 7) + (r ^ p & (s ^ r)) + h[c], v = r, r = s, s = p, p = m + d | 0, m = n, n = k, k = l, l = d + (k & n ^ m & (k ^ n)) + (k >>> 2 ^ k >>> 13 ^ k >>> 22 ^ k << 30 ^ k << 19 ^ k << 10) | 0; g[0] = g[0] + l | 0; g[1] = g[1] + k | 0; g[2] = g[2] + n | 0; g[3] = g[3] + m | 0; g[4] = g[4] + p | 0; g[5] = g[5] + s | 0; g[6] =
        g[6] + r | 0; g[7] = g[7] + v | 0
}
sjcl.mode.ccm = {
    name: "ccm", encrypt: function (a, b, c, d, e) { var f, g = b.slice(0), h = sjcl.bitArray, l = h.bitLength(c) / 8, k = h.bitLength(g) / 8; e = e || 64; d = d || []; 7 > l && q(new sjcl.exception.invalid("ccm: iv must be at least 7 bytes")); for (f = 2; 4 > f && k >>> 8 * f; f++); f < 15 - l && (f = 15 - l); c = h.clamp(c, 8 * (15 - f)); b = sjcl.mode.ccm.L(a, b, c, d, e, f); g = sjcl.mode.ccm.p(a, g, c, b, e, f); return h.concat(g.data, g.tag) }, decrypt: function (a, b, c, d, e) {
        e = e || 64; d = d || []; var f = sjcl.bitArray, g = f.bitLength(c) / 8, h = f.bitLength(b), l = f.clamp(b, h - e), k = f.bitSlice(b,
            h - e), h = (h - e) / 8; 7 > g && q(new sjcl.exception.invalid("ccm: iv must be at least 7 bytes")); for (b = 2; 4 > b && h >>> 8 * b; b++); b < 15 - g && (b = 15 - g); c = f.clamp(c, 8 * (15 - b)); l = sjcl.mode.ccm.p(a, l, c, k, e, b); a = sjcl.mode.ccm.L(a, l.data, c, d, e, b); f.equal(l.tag, a) || q(new sjcl.exception.corrupt("ccm: tag doesn't match")); return l.data
    }, L: function (a, b, c, d, e, f) {
        var g = [], h = sjcl.bitArray, l = h.l; e /= 8; (e % 2 || 4 > e || 16 < e) && q(new sjcl.exception.invalid("ccm: invalid tag length")); (0xffffffff < d.length || 0xffffffff < b.length) && q(new sjcl.exception.bug("ccm: can't deal with 4GiB or more data"));
        f = [h.partial(8, (d.length ? 64 : 0) | e - 2 << 2 | f - 1)]; f = h.concat(f, c); f[3] |= h.bitLength(b) / 8; f = a.encrypt(f); if (d.length) { c = h.bitLength(d) / 8; 65279 >= c ? g = [h.partial(16, c)] : 0xffffffff >= c && (g = h.concat([h.partial(16, 65534)], [c])); g = h.concat(g, d); for (d = 0; d < g.length; d += 4)f = a.encrypt(l(f, g.slice(d, d + 4).concat([0, 0, 0]))) } for (d = 0; d < b.length; d += 4)f = a.encrypt(l(f, b.slice(d, d + 4).concat([0, 0, 0]))); return h.clamp(f, 8 * e)
    }, p: function (a, b, c, d, e, f) {
        var g, h = sjcl.bitArray; g = h.l; var l = b.length, k = h.bitLength(b); c = h.concat([h.partial(8,
            f - 1)], c).concat([0, 0, 0]).slice(0, 4); d = h.bitSlice(g(d, a.encrypt(c)), 0, e); if (!l) return { tag: d, data: [] }; for (g = 0; g < l; g += 4)c[3]++ , e = a.encrypt(c), b[g] ^= e[0], b[g + 1] ^= e[1], b[g + 2] ^= e[2], b[g + 3] ^= e[3]; return { tag: d, data: h.clamp(b, k) }
    }
};
sjcl.mode.ocb2 = {
    name: "ocb2", encrypt: function (a, b, c, d, e, f) {
        128 !== sjcl.bitArray.bitLength(c) && q(new sjcl.exception.invalid("ocb iv must be 128 bits")); var g, h = sjcl.mode.ocb2.H, l = sjcl.bitArray, k = l.l, n = [0, 0, 0, 0]; c = h(a.encrypt(c)); var m, p = []; d = d || []; e = e || 64; for (g = 0; g + 4 < b.length; g += 4)m = b.slice(g, g + 4), n = k(n, m), p = p.concat(k(c, a.encrypt(k(c, m)))), c = h(c); m = b.slice(g); b = l.bitLength(m); g = a.encrypt(k(c, [0, 0, 0, b])); m = l.clamp(k(m.concat([0, 0, 0]), g), b); n = k(n, k(m.concat([0, 0, 0]), g)); n = a.encrypt(k(n, k(c, h(c)))); d.length &&
            (n = k(n, f ? d : sjcl.mode.ocb2.pmac(a, d))); return p.concat(l.concat(m, l.clamp(n, e)))
    }, decrypt: function (a, b, c, d, e, f) {
        128 !== sjcl.bitArray.bitLength(c) && q(new sjcl.exception.invalid("ocb iv must be 128 bits")); e = e || 64; var g = sjcl.mode.ocb2.H, h = sjcl.bitArray, l = h.l, k = [0, 0, 0, 0], n = g(a.encrypt(c)), m, p, s = sjcl.bitArray.bitLength(b) - e, r = []; d = d || []; for (c = 0; c + 4 < s / 32; c += 4)m = l(n, a.decrypt(l(n, b.slice(c, c + 4)))), k = l(k, m), r = r.concat(m), n = g(n); p = s - 32 * c; m = a.encrypt(l(n, [0, 0, 0, p])); m = l(m, h.clamp(b.slice(c), p).concat([0, 0, 0]));
        k = l(k, m); k = a.encrypt(l(k, l(n, g(n)))); d.length && (k = l(k, f ? d : sjcl.mode.ocb2.pmac(a, d))); h.equal(h.clamp(k, e), h.bitSlice(b, s)) || q(new sjcl.exception.corrupt("ocb: tag doesn't match")); return r.concat(h.clamp(m, p))
    }, pmac: function (a, b) {
        var c, d = sjcl.mode.ocb2.H, e = sjcl.bitArray, f = e.l, g = [0, 0, 0, 0], h = a.encrypt([0, 0, 0, 0]), h = f(h, d(d(h))); for (c = 0; c + 4 < b.length; c += 4)h = d(h), g = f(g, a.encrypt(f(h, b.slice(c, c + 4)))); c = b.slice(c); 128 > e.bitLength(c) && (h = f(h, d(h)), c = e.concat(c, [-2147483648, 0, 0, 0])); g = f(g, c); return a.encrypt(f(d(f(h,
            d(h))), g))
    }, H: function (a) { return [a[0] << 1 ^ a[1] >>> 31, a[1] << 1 ^ a[2] >>> 31, a[2] << 1 ^ a[3] >>> 31, a[3] << 1 ^ 135 * (a[0] >>> 31)] }
};
sjcl.mode.gcm = {
    name: "gcm", encrypt: function (a, b, c, d, e) { var f = b.slice(0); b = sjcl.bitArray; d = d || []; a = sjcl.mode.gcm.p(!0, a, f, d, c, e || 128); return b.concat(a.data, a.tag) }, decrypt: function (a, b, c, d, e) { var f = b.slice(0), g = sjcl.bitArray, h = g.bitLength(f); e = e || 128; d = d || []; e <= h ? (b = g.bitSlice(f, h - e), f = g.bitSlice(f, 0, h - e)) : (b = f, f = []); a = sjcl.mode.gcm.p(u, a, f, d, c, e); g.equal(a.tag, b) || q(new sjcl.exception.corrupt("gcm: tag doesn't match")); return a.data }, Z: function (a, b) {
        var c, d, e, f, g, h = sjcl.bitArray.l; e = [0, 0, 0, 0]; f = b.slice(0);
        for (c = 0; 128 > c; c++) { (d = 0 !== (a[Math.floor(c / 32)] & 1 << 31 - c % 32)) && (e = h(e, f)); g = 0 !== (f[3] & 1); for (d = 3; 0 < d; d--)f[d] = f[d] >>> 1 | (f[d - 1] & 1) << 31; f[0] >>>= 1; g && (f[0] ^= -0x1f000000) } return e
    }, g: function (a, b, c) { var d, e = c.length; b = b.slice(0); for (d = 0; d < e; d += 4)b[0] ^= 0xffffffff & c[d], b[1] ^= 0xffffffff & c[d + 1], b[2] ^= 0xffffffff & c[d + 2], b[3] ^= 0xffffffff & c[d + 3], b = sjcl.mode.gcm.Z(b, a); return b }, p: function (a, b, c, d, e, f) {
        var g, h, l, k, n, m, p, s, r = sjcl.bitArray; m = c.length; p = r.bitLength(c); s = r.bitLength(d); h = r.bitLength(e); g = b.encrypt([0,
            0, 0, 0]); 96 === h ? (e = e.slice(0), e = r.concat(e, [1])) : (e = sjcl.mode.gcm.g(g, [0, 0, 0, 0], e), e = sjcl.mode.gcm.g(g, e, [0, 0, Math.floor(h / 0x100000000), h & 0xffffffff])); h = sjcl.mode.gcm.g(g, [0, 0, 0, 0], d); n = e.slice(0); d = h.slice(0); a || (d = sjcl.mode.gcm.g(g, h, c)); for (k = 0; k < m; k += 4)n[3]++ , l = b.encrypt(n), c[k] ^= l[0], c[k + 1] ^= l[1], c[k + 2] ^= l[2], c[k + 3] ^= l[3]; c = r.clamp(c, p); a && (d = sjcl.mode.gcm.g(g, h, c)); a = [Math.floor(s / 0x100000000), s & 0xffffffff, Math.floor(p / 0x100000000), p & 0xffffffff]; d = sjcl.mode.gcm.g(g, d, a); l = b.encrypt(e); d[0] ^= l[0];
        d[1] ^= l[1]; d[2] ^= l[2]; d[3] ^= l[3]; return { tag: r.bitSlice(d, 0, f), data: c }
    }
}; sjcl.misc.hmac = function (a, b) { this.M = b = b || sjcl.hash.sha256; var c = [[], []], d, e = b.prototype.blockSize / 32; this.n = [new b, new b]; a.length > e && (a = b.hash(a)); for (d = 0; d < e; d++)c[0][d] = a[d] ^ 909522486, c[1][d] = a[d] ^ 1549556828; this.n[0].update(c[0]); this.n[1].update(c[1]); this.G = new b(this.n[0]) };
sjcl.misc.hmac.prototype.encrypt = sjcl.misc.hmac.prototype.mac = function (a) { this.Q && q(new sjcl.exception.invalid("encrypt on already updated hmac called!")); this.update(a); return this.digest(a) }; sjcl.misc.hmac.prototype.reset = function () { this.G = new this.M(this.n[0]); this.Q = u }; sjcl.misc.hmac.prototype.update = function (a) { this.Q = !0; this.G.update(a) }; sjcl.misc.hmac.prototype.digest = function () { var a = this.G.finalize(), a = (new this.M(this.n[1])).update(a).finalize(); this.reset(); return a };
sjcl.misc.pbkdf2 = function (a, b, c, d, e) {
    c = c || 1E3; (0 > d || 0 > c) && q(sjcl.exception.invalid("invalid params to pbkdf2")); "string" === typeof a && (a = sjcl.codec.utf8String.toBits(a)); "string" === typeof b && (b = sjcl.codec.utf8String.toBits(b)); e = e || sjcl.misc.hmac; a = new e(a); var f, g, h, l, k = [], n = sjcl.bitArray; for (l = 1; 32 * k.length < (d || 1); l++) { e = f = a.encrypt(n.concat(b, [l])); for (g = 1; g < c; g++) { f = a.encrypt(f); for (h = 0; h < f.length; h++)e[h] ^= f[h] } k = k.concat(e) } d && (k = n.clamp(k, d)); return k
};
/*

sjcl.misc.pbkdf2 = function (password, salt, count, length, Prff) {
    count = count || 10000;

    if (length < 0 || count < 0) {
        throw new sjcl.exception.invalid("invalid params to pbkdf2");
    }

    if (typeof password === "string") {
        password = sjcl.codec.utf8String.toBits(password);
    }

    if (typeof salt === "string") {
        salt = sjcl.codec.utf8String.toBits(salt);
    }

    Prff = Prff || sjcl.misc.hmac;

    var prf = new Prff(password),
        u, ui, i, j, k, out = [], b = sjcl.bitArray;
    for (k = 1; 32 * out.length < (length || 1); k++) {
        u = ui = prf.encrypt(b.concat(salt, [k]));

        for (i = 1; i < count; i++) {
            ui = prf.encrypt(ui);
            for (j = 0; j < ui.length; j++) {
                u[j] ^= ui[j];
            }
        }

        out = out.concat(u);
    }
    if (length) { out = b.clamp(out, length); }
    return out;
};
*/
sjcl.prng = function (a) { this.c = [new sjcl.hash.sha256]; this.i = [0]; this.F = 0; this.s = {}; this.C = 0; this.K = {}; this.O = this.d = this.j = this.W = 0; this.b = [0, 0, 0, 0, 0, 0, 0, 0]; this.f = [0, 0, 0, 0]; this.A = t; this.B = a; this.q = u; this.w = { progress: {}, seeded: {} }; this.m = this.V = 0; this.t = 1; this.u = 2; this.S = 0x10000; this.I = [0, 48, 64, 96, 128, 192, 0x100, 384, 512, 768, 1024]; this.T = 3E4; this.R = 80 };
sjcl.prng.prototype = {
    randomWords: function (a, b) {
        var c = [], d; d = this.isReady(b); var e; d === this.m && q(new sjcl.exception.notReady("generator isn't seeded")); if (d & this.u) {
            d = !(d & this.t); e = []; var f = 0, g; this.O = e[0] = (new Date).valueOf() + this.T; for (g = 0; 16 > g; g++)e.push(0x100000000 * Math.random() | 0); for (g = 0; g < this.c.length && !(e = e.concat(this.c[g].finalize()), f += this.i[g], this.i[g] = 0, !d && this.F & 1 << g); g++); this.F >= 1 << this.c.length && (this.c.push(new sjcl.hash.sha256), this.i.push(0)); this.d -= f; f > this.j && (this.j = f); this.F++;
            this.b = sjcl.hash.sha256.hash(this.b.concat(e)); this.A = new sjcl.cipher.aes(this.b); for (d = 0; 4 > d && !(this.f[d] = this.f[d] + 1 | 0, this.f[d]); d++);
        } for (d = 0; d < a; d += 4)0 === (d + 1) % this.S && A(this), e = B(this), c.push(e[0], e[1], e[2], e[3]); A(this); return c.slice(0, a)
    }, setDefaultParanoia: function (a, b) { 0 === a && "Setting paranoia=0 will ruin your security; use it only for testing" !== b && q("Setting paranoia=0 will ruin your security; use it only for testing"); this.B = a }, addEntropy: function (a, b, c) {
        c = c || "user"; var d, e, f = (new Date).valueOf(),
            g = this.s[c], h = this.isReady(), l = 0; d = this.K[c]; d === t && (d = this.K[c] = this.W++); g === t && (g = this.s[c] = 0); this.s[c] = (this.s[c] + 1) % this.c.length; switch (typeof a) {
                case "number": b === t && (b = 1); this.c[g].update([d, this.C++, 1, b, f, 1, a | 0]); break; case "object": c = Object.prototype.toString.call(a); if ("[object Uint32Array]" === c) { e = []; for (c = 0; c < a.length; c++)e.push(a[c]); a = e } else { "[object Array]" !== c && (l = 1); for (c = 0; c < a.length && !l; c++)"number" !== typeof a[c] && (l = 1) } if (!l) {
                    if (b === t) for (c = b = 0; c < a.length; c++)for (e = a[c]; 0 < e;)b++ ,
                        e >>>= 1; this.c[g].update([d, this.C++, 2, b, f, a.length].concat(a))
                } break; case "string": b === t && (b = a.length); this.c[g].update([d, this.C++, 3, b, f, a.length]); this.c[g].update(a); break; default: l = 1
            }l && q(new sjcl.exception.bug("random: addEntropy only supports number, array of numbers or string")); this.i[g] += b; this.d += b; h === this.m && (this.isReady() !== this.m && C("seeded", Math.max(this.j, this.d)), C("progress", this.getProgress()))
    }, isReady: function (a) {
        a = this.I[a !== t ? a : this.B]; return this.j && this.j >= a ? this.i[0] > this.R &&
            (new Date).valueOf() > this.O ? this.u | this.t : this.t : this.d >= a ? this.u | this.m : this.m
    }, getProgress: function (a) { a = this.I[a ? a : this.B]; return this.j >= a ? 1 : this.d > a ? 1 : this.d / a }, startCollectors: function () {
        this.q || (this.a = { loadTimeCollector: D(this, this.aa), mouseCollector: D(this, this.ba), keyboardCollector: D(this, this.$), accelerometerCollector: D(this, this.U) }, window.addEventListener ? (window.addEventListener("load", this.a.loadTimeCollector, u), window.addEventListener("mousemove", this.a.mouseCollector, u), window.addEventListener("keypress",
            this.a.keyboardCollector, u), window.addEventListener("devicemotion", this.a.accelerometerCollector, u)) : document.attachEvent ? (document.attachEvent("onload", this.a.loadTimeCollector), document.attachEvent("onmousemove", this.a.mouseCollector), document.attachEvent("keypress", this.a.keyboardCollector)) : q(new sjcl.exception.bug("can't attach event")), this.q = !0)
    }, stopCollectors: function () {
        this.q && (window.removeEventListener ? (window.removeEventListener("load", this.a.loadTimeCollector, u), window.removeEventListener("mousemove",
            this.a.mouseCollector, u), window.removeEventListener("keypress", this.a.keyboardCollector, u), window.removeEventListener("devicemotion", this.a.accelerometerCollector, u)) : document.detachEvent && (document.detachEvent("onload", this.a.loadTimeCollector), document.detachEvent("onmousemove", this.a.mouseCollector), document.detachEvent("keypress", this.a.keyboardCollector)), this.q = u)
    }, addEventListener: function (a, b) { this.w[a][this.V++] = b }, removeEventListener: function (a, b) {
        var c, d, e = this.w[a], f = []; for (d in e) e.hasOwnProperty(d) &&
            e[d] === b && f.push(d); for (c = 0; c < f.length; c++)d = f[c], delete e[d]
    }, $: function () { E(1) }, ba: function (a) { var b, c; try { b = a.x || a.clientX || a.offsetX || 0, c = a.y || a.clientY || a.offsetY || 0 } catch (d) { c = b = 0 } 0 != b && 0 != c && sjcl.random.addEntropy([b, c], 2, "mouse"); E(0) }, aa: function () { E(2) }, U: function (a) {
        a = a.accelerationIncludingGravity.x || a.accelerationIncludingGravity.y || a.accelerationIncludingGravity.z; if (window.orientation) { var b = window.orientation; "number" === typeof b && sjcl.random.addEntropy(b, 1, "accelerometer") } a && sjcl.random.addEntropy(a,
            2, "accelerometer"); E(0)
    }
}; function C(a, b) { var c, d = sjcl.random.w[a], e = []; for (c in d) d.hasOwnProperty(c) && e.push(d[c]); for (c = 0; c < e.length; c++)e[c](b) } function E(a) { "undefined" !== typeof window && window.performance && "function" === typeof window.performance.now ? sjcl.random.addEntropy(window.performance.now(), a, "loadtime") : sjcl.random.addEntropy((new Date).valueOf(), a, "loadtime") } function A(a) { a.b = B(a).concat(B(a)); a.A = new sjcl.cipher.aes(a.b) }
function B(a) { for (var b = 0; 4 > b && !(a.f[b] = a.f[b] + 1 | 0, a.f[b]); b++); return a.A.encrypt(a.f) } function D(a, b) { return function () { b.apply(a, arguments) } } sjcl.random = new sjcl.prng(6);
a: try {
    var F, G, H, I; if (I = "undefined" !== typeof module) { var J; if (J = module.exports) { var K; try { K = require("crypto") } catch (L) { K = null } J = (G = K) && G.randomBytes } I = J } if (I) F = G.randomBytes(128), F = new Uint32Array((new Uint8Array(F)).buffer), sjcl.random.addEntropy(F, 1024, "crypto['randomBytes']"); else if ("undefined" !== typeof window && "undefined" !== typeof Uint32Array) {
        H = new Uint32Array(32); if (window.crypto && window.crypto.getRandomValues) window.crypto.getRandomValues(H); else if (window.msCrypto && window.msCrypto.getRandomValues) window.msCrypto.getRandomValues(H);
        else break a; sjcl.random.addEntropy(H, 1024, "crypto['getRandomValues']")
    }
} catch (M) { "undefined" !== typeof window && window.console && (console.log("There was an error collecting entropy from the browser:"), console.log(M)) }
sjcl.json = {
    defaults: { v: 1, iter: 1E3, ks: 128, ts: 64, mode: "ccm", adata: "", cipher: "aes" }, Y: function (a, b, c, d) {
        c = c || {}; d = d || {}; var e = sjcl.json, f = e.e({ iv: sjcl.random.randomWords(4, 0) }, e.defaults), g; e.e(f, c); c = f.adata; "string" === typeof f.salt && (f.salt = sjcl.codec.base64.toBits(f.salt)); "string" === typeof f.iv && (f.iv = sjcl.codec.base64.toBits(f.iv)); (!sjcl.mode[f.mode] || !sjcl.cipher[f.cipher] || "string" === typeof a && 100 >= f.iter || 64 !== f.ts && 96 !== f.ts && 128 !== f.ts || 128 !== f.ks && 192 !== f.ks && 0x100 !== f.ks || 2 > f.iv.length || 4 <
            f.iv.length) && q(new sjcl.exception.invalid("json encrypt: invalid parameters")); "string" === typeof a ? (g = sjcl.misc.cachedPbkdf2(a, f), a = g.key.slice(0, f.ks / 32), f.salt = g.salt) : sjcl.ecc && a instanceof sjcl.ecc.elGamal.publicKey && (g = a.kem(), f.kemtag = g.tag, a = g.key.slice(0, f.ks / 32)); "string" === typeof b && (b = sjcl.codec.utf8String.toBits(b)); "string" === typeof c && (c = sjcl.codec.utf8String.toBits(c)); g = new sjcl.cipher[f.cipher](a); e.e(d, f); d.key = a; f.ct = sjcl.mode[f.mode].encrypt(g, b, f.iv, c, f.ts); return f
    }, encrypt: function (a,
        b, c, d) { var e = sjcl.json, f = e.Y.apply(e, arguments); return e.encode(f) }, X: function (a, b, c, d) {
            c = c || {}; d = d || {}; var e = sjcl.json; b = e.e(e.e(e.e({}, e.defaults), b), c, !0); var f, g; f = b.adata; "string" === typeof b.salt && (b.salt = sjcl.codec.base64.toBits(b.salt)); "string" === typeof b.iv && (b.iv = sjcl.codec.base64.toBits(b.iv)); (!sjcl.mode[b.mode] || !sjcl.cipher[b.cipher] || "string" === typeof a && 100 >= b.iter || 64 !== b.ts && 96 !== b.ts && 128 !== b.ts || 128 !== b.ks && 192 !== b.ks && 0x100 !== b.ks || !b.iv || 2 > b.iv.length || 4 < b.iv.length) && q(new sjcl.exception.invalid("json decrypt: invalid parameters"));
            "string" === typeof a ? (g = sjcl.misc.cachedPbkdf2(a, b), a = g.key.slice(0, b.ks / 32), b.salt = g.salt) : sjcl.ecc && a instanceof sjcl.ecc.elGamal.secretKey && (a = a.unkem(sjcl.codec.base64.toBits(b.kemtag)).slice(0, b.ks / 32)); "string" === typeof f && (f = sjcl.codec.utf8String.toBits(f)); g = new sjcl.cipher[b.cipher](a); f = sjcl.mode[b.mode].decrypt(g, b.ct, b.iv, f, b.ts); e.e(d, b); d.key = a; return 1 === c.raw ? f : sjcl.codec.utf8String.fromBits(f)
        }, decrypt: function (a, b, c, d) { var e = sjcl.json; return e.X(a, e.decode(b), c, d) }, encode: function (a) {
            var b,
                c = "{", d = ""; for (b in a) if (a.hasOwnProperty(b)) switch (b.match(/^[a-z0-9]+$/i) || q(new sjcl.exception.invalid("json encode: invalid property name")), c += d + '"' + b + '":', d = ",", typeof a[b]) { case "number": case "boolean": c += a[b]; break; case "string": c += '"' + escape(a[b]) + '"'; break; case "object": c += '"' + sjcl.codec.base64.fromBits(a[b], 0) + '"'; break; default: q(new sjcl.exception.bug("json encode: unsupported type")) }return c + "}"
        }, decode: function (a) {
            a = a.replace(/\s/g, ""); a.match(/^\{.*\}$/) || q(new sjcl.exception.invalid("json decode: this isn't json!"));
            a = a.replace(/^\{|\}$/g, "").split(/,/); var b = {}, c, d; for (c = 0; c < a.length; c++)(d = a[c].match(/^(?:(["']?)([a-z][a-z0-9]*)\1):(?:(\d+)|"([a-z0-9+\/%*_.@=\-]*)")$/i)) || q(new sjcl.exception.invalid("json decode: this isn't json!")), b[d[2]] = d[3] ? parseInt(d[3], 10) : d[2].match(/^(ct|salt|iv)$/) ? sjcl.codec.base64.toBits(d[4]) : unescape(d[4]); return b
        }, e: function (a, b, c) {
            a === t && (a = {}); if (b === t) return a; for (var d in b) b.hasOwnProperty(d) && (c && (a[d] !== t && a[d] !== b[d]) && q(new sjcl.exception.invalid("required parameter overridden")),
                a[d] = b[d]); return a
        }, ea: function (a, b) { var c = {}, d; for (d in a) a.hasOwnProperty(d) && a[d] !== b[d] && (c[d] = a[d]); return c }, da: function (a, b) { var c = {}, d; for (d = 0; d < b.length; d++)a[b[d]] !== t && (c[b[d]] = a[b[d]]); return c }
}; sjcl.encrypt = sjcl.json.encrypt; sjcl.decrypt = sjcl.json.decrypt; sjcl.misc.ca = {};
sjcl.misc.cachedPbkdf2 = function (a, b) { var c = sjcl.misc.ca, d; b = b || {}; d = b.iter || 1E3; c = c[a] = c[a] || {}; d = c[d] = c[d] || { firstSalt: b.salt && b.salt.length ? b.salt.slice(0) : sjcl.random.randomWords(2, 0) }; c = b.salt === t ? d.firstSalt : b.salt; d[c] = d[c] || sjcl.misc.pbkdf2(a, c, b.iter); return { key: d[c].slice(0), salt: c.slice(0) } };
