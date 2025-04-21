'use client'

import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { Box, Container, Typography, Button, TextField } from '@mui/material'
import { format } from 'date-fns'
import { th } from 'date-fns/locale'

type FormValues = {
  start: Date
  end: Date
}

export default function MyDateTimeForm() {
  const { control, handleSubmit, getValues } = useForm<FormValues>({
    defaultValues: {
      start: new Date(),
      end: new Date(),
    },
  })

  const onSubmit = (data: FormValues) => {
    const formattedStart = format(data.start, 'dd/MM/yyyy HH:mm', { locale: th })
    const formattedEnd = format(data.end, 'dd/MM/yyyy HH:mm', { locale: th })

    alert(`วันเวลาเริ่มต้น: ${formattedStart}\nวันเวลาสิ้นสุด: ${formattedEnd}`)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={th}>
      <Container
        maxWidth="sm"
        sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box component="form" onSubmit={handleSubmit(onSubmit)} display="flex" flexDirection="column" gap={3} width="100%">
          <Typography variant="h6" align="center">เลือกวันและเวลา</Typography>

          <Controller
            name="start"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <DateTimePicker
                label="เวลาเริ่มต้น"
                value={field.value}
                onChange={field.onChange}
                minDateTime={new Date()}
              />
            )}
          />

        <Controller
            name="end"
            control={control}
            rules={{
                required: true,
                validate: (value) => {
                const start = getValues('start')
                if (value < start) {
                    alert('เวลาสิ้นสุดต้องไม่ก่อนเวลาเริ่มต้น')
                    return false
                }
                return true
                },
            }}
            render={({ field }) => (
                <DateTimePicker
                label="เวลาสิ้นสุด"
                value={field.value}
                onChange={field.onChange}
                minDateTime={getValues('start')}

                />
            )}
          />

          <Button type="submit" variant="contained" color="primary">
            ส่งฟอร์ม
          </Button>
        </Box>
      </Container>
    </LocalizationProvider>
  )
}