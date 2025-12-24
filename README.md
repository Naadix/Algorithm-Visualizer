# 📊 Algorithm & Data Structures Visualizer
### *Academic Project - Data Structures & Algorithms (DSA)*

A comprehensive, interactive web application built with **React js** and **Tailwind CSS** to visualize the inner workings of fundamental computer science algorithms.

---

## 🖥️ Project Interfaces Preview
![Sorting Interface](src/assets/SortingPage.png)
![Searching Interface](src/assets/SearchingPage.png)

---

## 🚀 Key Features

### 1. Sorting Algorithms Visualizer
An interactive workspace to observe how different sorting techniques rearrange data.
* **Algorithms:** Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Shell Sort, and Quick Sort.
* **Visualization:** Color-coded bars representing array elements with real-time swapping animations :
Blue for default, yellow for comparison, red for swap, and green for sorted elements.
* **Controls:** Adjust array size and execution speed.

> **Visualizing Sorting:**
![Sorting Implementation](src/assets/Comparison_operation.png)
![Sorting Implementation](src/assets/Swap_opreation.png)
![Sorting Implementation](src/assets/Sorted_operation.png)

---

### 2. Searching & Data Structures Visualizer
A dedicated module for tree-based and table-based data structures with full CRUD support.

#### **🌲 Binary Search Tree (BST)**
* **Features:** Supports **Insertion**, **Search** , and **Deletion**.

> **BST Operations:**
> ![BST Screenshot](src/assets/BST_operation.png)
> ![BST Search Node](src/assets/BST_searchNode.png)

#### **📉 Binary Heap (Max Heap)**
* **Features:** Supports **Insertion**, **Extraction (Root)**, and **Specific Node Deletion**.
* **Logic:** Visualizes the `bubbleUp` and `sinkDown` processes to maintain heap properties.
* **Representation:** Syncs a visual tree structure with the underlying array representation.

> **Heap Structure:**
> ![Heap Screenshot](src/assets/Heap_operation.png)

#### **🔑 Hash Table**
* **Features:** Visualizes string hashing and index mapping.

> **Hash Table Mapping:**
> ![Hash Table Screenshot](src/assets/HashTable.png)

---
## ⚡ Installation & Setup
Run the project locally:

```bash
# Clone the repository
git clone https://github.com/Naadix/Algorithm-Visualizer.git

# Navigate into the project folder
cd Algorithm-Visualizer

# Install dependencies
npm install

# Start the development server
npm run dev