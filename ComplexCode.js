/*
 * Filename: ComplexCode.js
 * Description: Implements a complex algorithm to find the shortest path between nodes in a graph
 */

// Graph class
class Graph {
  constructor() {
    this.nodes = new Map();
  }

  addNode(node) {
    this.nodes.set(node, []);
  }

  addEdge(node1, node2, weight) {
    this.nodes.get(node1).push({ node: node2, weight });
    this.nodes.get(node2).push({ node: node1, weight });
  }

  dijkstra(start) {
    const distances = new Map();
    const visited = new Set();

    for (const node of this.nodes.keys()) {
      distances.set(node, Infinity);
    }
    distances.set(start, 0);

    while (visited.size !== this.nodes.size) {
      const currNode = this.getMinDistance(distances, visited);
      visited.add(currNode);

      for (const neighbor of this.nodes.get(currNode)) {
        const distance = distances.get(currNode) + neighbor.weight;
        if (distance < distances.get(neighbor.node)) {
          distances.set(neighbor.node, distance);
        }
      }
    }

    return distances;
  }

  getMinDistance(distances, visited) {
    let minDistance = Infinity;
    let minNode = null;

    for (const [node, distance] of distances) {
      if (!visited.has(node) && distance < minDistance) {
        minDistance = distance;
        minNode = node;
      }
    }

    return minNode;
  }
}

// Create a new graph
const graph = new Graph();

// Add nodes to the graph
graph.addNode("A");
graph.addNode("B");
graph.addNode("C");
graph.addNode("D");
graph.addNode("E");
graph.addNode("F");
graph.addNode("G");

// Add edges to the graph
graph.addEdge("A", "B", 5);
graph.addEdge("A", "C", 9);
graph.addEdge("A", "D", 7);
graph.addEdge("B", "D", 2);
graph.addEdge("B", "E", 3);
graph.addEdge("C", "F", 4);
graph.addEdge("D", "E", 1);
graph.addEdge("D", "F", 3);
graph.addEdge("E", "G", 4);
graph.addEdge("F", "G", 2);

// Find shortest paths using Dijkstra's algorithm
const distances = graph.dijkstra("A");

// Output the shortest paths from node A to all other nodes
for (const [node, distance] of distances) {
  console.log(`Shortest path from A to ${node}: ${distance === Infinity ? "No path" : distance}`);
}