'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Fallbacks prevent top-level module evaluation from throwing 'supabaseUrl is required' during build
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_key';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AdminReviewsPage({ isDark }) {
  const [secretKey, setSecretKey] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch pending reviews
  const fetchPendingReviews = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('is_approved', false)
      .order('created_at', { ascending: false });

    if (!error) {
      setReviews(data || []);
    }
    setLoading(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (secretKey.trim()) {
      setIsAuthorized(true);
      fetchPendingReviews();
    }
  };

  // Trigger Action on API
  const handleAction = async (id, action) => {
    setMessage('');
    try {
      const formData = new FormData();
      formData.append('id', id);
      formData.append('action', action);
      formData.append('secret', secretKey);

      const res = await fetch('/api/review-action', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Unauthorized or action failed');
      }

      setMessage(
        `Review ${action === 'approve' ? 'approved ✅' : 'deleted ❌'} successfully!`
      );
      // Remove from state immediately
      setReviews((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  // Dynamic style values based on isDark prop
  const theme = {
    bg: isDark ? '#0f172a' : '#f8fafc',
    cardBg: isDark ? '#1e293b' : '#ffffff',
    border: isDark ? '#334155' : '#e2e8f0',
    textPrimary: isDark ? '#f8fafc' : '#0f172a',
    textSecondary: isDark ? '#94a3b8' : '#64748b',
    textBody: isDark ? '#cbd5e1' : '#334155',
    inputBg: isDark ? '#0f172a' : '#ffffff',
    btnSecondaryBg: isDark ? '#334155' : '#e2e8f0',
    btnSecondaryText: isDark ? '#ffffff' : '#0f172a',
    alertBg: isDark ? '#1e293b' : '#f0f9ff',
    alertBorder: isDark ? '#3b82f6' : '#bae6fd',
    alertText: isDark ? '#38bdf8' : '#0284c7',
  };

  // Passcode Guard View
  if (!isAuthorized) {
    return (
      <div style={{ ...styles.container, backgroundColor: theme.bg, color: theme.textPrimary }}>
        <div style={{ ...styles.card, backgroundColor: theme.cardBg, borderColor: theme.border }}>
          <h2 style={styles.title}>🔒 Admin Access Required</h2>
          <p style={{ ...styles.subtitle, color: theme.textSecondary }}>
            Enter your Admin Secret Key to view pending reviews.
          </p>
          <form onSubmit={handleLogin} style={styles.form}>
            <input
              type="password"
              placeholder="Enter ADMIN_SECRET_KEY..."
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              style={{
                ...styles.input,
                backgroundColor: theme.inputBg,
                borderColor: theme.border,
                color: theme.textPrimary,
              }}
              required
            />
            <button type="submit" style={styles.loginBtn}>
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ ...styles.dashboardContainer, backgroundColor: theme.bg, color: theme.textPrimary }}>
      <header style={{ ...styles.header, borderColor: theme.border }}>
        <div>
          <h1 style={styles.dashboardTitle}>Review Moderation Dashboard</h1>
          <p style={{ ...styles.subtitle, color: theme.textSecondary }}>
            {reviews.length} pending {reviews.length === 1 ? 'review' : 'reviews'} awaiting approval
          </p>
        </div>
        <button
          onClick={fetchPendingReviews}
          style={{
            ...styles.refreshBtn,
            backgroundColor: theme.btnSecondaryBg,
            color: theme.btnSecondaryText,
          }}
        >
          🔄 Refresh
        </button>
      </header>

      {message && (
        <div
          style={{
            ...styles.alert,
            backgroundColor: theme.alertBg,
            borderColor: theme.alertBorder,
            color: theme.alertText,
          }}
        >
          {message}
        </div>
      )}

      {loading ? (
        <p style={{ textAlign: 'center', color: theme.textSecondary }}>Loading pending reviews...</p>
      ) : reviews.length === 0 ? (
        <div
          style={{
            ...styles.emptyState,
            backgroundColor: theme.cardBg,
            borderColor: theme.border,
            color: theme.textSecondary,
          }}
        >
          <h3>🎉 All caught up!</h3>
          <p>There are no pending reviews to moderate right now.</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {reviews.map((rev) => (
            <div
              key={rev.id}
              style={{
                ...styles.reviewCard,
                backgroundColor: theme.cardBg,
                borderColor: theme.border,
              }}
            >
              <div style={styles.cardHeader}>
                <div>
                  <h3 style={{ ...styles.authorName, color: theme.textPrimary }}>{rev.name}</h3>
                  <span style={{ ...styles.meta, color: theme.textSecondary }}>
                    {rev.location ? `📍 ${rev.location}` : ''}{' '}
                    {rev.service ? `• ${rev.service}` : ''}
                  </span>
                </div>
                <span style={styles.rating}>{'⭐'.repeat(rev.rating || 5)}</span>
              </div>

              <p style={{ ...styles.comment, color: theme.textBody }}>{rev.comment}</p>

              <div style={styles.actions}>
                <button
                  onClick={() => handleAction(rev.id, 'approve')}
                  style={{ ...styles.actionBtn, backgroundColor: '#22c55e' }}
                >
                  ✅ Approve
                </button>
                <button
                  onClick={() => handleAction(rev.id, 'reject')}
                  style={{ ...styles.actionBtn, backgroundColor: '#ef4444' }}
                >
                  🗑️ Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'sans-serif',
    padding: '20px',
    transition: 'background-color 0.2s ease, color 0.2s ease',
  },
  dashboardContainer: {
    minHeight: '100vh',
    fontFamily: 'sans-serif',
    padding: '40px 20px',
    maxWidth: '1000px',
    margin: '0 auto',
    transition: 'background-color 0.2s ease, color 0.2s ease',
  },
  card: {
    border: '1px solid',
    borderRadius: '12px',
    padding: '32px',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  },
  title: { fontSize: '20px', margin: '0 0 8px 0' },
  dashboardTitle: { fontSize: '28px', margin: '0 0 4px 0' },
  subtitle: { fontSize: '14px', margin: 0 },
  form: { marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid',
    fontSize: '14px',
    outline: 'none',
  },
  loginBtn: {
    padding: '12px',
    borderRadius: '8px',
    backgroundColor: '#3b82f6',
    color: '#fff',
    border: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    borderBottom: '1px solid',
    paddingBottom: '16px',
  },
  refreshBtn: {
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  alert: {
    padding: '12px',
    border: '1px solid',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  emptyState: {
    textAlign: 'center',
    padding: '40px',
    borderRadius: '12px',
    border: '1px solid',
  },
  grid: { display: 'grid', gridTemplateColumns: '1fr', gap: '16px' },
  reviewCard: {
    border: '1px solid',
    borderRadius: '12px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
  },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
  authorName: { fontSize: '18px', margin: '0 0 4px 0' },
  meta: { fontSize: '12px' },
  rating: { fontSize: '14px' },
  comment: { fontSize: '15px', lineHeight: '1.5', margin: 0 },
  actions: { display: 'flex', gap: '12px', marginTop: '8px' },
  actionBtn: {
    flex: 1,
    padding: '10px',
    borderRadius: '6px',
    border: 'none',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '14px',
  },
};