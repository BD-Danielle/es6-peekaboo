
# ES6.Peekaboo
### 躲貓貓套件，頁面捲動時，可針對特定物件在某區段間的隱藏顯示。

## 開始使用：
```javascript
window.addEventListener('DOMContentLoaded', function () {
  var displayButton = function(){
    // console.log('this: ', this);
    this.visible ? document.querySelector("#g").style.display = "flex": document.querySelector("#g").style.display = "none";
    this.visible ? document.querySelector(this.selector).style.backgroundColor = this.bgColor: 
    document.querySelector(this.selector).style.backgroundColor = "grey";

  }
  var changeBgColor = function(){
    this.visible ? document.querySelector(this.selector).style.backgroundColor = this.bgColor: 
    document.querySelector(this.selector).style.backgroundColor = "grey";
  }
  var arrObjs = [
    {selector: '#a', areas: [['#begin1', '#end1']], cb: changeBgColor, bgColor: "red"},
    {selector: '#b', areas: [['#begin2', '#end2']], cb: changeBgColor, bgColor: "orange"},
    {selector: '#c', areas: [['#begin3', '#end3']], cb: displayButton, bgColor: "yellow"},
    {selector: '#d', areas: [['#begin4', '#end4']], cb: changeBgColor, bgColor: "green"},
    {selector: '#e', areas: [['#begin5', '#end5']], cb: changeBgColor, bgColor: "blue"}
  ];
  var peekaboo = new Peekaboo(arrObjs);
  peekaboo.start();
})
```

## 參數配置：
### 如果頁面中，有多個特定物件 ( .class / #id )，建議在陣列裡新增物件，物件屬性必需包涵 `{selector: "#d", areas: [["#begin1", "#end1"]]}`，其餘屬性可自定義 `{selector: "#d", areas: [['#begin4', '#end4']], cb: changeBgColor, bgColor: "green"}`，每個區段都有起點與終點成對，如果起點與終點同時出現在 inner Window 其效果則會抵消。
