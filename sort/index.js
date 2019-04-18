const array = [10, 1, 4, 2, 55, 32, 8, 22, 100]

// 冒泡排序
const bubble = arr => {
    let len = arr.length
    for (let i = 0; i < len; i++) {
        for (let k = 0; k < len - 1 - i; k++) {
            // 相邻元素比较
            if (arr[k] > arr[k + 1]) {
                // 互换位置
                let temp = arr[k]
                arr[k] = arr[k + 1]
                arr[k + 1] = temp
            }
        }
    }
    return arr
}

console.log('冒泡排序: ' + bubble(array))

// 选择排序
const selectSort = arr => {
    let len = arr.length
    let temp, minIndex
    for (let i = 0; i < len; i++) {
        minIndex = i
        for (let k = i + 1; k < len; k++) {
            if (arr[k] < arr[minIndex]) {
                minIndex = k
            }
        }
        temp = arr[i]
        arr[i] = arr[minIndex]
        arr[minIndex] = temp
    }
    return arr
}

console.log('选择排序: ' + selectSort(array))

// 快排
const quickSort = arr => {
    if (arr.length <= 1) return arr
    let piovtIndex = Math.floor(arr.length / 2)
    let piovt = arr.splice(piovtIndex, 1)[0]
    let left = [],
        right = []

    arr.map(item => item > piovt ? right.push(item) : left.push(item))
    return quickSort(left).concat(piovt, quickSort(right))
}

console.log('快速排序: ' + quickSort(array))

// 插入排序
const insertSort = arr => {
    let prevIndex, current
    for (let i = 1, len = arr.length; i < len; i++) {
        prevIndex = i - 1
        current = arr[i]
        while (prevIndex >= 0 && arr[prevIndex] > current) {
            // 往前挪
            arr[prevIndex + 1] = arr[prevIndex]
            prevIndex--
        }
        arr[prevIndex + 1] = current
    }
    return arr
}

console.log('插入排序: ' + insertSort(array))