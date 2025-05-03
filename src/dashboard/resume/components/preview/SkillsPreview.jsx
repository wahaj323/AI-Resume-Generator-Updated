import React from 'react'

function SkillsPreview({ resumeInfo }) {
  return (
    <div className="mb-10">
      {/* Section Header */}
      <div className="mb-6">
        <h2 
          className="text-xl font-bold text-center uppercase tracking-wider mb-2"
          style={{ color: resumeInfo?.themeColor || '#4f46e5' }}
        >
          Skills
        </h2>
        <hr 
          className="h-1 bg-opacity-50 my-2" 
          style={{ 
            backgroundColor: resumeInfo?.themeColor,
            border: 'none'
          }} 
        />
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {resumeInfo?.skills?.map((skill, index) => (
          <div key={index} className="space-y-1">
            {/* Skill Name and Percentage */}
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-800">
                {skill.name}
              </span>
              <span 
                className="text-xs font-medium"
                style={{ color: resumeInfo?.themeColor }}
              >
                {skill.rating}%
              </span>
            </div>
            
            {/* Progress Bar */}
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{
                  backgroundColor: resumeInfo?.themeColor,
                  width: `${skill.rating}%`
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SkillsPreview