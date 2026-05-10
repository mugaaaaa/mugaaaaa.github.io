---
title: "直排与训点测试"
published: 2026-05-10
description: "用于检查直排、振假名和返点样式的测试文章。"
tags: [Linguists, Test, Layout]
category: linguists
draft: false
lang: zh_CN
---

# 直排测试

这篇文章用于测试正文里的竖排、振假名、返点和送假名标注。正式写文章时可以直接复用这些 HTML 片段。

## 日语文语与振假名

<div class="vertical-text">
  <p>
    <ruby>春<rt>はる</rt></ruby>は
    <ruby>曙<rt>あけぼの</rt></ruby>。
    やうやう<ruby>白<rt>しろ</rt></ruby>くなりゆく
    <ruby>山際<rt>やまぎは</rt></ruby>、すこしあかりて。
  </p>
</div>

## 古汉语与返点

<div class="kanbun">
  <p>
    <ruby class="return-ruby">學<rt>レ</rt></ruby>而
    <ruby class="return-ruby">時習<rt>レ</rt></ruby>之、
    <ruby class="return-ruby">不<rt>二</rt></ruby>亦
    <ruby class="return-ruby">説<rt>一</rt></ruby>乎。
  </p>
</div>

## 送假名示例

<div class="kanbun">
  <p>
    讀<span class="okurigana">ミ</span>
    <ruby class="return-ruby">書<rt>ヲ</rt></ruby>
    <ruby class="return-ruby">以<rt>テ</rt></ruby>
    養<span class="okurigana">フ</span>
    <ruby class="return-ruby">氣<rt>ヲ</rt></ruby>。
  </p>
</div>

## 横排回退

普通段落仍然保持横排。公式也照常渲染：$E = mc^2$。

```html
<div class="vertical-text">
  <ruby>物語<rt>ものがたり</rt></ruby>のはじめ
</div>
```
