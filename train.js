class Node{
    constructor(data) {
        this.data = data
        this.left = null
        this.right = null
    }
}

class Bst{
    constructor() {
        this.root = null
    }

    insert(data) {
        let node = new Node(data)
        if (!this.root) {
            this.root = node
        } else {
            this._helpInsert(this.root, node)
        }
    }

    _helpInsert(root, node) {
        if (node.data < root.data) {
            if (!root.left) root.left = node
            else this._helpInsert(root.left, node)
        } else {
            if (!root.right) root.right = node
            else this._helpInsert(root.right, node)
        }
    }

    search(data) {
       return this._helpSearch(this.root, data)
    }

    _helpSearch(root, data) {
        if (!root) return false
        if (root.data === data) return true
        if (data < root.data) return this._helpSearch(root.left, data)
        else return this._helpSearch(root.right, data)
    }

    preOrder(root) {
        if (root) {
            console.log(root.data)
            this.preOrder(root.left)
            this.preOrder(root.right)
        }
    }

    inOrder(root) {
        if (root) {
            this.inOrder(root.left)
            console.log(root.data)
            this.inOrder(root.right)
        }
    }

    postOrder(root) {
        if (root) {
            this.postOrder(root.left)
            this.postOrder(root.right)
            console.log(root.data)
        }
    }

    levelOrder() {
        let q = []
        q.push(this.root)
        while (q.length) {
            let curr = q.shift()
            console.log(curr.data)
            if (curr.left) q.push(curr.left)
            if (curr.right) q.push(curr.right);
        }
    }

    delete(data) {
        this.root = this._helpDelete(this.root, data)
    }

    _helpDelete(root, data) {
        if (!root) return null
        if (data < root.data) {
            root.left = this._helpDelete(root.left, data)
        } else if (data > root.data) {
            root.right = this._helpDelete(root.right, data)
        } else {
            if (!root.left && !root.right) return null
            if (!root.left) return root.right
            if (!root.right) return root.left
            
            let min = this.findMin(root.right);
            root.data = min.data
            root.right = this._helpDelete(root.right, min.data)
        }
        return root
    }

    findMin(root) {
        while (root.left) {
            root = root.left
        }
        return root
    }
}

// let tree = new Bst();
// tree.insert(10);
// tree.insert(5);
// tree.insert(15);
// tree.insert(2);
// tree.insert(7);

// console.log("InOrder Traversal:");
// tree.inOrder(tree.root); // Output: 2, 5, 7, 10, 15

// console.log("PreOrder Traversal:");
// tree.preOrder(tree.root); // Output: 10, 5, 2, 7, 15

// console.log("PostOrder Traversal:");
// tree.postOrder(tree.root); // Output: 2, 7, 5, 15, 10

// console.log("LevelOrder Traversal:");
// tree.levelOrder(); // Output: 10, 5, 15, 2, 7

// console.log("Search 7:", tree.search(7)); // Output: true
// console.log("Search 20:", tree.search(20)); // Output: false

// tree.delete(5);
// console.log("InOrder Traversal after deleting 5:");
// tree.inOrder(tree.root); // Output: 2, 7, 10, 15


class Heap{
    constructor() {
        this.heap = []
    }
    
    getParent(i) { return Math.floor((i - 1) / 2) }
    
    getLeft(i) { return (i * 2) + 1 }
    
    getRight(i) { return (i * 2) + 2 }

    swap(i, j) {
        let temp = this.heap[i]
        this.heap[i] = this.heap[j]
        this.heap[j] = temp
    }

    insert(data) {
        this.heap.push(data)
        this._heapifyUp(this.heap.length - 1)
    }

    _heapifyUp(i) {
        let curr = i
        while (curr > 0) {
            let parent = this.getParent(curr)
            if (this.heap[curr] < this.heap[parent]) {
                this.swap(parent, curr)
                curr = parent
            }else break
        }
    }

    remove() {
        if (!this.heap.length) return null
        if (this.heap.length === 1) return this.heap.pop()
        let min = this.heap[0]
        this.heap[0] = this.heap.pop()
        this._heapifyDown(0)
        return min
    }

    _heapifyDown(i) {
        let curr = i
        let length = this.heap.length
        while (true) {
            let left = this.getLeft(curr)
            let right = this.getRight(curr)
            let small = curr

            if (left < length && this.heap[left] < this.heap[small]) small = left
            if (right < length && this.heap[right] < this.heap[small]) small = right
            
            if (small !== curr) {
                this.swap(small, curr)
                curr = small
            }else break
        }
    }
}

// const heap = new Heap();

// // Insert elements
// heap.insert(10);
// heap.insert(15);
// heap.insert(20);
// heap.insert(17);
// heap.insert(8);
// console.log("Heap after insertion:", heap.heap); // Should be a valid min-heap, e.g., [8, 10, 20, 17, 15]

// // Remove the root (minimum element)
// console.log("Removed element:", heap.remove()); // Should print 8
// console.log("Heap after removal:", heap.heap); // Should still be a valid min-heap

// // Remove elements until the heap is empty
// console.log("Removed element:", heap.remove()); // Should print 10
// console.log("Removed element:", heap.remove()); // Should print 15
// console.log("Removed element:", heap.remove()); // Should print 17
// console.log("Removed element:", heap.remove()); // Should print 20
// console.log("Removed element:", heap.remove()); // Should print null (heap is empty)

function heapSort(arr) {
    const n = arr.length;

    // Step 1: Build a Max-Heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i); // Start heapifying from the last non-leaf node
    }

    // Step 2: Extract elements one by one
    for (let i = n - 1; i > 0; i--) {
        // Swap the root (max element) with the last element
        [arr[0], arr[i]] = [arr[i], arr[0]];

        // Restore the heap property for the reduced heap
        heapify(arr, i, 0);
    }

    return arr;
}

// Helper function to heapify a subtree rooted at index `i`
function heapify(arr, n, i) {
    let largest = i; // Assume the root is the largest
    const left = 2 * i + 1; // Left child index
    const right = 2 * i + 2; // Right child index

    // Check if the left child exists and is greater than the root
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    // Check if the right child exists and is greater than the largest so far
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    // If the largest is not the root, swap and recursively heapify the affected subtree
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest); // Recursively heapify the affected subtree
    }
}
