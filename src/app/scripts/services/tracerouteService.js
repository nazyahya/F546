/**
 * Created by Nazri on 28/2/16.
 */

var tracerouteServices = angular.module('TracerouteServices', ['ngResource', 'GeneralServices']);

//var tracerouteListURL = 'http://hpc-perfsonar.usc.edu/esmond/perfsonar/archive/'
//var tracerouteResultURL = tracerouteListURL + ':metadata_key/packet-trace/base'

var tracerouteResultURL = 'http://ps2.jp.apan.net/esmond/perfsonar/archive/'
var tracerouteResultIndividualURL = tracerouteResultURL + ':metadata_key/packet-trace/base'


// REST and Custom Services
//https://docs.angularjs.org/tutorial/step_11


tracerouteServices.factory('CytoscapeService', [function () {

  var cy = cytoscape({
    container: document.getElementById('traceroute_noduplicate'),

    style: [
      {
        selector: 'node',
        style: {
          'height': 20,
          'width': 20,
          'background-color': '#30c9bc',
          'label': 'data(id)'
        }
      },

      {
        selector: 'edge',
        style: {
          'width': 3,
          'opacity': 0.8,
          // 'label': 'data(id)',
          'line-color': '#a8ea00',
          'target-arrow-color': 'black',
          'target-arrow-shape': 'triangle'
        }
      }
    ]

    // Layout can only be done in Controller.


  });


  return {
    add_node: function (ID, main, startNode, endNode) {
      var mainNode;


      if (main == true) {
        mainNode = "true";
      } else {
        mainNode = "false";
      }

      var node = {
        group: 'nodes',
        // 'nodes' for a node, 'edges' for an edge
        // NB the group field can be automatically inferred for you but specifying it
        // gives you nice debug messages if you mis-init elements

        // NB: id fields must be strings or numbers
        data: {
          // element data (put dev data here)
          // mandatory for each element, assigned automatically on undefined
          id: ID,
          mainNode: mainNode,
          startNode: 0,
          endNode: 0

          // parent: 'nparent', // indicates the compound node parent id; not defined => no parent
        }


        // scratchpad data (usually temp or nonserialisable data)
        // scratch: {
        //   foo: 'bar'
        // },
        //
        // position: { // the model position of the node (optional on init, mandatory after)
        //   x: 100,
        //   y: 100
        // },
        //
        // selected: false, // whether the element is selected (default false)
        //
        // selectable: true, // whether the selection state is mutable (default true)
        //
        // locked: false, // when locked a node's position is immutable (default false)
        //
        // grabbable: true // whether the node can be grabbed and moved by the user

        // class: 'mainNode'// a space separated list of class names that the element has
      };

      // console.log("Node ID: " + ID + " created.");


      cy.add(node);
      return cy;
    },

    add_edge: function (ID, source, target, bandwidth, latency) {

      var edge = {
        group: 'edges',
        data: {
          id: ID,
          // inferred as an edge because `source` and `target` are specified:
          source: source, // the source node id (edge comes from this node)
          target: target,  // the target node id (edge goes to this node)
          bandwidth: bandwidth,
          latency: latency
        }
      };
      // console.log("Edge ID: " + ID + " Source: " + source + " Target: " + target + " created.");
      //return edge;

      cy.add(edge);
      return cy;
    },

    update_node: function (ID, data) {
      // cy.elements('node[id = "' + ID + '"]')
      var element = cy.getElementById(ID);
      element.data(data);
      return cy;
    },

    update_edge: function (ID, data) {

      // cy.elements('edge[id = "' + ID + '"]')
      var element = cy.getElementById(ID);
      element.data(data);
      return cy;
    },

    setLayout: function (selector) {

      cy.style()
      // .selector('#203.30.39.127')
      // .selector(':selected')
      // .selector('[id = "203.30.39.127"]')
        .selector('node[mainNode = "true"]')
        .style({
          'background-color': 'black'
        }).update();

      return cy;
    },

    getGraph: function () {
      return cy;
    }
  }


}]);


tracerouteServices.factory('CytoscapeService_Bandwidth', [function () {

  // Key Differences
  // 1. Edge ID is unique, Math.random()

  var cy = cytoscape({
    container: document.getElementById('cytoscape_bandwidth'),

    style: [
      {
        selector: 'node',
        style: {
          'height': 20,
          'width': 20,
          'background-color': '#30c9bc',
          'label': 'data(label)'
        }
      },

      {
        selector: 'edge',
        style: {
          'width': 2,
          'opacity': 0.8,
          'label': 'data(bandwidth)',
          'line-color': 'GreenYellow',
          'target-arrow-color': 'black',
          // tee, triangle, triangle-tee, triangle-backcurve, square, circle, diamond, or none
          'target-arrow-shape': 'triangle'
        }
      },
      {
        selector: '.multiline-manual',
        style: {
          'text-wrap': 'wrap'
        }
      }
    ]

    // Layout can only be done in Controller.
  });


  return {
    add_node: function (ID, main, startNode, endNode) {
      var mainNode;


      if (main == true) {
        mainNode = "true";
      } else {
        mainNode = "false";
      }

      var node = {
        group: 'nodes',
        // 'nodes' for a node, 'edges' for an edge
        // NB the group field can be automatically inferred for you but specifying it
        // gives you nice debug messages if you mis-init elements

        // NB: id fields must be strings or numbers
        data: {
          // element data (put dev data here)
          // mandatory for each element, assigned automatically on undefined
          id: ID,
          mainNode: mainNode,
          startNode: 0,
          endNode: 0,
          country: null,
          city: null,
          label: ID

          // parent: 'nparent', // indicates the compound node parent id; not defined => no parent
        },
        classes: 'multiline-manual'// a space separated list of class names that the element has


        // scratchpad data (usually temp or nonserialisable data)
        // scratch: {
        //   foo: 'bar'
        // },
        //
        // position: { // the model position of the node (optional on init, mandatory after)
        //   x: 100,
        //   y: 100
        // },
        //
        // selected: false, // whether the element is selected (default false)
        //
        // selectable: true, // whether the selection state is mutable (default true)
        //
        // locked: false, // when locked a node's position is immutable (default false)
        //
        // grabbable: true // whether the node can be grabbed and moved by the user


      };

      // console.log("Node ID: " + ID + " created.");


      cy.add(node);
      return cy;
    },

    add_edge: function (ID, source, target, tracerouteRTT, bandwidth, latency, startNode, endNode, metadataKey) {


      var edge = {
        group: 'edges',
        data: {
          id: ID,
          // inferred as an edge because `source` and `target` are specified:
          source: source, // the source node id (edge comes from this node)
          target: target,  // the target node id (edge goes to this node)
          rtt: tracerouteRTT,
          bandwidth: bandwidth,
          latency: latency,
          startNode: startNode,
          endNode: endNode,
          metadataKey: metadataKey
        }
      };
      // console.log("Edge ID: " + ID + " Source: " + source + " Target: " + target + " created.");
      //return edge;

      cy.add(edge);
      return cy;
    },

    update_node: function (ID, data) {
      // cy.elements('node[id = "' + ID + '"]')
      var element = cy.getElementById(ID);
      element.data(data);
      return cy;
    },

    update_edge: function (ID, data) {

      // cy.elements('edge[id = "' + ID + '"]')
      var element = cy.getElementById(ID);
      element.data(data);
      return cy;
    },

    setLayout: function (selector) {

      cy.style()
      // .selector('#203.30.39.127')
      // .selector(':selected')
      // .selector('[id = "203.30.39.127"]')
        .selector(selector)
        .style({
          'line-color': 'blue',
        }).update();

      return cy;
    },

    getGraph: function () {
      return cy;
    }
  }


}]);


// This service draws the main Latency cytoscape graph
tracerouteServices.factory('LatencyCytoscapeService', [function () {

// cache http://stackoverflow.com/questions/21660647/angular-js-http-cache-time

  var cy = cytoscape({
    container: document.getElementById('latency_cytoscape'),

    style: [
      {
        selector: 'node',
        style: {
          'height': 20,
          'width': 20,
          'background-color': 'LightSeaGreen',
          'label': 'data(label)'
        }
      },

      {
        selector: 'edge',
        style: {
          'width': 2,
          'opacity': 0.8,
          'label': 'data(latency)',
          'line-color': 'GreenYellow',
          'target-arrow-color': 'black',
          // tee, triangle, triangle-tee, triangle-backcurve, square, circle, diamond, or none
          'target-arrow-shape': 'triangle'
        }
      },
      {
        selector: '.multiline-manual',
        style: {
          'text-wrap': 'wrap'
        }
      }
    ],
    ready: function () {
      // window.cy = this;


    }

    // Layout can only be done in Controller.
  });


  return {
    add_node: function (ID, main, startNode, endNode) {
      var mainNode;


      if (main == true) {
        mainNode = "true";
      } else {
        mainNode = "false";
      }

      var node = {
        group: 'nodes',
        // 'nodes' for a node, 'edges' for an edge
        // NB the group field can be automatically inferred for you but specifying it
        // gives you nice debug messages if you mis-init elements

        // NB: id fields must be strings or numbers
        data: {
          // element data (put dev data here)
          // mandatory for each element, assigned automatically on undefined
          id: ID,
          mainNode: mainNode,
          startNode: 0,
          endNode: 0,
          country: null,
          city: null,
          label: ID

          // parent: 'nparent', // indicates the compound node parent id; not defined => no parent
        },
        classes: 'multiline-manual'// a space separated list of class names that the element has


        // scratchpad data (usually temp or nonserialisable data)
        // scratch: {
        //   foo: 'bar'
        // },
        //
        // position: { // the model position of the node (optional on init, mandatory after)
        //   x: 100,
        //   y: 100
        // },
        //
        // selected: false, // whether the element is selected (default false)
        //
        // selectable: true, // whether the selection state is mutable (default true)
        //
        // locked: false, // when locked a node's position is immutable (default false)
        //
        // grabbable: true // whether the node can be grabbed and moved by the user


      };

      // console.log("Node ID: " + ID + " created.");


      cy.add(node);
      return cy;
    },

    add_edge: function (ID, source, target, tracerouteRTT, bandwidth, latency, startNode, endNode, metadataKey, latencyTime) {


      var edge = {
        group: 'edges',
        data: {
          id: ID,
          // inferred as an edge because `source` and `target` are specified:
          source: source, // the source node id (edge comes from this node)
          target: target,  // the target node id (edge goes to this node)
          rtt: tracerouteRTT,
          bandwidth: bandwidth,
          latency: latency,
          startNode: startNode,
          endNode: endNode,
          metadataKey: metadataKey,
          latencyTime: latencyTime
        }

      };
      // console.log("Edge ID: " + ID + " Source: " + source + " Target: " + target + " created.");
      //return edge;

      cy.add(edge);
      return cy;
    },

    update_node: function (ID, data) {
      // cy.elements('node[id = "' + ID + '"]')
      var element = cy.getElementById(ID);
      element.data(data);
      return cy;
    },

    update_edge: function (ID, data) {

      // cy.elements('edge[id = "' + ID + '"]')
      var element = cy.getElementById(ID);
      element.data(data);
      return cy;
    },

    setLayout: function (selector) {

      cy.style()
      // .selector('#203.30.39.127')
      // .selector(':selected')
      // .selector('[id = "203.30.39.127"]')
        .selector(selector)
        .style({
          'line-color': 'blue',
        }).update();

      return cy;
    },

    getGraph: function () {
      return cy;
    }
  }


}]);

// This service draws the main a traceroute graph for each MAIN results of Latency
tracerouteServices.factory('LatencyToTracerouteCytoscapeService', [function () {

  var cy = cytoscape({
    container: document.getElementById('latency_cytoscape_traceroute'),

    style: [
      {
        selector: 'node',
        style: {
          'height': 20,
          'width': 20,
          'background-color': 'LightSeaGreen',
          'label': 'data(label)'
        }
      },

      {
        selector: 'edge',
        style: {
          'width': 2,
          'opacity': 0.8,
          'label': 'data(latency)',
          'line-color': 'GreenYellow',
          'target-arrow-color': 'black',
          // tee, triangle, triangle-tee, triangle-backcurve, square, circle, diamond, or none
          'target-arrow-shape': 'triangle'
        }
      },
      {
        selector: '.multiline-manual',
        style: {
          'text-wrap': 'wrap'
        }
      }
    ],
    ready: function () {

      // window.cy = this;

    }

    // Layout can only be done in Controller.
  });


  return {

    add_node: function (ID, main, startNode, endNode) {
      var mainNode;


      if (main == true) {
        mainNode = "true";
      } else {
        mainNode = "false";
      }

      var node = {
        group: 'nodes',
        // 'nodes' for a node, 'edges' for an edge
        // NB the group field can be automatically inferred for you but specifying it
        // gives you nice debug messages if you mis-init elements

        // NB: id fields must be strings or numbers
        data: {
          id: ID,
          mainNode: mainNode,
          startNode: startNode,
          endNode: endNode,
          country: null,
          city: null,
          label: ID

          // parent: 'nparent', // indicates the compound node parent id; not defined => no parent
        },
        classes: 'multiline-manual'// a space separated list of class names that the element has


        // scratchpad data (usually temp or nonserialisable data)
        // scratch: {
        //   foo: 'bar'
        // },
        //
        // position: { // the model position of the node (optional on init, mandatory after)
        //   x: 100,
        //   y: 100
        // },
        //
        // selected: false, // whether the element is selected (default false)
        //
        // selectable: true, // whether the selection state is mutable (default true)
        //
        // locked: false, // when locked a node's position is immutable (default false)
        //
        // grabbable: true // whether the node can be grabbed and moved by the user


      };

      // console.log("Node ID: " + ID + " created.");


      cy.add(node);
      return cy;
    },

    add_edge: function (ID, source, target, tracerouteRTT, bandwidth, latency, startNode, endNode, metadataKey, latencyTime) {


      var edge = {
        group: 'edges',
        data: {
          id: ID,
          source: source, // the source node id (edge comes from this node)
          target: target,  // the target node id (edge goes to this node)
          rtt: tracerouteRTT,
          bandwidth: bandwidth,
          latency: latency,
          startNode: startNode,
          endNode: endNode,
          metadataKey: metadataKey,
          latencyTime: latencyTime
        }

      };

      // console.log("Edge ID: " + ID + " Source: " + source + " Target: " + target + " created.");

      cy.add(edge);
      return cy;
    },

    getGraph: function () {
      return cy;
    }
  }


}]);


// This service is to loads the Traceroute graph from the Latency Graph.
tracerouteServices.factory('LatencyMetadataService', ['$http', '$q', '$cacheFactory', '$log', 'HostService', 'LatencyToTracerouteCytoscapeService', 'GeoIPNekudoService', function ($http, $q, $cacheFactory, $log, HostService, LatencyToTracerouteCytoscapeService, GeoIPNekudoService) {

  $log.debug("LatencyMetadataService:START");

  var host = HostService.getHost();
  var metadataList = [];
  var metadata = "";


  return {

    setTracerouteGraph: function (source, destination) {
      var sourceAndDestinationList = [];
      var nodeList = [];
      var errorInTraceroute = null;

      LatencyToTracerouteCytoscapeService.getGraph().remove('node');
      LatencyToTracerouteCytoscapeService.getGraph().remove('edge');


      $http({
        method: 'GET',
        url: host,
        params: {
          'format': 'json',
          'event-type': 'packet-trace',
          // 'limit': 10,
          // 'time-end': (Math.floor(Date.now() / 1000)),
          'time-range': 604800,
          'source': source,
          'destination': destination
        },
        cache: true

      }).then(function (response) {

        var promises = [];

        for (var i = 0; i < response.data.length; i++) {
          var reversedResponse = response.data.reverse();
          sourceAndDestinationList.push(
            {
              source: reversedResponse[i]['source'],
              destination: reversedResponse[i]['destination'],
              metadataKey: reversedResponse[i]['metadata-key']
            }
          );


          if (LatencyToTracerouteCytoscapeService.getGraph().elements('node[id = "' + reversedResponse[i]['source'] + '"]').size() == 0) {

            LatencyToTracerouteCytoscapeService.add_node(reversedResponse[i]['source'], true, reversedResponse[i]['source'], reversedResponse[i]['destination']);
            nodeList.push(reversedResponse[i]['source']);

            // Event
            LatencyToTracerouteCytoscapeService.getGraph().on('tap', 'node[id = "' + reversedResponse[i]['source'] + '"]', function (event) {
              var element = event.cyTarget;

            });
          }


          for (var j = 0; j < reversedResponse[i]['event-types'].length; j++) {

            if (reversedResponse[i]['event-types'][j]['event-type'] == 'packet-trace') {

              var promise = $http({
                method: 'GET',
                url: reversedResponse[i]['url'] + "packet-trace/base",
                params: {
                  'format': 'json',
                  // 'limit': '2',
                  // 'time-end': (Math.floor(Date.now() / 1000)),
                  'time-range': 86400
                  //48 Hours = 172800
                  // 24 hours = 86400
                },
                cache: true
              });

              promises.push(promise);
            }
          }

          //Retrieves the latest traceroute result
          break;
        }

        return $q.all(promises);

      }).then(function (response) {

        // $log.debug("$q response length: " + response.length);
        // $log.debug("sourceAndDestinationList length: " + response.length);


        for (var i = 0; i < response.length; i++) {

          var startNode = sourceAndDestinationList[i].source;
          var destinationNode = sourceAndDestinationList[i].destination;
          var metadataKey = sourceAndDestinationList[i].metadataKey;

          // NOTE RESULTS MAY COME IN THIS FORM:
          // {
          //   "success": 0,
          //   "ip": null,
          //   "error_message": "requestTimedOut",
          //   "mtu": null,
          //   "rtt": null,
          //   "ttl": "1",
          //   "query": "1"
          // },

          var reversedResponse = response[i].data.reverse();

          for (var j = 0; j < reversedResponse.length; j++) {
            // $log.debug("reversedResponse Length: " + reversedResponse.length)
            // $log.debug("ts : " + reversedResponse[j]['ts'])


            // IP keeps appending and adding inside, without checking if it's unique. Unique at per iteration.
            var temp_ip = [];
            var temp_rtt = [];

            for (var k = 0; k < reversedResponse[j]['val'].length; k++) {

              if (reversedResponse[j]['val'][k]['success'] == 1) {


                if (reversedResponse[j]['val'][k]['query'] == 1) {
                  temp_ip.push(reversedResponse[j]['val'][k]['ip']);
                  temp_rtt.push(reversedResponse[j]['val'][k]['rtt']);
                }
              } else {
                errorInTraceroute = true;
              }

            }


            // Adding Nodes
            for (var m = 0; m < temp_ip.length; m++) {
              if (LatencyToTracerouteCytoscapeService.getGraph().elements('node[id = "' + temp_ip[m] + '"]').size() == 0) {

                // $log.debug("Node To Add: "+temp_ip[m] )
                LatencyToTracerouteCytoscapeService.add_node(temp_ip[m], false);
                nodeList.push(temp_ip[m]);

                //event
                LatencyToTracerouteCytoscapeService.getGraph().on('tap', 'node[id = "' + temp_ip[m] + '"]', function (event) {

                })

              }
            }

            // Adding edges
            for (var m = 0; m < temp_ip.length; m++) {
              if (m != (temp_ip.length - 1 )) {

                // var edgeID = temp_ip[m] + "to" + temp_ip[m + 1];
                var edgeID = Math.random();

                if (LatencyToTracerouteCytoscapeService.getGraph().elements('edge[id = "' + edgeID + '"]').size() == 0) {

                  LatencyToTracerouteCytoscapeService.add_edge(edgeID, temp_ip[m], temp_ip[m + 1], temp_rtt[m], null, null, startNode, destinationNode, metadataKey);

                  //event
                  LatencyToTracerouteCytoscapeService.getGraph().on('tap', 'edge[id = "' + edgeID + '"]', function (event) {
                    var element = event.cyTarget;
                    //ID: element.id()
                    //metadataKey: element.data().metadataKey

                  });

                }
              }


            }


            // Add Edge for main node
            // var edgeID = startNode + "to" + reversedResponse[j]['val'][0]['ip'];
            var edgeID = Math.random();

            if (LatencyToTracerouteCytoscapeService.getGraph().elements('edge[id = "' + edgeID + '"]').size() == 0) {

              LatencyToTracerouteCytoscapeService.add_edge(edgeID, startNode, reversedResponse[j]['val'][0]['ip'], temp_rtt[m], null, null, startNode, destinationNode, metadataKey);

              LatencyToTracerouteCytoscapeService.getGraph().on('tap', 'edge[id = "' + edgeID + '"]', function (event) {
                var element = event.cyTarget;

              });


            }

            // Break so that we grab only the latest traceroute path
            break;
          }

        }


        var nodeToIP_promises = [];
        for (var i = 0; i < nodeList.length; i++) {
          nodeToIP_promises.push(GeoIPNekudoService.getCountry(nodeList[i]));
        }

        return $q.all(nodeToIP_promises);

      }).then(function (response) {
        for (var i = 0; i < response.length; i++) {


          var node = LatencyToTracerouteCytoscapeService.getGraph().elements('[id = "' + response[i].ip + '"]');
          node.data({
            label: response[i].ip + "\n" + response[i].city + ", " + response[i].countrycode
          });

          LatencyToTracerouteCytoscapeService.getGraph().layout({
            name: 'breadthfirst',
            fit: true, // whether to fit the viewport to the graph
            directed: false, // whether the tree is directed downwards (or edges can point in any direction if false)
            padding: 30, // padding on fit
            circle: true, // put depths in concentric circles if true, put depths top down if false
            spacingFactor: 1.0, // positive spacing factor, larger => more space between nodes (N.B. n/a if causes overlap)
            boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
            avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
            roots: undefined, // the roots of the trees
            maximalAdjustments: 0, // how many times to try to position the nodes in a maximal way (i.e. no backtracking)
            animate: false, // whether to transition the node positions
            animationDuration: 500, // duration of animation in ms if enabled
            animationEasing: undefined, // easing of animation if enabled
            ready: undefined, // callback on layoutready
            stop: undefined // callback on layoutstop
          });

          if(errorInTraceroute==true){
            LatencyToTracerouteCytoscapeService.getGraph().elements('node[id = "' + sourceAndDestinationList[0].source + '"]').qtip
            ({
              content: {
                title: 'Error in Traceroute Results',
                text: 'Traceroute may be incomplete or inaccurate.',
                button: 'Close'

              },
              position: {my: 'bottom center', at: 'bottom top'},
              show: {
                ready: true,

                cyBgOnly: false


              },
              hide: {},
              style: {classes: 'qtip-bootstrap', tip: {width: 16, height: 8}}
            });
          }




        }
      }).catch(function (error) {
        $log.debug("LatencyMetadataService:setTracerouteGraph()")
        $log.debug("Server Response: " + error.status);

      })

    },


    getSummaries: function(){

      //$http

    },
    addMetadataList: function (metadata_key) {
      metadataList.push(metadata_key);
      return metadataList;
    },
    getMetadataList: function () {
      return metadataList
    },
    setMetadata: function (metadata_key) {
      metadata = metadata_key;
      return metadata;
    },
    getMetadata: function () {
      return metadata;
    },

    getGraph: function () {
      return LatencyToTracerouteCytoscapeService.getGraph();
    }

    // getMainResult: function () {
    //
    //   return $http({
    //     method: 'GET',
    //     url: host,
    //     params: {
    //       'format': 'json',
    //       'event-type': 'histogram-rtt'
    //       // 'limit': 10,
    //       // 'time-end': (Math.floor(Date.now() / 1000)),
    //       // 'time-range': timeRange
    //     },
    //     cache: true
    //   })
    // },
    //
    // getIndividualResult: function (metadataURL, timeRange) {
    //
    //   return $http({
    //     method: 'GET',
    //     url: metadataURL + "packet-trace/base",
    //     params: {
    //       'format': 'json',
    //       // 'limit': '2',
    //       // 'time-end': (Math.floor(Date.now() / 1000)),
    //       'time-range': timeRange
    //       //48 Hours = 172800
    //       // 24 hours = 86400
    //       //604800 (7days).
    //     },
    //     cache: true
    //   });
    // },
    //
    // clearCache: function () {
    //   $cacheFactory.get('$http').removeAll();
    //   $log.debug("TracerouteResultsService:clearCache() Cache Cleared");
    // },
    //
    // setMainResult_JSON: function (mainResult) {
    //   retrievedMainResult = mainResult;
    // },
    // getMainResult_JSON: function () {
    //   return retrievedMainResult;
    // }


  };


}]);


tracerouteServices.factory('TracerouteResultsService', ['$http', '$q', '$cacheFactory', '$log', 'HostService', function ($http, $q, $log, $cacheFactory, HostService) {


  // cache http://stackoverflow.com/questions/21660647/angular-js-http-cache-time
  var host = HostService.getHost();

  return {

    getMainResult: function () {

      return $http({
        method: 'GET',
        url: host,
        params: {
          'format': 'json',
          'event-type': 'packet-trace'
          // 'limit': 10,
          // 'time-end': (Math.floor(Date.now() / 1000)),
          // 'time-range': timeRange
        },
        cache: true
      })
    },

    getIndividualResult: function (metadataURL, timeRange) {

      return $http({
        method: 'GET',
        url: metadataURL + "packet-trace/base",
        params: {
          'format': 'json',
          // 'limit': '2',
          // 'time-end': (Math.floor(Date.now() / 1000)),
          'time-range': timeRange
          //48 Hours = 172800
          // 24 hours = 86400
          //604800 (7days).
        },
        cache: true
      });
    },

    clearCache: function () {
      $cacheFactory.get('$http').removeAll();
      $log.debug("TracerouteResultsService:clearCache() Cache Cleared");
    }


  };


}]);





// NOT USING ANYTHING BELOW HERE

tracerouteServices.factory('TracerouteMainResult_URL', ['$resource', function ($resource) {

  // Calls the main result page.
  // url : "http://ps2.jp.apan.net/esmond/perfsonar/archive/0a468985ca8b41029a22ae4e4645f869/"
  // metadata-key : "0a468985ca8b41029a22ae4e4645f869"
  // subject-type : "point-to-point"
  // event-types
  // source : "203.30.39.127"
  // destination : "137.189.192.25"
  // measurement-agent : "203.30.39.127"
  // tool-name : "bwctl/tracepath"
  // input-source : "203.30.39.127"
  // input-destination : "ps1.itsc.cuhk.edu.hk"
  // time-interval : "600"
  // ip-transport-protocol : "icmp"
  // ip-packet-size : "40"
  // uri : "/esmond/perfsonar/archive/0a468985ca8b41029a22ae4e4645f869/"
  // metadata-count-total : 23
  // metadata-previous-page : null
  // metadata-next-page : null


  // https://docs.angularjs.org/api/ngResource/service/$resource
  return $resource(tracerouteResultURL, {}, {

    list: {
      method: 'GET',
      params: {'format': 'json', 'event-type': 'packet-trace'},
      isArray: true
    }

  });

}]);
tracerouteServices.factory('TracerouteMainResults', ['$resource', function ($resource) {

  // Calls the main result page.
  // url : "http://ps2.jp.apan.net/esmond/perfsonar/archive/0a468985ca8b41029a22ae4e4645f869/"
  // metadata-key : "0a468985ca8b41029a22ae4e4645f869"
  // subject-type : "point-to-point"
  // event-types
  // source : "203.30.39.127"
  // destination : "137.189.192.25"
  // measurement-agent : "203.30.39.127"
  // tool-name : "bwctl/tracepath"
  // input-source : "203.30.39.127"
  // input-destination : "ps1.itsc.cuhk.edu.hk"
  // time-interval : "600"
  // ip-transport-protocol : "icmp"
  // ip-packet-size : "40"
  // uri : "/esmond/perfsonar/archive/0a468985ca8b41029a22ae4e4645f869/"
  // metadata-count-total : 23
  // metadata-previous-page : null
  // metadata-next-page : null


  // https://docs.angularjs.org/api/ngResource/service/$resource
  return $resource(tracerouteResultURL, {}, {

    list: {
      method: 'GET',
      params: {'format': 'json', 'event-type': 'packet-trace'},
      isArray: true
    }

  });

}]);


tracerouteServices.factory('TracerouteIndividualResults', ['$resource', function ($resource) {

  // Calls the individual test containing various hops.

  //URL Format
  // 'http://hpc-perfsonar.usc.edu/esmond/perfsonar/archive/123AAAAAAA/packet-trace/base'
  // substitute 123AAAA with :metadata_key, similar to parameters

  return $resource(tracerouteResultIndividualURL, {}, {
    get: {
      method: 'GET',
      params: {'format': 'json'},
      isArray: true
    }


  });

}]);

