'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function AdminReviewsPage() {
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

  // Passcode Guard View
  if (!isAuthorized) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>🔒 Admin Access Required</h2>
          <p style={styles.subtitle}>Enter your Admin Secret Key to view pending reviews.</p>
          <form onSubmit={handleLogin} style={styles.form}>
            <input
              type="password"
              placeholder="Enter ADMIN_SECRET_KEY..."
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              style={styles.input}
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
    <div style={styles.dashboardContainer}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.dashboardTitle}>Review Moderation Dashboard</h1>
          <p style={styles.subtitle}>
            {reviews.length} pending {reviews.length === 1 ? 'review' : 'reviews'} awaiting approval
          </p>
        </div>
        <button onClick={fetchPendingReviews} style={styles.refreshBtn}>
          🔄 Refresh
        </button>
      </header>

      {message && <div style={styles.alert}>{message}</div>}

      {loading ? (
        <p style={{ textAlign: 'center', color: '#94a3b8' }}>Loading pending reviews...</p>
      ) : reviews.length === 0 ? (
        <div style={styles.emptyState}>
          <h3>🎉 All caught up!</h3>
          <p>There are no pending reviews to moderate right now.</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {reviews.map((rev) => (
            <div key={rev.id} style={styles.reviewCard}>
              <div style={styles.cardHeader}>
                <div>
                  <h3 style={styles.authorName}>{rev.name}</h3>
                  <span style={styles.meta}>
                    {rev.location ? `📍 ${rev.location}` : ''}{' '}
                    {rev.service ? `• ${rev.service}` : ''}
                  </span>
                </div>
                <span style={styles.rating}>{'⭐'.repeat(rev.rating || 5)}</span>
              </div>

              <p style={styles.comment}>{rev.comment}</p>

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

// Inline Styles for instant setup without CSS configs
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0f172a',
    color: '#f8fafc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'sans-serif',
    padding: '20px',
  },
  dashboardContainer: {
    minHeight: '100vh',
    backgroundColor: '#0f172a',
    color: '#f8fafc',
    fontFamily: 'sans-serif',
    padding: '40px 20px',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  card: {
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '12px',
    padding: '32px',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
  },
  title: { fontSize: '20px', margin: '0 0 8px 0' },
  dashboardTitle: { fontSize: '28px', margin: '0 0 4px 0' },
  subtitle: { color: '#94a3b8', fontSize: '14px', margin: 0 },
  form: { marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #334155',
    backgroundColor: '#0f172a',
    color: '#fff',
    fontSize: '14px',
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
    borderBottom: '1px solid #334155',
    paddingBottom: '16px',
  },
  refreshBtn: {
    backgroundColor: '#334155',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  alert: {
    padding: '12px',
    backgroundColor: '#1e293b',
    border: '1px solid #3b82f6',
    borderRadius: '8px',
    marginBottom: '20px',
    color: '#38bdf8',
  },
  emptyState: {
    textAlign: 'center',
    padding: '40px',
    backgroundColor: '#1e293b',
    borderRadius: '12px',
    border: '1px solid #334155',
    color: '#94a3b8',
  },
  grid: { display: 'grid', gridTemplateColumns: '1fr', gap: '16px' },
  reviewCard: {
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '12px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
  authorName: { fontSize: '18px', margin: '0 0 4px 0', color: '#f8fafc' },
  meta: { fontSize: '12px', color: '#94a3b8' },
  rating: { fontSize: '14px' },
  comment: { color: '#cbd5e1', fontSize: '15px', lineHeight: '1.5', margin: 0 },
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