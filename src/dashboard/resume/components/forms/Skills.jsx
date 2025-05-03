import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from './../../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

function Skills() {
  const [skillsList, setSkillsList] = useState([
    {
      name: '',
      rating: 0,
    },
  ])
  const { resumeId } = useParams()
  const [loading, setLoading] = useState(false)
  const { resumeInfo, setresumeInfo } = useContext(ResumeInfoContext)

  useEffect(() => {
    resumeInfo && setSkillsList(resumeInfo?.skills || [])
  }, [])

  const handleChange = (index, name, value) => {
    const newEntries = [...skillsList]
    newEntries[index][name] = value
    setSkillsList(newEntries)
  }

  const AddNewSkills = () => {
    setSkillsList([
      ...skillsList,
      {
        name: '',
        rating: 0,
      },
    ])
  }

  const RemoveSkills = () => {
    if (skillsList.length > 1) {
      setSkillsList(skillsList.slice(0, -1))
    }
  }

  const onSave = () => {
    setLoading(true)
    const data = {
      data: {
        skills: skillsList.map(({ id, ...rest }) => rest),
      },
    }

    GlobalApi.UpdateResumeDetail(resumeId, data).then(
      (resp) => {
        setLoading(false)
        toast('Details updated!')
      },
      (error) => {
        setLoading(false)
        toast('Server Error, Try again!')
      }
    )
  }

  useEffect(() => {
    setresumeInfo({
      ...resumeInfo,
      skills: skillsList,
    })
  }, [skillsList])

  return (
    <div className="p-6 shadow-xl rounded-2xl border-t-4 border-primary mt-10 bg-white">
      <h2 className="font-bold text-xl mb-1">Skills</h2>
      <p className="text-sm text-gray-600 mb-6">Add your top professional key skills</p>

      <div className="space-y-4">
        {skillsList.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 border rounded-xl p-4 bg-gray-50"
          >
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700 mb-1 block">Skill Name</label>
              <Input
                className="w-full"
                value={item.name}
                onChange={(e) => handleChange(index, 'name', e.target.value)}
                placeholder="e.g. JavaScript"
              />
            </div>

            <div className="flex items-center gap-2 mt-2 md:mt-0">
              <label className="text-sm text-gray-600">Rating:</label>
              <Rating
                style={{ maxWidth: 140 }}
                value={item.rating / 20}
                onChange={(v) => handleChange(index, 'rating', v * 20)}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="outline" onClick={AddNewSkills} className="w-full md:w-auto">
            + Add Skill
          </Button>
          <Button
            variant="outline"
            onClick={RemoveSkills}
            className="w-full md:w-auto"
            disabled={skillsList.length === 1}
          >
            - Remove
          </Button>
        </div>

        <Button
          className="w-full md:w-auto"
          disabled={loading}
          onClick={onSave}
        >
          {loading ? <LoaderCircle className="animate-spin w-5 h-5" /> : 'Save'}
        </Button>
      </div>
    </div>
  )
}

export default Skills
