sigma.utils.pkg('sigma.canvas.nodes');
sigma.utils.pkg('sigma.canvas.labels');
//Disable right click context menu in network-graph div
//Right click is used to make all nodes and edges visible
document.getElementById("network-graph").oncontextmenu = function (e) {
  e.preventDefault();
};

//Add a method to the graph that returns all neighbors of a node
sigma.classes.graph.addMethod("neighbors", function (nodeId) {
  var k,
    neighbors = {},
    index = this.allNeighborsIndex[nodeId] || {};

  for (k in index) neighbors[k] = this.nodesIndex[k];

  return neighbors;
});

//Import JSON network as object and initiate a sigma network graph,
//run other functions that require a sequential order
var jnet, s;
$.getJSON("assets/data/Phase32.json", function (response) {
  jnet = response;
  s = new sigma({
    graph: jnet,
    renderer: {
      container: document.getElementById("network-graph"),
      type: "canvas"
    }
  });

  buildNetwork();
});

CustomShapes.init(s);

//Create the function to build the network graph
function buildNetwork() {
  //Save the initial colors of the nodes and edges
  s.graph.nodes().forEach(function (n) {
    n.originalColor = n.color;
  });
  s.graph.edges().forEach(function (e) {
    e.originalColor = e.color;
  });

  s.refresh();
  //Override initial edge colors

  s.settings({
    edgeColor: "default",
    defaultEdgeColor: "#D8D8D8",
    defaultLabelColor: '#D8D8D8',
    labelThreshold: 5,
    minNodeSize: 1,
    maxNodeSize: 15,
    minEdgeSize: 0.3,
    maxEdgeSize: 0.3
  });

  // Refresh the graph to see the changes:
  s.refresh();

  //When a node is hovered, check all nodes to see which are neighbors.
  //Set neighbor nodes to dark blue, else keep node as original color.
  //Do the same for the edges, coloring connections to neighbors blue.
  s.bind("overNode", function (e) {
    var nodeId = e.data.node.id,
      toKeep = s.graph.neighbors(nodeId);
    toKeep[nodeId] = e.data.node;

    s.graph.nodes().forEach(function (n) {
      if (toKeep[n.id]) n.color = "#F00";
      else n.color = "#444444";
    });

    s.graph.edges().forEach(function (e) {
      if (toKeep[e.source] && toKeep[e.target]) e.color = "red";
      else e.color = "rgba(158,158,158,0.1)";
    });

    //Refresh graph to update colors
    s.refresh();
  });

  //Return nodes and edges to original color after mose moves off a node (stops hovering)
  s.bind("outNode", function (e) {
    s.graph.nodes().forEach(function (n) {
      n.color = n.originalColor;
    });

    s.graph.edges().forEach(function (e) {
      e.color = e.originalColor;
    });

    //Refresh graph to update colors
    s.refresh();
  });

  //When a node is clicked, check all nodes to see which are neighbors.
  //Set all non-neighbors to grey and hide them, else set node to original color.
  //Change the clicked node's original color to green.
  //Do the same for the edges, keeping the ones with both endpoints colored.
  //Clicking consecutive nodes will show the joint network all clicked nodes.
  s.bind("clickNode", function (e) {
    var nodeId = e.data.node.id,
      toKeep = s.graph.neighbors(nodeId);
    toKeep[nodeId] = e.data.node;

    document.getElementById("nameLabels").textContent = toKeep[nodeId].label;
    document.getElementById("videosNumber").textContent = Object.keys(s.graph.neighbors(nodeId)).length;
    console.log(toKeep);

    // toKeep.forEach(function (m, index) {
    //   var nonObj = [];
    //   nonObj.push(s.graph.neighbors(m));
    //   console.log(s.graph.neighbors(nodeId));
    // });


    s.graph.nodes().forEach(function (n) {
      if (toKeep[n.id] == toKeep[nodeId]) n.color;
      else if (toKeep[n.id]) n.color = n.originalColor;
      else (n.hidden = true);
    });

    s.graph.edges().forEach(function (e) {
      if (toKeep[e.source] && toKeep[e.target]) e.color = e.originalColor;
      else (e.color = "#eee"), (e.hidden = true);
    });

    //Refresh graph to update colors
    s.refresh();
  });

  //When the stage is right-clicked or just clicked, return nodes and edges to original colors
  s.bind("clickStage rightClickStage", function (e) {
    s.graph.nodes().forEach(function (n) {
      (n.color = n.originalColor),
        (n.hidden = false);
    });

    s.graph.edges().forEach(function (e) {
      (e.color = e.originalColor), (e.hidden = false);
    });

    //Refresh graph to update colors
    s.refresh();
  });
  s.refresh();
}
