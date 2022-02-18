import React, { useState, useRef, useEffect, useCallback, Fragment } from "react";

import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  MiniMap,
  Background,
} from "react-flow-renderer";
import "../App.css";
import { NestedNode } from "./NestedNode";
import Sidebar from "./sidebar";

const initialElements = [
  { id: "1", data: { label: "Node 1" }, position: { x: 250, y: 5 } },
  // you can also pass a React component as a label
  {
    id: "2",
    data: {
      label: <div>Hello world</div>,
      children: [{}],
    },
    position: { x: 100, y: 100 },
    draggable: false,
    type: "nestedNode",
  },
  { id: "e1", source: "1", target: "2", animated: false },
];

let id = 3;
const pos_X = initialElements[1].position.x;
const pos_Y = initialElements[1].position.y;

const getId = () => `${id++}`;

const DragAndDrop = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState(initialElements);
  const onConnect = (params) => setElements((els) => addEdge(params, els));
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));

  const onLoad = useCallback(
    (_reactFlowInstance) => {
      setReactFlowInstance(_reactFlowInstance);
    },
    [elements]
  );

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
      data: { label: <div>sub Node {id}</div> },
    };

    if (
      position.x > pos_X &&
      position.y > pos_Y &&
      position.x < pos_X + 500 &&
      position.y < pos_Y + 500
    ) {
      let new_elts = elements;
      let id_prev = newNode.id - 1;
      new_elts[1].data.children.push(newNode);
      new_elts[1].data.children.push({
        id: `e${newNode.id}`,
        source: `${id_prev}`,
        target: `${newNode.id}`,
        type: "output",
        animated: false,
      });
      setElements(new_elts);
      reactFlowInstance.zoomOut();
      reactFlowInstance.zoomOut();
      reactFlowInstance.zoomOut();
      reactFlowInstance.zoomOut();
      reactFlowInstance.zoomIn();
      reactFlowInstance.zoomIn();
      reactFlowInstance.zoomIn();
      reactFlowInstance.zoomIn();
    } else {
      setElements(() => elements.concat(newNode));
    }
  };

  return (
    <div className="dndflow" ref={reactFlowWrapper}>
      <Fragment>
        <div
          className="reactflow-wrapper"
          style={{ height: "100vh", width: "100%" }}
        >
          <ReactFlow
            elements={elements}
            connectionLineStyle={{stroke: "#ddd", strokeWidth: 2}}
            connectionLineType = "bezier"
            
            snapGrid={[16,16]}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            onLoad={onLoad}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={{
              nestedNode: NestedNode,
            }}
          >
            <MiniMap />
            <Controls />
            <Background color="#aaa" gap={20} />
          </ReactFlow>
        </div>
        <Sidebar />
      </Fragment>
    </div>
  );
};

export default DragAndDrop;
