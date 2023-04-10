 <code>
  const start = dayjs(data?.str_at?.Time)
  const end = dayjs(data?.end_at?.Time)
  const diffMinutes = end.diff(start, 'minute')
 </code>
