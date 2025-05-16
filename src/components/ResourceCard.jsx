const ResourceCard = ({ title, description, icon }) => {
  return (
    <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      <div className="text-2xl">{icon}</div>
      <div>
        <h3 className="font-semibold text-primary mb-1">{title}</h3>
        <p className="text-xs text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

export default ResourceCard
