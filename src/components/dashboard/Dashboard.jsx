import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { useApp } from '../../context/AppContext'
import BentoGrid from './BentoGrid'
import SkeletonDashboard from './SkeletonDashboard'

const Dashboard = () => {
  const { profile } = useAuth()
  const { progressLoaded } = useApp()

  if (!profile || !progressLoaded) return <SkeletonDashboard />

  return <BentoGrid />
}

export default Dashboard