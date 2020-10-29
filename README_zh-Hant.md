# Peekaboo
### 躲貓貓套件，頁面捲動時，可針對特定物件在某區段間的隱藏顯示。

## 開始使用：
```
window.addEventListener('DOMContentLoaded', function () {
  var peekaboo = new Peekaboo();
  peekaboo.start('#target', [['#begin', '#end']]);
})
-----------------------------or---------------------------
$(function(){
  var peekaboo = new Peekaboo();
  peekaboo.start('#target', [['#begin', '#end']]);
})
```

## 參數配置：
### 如果頁面中，有多個特定物件 ( .target / #target )，建議重新NEW物件，區段間的設置以陣列為格式 `[['#begin', '#end']]`，一個頁面可以設置多個區段 `[['#begin', '#end'], ['#begin1', '#end1']]`，每個區段都有起點與終點成對，如果起點與終點同時出現在 inner Window 其效果則會抵消。
