import React from 'react'

const PersonalDetailPreview = ({ resumeInfo }) => {
  return (
    <div className="mb-8">
      {/* Name */}
      <h1 
        className="text-3xl md:text-4xl font-bold text-center mb-1 uppercase tracking-wide"
        style={{ color: resumeInfo?.themeColor || '#4f46e5' }}
      >
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h1>
      
      {/* Job Title */}
      {resumeInfo?.jobTitle && (
        <h2 className="text-lg md:text-xl text-center font-medium text-gray-700 mb-2">
          {resumeInfo.jobTitle}
        </h2>
      )}
      
      {/* Address */}
      {resumeInfo?.address && (
        <p className="text-sm text-center text-gray-600 mb-4">
          {resumeInfo.address}
        </p>
      )}
      
      {/* Contact Info */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 mb-4">
        {resumeInfo?.phone && (
          <div className="flex items-center justify-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span 
              className="text-sm font-medium"
              style={{ color: resumeInfo?.themeColor }}
            >
              {resumeInfo.phone}
            </span>
          </div>
        )}
        
        {resumeInfo?.email && (
          <div className="flex items-center justify-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span 
              className="text-sm font-medium"
              style={{ color: resumeInfo?.themeColor }}
            >
              {resumeInfo.email}
            </span>
          </div>
        )}
      </div>
      
      {/* Divider */}
      <hr 
        className="border-t-2 my-2" 
        style={{ 
          borderColor: resumeInfo?.themeColor || '#4f46e5',
          opacity: 0.7
        }} 
      />
    </div>
  )
}

export default PersonalDetailPreview