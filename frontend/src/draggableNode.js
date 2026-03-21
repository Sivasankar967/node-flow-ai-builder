// draggableNode.js

export const DraggableNode = ({ type, label, color = '#7c3aed', icon = '⬡' }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="draggable-node-item"
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
      title={`Drag to add ${label} node`}
    >
      <div className="draggable-node-dot" style={{ background: color }} />
      <span className="draggable-node-label">{label}</span>
    </div>
  );
};