import { BadgeCheck, BadgeX, Check, X } from 'lucide-react'
import React from 'react'

type Props = {}

const StudentPlan = (props: Props) => {
  return (
    <div className=''>
        <p className='text-[13px]  font-bold'>WHAT YOU GET</p>
        <ul className='flex flex-col gap-2 mt-3'>
        <li className='flex items-center gap-1'><Check color='green'/>Starter resume templates</li>
            <li className='flex items-center gap-1'><Check color='green'/>Daily limit (5 Resumes a day)</li>
            <li className='flex items-center gap-1'><Check color='green'/>Daily limit (5 CVs a day)</li>
            <li className='flex items-center gap-1 font-medium opacity-30'> <Check color='green' />Generate unlimited Resumes</li>
            <li className='flex items-center gap-1 opacity-30'><Check color='green' />Generate Unlimited Cover letters</li>
            <li className='flex items-center gap-1 opacity-30'><Check color='green' />Get access to Unlimited resume Templates</li>
        </ul>
    </div>
  )
}

export default StudentPlan