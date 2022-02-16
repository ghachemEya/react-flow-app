import React, { useState, useRef } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls
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
let id = 0;
const pos_X = initialElements[1].position.x;
const pos_Y = initialElements[1].position.y;
const getId = () => `dndnode_${id++}`;
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
        y: event.clientY - reactFlowBounds.top
      });


      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: <div>sub Node 1</div> },
      };

      // if((position.x < 0 || position.x > pos_X) &&(position.y < 0 || position.y > pos_Y )){
      //   setElements((es) => es.concat(newNode));
      // }else {
      //   const new_elt = elements[1].data.children.concat(newNode)
      //   setElements(new_elt);
        
      // }
      // console.log(elements)


      if(newNode.id.endsWith(`${2}`,newNode.id.length()-1)  ){
        setElements((es) => es.concat(newNode));
      }else{
        const new_elt = elements[1].data.children.concat(newNode)
        setElements(new_elt);
      }
      
    };
    return (
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
            >
              <Controls />
            </ReactFlow>
          </div>
          <Sidebar />
        </ReactFlowProvider>
      </div>
    );
}
 
export default DragAndDrop;