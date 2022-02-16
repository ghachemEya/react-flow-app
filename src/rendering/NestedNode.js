import React, { FC } from "react";
import ReactFlow, {
  Handle,
  Position,
  NodeProps,
  ReactFlowProvider,
  useStoreState
} from "react-flow-renderer";

export const NestedNode: React.FC<NodeProps> = ({ data }) => {
  const { children, label } = data;
  const [, , z] = useStoreState((state) => state.transform);
  return (
    <div style={{ border: "1px solid red"}}>
      <Handle type="target" position={Position.Top} />
      <div style={{ position: "relative" }}>
        <div
          style={{
            width: "300px",
            height: "300px",
            fontSize: "1px",
            pointerEvents: "none",
            overflow: 'visible'
          }}
        >
          {z >= 1 && (
            <ReactFlowProvider>
              <ReactFlow
                onlyRenderVisibleElements={false}
                preventScrolling={false}
                defaultZoom={0.5}
                defaultPosition={[0, 0]}
                zoomOnScroll={true}
                translateExtent={[
                  [0, 0],
                  [+100, +100]
                ]}
                nodeExtent={[
                  [0, 0],
                  [+100, +100]
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
