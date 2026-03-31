import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { formatSize } from '~/utils/formatSize'


interface FileUploaderProps{
    onFileSelect?:(file : File| null)=> void
}
 
const FileUploader = ({onFileSelect}:FileUploaderProps) => {

{/*const [file,setFile]=useState();*/}

    const onDrop = useCallback((acceptedFiles:File[]) => {
        const file=acceptedFiles[0] || null;
        onFileSelect?.(file);
  }, [onFileSelect])

  const maxFileSize=20*1024*1024
  const {getRootProps, getInputProps, isDragActive,acceptedFiles} = useDropzone({
    onDrop,
    multiple:false,
    accept: {'application/pdf':['.pdf']},
    maxSize: maxFileSize,
})

const file=acceptedFiles[0] || null

  return (
     <div className='w-full gradient-border'>
     <div {...getRootProps()} className="uploader-drag-area">
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center space-y-4">
        
         {file ? (
            <div className='uploader-selected-file' onClick={(e)=> e.stopPropagation()}>
            <div className='flex items-center space-x-3 overflow-hidden'>
                <img src="/images/pdf.png" alt="pdf" className='size-10 flex-shrink-0'/>
                <div className="overflow-hidden">
                    <p className='text-sm font-medium text-gray-700 truncate max-w-[200px] sm:max-w-xs'>
                        {file.name}
                    </p>
                    <p className='text-sm text-gray-500'>
                        {formatSize(file.size)}
                    </p>
                </div>

            </div>

            <button className='p-2 cursor-pointer' onClick={(e)=>{
                onFileSelect?.(null)
            }}>
                <img src="/icons/cross.svg" alt="remove" className='w-4 h-4'/> 
            </button>
            </div>
         ):(

            <div className="flex flex-col items-center text-center">

                <div className='mx-auto w-16 h-16 flex items-center justify-center mb-2'>
            <img src="/icons/info.svg" alt="upload" className="size-16 sm:size-20"/>
            
        </div>
                <p className='text-base sm:text-lg text-gray-500'>
                    <span className='font-semibold'>
                        Click to Upload
                    </span> or drag and drop
                </p>
                <p className='text-sm sm:text-base text-gray-400 mt-1'>PDF (max {formatSize(maxFileSize)})</p>
            </div>
         )}
      
      </div>
    </div>
    </div>
  )
}

export default FileUploader