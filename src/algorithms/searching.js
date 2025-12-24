// Binary Search Tree Node
export class BSTNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Binary Heap 
export class BinaryHeap {
  constructor(type = 'min') {
    this.heap = []; // array representation of the heap
    this.type = type; 
  }

  compare(a, b) {
    return this.type === 'min' ? a < b : a > b;
  }

  insert(val) {
    this.heap.push(val);
    this.bubbleUp();
    return [...this.heap];
  }

  // put the inserted element to correct position 
  bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let element = this.heap[index];
      let parentIndex = Math.floor((index - 1) / 2);
      let parent = this.heap[parentIndex];
      
      if (this.compare(element, parent)) {
        this.heap[parentIndex] = element;
        this.heap[index] = parent;
        index = parentIndex;
      } else break;
    }
  }

  // extract the root element (max or min) from the heap
  extract() {
    const end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.sinkDown();
    }
    return [...this.heap];
  }

  // restore order of tree when the extracted root element 
  sinkDown() {
    let idx = 0;
    const length = this.heap.length;
    const element = this.heap[0];
    while(true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;
      let swap = null;

      if(leftChildIdx < length) {
        leftChild = this.heap[leftChildIdx];
        if(this.compare(leftChild, element)) {
          swap = leftChildIdx;
        }
      }
      if(rightChildIdx < length) {
        rightChild = this.heap[rightChildIdx];
        if(
          (swap === null && this.compare(rightChild, element)) ||
          (swap !== null && this.compare(rightChild, leftChild))
        ) {
          swap = rightChildIdx;
        }
      }
      if(swap === null) break;
      this.heap[idx] = this.heap[swap];
      this.heap[swap] = element;
      idx = swap;
    }
  }
  delete(val) {
  // search for the index of the value to be deleted
  const index = this.heap.indexOf(val);
  
  // value not found
  if (index === -1) return [...this.heap];

  // value is at the end
  const last = this.heap.pop();
  if (index === this.heap.length) return [...this.heap];

  // replace the value to be deleted with the last element
  this.heap[index] = last;

  // restore heap property
  this.bubbleUp(index); 
  this.sinkDown(index); 

  return [...this.heap];
}
}

// Hash Function
export const hashString = (key, size) => {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash + key.charCodeAt(i)) % size;
  }
  return hash;
};


// BST LOGIC

// search in BST
export const searchBST = (node, value) => {
  if (!node) return null;
  if (node.value === value) return node;
  if (value < node.value) return searchBST(node.left, value);
  return searchBST(node.right, value);
};

// return the node with minimum value in BST
const getMin = (node) => {
  let current = node;
  while (current && current.left !== null) current = current.left;
  return current;
};

//delete node in BST
export const deleteBST = (node, value) => {
  if (!node) return null;

  if (value < node.value) {
    node.left = deleteBST(node.left, value);
  } else if (value > node.value) {
    node.right = deleteBST(node.right, value);
  } else {
    //case 1: node with only one child or no child
    if (!node.left) return node.right;
    if (!node.right) return node.left;

    // case 2: node with two children
    let temp = getMin(node.right);
    node.value = temp.value;
    node.right = deleteBST(node.right, temp.value);
  }
  return node;
};