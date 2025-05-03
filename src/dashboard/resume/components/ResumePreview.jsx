import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext } from 'react'
import PersonalDetailPreview from './preview/PersonalDetailPreview'
import SummaryPreview from './preview/SummaryPreview'
import ProfessionalExperiencePreview from './preview/ProfessionalExperiencePreview'
import EducationalPreview from './preview/EducationalPreview'
import SkillsPreview from './preview/SkillsPreview'

const ResumePreview = () => {
    const { resumeInfo } = useContext(ResumeInfoContext);
    
    return (
        <div className='bg-white shadow-lg mx-auto w-full max-w-4xl min-h-[1123px] p-8 md:p-12 border-t-[20px] print:p-0 print:shadow-none print:border-t-0'
            style={{ borderColor: resumeInfo?.themeColor || '#4f46e5' }} // Default indigo-600 if no color
        >
            {/* Container for better spacing control */}
            <div className='space-y-8 print:space-y-6'>
                {/* Personal Details */}
                    <PersonalDetailPreview resumeInfo={resumeInfo} />
                
                
                {/* Summary - Only show if summary exists */}
                    <div className='pt-4 border-t border-gray-100'>
                        <SummaryPreview resumeInfo={resumeInfo} />
                    </div>
                
                {/* Professional Experience - Only show if experiences exist */}
                {resumeInfo?.experience?.length > 0 && (
                    <div className='pt-4 border-t border-gray-100'>
                        <ProfessionalExperiencePreview resumeInfo={resumeInfo} />
                    </div>
                )}
                
                {/* Education - Only show if education exists */}
                {resumeInfo?.education?.length > 0 && (
                    <div className='pt-4 border-t border-gray-100'>
                        <EducationalPreview resumeInfo={resumeInfo} />
                    </div>
                )}
                
                {/* Skills - Only show if skills exist */}
                {resumeInfo?.skills?.length > 0 && (
                    <div className='pt-4 border-t border-gray-100'>
                        <SkillsPreview resumeInfo={resumeInfo} />
                    </div>
                )}
            </div>
            
            {/* Print-specific styles */}
            <style jsx global>{`
                @media print {
                    body {
                        margin: 0;
                        padding: 0;
                        background: white;
                    }
                    @page {
                        size: A4;
                        margin: 0;
                    }
                }
            `}</style>
        </div>
    )
}

export default ResumePreview