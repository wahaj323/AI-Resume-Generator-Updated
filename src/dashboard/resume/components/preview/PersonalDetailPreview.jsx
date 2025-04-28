import React from 'react'

const PersonalDetailPreview = ({resumeInfo}) => {
  console.log(resumeInfo);
  
  return (
    <div>
      <h2 className='font-bold text-center text-xl' style={{color: resumeInfo?.themeColor}}>{resumeInfo?.firstName} {resumeInfo?.lastName}</h2>
      <h2 className='text-center text-sm font-medium'>{resumeInfo?.jobTitle}</h2>
      <h2 className='text-center font-normal text-xs'>{resumeInfo?.address}</h2>

      <div className='flex justify-between'>
        <h2 className='font-normal text-xs ' style={{color: resumeInfo?.themeColor}}>{resumeInfo?.phone}</h2>
        <h2 className='font-normal text-xs ' style={{color: resumeInfo?.themeColor}}>{resumeInfo?.email}</h2>
      </div>

      <hr className='border-[2px] my-2' style={{borderColor: resumeInfo?.themeColor}} />
    </div>
  )
}

export default PersonalDetailPreview