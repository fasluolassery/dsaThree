//! inOrder traversal
function inOrderTraversal(root) {
    if (root === null) return; // Base case
    inOrderTraversal(root.left); // Traverse left
    console.log(root.value); // Visit root
    inOrderTraversal(root.right); // Traverse right
}

// Example Tree
const treeOne = {
    value: 10,
    left: {
        value: 5,
        left: { value: 2, left: null, right: null },
        right: { value: 8, left: null, right: null }
    },
    right: {
        value: 15,
        left: null,
        right: { value: 22, left: null, right: null }
    }
};

inOrderTraversal(treeOne); // Output: 2, 5, 8, 10, 15, 22

//! validate whether a binary tree is a BST
function isBST(node, min = -Infinity, max = Infinity) {
    if (node === null) return true; // Base case
    if (node.value <= min || node.value >= max) return false; // Violation
    return isBST(node.left, min, node.value) && isBST(node.right, node.value, max);
}

// Example Tree
const bst = {
    value: 10,
    left: { value: 5, left: null, right: null },
    right: { value: 15, left: null, right: null }
};
console.log(isBST(bst)); // Output: true

//! find maxDepth of binery tree
function maxDepth(root) {
    if (root === null) return 0; // Base case
    const leftDepth = maxDepth(root.left); // Depth of left subtree
    const rightDepth = maxDepth(root.right); // Depth of right subtree
    return Math.max(leftDepth, rightDepth) + 1;
}

// Example Tree
const treeTwo = {
    value: 10,
    left: {
        value: 5,
        left: { value: 2, left: null, right: null },
        right: null
    },
    right: { value: 15, left: null, right: null }
};
console.log(maxDepth(treeTwo)); // Output: 3
