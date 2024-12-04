import Diagram from 'diagram-js';

const WorkflowEditor = () => {
  // Initialize diagram-js
  const diagramContainerRef = React.useRef(null);
  const diagramRef = React.useRef(null);

  // Run once when the component mounts
  React.useEffect(() => {
    // Create a diagram-js instance
    diagramRef.current = new Diagram({
      container: diagramContainerRef.current,
    });

    // Add basic event handling to the diagram instance
    const eventBus = diagramRef.current.get('eventBus');

    // Listen for drag-over and drop events
    diagramContainerRef.current.addEventListener('dragover', (event) => {
      event.preventDefault(); // Required for drop
      event.dataTransfer.dropEffect = 'move';
    });

    diagramContainerRef.current.addEventListener('drop', (event) => {
      event.preventDefault();

      // Retrieve node type from drag event
      const nodeType = event.dataTransfer.getData('application/diagram-node');
      if (!nodeType) return;

      // Calculate position relative to the diagram container
      const diagramBounds = diagramContainerRef.current.getBoundingClientRect();
      const position = {
        x: event.clientX - diagramBounds.left,
        y: event.clientY - diagramBounds.top,
      };

      // Add a shape to the canvas
      const elementFactory = diagramRef.current.get('elementFactory');
      const modeling = diagramRef.current.get('modeling');

      const shape = elementFactory.createShape({
        type: nodeType,
        x: position.x,
        y: position.y,
        width: 100,
        height: 50,
      });

      // Add the shape to the canvas
      modeling.createShape(shape, position);
    });

    return () => {
      // Cleanup diagram instance on unmount
      diagramRef.current.destroy();
    };
  }, []);

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/diagram-node', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar with draggable nodes */}
      <div
        style={{
          width: '200px',
          padding: '10px',
          backgroundColor: '#f4f4f4',
          borderRight: '1px solid #ddd',
        }}
      >
        <div
          draggable
          onDragStart={(event) => onDragStart(event, 'custom:node')}
          style={{
            marginBottom: '30px',
            padding: '30px',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'grab',
          }}
        >
          Custom Node
        </div>
      </div>

      {/* Diagram.js container */}
      <div
        ref={diagramContainerRef}
        
        style={{ flex: 1, position: 'relative', background: '#e5e5e5' }}
      />
    </div>
  );
};

export default WorkflowEditor;
