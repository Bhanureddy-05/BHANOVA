import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store'
import { useNotifications } from '@/hooks/useNotifications'
import Layout from '@/components/Layout'

// ── Lazy Loaded Pages ──────────────────────────────────────────────────────────
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'))
const DashboardPage = lazy(() => import('@/pages/DashboardPage'))
const HabitsPage = lazy(() => import('@/pages/HabitsPage'))
const StudyPage = lazy(() => import('@/pages/StudyPage'))
const DSAPage = lazy(() => import('@/pages/DSAPage'))
const InterviewPrepPage = lazy(() => import('@/pages/InterviewPrepPage'))
const ProjectsPage = lazy(() => import('@/pages/ProjectsPage'))
const FitnessPage = lazy(() => import('@/pages/FitnessPage'))
const DietPage = lazy(() => import('@/pages/DietPage'))
const SleepPage = lazy(() => import('@/pages/SleepPage'))
const SingingPage = lazy(() => import('@/pages/SingingPage'))
const ReadingPage = lazy(() => import('@/pages/ReadingPage'))
const GoalsPage = lazy(() => import('@/pages/GoalsPage'))
const AnalyticsPage = lazy(() => import('@/pages/AnalyticsPage'))
const ReportsPage = lazy(() => import('@/pages/ReportsPage'))
const DailyPlannerPage = lazy(() => import('@/pages/DailyPlannerPage'))
const SettingsPage = lazy(() => import('@/pages/SettingsPage'))
const JournalPage = lazy(() => import('@/pages/JournalPage'))
const FinancePage = lazy(() => import('@/pages/FinancePage'))
const MastersPage = lazy(() => import('@/pages/MastersPage'))
const PlacementPage = lazy(() => import('@/pages/PlacementPage'))
const KnowledgePage = lazy(() => import('@/pages/KnowledgePage'))
const VoicePage = lazy(() => import('@/pages/VoicePage'))
const TimelinePage = lazy(() => import('@/pages/TimelinePage'))
const SharingPage = lazy(() => import('@/pages/SharingPage'))
const GamificationPage = lazy(() => import('@/pages/GamificationPage'))
const AIChatPage = lazy(() => import('@/pages/AIChatPage'))

// Status Pages
import { Page404, Page403, Page500, PageOffline } from '@/pages/StatusPages'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore()
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore()
  return !isAuthenticated ? <>{children}</> : <Navigate to="/" replace />
}

function PageLoader() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      minHeight: '80vh', gap: 16, color: '#f1f5f9'
    }}>
      <div className="animate-spin" style={{
        width: 32, height: 32, borderRadius: '50%',
        border: '3px solid rgba(6, 182, 212, 0.2)', borderTopColor: '#06b6d4'
      }} />
      <span style={{ fontSize: 14, color: '#94a3b8', letterSpacing: '0.05em' }}>Loading BHANOVA...</span>
    </div>
  )
}

export default function App() {
  useNotifications()
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
        <Route path="/403" element={<Page403 />} />
        <Route path="/500" element={<Page500 />} />
        <Route path="/offline" element={<PageOffline />} />
        
        <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route index element={<DashboardPage />} />
          <Route path="planner" element={<DailyPlannerPage />} />
          <Route path="habits" element={<HabitsPage />} />
          <Route path="study" element={<StudyPage />} />
          <Route path="dsa" element={<DSAPage />} />
          <Route path="interview" element={<InterviewPrepPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="fitness" element={<FitnessPage />} />
          <Route path="diet" element={<DietPage />} />
          <Route path="sleep" element={<SleepPage />} />
          <Route path="singing" element={<SingingPage />} />
          <Route path="reading" element={<ReadingPage />} />
          <Route path="goals" element={<GoalsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="journal" element={<JournalPage />} />
          <Route path="finance" element={<FinancePage />} />
          <Route path="masters" element={<MastersPage />} />
          <Route path="placement" element={<PlacementPage />} />
          <Route path="knowledge" element={<KnowledgePage />} />
          <Route path="voice" element={<VoicePage />} />
          <Route path="timeline" element={<TimelinePage />} />
          <Route path="sharing" element={<SharingPage />} />
          <Route path="gamification" element={<GamificationPage />} />
          <Route path="ai-chat" element={<AIChatPage />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Suspense>
  )
}
