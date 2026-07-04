import React, { useState, useEffect, useRef } from 'react'
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Calendar, BookOpen, Code2, Brain, FolderGit2,
  Dumbbell, UtensilsCrossed, Moon, Music, BookMarked, Target,
  BarChart3, FileText, Settings, LogOut, Zap, ChevronLeft, Menu,
  User, Bell, X, GraduationCap, Briefcase, DollarSign, Lightbulb, Camera, Mic, Users, Trophy, Sparkles, Search, Check
} from 'lucide-react'
import { useAuthStore, useUIStore } from '@/store'

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard', exact: true },
  { path: '/planner', icon: Calendar, label: 'Daily Planner' },
  { divider: 'STUDY' },
  { path: '/study', icon: BookOpen, label: 'Data Science' },
  { path: '/dsa', icon: Code2, label: 'DSA Practice' },
  { path: '/interview', icon: Brain, label: 'Interview Prep' },
  { path: '/projects', icon: FolderGit2, label: 'Projects' },
  { path: '/masters', icon: GraduationCap, label: "Master's Prep" },
  { path: '/placement', icon: Briefcase, label: 'Placement Prep' },
  { divider: 'HEALTH' },
  { path: '/fitness', icon: Dumbbell, label: 'Fitness' },
  { path: '/diet', icon: UtensilsCrossed, label: 'Diet & Nutrition' },
  { path: '/sleep', icon: Moon, label: 'Sleep' },
  { divider: 'LIFE' },
  { path: '/singing', icon: Music, label: 'Singing' },
  { path: '/reading', icon: BookMarked, label: 'Reading' },
  { path: '/habits', icon: Zap, label: 'Habits' },
  { path: '/goals', icon: Target, label: 'Goals' },
  { path: '/journal', icon: FileText, label: 'Journal' },
  { path: '/finance', icon: DollarSign, label: 'Finance' },
  { path: '/knowledge', icon: Lightbulb, label: 'Knowledge Vault' },
  { path: '/timeline', icon: Camera, label: 'Progress Photos' },
  { path: '/sharing', icon: Users, label: 'Family Sharing' },
  { path: '/gamification', icon: Trophy, label: 'Gamification' },
  { divider: 'INSIGHTS' },
  { path: '/analytics', icon: BarChart3, label: 'Analytics' },
  { path: '/reports', icon: FileText, label: 'Reports' },
  { path: '/ai-chat', icon: Brain, label: 'AI Assistant' },
  { path: '/voice', icon: Mic, label: 'Voice Center' },
  { path: '/settings', icon: Settings, label: 'Settings' },
]

const mobileBottomItems = [
  { path: '/', icon: LayoutDashboard, label: 'Home' },
  { path: '/planner', icon: Calendar, label: 'Planner' },
  { path: '/study', icon: BookOpen, label: 'Study' },
  { path: '/analytics', icon: BarChart3, label: 'Analytics' },
  { path: '/settings', icon: Settings, label: 'Profile' },
]

export default function Layout() {
  const { user, logout } = useAuthStore()
  const { sidebarOpen, toggleSidebar, setSidebarOpen } = useUIStore()
  const navigate = useNavigate()
  const location = useLocation()

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024)
  
  // Search & Notifications UI states
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  
  // Simulated Notification State
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Habits reminder', message: 'You have not checked in your habits today.', read: false, time: '10m ago' },
    { id: 2, title: 'Data Science progress', message: 'Congratulations! You completed the Pandas basics module.', read: false, time: '2h ago' },
    { id: 3, title: 'Coaching insight', message: 'Your average sleep duration this week is 7.2 hours. Looking solid!', read: true, time: '1d ago' },
  ])

  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width < 1024)
      if (width >= 1024) {
        setSidebarOpen(true)
      } else {
        setSidebarOpen(false)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [setSidebarOpen])

  // Keyboard shortcut listener for global search (Ctrl+K / Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setShowSearch(prev => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Close notifications dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowNotifications(false)
      }
    }
    window.addEventListener('mousedown', handleClickOutside)
    return () => window.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  useEffect(() => {
    if (isMobile || isTablet) {
      setSidebarOpen(false)
    }
  }, [location.pathname, isMobile, isTablet, setSidebarOpen])

  const unreadCount = notifications.filter(n => !n.read).length

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  // Filter searchable items locally based on nav options and descriptions
  const searchResults = searchQuery.trim() === '' ? [] : navItems.filter(item => 
    !('divider' in item) && item.label.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#090d16', color: '#D1D5DB', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Mobile Top Bar */}
      {isMobile && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, height: 56,
          backgroundColor: 'rgba(17, 24, 39, 0.95)', backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 16px', zIndex: 30
        }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 4 }}
          >
            <Menu size={20} />
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <img src="/logo.png" alt="BHANOVA logo" style={{ width: 24, height: 24, borderRadius: 4 }} />
            <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 16, color: '#f1f5f9' }}>BHANOVA</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <button onClick={() => setShowSearch(true)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
              <Search size={18} />
            </button>
            <button onClick={() => setShowNotifications(!showNotifications)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', position: 'relative' }}>
              <Bell size={18} />
              {unreadCount > 0 && (
                <span style={{
                  position: 'absolute', top: -2, right: -2, width: 6, height: 6, borderRadius: '50%',
                  backgroundColor: '#ef4444'
                }} />
              )}
            </button>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || (!isMobile && !isTablet)) && (
          <>
            {(isMobile || isTablet) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
                style={{
                  position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)',
                  backdropFilter: 'blur(4px)', zIndex: 40
                }}
              />
            )}

            <motion.div
              initial={isMobile || isTablet ? { x: -280 } : false}
              animate={isMobile || isTablet ? { x: 0 } : { width: sidebarOpen ? 260 : 72 }}
              exit={isMobile || isTablet ? { x: -280 } : undefined}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              style={{
                position: isMobile || isTablet ? 'fixed' : 'sticky',
                top: 0, left: 0, bottom: 0,
                width: isMobile || isTablet ? 260 : undefined,
                height: '100vh',
                backgroundColor: '#0d1321',
                borderRight: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex', flexDirection: 'column',
                zIndex: isMobile || isTablet ? 50 : 20,
                overflow: 'hidden'
              }}
            >
              {/* Logo / Header */}
              <div style={{
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: (sidebarOpen || isMobile || isTablet) ? 'space-between' : 'center',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
              }}>
                {(sidebarOpen || isMobile || isTablet) ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <img src="/logo.png" alt="BHANOVA logo" style={{ width: 32, height: 32, borderRadius: 6 }} />
                    <div>
                      <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 15, color: '#f1f5f9', letterSpacing: '0.5px' }}>BHANOVA</div>
                      <div style={{ fontSize: 8, color: '#64748b', letterSpacing: 0.5, fontWeight: 600 }}>BUILD BETTER EVERY DAY</div>
                    </div>
                  </div>
                ) : (
                  <img src="/logo.png" alt="BHANOVA logo" style={{ width: 28, height: 28, borderRadius: 4 }} />
                )}
                
                {(isMobile || isTablet) ? (
                  <button
                    onClick={() => setSidebarOpen(false)}
                    style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: 4 }}
                  >
                    <X size={18} />
                  </button>
                ) : (
                  <button
                    onClick={toggleSidebar}
                    style={{
                      background: 'rgba(255,255,255,0.04)', border: 'none', borderRadius: 6,
                      padding: 5, cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center'
                    }}
                  >
                    {sidebarOpen ? <ChevronLeft size={14} /> : <Menu size={14} />}
                  </button>
                )}
              </div>

              {/* Navigation Items */}
              <nav style={{
                flex: 1, padding: '12px 0', overflowY: 'auto',
                scrollbarWidth: 'none', msOverflowStyle: 'none'
              }}>
                {navItems.map((item, idx) => {
                  if ('divider' in item) {
                    return (sidebarOpen || isMobile || isTablet) ? (
                      <div key={idx} style={{
                        padding: '16px 20px 6px', fontSize: 10, fontWeight: 700,
                        color: '#475569', letterSpacing: 1.5, textTransform: 'uppercase'
                      }}>
                        {item.divider}
                      </div>
                    ) : <div key={idx} style={{ margin: '8px auto', width: 24, height: 1, background: 'rgba(255,255,255,0.06)' }} />
                  }

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path!}
                      end={item.path === '/'}
                      style={({ isActive }) => ({
                        display: 'flex', alignItems: 'center', gap: 12,
                        padding: (sidebarOpen || isMobile || isTablet) ? '10px 16px' : '10px',
                        borderRadius: 8, cursor: 'pointer', transition: 'all 0.2s',
                        color: isActive ? '#60a5fa' : '#94a3b8',
                        background: isActive
                          ? 'linear-gradient(135deg, rgba(59,130,246,0.12), rgba(6,182,212,0.06))'
                          : 'transparent',
                        border: isActive ? '1px solid rgba(59,130,246,0.18)' : '1px solid transparent',
                        margin: '3px 12px', textDecoration: 'none', fontWeight: 500, fontSize: 14,
                        justifyContent: (sidebarOpen || isMobile || isTablet) ? 'flex-start' : 'center',
                      })}
                    >
                      {({ isActive }) => (
                        <>
                          <item.icon size={16} color={isActive ? '#60a5fa' : '#64748b'} style={{ flexShrink: 0 }} />
                          {(sidebarOpen || isMobile || isTablet) && (
                            <span style={{ whiteSpace: 'nowrap' }}>{item.label}</span>
                          )}
                        </>
                      )}
                    </NavLink>
                  )
                })}
              </nav>

              {/* User profile footer */}
              <div style={{
                padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.06)',
                backgroundColor: 'rgba(0,0,0,0.1)'
              }}>
                {(sidebarOpen || isMobile || isTablet) ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: 8,
                      background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 700, fontSize: 13, color: 'white', flexShrink: 0
                    }}>
                      {user?.full_name?.charAt(0).toUpperCase()}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#f1f5f9', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {user?.full_name}
                      </div>
                      <div style={{ fontSize: 10, color: '#64748b' }}>@{user?.username}</div>
                    </div>
                    <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#475569', padding: 4 }}>
                      <LogOut size={14} />
                    </button>
                  </div>
                ) : (
                  <button onClick={handleLogout} style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: '#475569', width: '100%', display: 'flex', justifyContent: 'center', padding: 6
                  }}>
                    <LogOut size={16} />
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div style={{
        flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column',
        paddingTop: isMobile ? 56 : 0, paddingBottom: isMobile ? 64 : 0,
        height: '100vh', overflowY: 'auto'
      }}>
        
        {/* Desktop Header */}
        {!isMobile && (
          <header style={{
            height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 24px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            backgroundColor: 'rgba(13, 19, 33, 0.4)', backdropFilter: 'blur(10px)',
            position: 'sticky', top: 0, zIndex: 10
          }}>
            {/* Global Search trigger bar */}
            <div
              onClick={() => setShowSearch(true)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 10, padding: '8px 16px',
                width: 320, color: '#64748b', cursor: 'pointer', fontSize: 13, userSelect: 'none'
              }}
            >
              <Search size={14} />
              <span>Search dashboard metrics, habits...</span>
              <span style={{ marginLeft: 'auto', fontSize: 10, background: 'rgba(255, 255, 255, 0.08)', padding: '2px 6px', borderRadius: 4 }}>Ctrl+K</span>
            </div>

            {/* Right Header Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              {/* Notification icon */}
              <div style={{ position: 'relative' }} ref={dropdownRef}>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', position: 'relative', padding: 4 }}
                >
                  <Bell size={18} />
                  {unreadCount > 0 && (
                    <span style={{
                      position: 'absolute', top: 0, right: 0, width: 8, height: 8, borderRadius: '50%',
                      backgroundColor: '#ef4444'
                    }} />
                  )}
                </button>

                {/* Notifications Dropdown menu */}
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      style={{
                        position: 'absolute', right: 0, marginTop: 12, width: 320,
                        backgroundColor: '#0d1321', border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 12, boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)', zIndex: 100,
                        overflow: 'hidden'
                      }}
                    >
                      <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: '#f1f5f9' }}>Inbox Alerts</span>
                        {unreadCount > 0 && (
                          <button onClick={markAllAsRead} style={{ background: 'none', border: 'none', color: '#60a5fa', fontSize: 11, cursor: 'pointer', fontWeight: 600 }}>
                            Mark all read
                          </button>
                        )}
                      </div>

                      <div style={{ maxHeight: 280, overflowY: 'auto' }}>
                        {notifications.length === 0 ? (
                          <div style={{ padding: '24px 16px', textAlign: 'center', color: '#475569', fontSize: 12 }}>
                            No notifications yet
                          </div>
                        ) : (
                          notifications.map((notif) => (
                            <div
                              key={notif.id}
                              onClick={() => markAsRead(notif.id)}
                              style={{
                                padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)',
                                background: notif.read ? 'transparent' : 'rgba(96, 165, 250, 0.03)',
                                cursor: 'pointer'
                              }}
                            >
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                                <span style={{ fontSize: 12, fontWeight: 700, color: notif.read ? '#94a3b8' : '#f1f5f9' }}>{notif.title}</span>
                                <span style={{ fontSize: 9, color: '#475569' }}>{notif.time}</span>
                              </div>
                              <p style={{ fontSize: 11, color: '#64748b', lineHeight: 1.4, margin: 0 }}>{notif.message}</p>
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User profile bubble */}
              <NavLink to="/settings" style={{ textDecoration: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: 13, color: 'white'
                  }}>
                    {user?.full_name?.charAt(0).toUpperCase()}
                  </div>
                </div>
              </NavLink>
            </div>
          </header>
        )}

        {/* Content Outlet */}
        <div style={{ flex: 1 }}>
          <Outlet />
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      {isMobile && (
        <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, height: 64,
          backgroundColor: 'rgba(13, 19, 33, 0.96)', backdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-around',
          zIndex: 30, paddingBottom: 'env(safe-area-inset-bottom)'
        }}>
          {mobileBottomItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <NavLink
                key={item.path}
                to={item.path}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  gap: 4, textDecoration: 'none', color: isActive ? '#60a5fa' : '#64748b',
                  fontSize: 10, fontWeight: 500, flex: 1, padding: '8px 0'
                }}
              >
                <item.icon size={18} color={isActive ? '#60a5fa' : '#64748b'} />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </div>
      )}

      {/* Floating AI Assistant Orb Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate('/ai-chat')}
        style={{
          position: 'fixed',
          bottom: isMobile ? 80 : 32,
          right: 32,
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #8B5CF6, #4F7CFF)',
          boxShadow: '0 8px 30px rgba(139, 92, 246, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          cursor: 'pointer',
          zIndex: 99
        }}
      >
        <Sparkles size={24} />
      </motion.button>

      {/* Global Search Modal Overlay */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSearch(false)}
            style={{
              position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)',
              backdropFilter: 'blur(8px)', zIndex: 9999, display: 'flex',
              alignItems: 'flex-start', justifyContent: 'center', paddingTop: '10vh'
            }}
          >
            <motion.div
              initial={{ scale: 0.95, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%', maxWidth: 540, backgroundColor: '#0d1321',
                borderRadius: 16, border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.7)', overflow: 'hidden'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <Search size={18} color="#64748b" style={{ marginRight: 12 }} />
                <input
                  type="text"
                  placeholder="Type to search dashboard modules..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  style={{
                    flex: 1, background: 'none', border: 'none', outline: 'none',
                    color: '#f1f5f9', fontSize: 15
                  }}
                />
                <button
                  onClick={() => setShowSearch(false)}
                  style={{
                    background: 'rgba(255,255,255,0.04)', border: 'none', borderRadius: 6,
                    padding: 4, color: '#64748b', cursor: 'pointer'
                  }}
                >
                  <X size={16} />
                </button>
              </div>

              <div style={{ padding: '12px 0', maxHeight: 300, overflowY: 'auto' }}>
                {searchQuery.trim() === '' ? (
                  <div style={{ padding: '16px 20px', color: '#475569', fontSize: 13 }}>
                    Type to search for active features (e.g. data science, sleep logs, habits...)
                  </div>
                ) : searchResults.length === 0 ? (
                  <div style={{ padding: '16px 20px', color: '#475569', fontSize: 13 }}>
                    No results found matching "{searchQuery}"
                  </div>
                ) : (
                  searchResults.map((item) => (
                    <div
                      key={item.path}
                      onClick={() => {
                        navigate(item.path!)
                        setShowSearch(false)
                        setSearchQuery('')
                      }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px',
                        cursor: 'pointer', transition: 'background 0.2s'
                      }}
                      className="hover:bg-slate-800"
                    >
                      {item.icon && <item.icon size={16} color="#60a5fa" />}
                      <span style={{ color: '#f1f5f9', fontSize: 14 }}>{item.label}</span>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
