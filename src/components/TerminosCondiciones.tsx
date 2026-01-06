import { Info } from 'lucide-react'
import React from 'react'

const TerminosCondiciones = ({ message }) => {
    return (
    <div id='terminos' className="w-full  mx-auto py-16 bg-[#EDEFF4] px-4 flex justify-center items-center ">
        <div className="max-w-5xl">
            <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 border-l-4 border-l-blue-500 bg-[#4A80DE]/10 ">
                {/* Icon */}
                <Info className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                {/* Text */}
                <p className="text-sm md:text-base text-blue-800 leading-relaxed">
                {message}
                </p>
            </div>
        </div>
    </div>
    )
}

export default TerminosCondiciones