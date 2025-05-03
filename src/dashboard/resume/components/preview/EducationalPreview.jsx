import React from 'react'

function EducationalPreview({ resumeInfo }) {
  return (
    <div className='mb-8'>
      {/* Section Header */}
      <div className='mb-4'>
        <h2 className='text-xl font-bold text-center uppercase tracking-wider mb-2'
          style={{
            color: resumeInfo?.themeColor || '#4f46e5' // Default indigo-600
          }}>
          Education
        </h2>
        <hr className='h-1 bg-opacity-50' 
          style={{
            backgroundColor: resumeInfo?.themeColor,
            border: 'none'
          }} />
      </div>

      {/* Education Items */}
      <div className='space-y-6'>
        {resumeInfo?.education?.map((education, index) => (
          <div key={index} className='pl-4 border-l-4' 
            style={{
              borderColor: resumeInfo?.themeColor
            }}>
            
            {/* University and Duration */}
            <div className='flex flex-col sm:flex-row sm:justify-between mb-1'>
              <h3 className='text-lg font-semibold'>
                {education?.universityName}
              </h3>
              <span className='text-sm text-gray-600'>
                {education?.startDate} — {education?.endDate || 'Present'}
              </span>
            </div>

            {/* Degree and Major */}
            <h4 className='text-md font-medium mb-2'>
              {education?.degree} {education?.major && `in ${education?.major}`}
            </h4>

            {/* Description */}
            {education?.description && (
              <p className='text-sm text-gray-700 leading-relaxed'>
                {education?.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default EducationalPreview