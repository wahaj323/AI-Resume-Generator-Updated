import { Loader2, PlusSquare } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from "../../components/ui/button";
import { v4 as uuidv4 } from 'uuid';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { useUser } from '@clerk/clerk-react';
import GlobalApi from '../../../service/GlobalApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner'; // To show success and error messages

function AddResume() {
    const [openDialog, setOpenDialog] = useState(false);
    const [resumeTitle, setResumeTitle] = useState('');
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onCreate = async () => {
        if (!resumeTitle) {
            toast.error('Resume title cannot be empty!');
            return;
        }
        
        setLoading(true);
        const uuid = uuidv4();
        const data = {
            data: {
                title: resumeTitle,
                resumeId: uuid,
                userEmail: user?.primaryEmailAddress?.emailAddress,
                userName: user?.fullName
            }
        };
        
        try {
            const resp = await GlobalApi.CreateNewResume(data);
            if (resp) {
                setLoading(false);
                toast.success('Resume created successfully!');
                navigate('/dashboard/resume/' + resp.data.data.documentId + '/edit');
                setOpenDialog(false); // Close the dialog after successful creation
            }
        } catch (error) {
            setLoading(false);
            toast.error('Error creating resume');
        }
    };

    return (
        <div>
            <div
                className="p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg h-[280px]
                        hover:scale-105 transition-all hover:shadow-md cursor-pointer"
                onClick={() => setOpenDialog(true)}
            >
                <PlusSquare />
            </div>

            <Dialog open={openDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Resume</DialogTitle>
                        <DialogDescription>
                            Add a title for your new resume
                            <Input
                                className="my-2"
                                onChange={(e) => setResumeTitle(e.target.value)}
                                value={resumeTitle}
                            />
                        </DialogDescription>
                        <div className="flex justify-end gap-5">
                            <Button onClick={() => setOpenDialog(false)} variant={'ghost'}>Cancel</Button>
                            <Button
                                disabled={!resumeTitle || loading}
                                onClick={onCreate}
                            >
                                {loading ? <Loader2 className='animate-spin' /> : "Create"}
                            </Button>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddResume;
