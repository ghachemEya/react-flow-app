import React, { useState, useRef, useEffect } from "react";
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
      children: [
        {
          id: "3",
          data: { label: <div>sub Node 1</div> },
          position: { x: 0, y: 0 },
          style: {
            width: "70px",
            height: "40px",
            fontSize: "18px",
            overflow: 'visible'
          },
        },
        {
          id: "4",
          data: { label: <div>sub Node 2</div> },
          position: { x: 1000, y: 300 },
          style: {
            width: "70px",
            height: "40px",
            fontSize: "18px",
            overflow: 'visible'
          },
        },
        { id: "e3", source: "3", target: "4", animated: false },
      ],
    },
    position: { x: 100, y: 100 },
    draggable: false,
    type: "nestedNode",
  },
  { id: "e1", source: "1", target: "2", animated: false },
];
let id = 5;
const pos_X = initialElements[1].position.x;

const pos_Y = initialElements[1].position.y;
console.log({ pos_X, pos_Y });
const getId = () => `${id++}`;
const DragAndDrop = () => {
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
      data: { label: <div>sub Node {id}</div> },
      style: {
        width: "70px",
        height: "40px",
        fontSize: "18px",
        overflow: 'visible'
      },
    };

    if (
      position.x > pos_X &&
      position.y > pos_Y &&
      position.x < pos_X + 300 &&
      position.y < pos_Y + 300
    ) {
      let new_elts = elements;
      let id_prev = newNode.id - 1;

      new_elts[1].data.children.push(newNode);
      new_elts[1].data.children.push({
        id: `e${newNode.id}`,
        source: `${id_prev}`,
        target: `${newNode.id}`,
        animated: false
      });
      setElements(new_elts);
    } else {
      setElements((es) => es.concat(newNode));
    }
  };

  useEffect(() => {}, [elements]);
  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div
          className="reactflow-wrapper"
          style={{ height: "800px", width: "800px" }}
          ref={reactFlowWrapper}
        >
          <ReactFlow
            snapGrid={[30, 30]}
            elements={elements}
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
          <Background />
          </ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
};

export default DragAndDrop;
