const NodeConfigPanel = ({ selectedNode, updateNode }) => {
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      updateNode({ ...selectedNode, data: { ...selectedNode.data, [name]: value } });
    };
  
    return (
      <div className="node-config-panel">
        {selectedNode ? (
          <form>
            <label>
              Learning Rate:
              <input
                type="number"
                name="learningRate"
                value={selectedNode.data.learningRate || ''}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Activation:
              <select
                name="activation"
                value={selectedNode.data.activation || ''}
                onChange={handleInputChange}
              >
                <option value="relu">ReLU</option>
                <option value="sigmoid">Sigmoid</option>
              </select>
            </label>
          </form>
        ) : (
          <p>Select a node to configure.</p>
        )}
      </div>
    );
  };
  
  export default NodeConfigPanel;