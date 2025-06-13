import { NextResponse } from 'next/server'

export function handleApiError(error, customMessage) {
  console.error('API Error:', error)
  
  // Handle Supabase errors
  if (error.code) {
    switch (error.code) {
      case 'PGRST116':
        return NextResponse.json({ error: 'Resource not found' }, { status: 404 })
      case '23505':
        return NextResponse.json({ error: 'Duplicate record' }, { status: 409 })
      case '42P01':
        return NextResponse.json({ error: 'Database table not found' }, { status: 500 })
      case '42703':
        return NextResponse.json({ error: 'Database column not found' }, { status: 500 })
    }
  }

  // Handle authentication errors
  if (error.message === 'No user found') {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    )
  }

  // Return custom message if provided, otherwise return generic error
  return NextResponse.json(
    { error: customMessage || 'An unexpected error occurred' },
    { status: 500 }
  )
} 