import React, { FC } from "react";
import ReactFlow, {
  Handle,
  Position,
  NodeProps,
  ReactFlowProvider,
  useStoreState,
} from "react-flow-renderer";

export const NestedNode: React.FC<NodeProps> = ({ data }) => {
  const { children, label } = data;
  const [, , z] = useStoreState((state) => state.transform);

  return (
    <div style={{ border: "1px solid blue", overflow: "hidden", zIndex: "1" }}>
      <Handle type="target" position={Position.Top} />
      <div style={{ position: "relative" }}>
        <div 
          style={{
            width: "500px",
            height: "500px",
            fontSize: "10px",
          }}
        >
          {z >= 1 && (
           
             
             <ReactFlowProvider>
              <ReactFlow
                defaultZoom={0.5}
                defaultPosition={[0, 0]}
                zoomOnScroll={true}
                nodeExtent={[
                  [0, 0],
                  [+100, +200],
                ]}
                elements={children}
              />
            </ReactFlowProvider>
             
    
          )}
          {z < 1 && label}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};
