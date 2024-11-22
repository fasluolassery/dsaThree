class Graph{
    constructor() {
        this.list = {}
    }

    addVertex(vertex) {
        if (!this.list[vertex]) {
            this.list[vertex] = new Set()
        }
    }

    addEdge(v1, v2) {
        if (!this.list[v1]) this.addVertex(v1)
        if (!this.list[v2]) this.addVertex(v2)

        this.list[v1].add(v2)
        this.list[v2].add(v1)
    }

    hasEdge(v1, v2) {
        if(!this.list[v1] || !this.list[v2]) return false
        return this.list[v1].has(v2) && this.list[v2].has(v1)
    }

    removeEdge(v1, v2) {
        this.list[v1].delete(v2)
        this.list[v2].delete(v1)
    }

    removeVertex(v) {
        if (!this.list[v]) return false
        for (let vertex of this.list[v]) {
            this.removeEdge(v, vertex)
        }
        delete this.list[v]
    }
}

let graph = new Graph()
graph.addEdge('a', 'b')
graph.removeVertex('a')
console.log(graph)