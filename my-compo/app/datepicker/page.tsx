'use client'

import { useState, useRef, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { DateRange } from 'react-date-range'
import { addDays, format } from 'date-fns'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { LuCalendarArrowUp, LuCalendarArrowDown } from 'react-icons/lu'
import CollapseDateRange from '@/components/dateRange'
import useMediaQuery from '@mui/material/useMediaQuery'

type FormValues = {
  dateRange: {
    startDate: Date
    endDate: Date
    key: string
  }
}

export default function DateRangeForm() {
  
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
        dateRange: {
          startDate: new Date(),
          endDate: addDays(new Date(), 1),
          key: 'selection',
        },
      }
  })

  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery('(max-width: 640px)')

  const onSubmit = (data: FormValues) => {
    alert(JSON.stringify(data.dateRange, null, 2))
}

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 items-center">
        <Controller
          control={control}
          name="dateRange"
          render={({ field }) => (
            <div className="relative" ref={ref}>
              <div
                className="flex w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl border rounded-lg overflow-hidden shadow-sm sm:divide-x cursor-pointer bg-white flex-col sm:flex-row"
                onClick={() => setOpen(!open)}
              >
                {/* Start Date */}
                <div className="flex items-center space-x-2 px-4 py-2">
                  <LuCalendarArrowUp className="w-6 h-6 text-gray-500" />
                  <div>
                    <div>{field.value.startDate ? format(field.value.startDate, 'dd MMM yyyy') : 'เริ่มต้น'}</div>
                    <div className="text-sm text-gray-400">
                      {field.value.startDate ? format(field.value.startDate, 'EEEE') : ''}
                    </div>
                  </div>
                </div>

                {/* End Date */}
                <div className="flex items-center space-x-2 px-4 py-2">
                  <LuCalendarArrowDown className="w-6 h-6 text-gray-500" />
                  <div>
                    <div>{field.value.endDate ? format(field.value.endDate, 'dd MMM yyyy') : 'สิ้นสุด'}</div>
                    <div className="text-sm text-gray-400">
                      {field.value.endDate ? format(field.value.endDate, 'EEEE') : ''}
                    </div>
                  </div>
                </div>
              </div>

              {open && (
                <div className="absolute z-50 mt-2 shadow-lg">
                <CollapseDateRange
                  ranges={[{ ...field.value, key: 'selection' }]}   
                  months={isMobile ? 1 : 2}
                  direction={isMobile ? 'vertical' : 'horizontal'}         
                  onChange={(item) => {

                    field.onChange(item.selection)

                  }}
                  isOpen={open}

                />
              </div>
              )}
            </div>
          )}
        />

        <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
          ส่งฟอร์ม
        </button>
      </form>
    </div>
    
  )
}