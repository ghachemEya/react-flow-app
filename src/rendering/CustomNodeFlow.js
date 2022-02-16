import React from 'react';
import ReactFlow, { Handle, Position } from 'react-flow-renderer';

var el = <>
    <label>Name : </label>
    <input type="text" placeholder='votre nom'/>
</>

const elements = [
  {
    id: '2',
    type: 'special',
    position: { x: 100, y: 100 },
    data: { text : "a custom node "},
  },
  {
    id: '5',
    type: 'special',
    position: { x: 200, y: 150 },
    data: { text : "a custom node "},
  },
];

const customNodeStyles = {
  background: '#9CA8B3',
  color: '#FFF',
  padding: 10,
};

const CustomNodeComponent = ({ data }) => {
  return (
    <div style={customNodeStyles}>
      <Handle type="target" position={Position.Left} style={{ borderRadius: 0 }} />
      <div>{data.text}</div>
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={{ top: '30%', borderRadius: 0 }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="b"
        style={{ top: '70%', borderRadius: 0 }}
      />
    </div>
  );
};

const nodeTypes = {
  special: CustomNodeComponent,
};

const CustomNodeFlow = () => {
  return (
    <div style={{ height: 300 }}>
      <ReactFlow elements={elements} nodeTypes={nodeTypes} />
    </div>
  );
};

export default CustomNodeFlow;