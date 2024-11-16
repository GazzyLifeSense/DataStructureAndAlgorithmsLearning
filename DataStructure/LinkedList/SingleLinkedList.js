/*
 * 单链表实现
 * 
 * ①同时持有头尾节点的引用
 * 
 * ②虚拟头节点
 * 
 */
class Node{
    constructor(val) {
        this.val = val
        this.next = null
    }
}

class SingleLinkedList{
    constructor() {
        this.head = new Node()
        this.tail = this.head
        this.size = 0
    }

    [Symbol.iterator]() {
        let index = 0
        return {
            next: () => {
                if (index < this.size) {
                    return { done: false, value: this.get(index++) }
                } else {
                    return { done: true, value: undefined }
                }
            },
            return: () => {
                //监听迭代器停止
                return { done: true, value: undefined }
            }
        }
    }

    // 查
    getNode(index) {
        this.checkElementIndex(index)

        let cur = this.head.next
        for (let i = 0; i < index; i++){
            cur = cur.next
        }
        
        return cur
    }

    get(index) {
        this.checkEmpty()

        return this.getNode(index).val
    }

    getFirst() {
        this.checkEmpty()

        return this.head.next.val
    }

    getLast() {
        this.checkEmpty()

        return this.getNode(this.size - 1).val
    }

    // 改
    set(index, val) {
        this.checkElementIndex(index)
        
        const targetNode = this.getNode(index)
        targetNode.val = val

        return targetNode.val
    }

    // 增
    add(index, val) {
        this.checkPositionIndex(index)

        if (index === this.size) {
            return this.addLast(val)
        }

        const newNode = new Node(val)
        // 获取插入位置前置节点
        let prev = this.head
        for (let i = 0; i < index; i++){
            prev = prev.next
        }

        newNode.next = prev.next
        prev.next = newNode
        this.size++
    }
    
    addFirst(val) {
        const newNode = new Node(val)

        newNode.next = this.head.next
        this.head.next = newNode
        if (this.size === 0) {
            this.tail = newNode
        } 
        this.size++
    }

    addLast(val) {
        const newNode = new Node(val)
        
        this.tail.next = newNode
        this.tail = newNode
        this.size++
    }

    // 删
    remove(index) {
        this.checkElementIndex(index)
        
        if (index === this.size - 1) {
            return this.removeLast()
        }

        // 获取删除位置前置节点
        let prev = this.head
        for (let i = 0; i < index; i++){
            prev = prev.next
        }

        const DeletedNode = prev.next
        prev.next = DeletedNode.next
        this.size--

        return DeletedNode
    }

    removeFirst() {
        this.checkEmpty()

        // 获取虚拟头节点
        let prev = this.head

        const DeletedNode = prev.next
        prev.next = DeletedNode.next
        if (this.size === 1) {
            this.tail = this.head
        }
        this.size--

        return DeletedNode
    }

    removeLast() {
        this.checkEmpty()

        // 获取尾节点前置节点
        let prev = this.head
        while (prev.next !== this.tail) {
            prev = prev.next
        }

        const DeletedNode = prev.next
        DeletedNode.next = null
        this.tail = prev.next
        this.size--

        return DeletedNode
    }

    // 是否合法元素索引
    isValidElementIndex(index) {
        return index >= 0 && index < this.size
    }

    // 是否合法位置索引
    isValidPositionIndex(index) {
        return index >= 0 && index <= this.size
    }

    checkEmpty() {
        if (this.size === 0) {
            throw new Error("No elements in the list!")
        }    
    }

    checkElementIndex(index) {
        if (!this.isValidElementIndex(index)) {
            throw new Error(`Index Out of Boundary! (Index: ${index}, Size: ${this.size})`)
        }
    }

    checkPositionIndex(index) {
        if (!this.isValidPositionIndex(index)) {
            throw new Error(`Invalid Position Index! (Index: ${index}, Size: ${this.size})`)
        }
    }

    show() {
        let cur = this.head.next
        let str = ""
        while (cur !== null) {
            str += `${cur.val} -> `
            cur = cur.next
        }
        console.log(str + 'null')
    }
}

/* TEST CODE */
function test() {
    const list = new SingleLinkedList();
    list.addFirst(1);
    list.addFirst(2);
    list.addLast(3);
    list.addLast(4);
    list.add(2, 5);

    console.log(list.removeFirst()); // 2
    console.log(list.removeLast());  // 4
    console.log(list.remove(1));      // 5

    console.log(list.getFirst());     // 1
    console.log(list.getLast());      // 3
    console.log(list.get(1));         // 3
}
test()