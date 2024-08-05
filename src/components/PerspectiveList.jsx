const PerspectiveList = ({ perspectives }) => {
  return (
    <div className="mb-6">
      {perspectives.map((perspective) => (
        <div key={perspective.id} className="mb-4 p-4 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">{perspective.name}</h3>
          <p>{perspective.description}</p>
        </div>
      ))}
    </div>
  );
};

export default PerspectiveList;
