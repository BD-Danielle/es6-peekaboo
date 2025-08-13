
# Peekaboo 2.2.0

## 簡介

`Peekaboo` 是一個用於網頁元素顯示/隱藏控制的 JavaScript 類別，能根據元素在視窗中的滾動位置，自動切換目標元素的可見性。本版本提升了效能並增加了更多功能。

### 作者
CYL

### 授權
ISC License

## 安裝方式

將 `Peekaboo` 套件引入您的專案：

```html
<script src="webpack/es6.peekaboo.bundle2.2.0.js"></script>
```

## 使用說明

初始化 `Peekaboo` 並使用 `start` 方法，指定目標元素與控制顯示區域：

```javascript
window.addEventListener('DOMContentLoaded', () => {
  const peekaboo = new Peekaboo();
  peekaboo.start('#target', [['#begin', '#end'], ['#begin1', '#end1']]);
});
```

## 特色

- **高效能**：內建節流（throttle）函數，優化滾動事件處理。
- **精準判斷**：更準確偵測元素是否進入可視區域。
- **動態顯示**：可根據滾動動態顯示或隱藏內容，支援淡入淡出效果。

## API 說明

### 屬性

- `version`：目前版本號。

### 方法

- `query(selector)`：查詢單一 DOM 元素。
- `documentSize()`：取得文件高度與目前滾動位置。
- `objSize(ele)`：取得元素尺寸與位置。
- `isElementVisible(area)`：判斷元素是否在可視區域內。
- `updateVisibility(ele, areas)`：根據位置更新元素顯示狀態。
- `start(ele, areas)`：初始化並綁定事件監聽。
- `throttle(func, limit)`：函數節流，限制觸發頻率。
- `destroy()`：移除事件監聽與快取。

## 範例

HTML 範例：

```html
<div id="begin"></div>
<div id="target">這是要顯示/隱藏的內容</div>
<div id="end"></div>
```

JavaScript 範例：

```javascript
window.addEventListener('DOMContentLoaded', () => {
  const peekaboo = new Peekaboo({ fadeEffect: true });
  peekaboo.start('#target', [['#begin', '#end']]);
});
```

## 貢獻

歡迎貢獻程式碼或提出建議，請至 [issues 頁面](https://repo.heroit.io/angel.chen/es6-peekaboo/issues) 反映問題。

