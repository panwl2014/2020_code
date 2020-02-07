function getMin(arr) {
    var min = 0;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < arr[min]) {
            min = i;
        }
    }
    return min;
}