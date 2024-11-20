class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Bst {
  constructor() {
    this.root = null;
  }

  isEmpty() {
    return this.root === null;
  }

  insWithRecursion(data) {
    let node = new Node(data);
    if (this.isEmpty()) this.root = node;
    else {
      this._recursionIns(this.root, node);
    }
  }

  _recursionIns(root, node) {
    if (node.data < root.data) {
      if (root.left === null) {
        root.left = node;
      } else {
        this._recursionIns(root.left, node);
      }
    } else {
      if (root.right === null) {
        root.right = node;
      } else {
        this._recursionIns(root.right, node);
      }
    }
  }

  insWithLoops(data) {
    let node = new Node(data);
    if (this.isEmpty()) {
      this.root = node;
      return;
    } else {
      let curr = this.root;
      while (true) {
        if (data < curr.data) {
          if (!curr.left) {
            curr.left = node;
            return;
          }
          curr = curr.left;
        } else {
          if (!curr.right) {
            curr.right = node;
            return;
          }
          curr = curr.right;
        }
      }
    }
  }

  searchWithRecursion(root, data) {
    if (!root || !data) return false;
    if (root.data === data) return true;
    else if (data < root.data) return this.searchWithRecursion(root.left, data);
    else if (data > root.data) return this.searchWithRecursion(root.right, data);
  }

  searchWithloops(data) {
    let curr = this.root;
    while (curr) {
      if (curr.data === data) {
        return true;
      } else if (data < curr.data) {
        curr = curr.left;
      } else {
        curr = curr.right;
      }
    }
    return false;
  }

  //! DFS
  preOrder(root) {
    if (root) {
      console.log(root.data);
      this.preOrder(root.left);
      this.preOrder(root.right);
    }
  }

  inOrder(root) {
    if (root) {
      this.inOrder(root.left);
      console.log(root.data);
      this.inOrder(root.right);
    }
  }

  postOrder(root) {
    if (root) {
      this.postOrder(root.left);
      this.postOrder(root.right);
      console.log(root.data);
    }
  }

  //!BFS
  levelOrder() {
    let queue = [];
    queue.push(this.root);
    while (queue.length) {
      let curr = queue.shift();
      console.log(curr.data);
      if (curr.left) queue.push(curr.left);
      if (curr.right) queue.push(curr.right);
    }
  }
}

let a = new Bst();
a.insWithRecursion(10);
a.insWithRecursion(5);
a.insWithRecursion(15);
a.insWithRecursion(3);
a.insWithRecursion(7);
a.levelOrder();


//! findClosestValueInBST
function findClosestValueInBST(tree, target) {
  let closest = tree.value;
  let currentNode = tree;

  while (currentNode !== null) {
    if (Math.abs(target - closest) > Math.abs(target - currentNode.value)) {
      closest = currentNode.value;
    }

    if (target < currentNode.value) {
      currentNode = currentNode.left;
    } else if (target > currentNode.value) {
      currentNode = currentNode.right;
    } else {
      break; // Exact match found
    }
  }

  return closest;
}

// Example Usage
console.log(findClosestValueInBST(bst, 12)); // Output: 13


//! validateBST
function validateBST(node, min = -Infinity, max = Infinity) {
  if (node === null) return true;
  if (node.value <= min || node.value >= max) return false;
  return validateBST(node.left, min, node.value) && validateBST(node.right, node.value, max);
}

// Example Usage
console.log(validateBST(bst)); // Output: true


//! traversal
function inOrderTraversal(node) {
  if (node === null) return;
  inOrderTraversal(node.left);
  console.log(node.value);
  inOrderTraversal(node.right);
}

function preOrderTraversal(node) {
  if (node === null) return;
  console.log(node.value);
  preOrderTraversal(node.left);
  preOrderTraversal(node.right);
}

function postOrderTraversal(node) {
  if (node === null) return;
  postOrderTraversal(node.left);
  postOrderTraversal(node.right);
  console.log(node.value);
}

// Example Usage
console.log("In-Order:");
inOrderTraversal(bst); // Output: 1, 2, 5, 5, 13, 15, 22
console.log("Pre-Order:");
preOrderTraversal(bst); // Output: 10, 5, 2, 1, 5, 15, 13, 22
console.log("Post-Order:");
postOrderTraversal(bst); // Output: 1, 2, 5, 5, 13, 22, 15, 10


//! delete node
// function delete(data) {
//   this.root = this._helpDelete(this.root, data);
// }

function _helpDelete(root, data) {
  if (!root) return null;  // If the node to be deleted is not found, return null (end of tree)

  if (data < root.data) {
    root.left = this._helpDelete(root.left, data);  // Recurse left if the data is smaller
  } else if (data > root.data) {
    root.right = this._helpDelete(root.right, data);  // Recurse right if the data is larger
  } else {  // We have found the node to delete
    // Case 1: Node has no children (leaf node)
    if (!root.left && !root.right) {
      return null;  // Simply return null, effectively removing this node
    }

    // Case 2: Node has one child
    if (!root.left) {
      return root.right;  // Return right child to connect with the parent
    }
    if (!root.right) {
      return root.left;  // Return left child to connect with the parent
    }

    // Case 3: Node has two children
    // Find the smallest node in the right subtree (in-order successor)
    let minNode = this._findMin(root.right);

    // Replace the current node’s data with the smallest data from the right subtree
    root.data = minNode.data;

    // Now, delete the in-order successor (min node) from the right subtree
    root.right = this._helpDelete(root.right, minNode.data);
  }

  return root;  // Return the updated root of the subtree
}

function _findMin(root) {
  while (root.left) {
    root = root.left;  // Keep going left to find the smallest node
  }
  return root;  // Once we hit the leftmost node, return it
}
