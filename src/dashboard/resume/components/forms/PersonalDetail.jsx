import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from 'sonner';

function PersonalDetail({ enabledNext }) {
    const params = useParams();
    const { resumeInfo, setresumeInfo } = useContext(ResumeInfoContext);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Initialize form data with resumeInfo if it exists
        if (resumeInfo) {
            setFormData({
                firstName: resumeInfo.firstName || '',
                lastName: resumeInfo.lastName || '',
                jobTitle: resumeInfo.jobTitle || '',
                address: resumeInfo.address || '',
                phone: resumeInfo.phone || '',
                email: resumeInfo.email || ''
            });
        }
    }, [resumeInfo]);

    const handleInputChange = (e) => {
        enabledNext(false);
        const { name, value } = e.target;

        const updatedFormData = {
            ...formData,
            [name]: value
        };

        setFormData(updatedFormData);
        setresumeInfo({
            ...resumeInfo,
            [name]: value
        });
    };

    const onSave = (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            data: formData
        };

        GlobalApi.UpdateResumeDetail(params?.resumeId, data)
            .then(resp => {
                enabledNext(true);
                setLoading(false);
                toast.success("Details updated successfully!");
            })
            .catch(error => {
                setLoading(false);
                toast.error("Error updating details");
            });
    };

    return (
        <div className='p-6 shadow-lg rounded-lg border-t-4 border-t-primary bg-white'>
            <div className='mb-6'>
                <h2 className='text-2xl font-bold text-gray-800 mb-1'>Personal Details</h2>
                <p className='text-gray-600'>Get started with your basic information</p>
            </div>

            <form onSubmit={onSave}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                    <div className='space-y-1'>
                        <label className='block text-sm font-medium text-gray-700'>First Name*</label>
                        <Input 
                            name="firstName" 
                            value={formData.firstName || ''} 
                            required 
                            onChange={handleInputChange} 
                            placeholder="John"
                        />
                    </div>
                    <div className='space-y-1'>
                        <label className='block text-sm font-medium text-gray-700'>Last Name*</label>
                        <Input 
                            name="lastName" 
                            value={formData.lastName || ''} 
                            required 
                            onChange={handleInputChange} 
                            placeholder="Doe"
                        />
                    </div>
                    <div className='md:col-span-2 space-y-1'>
                        <label className='block text-sm font-medium text-gray-700'>Job Title*</label>
                        <Input 
                            name="jobTitle" 
                            value={formData.jobTitle || ''} 
                            required 
                            onChange={handleInputChange} 
                            placeholder="Software Engineer"
                        />
                    </div>
                    <div className='md:col-span-2 space-y-1'>
                        <label className='block text-sm font-medium text-gray-700'>Address*</label>
                        <Input 
                            name="address" 
                            value={formData.address || ''} 
                            required 
                            onChange={handleInputChange} 
                            placeholder="123 Main St, City, Country"
                        />
                    </div>
                    <div className='space-y-1'>
                        <label className='block text-sm font-medium text-gray-700'>Phone*</label>
                        <Input 
                            name="phone" 
                            value={formData.phone || ''} 
                            required 
                            onChange={handleInputChange} 
                            placeholder="+1 (555) 123-4567"
                            type="tel"
                        />
                    </div>
                    <div className='space-y-1'>
                        <label className='block text-sm font-medium text-gray-700'>Email*</label>
                        <Input 
                            name="email" 
                            value={formData.email || ''} 
                            required 
                            onChange={handleInputChange} 
                            placeholder="john.doe@example.com"
                            type="email"
                        />
                    </div>
                </div>

                <div className='flex justify-end mt-6'>
                    <Button 
                        type="submit"
                        disabled={loading}
                        className="min-w-[120px]"
                    >
                        {loading ? (
                            <>
                                <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />
                                Saving...
                            </>
                        ) : 'Save Changes'}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default PersonalDetail;