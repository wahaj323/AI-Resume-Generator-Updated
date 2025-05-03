import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import { useUser } from '@clerk/clerk-react'
import GlobalApi from '../../service/GlobalApi';
import ResumeCardItem from './components/ResumeCardItem';
import { Skeleton } from '../components/ui/skeleton';
import { Clock } from 'lucide-react'; // Import clock icon from Lucide

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      GetResumesList();
    }
  }, [user]);
  
  const GetResumesList = () => {
    setLoading(true);
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
      .then(resp => {
        setResumeList(resp.data.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  // Sort resumes by updatedAt (most recent first)
  const recentResumes = [...resumeList]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 3); // Get top 3 most recent

  return (
    <div className='p-5 sm:p-8 md:p-10 lg:p-12 max-w-7xl mx-auto'>
      <div className='mb-8'>
        <h2 className='font-bold text-2xl sm:text-3xl md:text-4xl text-primary mb-2'>
          My Resumes
        </h2>
        <p className='text-muted-foreground text-sm sm:text-base'>
          Create and manage your resumes for your next career move
        </p>
      </div>

      {/* Recent Resumes Section */}
      {!loading && resumeList.length > 0 && (
        <div className='mb-10'>
          <div className='flex items-center gap-2 mb-4'>
            <Clock className='w-5 h-5 text-primary' />
            <h3 className='font-semibold text-lg sm:text-xl'>Recently Edited</h3>
          </div>
          <div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4 mb-6'>
            {recentResumes.map((resume) => (
              <ResumeCardItem 
                resume={resume} 
                key={`recent-${resume.id}`}
                className='border-2 border-primary/20 hover:border-primary/40'
              />
            ))}
          </div>
        </div>
      )}

      {/* All Resumes Section */}
      <div className='mb-4'>
        <h3 className='font-semibold text-lg sm:text-xl mb-4'>
          {resumeList.length > 0 ? 'All Resumes' : 'Get Started'}
        </h3>
        
        {loading ? (
          <div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} className='h-40 rounded-xl' />
            ))}
          </div>
        ) : (
          <div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
            <AddResume />
            {resumeList.length > 0 && resumeList.map((resume, index) => (
              <ResumeCardItem 
                resume={resume} 
                key={resume.id || index} 
              />
            ))}
          </div>
        )}

        {!loading && resumeList.length === 0 && (
          <div className='flex flex-col items-center justify-center py-12 border-2 border-dashed rounded-xl border-muted'>
            <p className='text-muted-foreground mb-4'>No resumes found</p>
            <AddResume className='w-full max-w-xs' />
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard