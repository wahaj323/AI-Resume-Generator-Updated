import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormSection from '../components/FormSection';
import ResumePreview from '../components/ResumePreview';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from '../../../../service/GlobalApi';
import { toast } from 'sonner';

function EditResume() {
  const { resumeId } = useParams();
  const [resumeInfo, setresumeInfo] = useState(null); // Default to null instead of undefined
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    GetResumeInfo();
  }, [resumeId]);

  const GetResumeInfo = () => {
    setLoading(true); // Show loading state
    GlobalApi.GetResumeById(resumeId)
      .then((resp) => {
        console.log(resp.data.data);
        setresumeInfo(resp.data.data);
        setLoading(false); // Hide loading state
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load resume information. Please try again later.');
        setLoading(false); // Hide loading state
      });
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state until data is fetched
  }

  if (error) {
    return <div>{error}</div>; // Show error message if something goes wrong
  }

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setresumeInfo }}>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
        <FormSection />
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default EditResume;
