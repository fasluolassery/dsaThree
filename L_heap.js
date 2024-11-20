class MinHeap{
    constructor() {
        this.heap = []
    }

    getParent(index) { return Math.floor((index - 1) / 2) }

    getLeft(index) { return (index * 2) + 1 }

    getRight(index) { return (index * 2) + 2 }

    getSize() { return this.heap.length }

    isEmpty() { return this.heap.length === 0 }

    swap(indexOne, indexTwo) {
        [this.heap[indexOne], this.heap[indexTwo]] = [this.heap[indexTwo], this.heap[indexOne]]
    }

    insert(data) {
        this.heap.push(data)
        this.heapifyUP(this.heap.length - 1)
    }

    heapifyUP(index) {
        let currentIndex = index
        while (currentIndex > 0) {
            const parent = this.getParent(currentIndex)
            if (this.heap[currentIndex] < this.heap[parent]) {
                this.swap(currentIndex, parent)
                currentIndex = parent
            } else {
                break;
            }
        }
    }
    
    remove() {
        if (this.isEmpty()) return null
        if (this.heap.length === 1) return this.heap.pop()
        let max = this.heap[0]
        this.heap[0] = this.heap.pop()
        this.heapifyDown(0)
        return max
    }

    heapifyDown(index) {
        let currInd = index
        let length = this.heap.length
        while (true) {
            let left = this.getLeft(index)
            let right = this.getRight(index)

            let small = currInd

            if (left < length && this.heap[left] < this.heap[small]) small = left

            if (right < length && this.heap[right] < this.heap[small]) small = right

            if (small !== currInd) {
                this.swap(currInd, small)
                currInd = small
            } else {
                break;
            }
        }
    }
}

let heap = new MinHeap()
heap.insert(1)
heap.insert(2)
heap.insert(0)
heap.remove()
console.log(heap)