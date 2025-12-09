'use client'

import * as React from 'react'
import { Box, Stack, Typography, Button } from '@mui/material'
import SearchOffIcon from '@mui/icons-material/SearchOff'

type NoResultsProps = {
  title?: string
  description?: string
  actionText?: string
  onAction?: () => void
}

export default function NoResults({
  title = 'Không tồn tại',
  description = 'Không tìm thấy bất động sản phù hợp. Hãy thử thay đổi bộ lọc hoặc từ khoá.',
  actionText,
  onAction,
}: NoResultsProps) {
  return (
    <Box sx={{ py: 6, px: 2, display: 'flex', justifyContent: 'center' }}>
      <Stack spacing={2} alignItems="center" sx={{ maxWidth: 520, textAlign: 'center' }}>
        <SearchOffIcon sx={{ fontSize: 56, color: 'text.disabled' }} />
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" color="text.secondary">{description}</Typography>
        {actionText && onAction ? (
          <Button variant="outlined" onClick={onAction}>{actionText}</Button>
        ) : null}
      </Stack>
    </Box>
  )
}
