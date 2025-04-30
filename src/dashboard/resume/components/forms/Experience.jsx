import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useContext, useEffect, useState } from 'react';
import RichTextEditor from '../RichTextEditor';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';

const defaultExperience = {
  title: '',
  companyName: '',
  city: '',
  state: '',
  startDate: '',
  endDate: '2025-04-01',
  workSummary: '',
};

function Experience() {
  const [experienceList, setExperienceList] = useState([]);
  const { resumeInfo, setresumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resumeInfo?.experience?.length > 0) {
      setExperienceList(resumeInfo.experience);
    }
  }, []);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedList = [...experienceList];
    updatedList[index][name] = value;
    setExperienceList(updatedList);
  };

  const handleRichTextEditor = (e, name, index) => {
    const updatedList = [...experienceList];
    updatedList[index][name] = e.target.value;
    setExperienceList(updatedList);
  };

  const addExperience = () => {
    setExperienceList([...experienceList, { ...defaultExperience }]);
  };

  const removeExperience = () => {
    if (experienceList.length > 1) {
      setExperienceList(experienceList.slice(0, -1));
    }
  };

  useEffect(() => {
    setresumeInfo({ ...resumeInfo, experience: experienceList });
  }, [experienceList]);

  const isValidDate = (date) => {
    return /^\d{4}-\d{2}-\d{2}$/.test(date); // matches yyyy-MM-dd
  };

  const onSave = () => {
    const sanitizedData = experienceList.map((item) => ({
      __component: 'resume.experience', // Ensure this matches your Strapi model
      title: item.title,
      companyName: item.companyName,
      city: item.city,
      state: item.state,
      startDate: isValidDate(item.startDate) ? item.startDate : null,
      endDate: isValidDate(item.endDate) ? item.endDate : null,
      workSummary: item.workSummary,
    }));

    const payload = { data: { experience: sanitizedData } };

    setLoading(true);
    GlobalApi.UpdateResumeDetail(params?.resumeId, payload)
      .then(() => {
        toast('Details updated!');
        setLoading(false);
      })
      .catch((error) => {
        console.error(error.response?.data);
        toast.error('Failed to update. Check form data.');
        setLoading(false);
      });
  };

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
      <h2 className='font-bold text-lg'>Professional Experience</h2>
      <p>Add your previous job experience</p>

      {experienceList.map((item, index) => (
        <div key={index} className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
          <InputField label="Position Title" name="title" value={item.title} onChange={(e) => handleChange(index, e)} />
          <InputField label="Company Name" name="companyName" value={item.companyName} onChange={(e) => handleChange(index, e)} />
          <InputField label="City" name="city" value={item.city} onChange={(e) => handleChange(index, e)} />
          <InputField label="State" name="state" value={item.state} onChange={(e) => handleChange(index, e)} />
          <InputField label="Start Date" type="date" name="startDate" value={item.startDate} onChange={(e) => handleChange(index, e)} />
          <InputField label="End Date" type="date" name="endDate" value={item.endDate} onChange={(e) => handleChange(index, e)} />

          <div className='col-span-2'>
            <label className='text-xs'>Work Summary</label>
            <RichTextEditor
              index={index}
              defaultValue={item?.workSummary}
              onRichTextEditorChange={(e) => handleRichTextEditor(e, 'workSummary', index)}
            />
          </div>
        </div>
      ))}

      <div className='flex justify-between mt-4'>
        <div className='flex gap-2'>
          <Button variant='outline' onClick={addExperience} className='text-primary'>
            + Add More Experience
          </Button>
          <Button variant='outline' onClick={removeExperience} className='text-primary'>
            - Remove
          </Button>
        </div>
        <Button disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
        </Button>
      </div>
    </div>
  );
}

const InputField = ({ label, ...props }) => (
  <div>
    <label className='text-xs'>{label}</label>
    <Input {...props} />
  </div>
);

export default Experience;
