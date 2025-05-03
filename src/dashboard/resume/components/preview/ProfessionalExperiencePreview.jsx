import React from 'react'

const ProfessionalExperiencePreview = ({ resumeInfo }) => {
  return (
    <div className="mb-10">
      {/* Section Header */}
      <div className="mb-6">
        <h2 
          className="text-xl font-bold text-center uppercase tracking-wider mb-2"
          style={{ color: resumeInfo?.themeColor || '#4f46e5' }}
        >
          Professional Experience
        </h2>
        <hr 
          className="h-1 bg-opacity-50 my-2" 
          style={{ 
            backgroundColor: resumeInfo?.themeColor,
            border: 'none'
          }} 
        />
      </div>

      {/* Experience Items */}
      <div className="space-y-8">
        {resumeInfo?.experience?.map((exp, idx) => (
          <div key={idx} className="pl-4 border-l-4"
            style={{
              borderColor: resumeInfo?.themeColor
            }}>
            
            {/* Job Title */}
            <h3 className="text-lg font-semibold mb-1">{exp?.title}</h3>
            
            {/* Company and Location */}
            <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
              <span className="text-md font-medium text-gray-700">
                {exp.companyName}{exp.city && `, ${exp.city}`}{exp.state && `, ${exp.state}`}
              </span>
              <span className="text-sm text-gray-600">
                {exp.startDate} — {exp.currentlyWorking ? 'Present' : exp.endDate}
              </span>
            </div>

            {/* Work Summary */}
            {exp.workSummary && (
              <div 
                className="prose prose-sm max-w-none text-gray-700 mt-2"
                dangerouslySetInnerHTML={{ __html: exp.workSummary }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProfessionalExperiencePreview