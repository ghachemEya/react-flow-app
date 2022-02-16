import "../App.css";
import { FC } from "react";
import { NestedNode } from "./NestedNode";
import Sidebar from "./sidebar";

import React, { useState, useRef } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
} from "react-flow-renderer";
import "../App.css";

const Flow = () => {
  const initialElements = [
    { id: "1", data: { label: "Node 1" }, position: { x: 250, y: 5 } },
    // you can also pass a React component as a label
    {
      id: "2",
      data: {
        label: <div>Node 2</div>,
        children: [
          {
            id: "3",
            data: { label: <div>sub Node 1</div> },
            position: { x: 0, y: 0 },
            style: {
              width: "50px",
              height: "35px",
              fontSize: "18px",
            },
          },
          {
            id: "4",
            data: { label: <div>sub Node 2</div> },
            position: { x: 1000, y: 300 },
            style: {
              width: "50px",
              height: "35px",
              fontSize: "18px",
            },
          },
          { id: "e3", source: "3", target: "4", animated: true },        ],
      },
      position: { x: 100, y: 100 },
      draggable: false,
      type: "nestedNode",
    },
    { id: "e1", source: "1", target: "2", animated: true },
  ];

  let id = 5 ;
  const getId = () => `dndnode_${id++}`;
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState(initialElements);
  const onConnect = (params) => setElements((els) => addEdge(params, els));
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onLoad = (_reactFlowInstance) =>
    setReactFlowInstance(_reactFlowInstance);
  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";

    
  };
  const onDrop = (event) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData("application/reactflow");
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    
    const newNode = {
      id: getId(),
      type,
      position,
      data: { label: `${type} node` },
    };
   
    // if(id == 2) {
    //     const ele = initialElements.at(2)
    //     const newNodee = {
    //         id: ele.data.children.lastItem.id ++,
    //         type,
    //         position,
    //         data :  { label: `${type} node` },
    //     }
    //     console.log(newNodee)
    //     ele.draggable = true
    //     setElements((es) => es.data.children.concat(newNodee))
    //     console.log(ele)
    // }
    
    setElements((es) => es.concat(newNode));
  };

  return (
    <>
      <div className="App" style={{ width: "1000px", height: "1000px" }}>
        <div className="dndflow">
          <ReactFlowProvider>
            <div
              className="reactflow-wrapper"
              style={{ height: "500px", width: "500px" }}
              ref={reactFlowWrapper}
            >
              <ReactFlow
                elements={elements}
                onConnect={onConnect}
                onElementsRemove={onElementsRemove}
                onLoad={onLoad}
                onDrop={onDrop}
                onDragOver={onDragOver}
                nodeTypes={{
                  nestedNode: NestedNode,
                }}
                defaultPosition={[100, 100]}
                maxZoom={20}
              >
                <Controls />
              </ReactFlow>
            </div>
            <Sidebar />
          </ReactFlowProvider>
        </div>
      </div>
    </>
  );
};

export default Flow;
