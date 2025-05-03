import Header from '@/components/custom/Header';
import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import ResumePreview from '@/dashboard/resume/components/ResumePreview';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GlobalApi from '../../../service/GlobalApi';

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { resumeId } = useParams();

  useEffect(() => {
    getResumeInfo();
  }, []);

  const getResumeInfo = () => {
    setIsLoading(true);
    GlobalApi.GetResumeById(resumeId).then(resp => {
      console.log(resp.data.data);
      setResumeInfo(resp.data.data);
      setIsLoading(false);
    }).catch(err => {
      console.error("Error fetching resume:", err);
      setIsLoading(false);
    });
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50">
        {/* Header section that won't be printed */}
        <div id="no-print">
          <Header />
          
          <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white rounded-lg shadow-sm p-8 mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Your Resume is Ready!
              </h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Your professional resume has been created and is ready for download. 
                Review it below and click the button when you're ready.
              </p>
              <Button 
                onClick={handleDownload}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-md shadow-sm transition-all duration-200 transform hover:scale-105"
              >
                Download Resume
              </Button>
            </div>
          </div>
        </div>

        {/* Resume preview section */}
        <div className="max-w-4xl mx-auto pb-16 px-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div 
              id="print-area" 
              className="bg-white rounded-lg overflow-hidden shadow-md"
              style={{ 
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
              }}
            >
              <ResumePreview />
            </div>
          )}
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;