import React from 'react'

const ProfessionalExperiencePreview = ({resumeInfo}) => {
  return (
    <div className='my-6 '>
        <h2 className='text-center font-bold text-sm mb-2 ' style={{color: resumeInfo?.themeColor}}>Professional Experience</h2>
        <hr className='border-[1px] my-2' style={{borderColor: resumeInfo?.themeColor}} />
        {resumeInfo?.experience.map((exp, idx) => {
            return <div className='my-5' key={idx}>
                <h2 className='text-sm font-bold'>{exp?.title}</h2>
                <h2 className='text-xs flex justify-between'>{exp.companyName}, {exp.city}, {exp.state} <span>{exp.startDate} - {exp.currentlyWorking? "present": exp.endDate}</span></h2>
                <p className='text-xs my-2'>{exp.workSummary}</p>
            </div>
        })}
    </div>
  )
}

export default ProfessionalExperiencePreview