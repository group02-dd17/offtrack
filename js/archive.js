sigma.utils.pkg("sigma.canvas.nodes");
sigma.utils.pkg("sigma.canvas.labels");
//Disable right click context menu in network-graph div
//Right click is used to make all nodes and edges visible
document.getElementById("network-graph").oncontextmenu = function (e) {
  e.preventDefault();
};

let hashList = [];
let step = 0;

//URL parsing variable for the singlePage redirection
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const page_type = urlParams.get("selection");

//Popup
function rC(nam) {
  var tC = document.cookie.split("; ");
  for (var i = tC.length - 1; i >= 0; i--) {
    var x = tC[i].split("=");
    if (nam == x[0]) return unescape(x[1]);
  }
  return "~";
}

function writeCookie(nam, val) {
  document.cookie = nam + "=" + escape(val);
}

function lookupCookie(nam, pg) {
  var val = rC(nam);
  if (val.indexOf("~" + pg + "~") != -1) return false;
  val += pg + "~";
  writeCookie(nam, val);
  return true;
}

function firstTime(cookieName) {
  return lookupCookie("pWrD4jBo", cookieName);
}

function thisPage() {
  var page = location.href.substring(location.href.lastIndexOf("/") + 1);
  pos = page.indexOf(".");
  if (pos > -1) {
    page = page.substr(0, pos);
  }
  return page;
}

let checkClosed = false;

// if(document.cookie == "pWrD4jBo=%7Earchive%7E") animateGraph();
function resetSide() {
  //reset sidebar
  document.getElementById("nameLabels").textContent =
    "Select a video or an hashtag to\u00A0get more information";
  document.getElementById("wrapper-video").classList.add("hide");
  document.getElementById("hashtagsLabel").classList.add("hide");
  document.getElementById("videosNumber").classList.add("hide");
  document.getElementById("cohashTitle").classList.add("hide");
  document.getElementById("videosDate").classList.add("hide");
}

resetSide();

lightBoxClose = function () {
  console.log(checkClosed);
  document.querySelector(".lightbox").classList.add("closed");
  if (!checkClosed) animateGraph();
  return (checkClosed = true);
};

function init() {
  if (firstTime(thisPage())) {
    // this code only runs for first visit
    document.querySelector(".lightbox").classList.remove("closed");
  } else animateGraph();
}

init();

function changeEdgeSize() {
  console.log(window.screen.width);
  if(window.screen.width <= 425) return 0.1;
  else return 0.3;
}

//Create the function to build the network graph
function buildNetwork(s) {
  //Save the initial colors of the nodes and edges
  s.graph.nodes().forEach(function (n) {
    n.originalColor = n.color;
    if (n.attributes.Type == "hashtags") {
      hashList.push(n.label);
    }
  });

  s.graph.edges().forEach(function (e) {
    e.originalColor = e.color;
  });

  s.refresh();
  //Override initial edge colors

  s.settings({
    edgeColor: "default",
    defaultEdgeColor: "#D8D8D8",
    labelThreshold: 6,
    minNodeSize: 1,
    maxNodeSize: 15,
    minEdgeSize: changeEdgeSize(),
    maxEdgeSize: changeEdgeSize(),
    font: "GT America",
    defaultLabelSize: 16,
    defaultLabelColor: "#FFF",
    defaultLabelBGColor: "rgba(0,0,0,0.5)", //opacità per visibiltà video piccoli
    defaultHoverLabelBGColor: "white",
    defaultLabelHoverColor: "black",
  });

  // Refresh the graph to see the changes:
  s.refresh();

  let flagEvent = [false, 0];

  function createHashList() {
    document.getElementById("hashtagsLabel").childNodes.forEach(function (ent) {
      ent.addEventListener("click", function () {
        s.graph.nodes().forEach(function (n) {
          (n.color = n.originalColor), (n.hidden = false);
        });

        s.graph.edges().forEach(function (e) {
          (e.color = e.originalColor), (e.hidden = false);
        });

        flagEvent[0] = false;
        flagEvent[1] = null;
        moveToHash(ent.innerHTML);
      });

      ent.addEventListener("mouseover", function () {
        s.graph.nodes().forEach(function (n) {
          if (n.label === ent.innerHTML) {
            n.color = "#FF0000";
          }
        });
        s.refresh();
      });

      ent.addEventListener("mouseout", function () {
        s.graph.nodes().forEach(function (n) {
          if (n.label === ent.innerHTML) {
            n.color = n.originalColor;
          }
        });
        s.refresh();
      });
    });
  }

  function moveToHash(_selectedHash) {
    let selectedHash = _selectedHash;

    s.settings({
      labelThreshold: 1,
    });

    //15 dic h 22:15 li ho commentati tanto non cambia nulla —EG

    // s.graph.nodes().forEach(function (n) {
    //   (n.color = n.originalColor), (n.hidden = false);
    // });

    // s.graph.edges().forEach(function (e) {
    //   (e.color = e.originalColor), (e.hidden = false);
    // });

    s.graph.nodes().forEach(function (n) {
      if (n.attributes.Type == "hashtags" && n.label == selectedHash) {
        e = n;
        var nodeId = e.id,
          toKeep = s.graph.neighbors(nodeId),
          arrIdNeighs = [],
          nofNeighs = {};

        toKeep[nodeId] = e;
        var keyNames = Object.keys(toKeep); //array degli id dei neighbors
        // console.log(keyNames);

        for (k in keyNames) {
          var tempNeighs = s.graph.neighbors(keyNames[k]); //neighbors di nodeId del ciclo

          arrIdNeighs = Object.keys(tempNeighs);

          for (j in arrIdNeighs) {
            nofNeighs[arrIdNeighs[j]] = arrIdNeighs[j];
          }

          nofNeighs[nodeId] = e;
          toKeep = nofNeighs;
        }

        document.getElementById("hashtagsLabel").innerHTML = null;

        if (e.attributes.Type == "id") {
          document.getElementById("nameLabels").textContent =
            e.attributes.title;
          document.getElementById("videoPlayer").src = e.attributes.link;
          document.getElementById("wrapper-video").classList.remove("hide");
          document.getElementById("videosNumber").textContent =
            "Number of hashtags: " +
            Object.keys(s.graph.neighbors(nodeId)).length;
          document
            .getElementById("videoPlayer")
            .setAttribute("poster", e.attributes.thumburl);

          for (i in s.graph.neighbors(nodeId)) {
            var dateSpan = document.createElement("li");
            dateSpan.innerHTML = s.graph.neighbors(nodeId)[i].label;
            var li = document.getElementById("hashtagsLabel");
            li.appendChild(dateSpan);
          }

          createHashList();

          document.getElementById("hashtagsLabel").classList.remove("hide");
          document.getElementById("cohashTitle").classList.add("hide");
        } else {
          document.getElementById("nameLabels").textContent =
            toKeep[nodeId].label;
          document.getElementById("videoPlayer").src = "";
          document.getElementById("wrapper-video").classList.add("hide");
          document.getElementById("videosNumber").textContent =
            "Number of videos: " +
            Object.keys(s.graph.neighbors(nodeId)).length;
          var tempNeighs = [];
          var uniqueLabels = [];
          for (k in keyNames) {
            tempNeighs.push(s.graph.neighbors(keyNames[k])); //neighbors di nodeId del ciclo

            $.each(tempNeighs[k], function (i, el) {
              if (
                $.inArray(el.label, uniqueLabels) === -1 &&
                el.label.length > 1 &&
                el.label != e.label
              ) {
                uniqueLabels.push(el.label);
                var dateSpan = document.createElement("li");
                dateSpan.innerHTML = el.label;
                var li = document.getElementById("hashtagsLabel");
                li.appendChild(dateSpan);
              }
            });
          }
          document.getElementById("cohashTitle").classList.remove("hide");
          document.getElementById("cohashTitle").textContent =
            "Number of cohashtags: " + uniqueLabels.length;
        }
        s.graph.nodes().forEach(function (n) {
          if (toKeep[n.id]) {
            if (toKeep[n.id].id == nodeId) {
              n.color = "#FF0000";
            } else n.color = n.originalColor;
          } else n.hidden = true;
        });

        s.graph.edges().forEach(function (e) {
          if (toKeep[e.source] && toKeep[e.target]) e.color = e.originalColor;
          else (e.color = "#eee"), (e.hidden = true);
        });

        flagEvent[0] = true;
        flagEvent[1] = nodeId;

        let aNode = e;
        let cam = s.camera;
        let pfx = cam.readPrefix;

        if (cam.ratio > 0.7) {
          sigma.utils.zoomTo(
            cam, // cam
            aNode[pfx + "x"] - cam.x, // x
            aNode[pfx + "y"] - cam.y, // y
            0.3, // ratio
            { duration: 1000 } // animation
          );

          s.settings({
            labelThreshold: 1,
          });
        } else {
          sigma.misc.animation.camera(
            cam,
            {
              x: aNode[cam.readPrefix + "x"],
              y: aNode[cam.readPrefix + "y"],
              ratio: 0.3,
            },
            { duration: 1000 }
          );
        }
        s.refresh();
      }
    });

    createHashList();
  }

  //When a node is hovered, check all nodes to see which are neighbors.
  //Set neighbor nodes to dark blue, else keep node as original color.
  //Do the same for the edges, coloring connections to neighbors blue.
  s.bind("overNode", function (e) {
    //reset label threshold
    s.settings({
      labelThreshold: 6,
    });

    var nodeId = e.data.node.id,
      toKeep = s.graph.neighbors(nodeId);
    toKeep[nodeId] = e.data.node;

    s.graph.nodes().forEach(function (n) {
      if (toKeep[n.id] || n.id == flagEvent[1]) n.color = "#F00";
      else n.color = "#444444";
    });

    s.graph.edges().forEach(function (e) {
      if (toKeep[e.source] && toKeep[e.target]) e.color = "#F00";
      else e.color = "rgba(158,158,158,0.1)";
    });

    //Refresh graph to update colors
    s.refresh();
  });

  //Return nodes and edges to original color after mose moves off a node (stops hovering)
  s.bind("outNode", function (e) {
    s.graph.nodes().forEach(function (n) {
      if (flagEvent[0] == false || n.id != flagEvent[1])
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
  //Change the clicked node's original color to red.
  //Do the same for the edges, keeping the ones with both endpoints colored.
  //Clicking consecutive nodes will show the joint network all clicked nodes.

  document.getElementById("nameLabels").textContent =
    "Select a video or an hashtag to\u00A0get more information";
  document.getElementById("wrapper-video").classList.add("hide");

  s.bind("clickNode", function (e) {
    s.graph.nodes().forEach(function (n) {
      (n.color = n.originalColor), (n.hidden = false);
    });

    s.graph.edges().forEach(function (e) {
      (e.color = e.originalColor), (e.hidden = false);
    });

    flagEvent[0] = false;
    flagEvent[1] = null;

    var nodeId = e.data.node.id,
      toKeep = s.graph.neighbors(nodeId),
      arrIdNeighs = [],
      nofNeighs = {};

    toKeep[nodeId] = e.data.node;
    var keyNames = Object.keys(toKeep); //array degli id dei neighbors

    for (k in keyNames) {
      var tempNeighs = s.graph.neighbors(keyNames[k]); //neighbors di nodeId del ciclo
      arrIdNeighs = Object.keys(tempNeighs);

      for (j in arrIdNeighs) {
        nofNeighs[arrIdNeighs[j]] = arrIdNeighs[j];
      }

      nofNeighs[nodeId] = e.data.node;
      toKeep = nofNeighs;
    }

    s.camera.goTo(e.data.node.x, e.data.node.y);

    document.getElementById("hashtagsLabel").innerHTML = null;
    document.getElementById("videosDate").innerHTML = null;
    document.getElementById("hashtagsLabel").classList.remove("hide");
    document.getElementById("videosNumber").classList.remove("hide");
    document.getElementById("videosDate").classList.remove("hide");

    if (e.data.node.attributes.Type == "id") {
      document.getElementById("videosDate").textContent =
        e.data.node.attributes.timestamp;
      document.getElementById("nameLabels").textContent =
        e.data.node.attributes.title;
      document.getElementById("videoPlayer").src = e.data.node.attributes.link;
      document.getElementById("wrapper-video").classList.remove("hide");
      document.getElementById("videosNumber").textContent =
        "Number of hashtags: " + Object.keys(s.graph.neighbors(nodeId)).length;
      document
        .getElementById("videoPlayer")
        .setAttribute("poster", e.data.node.attributes.thumburl);
      for (i in s.graph.neighbors(nodeId)) {
        var dateSpan = document.createElement("li");
        dateSpan.innerHTML = s.graph.neighbors(nodeId)[i].label;
        var li = document.getElementById("hashtagsLabel");
        li.appendChild(dateSpan);
      }
      document.getElementById("hashtagsLabel").classList.remove("hide");
      document.getElementById("cohashTitle").classList.add("hide");
    } else {
      document.getElementById("nameLabels").textContent = toKeep[nodeId].label;
      document.getElementById("videoPlayer").src = "";
      document.getElementById("wrapper-video").classList.add("hide");
      document.getElementById("videosNumber").textContent =
        "Number of videos: " + Object.keys(s.graph.neighbors(nodeId)).length;
      var tempNeighs = [];
      var uniqueLabels = [];
      for (k in keyNames) {
        tempNeighs.push(s.graph.neighbors(keyNames[k])); //neighbors di nodeId del ciclo

        $.each(tempNeighs[k], function (i, el) {
          if (
            $.inArray(el.label, uniqueLabels) === -1 &&
            el.label.length > 1 &&
            el.label != e.data.node.label
          ) {
            uniqueLabels.push(el.label);
            var dateSpan = document.createElement("li");
            dateSpan.innerHTML = el.label;
            var li = document.getElementById("hashtagsLabel");
            li.appendChild(dateSpan);
          }
        });
      }

      document.getElementById("cohashTitle").classList.remove("hide");
      document.getElementById("cohashTitle").textContent =
        "Number of cohashtags: " + uniqueLabels.length;
    }

    //Interactive sidebar
    createHashList();

    s.graph.nodes().forEach(function (n) {
      if (toKeep[n.id]) {
        if (toKeep[n.id].id == nodeId) {
          n.color = "#FF0000";
        } else n.color = n.originalColor;
      } else n.hidden = true;
    });

    flagEvent[0] = true;
    flagEvent[1] = nodeId;
    //Refresh graph to update colors

    let aNode = e.data.node;
    let cam = s.camera;
    let pfx = cam.readPrefix;

    if (cam.ratio > 0.7) {
      sigma.utils.zoomTo(
        cam, // cam
        aNode[pfx + "x"] - cam.x, // x
        aNode[pfx + "y"] - cam.y, // y
        0.3, // ratio
        { duration: 1000 } // animation
      );

      s.settings({
        labelThreshold: 1,
      });
    } else {
      sigma.misc.animation.camera(
        cam,
        {
          x: aNode[cam.readPrefix + "x"],
          y: aNode[cam.readPrefix + "y"],
          ratio: 0.3,
        },
        { duration: 1000 }
      );
    }

    s.refresh();
  });

  //When the stage is right-clicked or just clicked, return nodes and edges to original colors
  s.bind("rightClickStage", function (e) {
    s.settings({
      labelThreshold: 6,
    });
    s.graph.nodes().forEach(function (n) {
      (n.color = n.originalColor), (n.hidden = false);
    });

    s.graph.edges().forEach(function (e) {
      (e.color = e.originalColor), (e.hidden = false);
    });

    let aNode = e.data.node;
    let cam = s.camera;
    let pfx = cam.readPrefix;
    sigma.misc.animation.camera(
      s.cameras[0],
      { ratio: 1, x: 0, y: 0, angle: 0 },
      { duration: 1000 }
    );
    flagEvent[0] = false;
    flagEvent[1] = null;

    resetSide();
  });

  // GUI EVENTS

  $("#zoomIn").bind("click", function () {
    // Zoom in - animation :
    sigma.misc.animation.camera(
      s.camera,
      {
        ratio: s.camera.ratio / 2,
      },
      {
        duration: 600,
      }
    );
  });

  $("#zoomOut").bind("click", function () {
    // Zoom out - animation :
    if (s.camera.ratio < 1) {
      sigma.misc.animation.camera(
        s.camera,
        {
          ratio: s.camera.ratio * 2,
        },
        {
          duration: 600,
        }
      );
    }
  });

  $("#resetView").bind("click", function () {
    var adjustZoom = 1;
    resetSide();

    if (document.body.clientWidth <= 425) {
      adjustZoom = document.body.clientWidth / 425 / 8;
    }

    s.settings({
      labelThreshold: 6,
    });
    // Reset view - animation :
    sigma.misc.animation.camera(
      s.cameras[0],
      { ratio: adjustZoom, x: 0, y: 0, angle: 0 },
      { duration: 600 }
    );
    s.graph.nodes().forEach(function (n) {
      (n.color = n.originalColor), (n.hidden = false);
    });

    s.graph.edges().forEach(function (e) {
      (e.color = e.originalColor), (e.hidden = false);
    });

    flagEvent[0] = false;
    flagEvent[1] = null;
  });

  s.refresh();

  //INFO BUTTON
  document.getElementById("info").addEventListener("click", function () {
    document.querySelector(".lightbox").classList.remove("closed");
  });

  // SEARCH BAR
  /*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
  autocomplete(document.getElementById("myInput"), hashList);

  function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
      the text field element and an array of possible autocompleted values:*/
    var currentFocus;

    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
      var a,
        b,
        i,
        val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) {
        return false;
      }
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      if (val == "#") {
        for (i = 0; i < 10; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML =
              "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function (e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
              closeAllLists();
            });
            a.appendChild(b);
          }
        }
      } else {
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML =
              "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function (e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
              closeAllLists();
            });
            a.appendChild(b);
          }
        }
      }
    });

    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
      var x = document.getElementById(this.id + "autocomplete-list");

      var el = this;
      var value = el.value;
      setTimeout(function () {
        if (el.value.indexOf("#") != 0) {
          el.value = value;
        }
      }, 0);

      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) {
        //up
        /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
    });

    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = x.length - 1;
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }

    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }

    //I'm using "click" but it works with any event
    document.addEventListener("click", function (event) {
      var isClickInside = document
        .getElementById("myInput")
        .contains(event.target);

      if (!isClickInside) {
        closeAllLists();
      }
    });

    //URL parsing variable for the singlePage redirection
    // const queryString = window.location.search;
    // const urlParams = new URLSearchParams(queryString);
    // const page_type = urlParams.get("selection");
    if (page_type) {
      s.graph.nodes().forEach(function(n){
        if(n.label == ("#" + page_type)) {
          selectedHash = n.id;
        }
      }); 
      var nodeId = selectedHash,
        toKeep = s.graph.neighbors(nodeId),
        arrIdNeighs = [],
        nofNeighs = {};

      // toKeep[nodeId] = e.data.node;
      var keyNames = Object.keys(toKeep); //array degli id dei neighbors

      for (k in keyNames) {
        var tempNeighs = s.graph.neighbors(keyNames[k]); //neighbors di nodeId del ciclo
        arrIdNeighs = Object.keys(tempNeighs);

        for (j in arrIdNeighs) {
          nofNeighs[arrIdNeighs[j]] = arrIdNeighs[j];
        }

        // nofNeighs[nodeId] = e.data.node;
        toKeep = nofNeighs;
      }

      document.getElementById("nameLabels").textContent = selectedHash;
      document.getElementById("videoPlayer").src = "";
      document.getElementById("wrapper-video").classList.add("hide");
      document.getElementById("videosNumber").textContent =
        "Number of videos: " + Object.keys(s.graph.neighbors(nodeId)).length;
      var tempNeighs = [];
      var uniqueLabels = [];
      for (k in keyNames) {
        tempNeighs.push(s.graph.neighbors(keyNames[k])); //neighbors di nodeId del ciclo

        $.each(tempNeighs[k], function (i, el) {
          if (
            $.inArray(el.label, uniqueLabels) === -1 &&
            el.label.length > 1 &&
            el.label != e.label
          ) {
            uniqueLabels.push(el.label);
            var dateSpan = document.createElement("li");
            dateSpan.innerHTML = el.label;
            var li = document.getElementById("hashtagsLabel");
            li.appendChild(dateSpan);
          }
        });
      }
      document.getElementById("hashtagsLabel").classList.remove("hide");
      document.getElementById("cohashTitle").classList.remove("hide");
      document.getElementById("cohashTitle").textContent =
        "Number of cohashtags: " + uniqueLabels.length;
      moveToHash("#" + page_type);
    }

    document
      .getElementById("submitButton")
      .addEventListener("click", function (f) {
        let selectedHash = document.getElementById("myInput").value;
        closeAllLists(f.target);
        s.graph.nodes().forEach(function (n) {
          (n.color = n.originalColor), (n.hidden = false);
        });

        s.graph.edges().forEach(function (e) {
          (e.color = e.originalColor), (e.hidden = false);
        });

        flagEvent[0] = false;
        flagEvent[1] = null;

        var nodeId = selectedHash,
          toKeep = s.graph.neighbors(nodeId),
          arrIdNeighs = [],
          nofNeighs = {};

        // toKeep[nodeId] = e.data.node;
        var keyNames = Object.keys(toKeep); //array degli id dei neighbors

        for (k in keyNames) {
          var tempNeighs = s.graph.neighbors(keyNames[k]); //neighbors di nodeId del ciclo
          arrIdNeighs = Object.keys(tempNeighs);

          for (j in arrIdNeighs) {
            nofNeighs[arrIdNeighs[j]] = arrIdNeighs[j];
          }

          // nofNeighs[nodeId] = e.data.node;
          toKeep = nofNeighs;
        }

        document.getElementById("nameLabels").textContent = selectedHash;
        document.getElementById("videoPlayer").src = "";
        document.getElementById("wrapper-video").classList.add("hide");
        document.getElementById("videosNumber").textContent =
          "Number of videos: " + Object.keys(s.graph.neighbors(nodeId)).length;
        var tempNeighs = [];
        var uniqueLabels = [];
        for (k in keyNames) {
          tempNeighs.push(s.graph.neighbors(keyNames[k])); //neighbors di nodeId del ciclo

          $.each(tempNeighs[k], function (i, el) {
            if (
              $.inArray(el.label, uniqueLabels) === -1 &&
              el.label.length > 1 &&
              el.label != e.label
            ) {
              uniqueLabels.push(el.label);
              var dateSpan = document.createElement("li");
              dateSpan.innerHTML = el.label;
              var li = document.getElementById("hashtagsLabel");
              li.appendChild(dateSpan);
            }
          });
        }
        document.getElementById("hashtagsLabel").classList.remove("hide");
        document.getElementById("cohashTitle").classList.remove("hide");
        document.getElementById("cohashTitle").textContent =
          "Number of cohashtags: " + uniqueLabels.length;
        moveToHash(selectedHash);
      });
  }
}

function animateGraph() {
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
        type: "canvas",
      },
      settings: {
        edgeColor: "default",
        defaultEdgeColor: "#D8D8D8",
        labelThreshold: 6,
        minNodeSize: 1,
        maxNodeSize: 15,
        minEdgeSize: changeEdgeSize(),
        maxEdgeSize: changeEdgeSize(),
        font: "GT America",
        defaultLabelSize: 16,
        defaultLabelColor: "#FFF",
        defaultLabelBGColor: "rgba(0,0,0,0.5)", //opacità per visibiltà video piccoli
        defaultHoverLabelBGColor: "white",
        defaultLabelHoverColor: "black",
        animationsTime: 300,
      },
    });

    s.addCamera("cam2");
    // s.camera.angle= Math.PI;
    s.camera.isAnimated = true;
    // s.camera.getRectangle(document.getElementById("network-graph").clientWidth, document.getElementById("network-graph").clientHeight);

    if (document.body.clientWidth <= 425) {
      s.camera.ratio = document.body.clientWidth / 425 / 8;
    }

    s.graph.nodes().forEach(function (n) {
      n.atlas_x = n.x;
      n.atlas_y = n.y;
      n.x = Math.random() * (3000 + 200) + 200;
      n.y = Math.random() * (2000 + 200) + 200;
    });

    let durata;
    if (page_type) durata = 1;
    else durata = 3000;

    sigma.plugins.animate(
      s,
      {
        x: "atlas_x",
        y: "atlas_y",
      },
      {
        easing: "quadraticOut",
        duration: durata,
        onComplete: function () {
          CustomShapes.init(s);
          buildNetwork(s);
        },
      }
    );
  });
}
