const ResourceCard = ({ title, description, icon }) => {
    return (
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow transition">
        <div className="flex items-start gap-3">
          <div className="text-2xl">{icon}</div>
          <div>
            <h3 className="font-bold text-primary">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
            <button className="mt-2 text-sm text-primary hover:underline">Learn more</button>
          </div>
        </div>
      </div>
    )
  }
  
  export default ResourceCard
  