import clsx from 'clsx'
import { makeStyles } from '@material-ui/core'
import React from 'react'
import { DateRange } from 'react-date-range'


type CollapseDateRangeProps = {
    ranges: any[]
    onChange: (item: any) => void
    isOpen: boolean
    months?: number
    direction?: 'vertical' | 'horizontal'
}

const useStyles = makeStyles(() => ({
    wrapper: {
      opacity: 0,
      transform: 'translateY(-12px)',
      transition: 'opacity 0.3s ease, transform 0.5s ease',
    },
    visible: {
      opacity: 1,
      transform: 'translateY(0)',
    },
    pickerStyles: {
        '& .rdrDateDisplayWrapper': { display: 'none' },
        '& .rdrCalendarWrapper': { paddingTop: 0 },
        
        // สีวันเริ่มต้นและวันสิ้นสุด
        '& .rdrStartEdge, & .rdrEndEdge': {
          background: '#3B82F6', 
          color: 'white',
        },
    
       
      },
  }))


  const CollapseDateRange = ({ ranges, onChange, isOpen, months, direction }: CollapseDateRangeProps) => {
    const classes = useStyles()
    const [visible, setVisible] = React.useState(false)
  
    React.useEffect(() => {
      if (isOpen) {
        const timeout = setTimeout(() => setVisible(true), 10) 
        return () => clearTimeout(timeout)
      } else {
        setVisible(false)
      }
    }, [isOpen])
  
    return (
      <div className={clsx(classes.wrapper, classes.pickerStyles, visible && classes.visible)}>

        <DateRange
          ranges={ranges}
          onChange={onChange}
          months={months || 2}
          direction={direction || 'horizontal'}
          editableDateInputs={false}
          moveRangeOnFirstSelection={false}
          minDate={new Date()}
        />
      </div>
    )
}

export default CollapseDateRange