import { Loader2, MoreVertical } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import GlobalApi from './../../../service/GlobalApi';
import { toast } from 'sonner';

function ResumeCardItem({ resume, refreshData }) {
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const onDelete = async () => {
    setLoading(true);
    try {
      await GlobalApi.DeleteResumeById(resume?.documentId);
      toast.success('Resume Deleted Successfully!');
      await refreshData();
      if (isMounted.current) setOpenAlert(false);
    } catch (error) {
      toast.error('Failed to delete resume. Please try again later.');
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  const handleDownload = () => {
    // Implement actual download logic here
    // toast.info('Download feature coming soon!');
    // Example implementation:
    <Link to={`/dashboard/resume/${resume.documentId}/edit`}></Link>;
  };

  return (
    <div>
      {/* Top half: resume preview */}
      <Link to={`/dashboard/resume/${resume.documentId}/edit`}>
        <div
          className="p-14 bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 h-[280px] rounded-t-lg border-t-4 hover:scale-105 transition-all hover:shadow-md cursor-pointer"
          style={{ borderColor: resume?.themeColor }}
        >
          <div className="flex items-center justify-center h-[180px]">
            <img src="https://cdn-icons-png.flaticon.com/512/6614/6614677.png" width={80} height={80} alt="Resume Preview" />
          </div>
        </div>
      </Link>

      {/* Bottom half: title and dropdown */}
      <div
        className="border p-3 flex justify-between items-center text-white rounded-b-lg shadow-lg"
        style={{ background: resume?.themeColor }}
      >
        <h2 className="text-sm text-white truncate">{resume.title}</h2>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-4 w-4 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => navigate(`/dashboard/resume/${resume.documentId}/edit`)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`/my-resume/${resume.documentId}/view`)}>
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`/my-resume/${resume.documentId}/view`)}>
              Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAlert(true)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Confirm Delete Dialog */}
      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your resume.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete} disabled={loading}>
              {loading ? <Loader2 className="animate-spin h-4 w-4" /> : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default ResumeCardItem;
