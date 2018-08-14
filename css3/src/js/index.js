var lis = document.getElementById('nav').children;
var as = [];
for (var i = 0; i < lis.length; i++) {
    as.push(lis[i].children[0]);
}
var items = document.getElementById('view').children;
for (var i = 0; i < as.length; i++) {
    as[i].index = i;
    as[i].onclick = function () {
        for (var j = 0; j < as.length; j++) {
            items[j].className = 'hide';
        }
        items[this.index].className = 'show';
    }
}