import React from 'react'

const SummaryPreview = ({ resumeInfo }) => {
  return (
    <div className="mb-8">
      {/* Section Header */}
      <div className="mb-4">
        <h2 
          className="text-xl font-bold uppercase tracking-wider mb-2"
          style={{ color: resumeInfo?.themeColor || '#4f46e5' }}
        >
          Professional Summary
        </h2>
        <hr 
          className="h-1 bg-opacity-50" 
          style={{ 
            backgroundColor: resumeInfo?.themeColor,
            border: 'none'
          }} 
        />
      </div>

      {/* Summary Content */}
      <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
        {resumeInfo?.summary ? (
          <p className="whitespace-pre-line">{resumeInfo.summary}</p>
        ) : (
          <p className="text-gray-400 italic">No summary provided</p>
        )}
      </div>
    </div>
  )
}

export default SummaryPreview