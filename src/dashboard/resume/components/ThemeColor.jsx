import React, { useContext, useState } from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import { LayoutGrid } from 'lucide-react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from './../../../../service/GlobalApi';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

function ThemeColor() {
    const colors = [
        "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF", // Vibrant colors
        "#33FFA1", "#FF7133", "#71FF33", "#7133FF", "#FF3371", // Additional vibrant shades
        "#33FF71", "#3371FF", "#A1FF33", "#33A1FF", "#FF5733", // Duplicates for variety
        "#5733FF", "#33FF5A", "#5A33FF", "#FF335A", "#335AFF", // More vivid colors
        "#D9D9D9", "#A0A0A0", "#808080", "#3D3D3D", "#000000", // Neutrals (grays and black)
        "#E1BEE7", "#FFEB3B", "#FF9800", "#FF5722", "#9C27B0", // Pastels and soft tones
        "#00BCD4", "#009688", "#8BC34A", "#FFC107", "#9E9E9E" // Soft and modern shades
    ];

    const { resumeInfo, setresumeInfo } = useContext(ResumeInfoContext);
    const [selectedColor, setSelectedColor] = useState();
    const { resumeId } = useParams();

    const onColorSelect = (color) => {
        setSelectedColor(color);
        setresumeInfo({
            ...resumeInfo,
            themeColor: color
        });

        const data = {
            data: {
                themeColor: color
            }
        };

        GlobalApi.UpdateResumeDetail(resumeId, data)
            .then(resp => {
                console.log(resp);
                toast.success('Theme color updated successfully!');
            })
            .catch(error => {
                console.error(error);
                toast.error('Failed to update theme color.');
            });
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="flex gap-2">
                    <LayoutGrid /> Theme
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <h2 className='mb-2 text-sm font-bold'>Select Theme Color</h2>
                <div className='grid grid-cols-5 gap-3'>
                    {colors.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => onColorSelect(item)}
                            className={`h-5 w-5 rounded-full cursor-pointer hover:border-black border ${selectedColor === item ? 'border-black' : ''}`}
                            style={{ backgroundColor: item }}
                        ></div>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default ThemeColor;
