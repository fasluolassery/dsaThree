class Node {
    constructor() {
        this.children = {}
        this.end = false
    }
}

class Trie {
    constructor() {
        this.root = new Node()
    }

    insert(word) {
        let node = this.root
        for(let char of word) {
            if(!node.children[char]) {
                node.children[char] = new Node()
            }
            node = node.children[char]
        }
        node.end = true
    }

    search(word) {
        let node = this.root
        for(let char of word) {
            if(!node.children[char]) {
                return false
            }
            node = node.children[char]
        }
        return node.end
    }

    startsWith(word) {
        let node = this.root
        for(let char of word) {
            if(!node.children[char]) {
                return []
            }
            node = node.children[char]
        }
        let words = []
        this.collectWords(words, word, node)
        return words
    }

    collectWords(words, word, node) {
        if(node.end) {
            words.push(word)
        }
        for(let char in node.children) {
            this.collectWords(words, word + char, node.children[char])
        }
    }
}

const trie = new Trie()
trie.insert('feds')
trie.insert('fedsee')
trie.insert('Makka')


console.log(trie.startsWith('M'))