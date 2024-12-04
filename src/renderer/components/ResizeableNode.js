import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Rnd } from 'react-rnd'; // Resizable and Draggable

const ResizableNode = ({ data }) => {
  return (
    <Rnd
      default={{
        x: 0,
        y: 0,
        width: 150,
        height: 50,
      }}
      minWidth={50}
      minHeight={30}
      bounds="parent"
    >
      <div
        style={{
          border: '1px solid #ddd',
          borderRadius: '5px',
          backgroundColor: '#fff',
          padding: '5px',
          textAlign: 'center',
          height: '100%',
        }}
      >
        {data.label}
        <Handle type="source" position={Position.Bottom} />
        <Handle type="target" position={Position.Top} />
      </div>
    </Rnd>
  );
};

export default memo(ResizableNode);
