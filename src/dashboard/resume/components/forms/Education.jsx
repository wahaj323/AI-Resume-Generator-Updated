import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle, Plus, Minus, Save } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { toast } from 'sonner'

function Education() {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setresumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [educationalList, setEducationalList] = useState([
    {
      universityName: '',
      degree: '',
      major: '',
      startDate: '',
      endDate: '',
      description: ''
    }
  ]);

  // Initialize only once when component mounts
  useEffect(() => {
    if (resumeInfo?.education && resumeInfo.education.length > 0) {
      setEducationalList(resumeInfo.education);
    }
  }, []); // Empty dependency array to run only once

  const handleChange = (event, index) => {
    const newEntries = [...educationalList];
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setEducationalList(newEntries);
  };

  const AddNewEducation = () => {
    setEducationalList([...educationalList,
      {
        universityName: '',
        degree: '',
        major: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    ]);
  };

  const RemoveEducation = () => {
    if (educationalList.length > 1) {
      setEducationalList(educationalList.slice(0, -1));
    }
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        education: educationalList.map(({ id, ...rest }) => rest)
      }
    };

    GlobalApi.UpdateResumeDetail(params.resumeId, data)
      .then(resp => {
        setLoading(false);
        toast.success('Education details updated successfully!');
      })
      .catch(error => {
        setLoading(false);
        toast.error('Error saving details. Please try again.');
      });
  };

  // Update resumeInfo context only when educationalList changes
  useEffect(() => {
    setresumeInfo(prev => ({
      ...prev,
      education: educationalList
    }));
  }, [educationalList]);

  return (
    <div className='p-6 shadow-lg rounded-lg border-t-4 border-t-primary bg-white'>
      <div className='mb-6'>
        <h2 className='text-2xl font-bold text-gray-800 mb-1'>Education</h2>
        <p className='text-gray-600'>Add your educational background</p>
      </div>

      <div className='space-y-4'>
        {educationalList.map((item, index) => (
          <div key={index} className='border border-gray-200 p-4 rounded-lg bg-gray-50'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-1'>
                <label className='block text-sm font-medium text-gray-700'>University Name*</label>
                <Input 
                  name="universityName" 
                  onChange={(e) => handleChange(e, index)}
                  value={item.universityName || ''}
                  placeholder="Stanford University"
                />
              </div>
              
              <div className='space-y-1'>
                <label className='block text-sm font-medium text-gray-700'>Degree*</label>
                <Input 
                  name="degree" 
                  onChange={(e) => handleChange(e, index)}
                  value={item.degree || ''}
                  placeholder="Bachelor of Science"
                />
              </div>
              
              <div className='space-y-1'>
                <label className='block text-sm font-medium text-gray-700'>Major/Field</label>
                <Input 
                  name="major" 
                  onChange={(e) => handleChange(e, index)}
                  value={item.major || ''}
                  placeholder="Computer Science"
                />
              </div>
              
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-1'>
                  <label className='block text-sm font-medium text-gray-700'>Start Date*</label>
                  <Input 
                    type="month" 
                    name="startDate" 
                    onChange={(e) => handleChange(e, index)}
                    value={item.startDate || ''}
                  />
                </div>
                
                <div className='space-y-1'>
                  <label className='block text-sm font-medium text-gray-700'>End Date*</label>
                  <Input 
                    type="month" 
                    name="endDate" 
                    onChange={(e) => handleChange(e, index)}
                    value={item.endDate || ''}
                    disabled={item.currentlyWorking}
                  />
                </div>
              </div>
              
              <div className='md:col-span-2 space-y-1'>
                <label className='block text-sm font-medium text-gray-700'>Description</label>
                <Textarea 
                  name="description" 
                  onChange={(e) => handleChange(e, index)}
                  value={item.description || ''}
                  placeholder="Relevant coursework, honors, or achievements"
                  rows={3}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='flex flex-col sm:flex-row justify-between items-center mt-6 gap-4'>
        <div className='flex gap-2'>
          <Button 
            variant="outline" 
            onClick={AddNewEducation} 
            className="gap-1"
          >
            <Plus className='h-4 w-4' /> Add Education
          </Button>
          {educationalList.length > 1 && (
            <Button 
              variant="outline" 
              onClick={RemoveEducation} 
              className="gap-1"
            >
              <Minus className='h-4 w-4' /> Remove
            </Button>
          )}
        </div>
        
        <Button 
          onClick={onSave}
          disabled={loading}
          className="gap-2 w-full sm:w-auto"
        >
          {loading ? (
            <LoaderCircle className='h-4 w-4 animate-spin' />
          ) : (
            <Save className='h-4 w-4' />
          )}
          Save Changes
        </Button>
      </div>
    </div>
  );
}

export default Education;