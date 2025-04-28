import { Loader2, PlusSquare } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from "../../components/ui/button";
import { v4 as uuidv4 } from 'uuid';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
import { useUser } from '@clerk/clerk-react';
import GlobalApi from '../../../service/GlobalApi';
import { useNavigate } from 'react-router-dom';
  

function AddResume() {
    const [openDialog, setopenDialog] = useState(false)
    const [resumeTitle, setresumeTitle] = useState('')
    const {user} =  useUser();
    const [loading, setloading] = useState(false)
    const navigation = useNavigate();

    const onCreate = async () =>{
        setloading(true);
        const uuid = uuidv4();
        const data = {
            data:{
                title:resumeTitle,
                resumeId:uuid,
                userEmail:user?.primaryEmailAddress?.emailAddress,
                userName:user?.fullName
            }
        }
        GlobalApi.CreateNewResume(data).then(resp=>{
            console.log(resp.data.data.documentId);
            if(resp){
                setloading(false);
                navigation('/dashboard/resume/'+resp.data.data.documentId+'/edit')
            }
        }, (error) => {
            setloading(false)
        });
        
    }
  return (
    <div>
        <div className='p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg h-[280px]
                        hover:scale-105 transition-all hover:shadow-md cursor-pointer
        ' onClick={() => setopenDialog(true)}>
            <PlusSquare/>
        </div>

        <Dialog open={openDialog}>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
                Add a title for your new resume
                <Input className={"my-2"} onChange={(e) => setresumeTitle(e.target.value)} />
            </DialogDescription>
            <div className='flex justify-end gap-5 '>
                <Button onClick={() => setopenDialog(false)} variant={'ghost'}>Cancel</Button>
                <Button disabled={!resumeTitle || loading} onClick={()=> onCreate()}>
                    {loading? <Loader2 className='animate-spin'/> : "Create"}
                </Button>
            </div>
            </DialogHeader>
        </DialogContent>
        </Dialog>


    </div>
  )
}

export default AddResume