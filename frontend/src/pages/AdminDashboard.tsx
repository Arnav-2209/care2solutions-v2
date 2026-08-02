import { useCallback, useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import {
  AlertCircle,
  ClipboardList,
  Download,
  FileText,
  Inbox,
  Loader2,
  LogOut,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  adminLogin,
  downloadAdminExport,
  listAdminAuditQuotes,
  listAdminInquiries,
  updateAdminAuditQuoteStatus,
  updateAdminInquiryStatus,
} from '../services/api';
import type {
  AdminAuditQuote,
  AdminListResponse,
  ContactInquiry,
  LeadStatus,
} from '../types/api';
import styles from './AdminDashboard.module.css';

type AdminTab = 'inquiries' | 'audit-quotes';
type StatusFilter = LeadStatus | 'ALL';

const TOKEN_KEY = 'c2s_admin_token';
const LEAD_STATUSES: LeadStatus[] = ['NEW', 'CONTACTED', 'IN_REVIEW', 'QUALIFIED', 'CLOSED'];
const STATUS_OPTIONS: StatusFilter[] = ['ALL', ...LEAD_STATUSES];
const PAGE_SIZE = 10;

const springTransition = {
  type: 'spring' as const,
  stiffness: 420,
  damping: 32,
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
};

const EMPTY_LIST = {
  items: [],
  total: 0,
  page: 1,
  limit: PAGE_SIZE,
  totalPages: 1,
};

function formatStatus(status: StatusFilter) {
  if (status === 'ALL') return 'All statuses';
  return status.replace('_', ' ').toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));
}

function StatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span className={[styles.badge, styles[`status${status}`]].join(' ')}>
      {formatStatus(status)}
    </span>
  );
}

function isInquiry(record: ContactInquiry | AdminAuditQuote): record is ContactInquiry {
  return 'name' in record;
}

function getPrimaryName(record: ContactInquiry | AdminAuditQuote) {
  return isInquiry(record) ? record.name : record.providerName;
}

function getRecordContext(record: ContactInquiry | AdminAuditQuote) {
  return isInquiry(record)
    ? record.practiceName || record.serviceNeeded
    : `${record.specialty}${record.monthlyBillingVolume ? ` · ${record.monthlyBillingVolume}` : ''}`;
}

function getRecordMessage(record: ContactInquiry | AdminAuditQuote) {
  return isInquiry(record) ? record.message : record.notes || 'No notes provided.';
}

export default function AdminDashboard() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || '');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [tab, setTab] = useState<AdminTab>('inquiries');
  const [status, setStatus] = useState<StatusFilter>('ALL');
  const [page, setPage] = useState(1);
  const [inquiries, setInquiries] = useState<AdminListResponse<ContactInquiry>>(EMPTY_LIST);
  const [auditQuotes, setAuditQuotes] = useState<AdminListResponse<AdminAuditQuote>>(EMPTY_LIST);
  const [loading, setLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const activeData = tab === 'inquiries' ? inquiries : auditQuotes;
  const activeItems = activeData.items;

  const metrics = useMemo(() => {
    const newOnPage = activeItems.filter((item) => item.status === 'NEW').length;
    const activeLabel = tab === 'inquiries' ? 'Contact inquiries' : 'Audit quote requests';

    return [
      { label: activeLabel, value: activeData.total, hint: 'Matching current view' },
      { label: 'New leads', value: newOnPage, hint: 'On this page' },
      { label: 'Active filter', value: formatStatus(status), hint: 'Applied to current tab' },
      { label: 'Page size', value: PAGE_SIZE, hint: 'Records per request' },
    ];
  }, [activeData.total, activeItems, status, tab]);

  const loadData = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    setError('');

    try {
      if (tab === 'inquiries') {
        setInquiries(await listAdminInquiries(token, { status, page, limit: PAGE_SIZE }));
      } else {
        setAuditQuotes(await listAdminAuditQuotes(token, { status, page, limit: PAGE_SIZE }));
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to load admin records.';
      setError(message);
      if (message.toLowerCase().includes('auth')) {
        localStorage.removeItem(TOKEN_KEY);
        setToken('');
      }
    } finally {
      setLoading(false);
    }
  }, [page, status, tab, token]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginLoading(true);
    setError('');
    setNotice('');

    try {
      const response = await adminLogin({ username, password });
      localStorage.setItem(TOKEN_KEY, response.token);
      setToken(response.token);
      setPassword('');
      setNotice('Signed in to the admin dashboard.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to sign in.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken('');
    setUsername('');
    setPassword('');
    setError('');
    setNotice('');
  };

  const handleTabChange = (nextTab: AdminTab) => {
    setTab(nextTab);
    setPage(1);
    setStatus('ALL');
    setError('');
    setNotice('');
  };

  const handleStatusChange = async (record: ContactInquiry | AdminAuditQuote, nextStatus: LeadStatus) => {
    if (record.status === nextStatus) return;

    setUpdatingId(record.id);
    setError('');
    setNotice('');

    try {
      if (tab === 'inquiries') {
        await updateAdminInquiryStatus(token, record.id, nextStatus);
      } else {
        await updateAdminAuditQuoteStatus(token, record.id, nextStatus);
      }
      setNotice(`Status updated to ${formatStatus(nextStatus)}.`);
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to update lead status.');
    } finally {
      setUpdatingId('');
    }
  };

  const handleExport = async () => {
    setError('');
    setNotice('');

    try {
      await downloadAdminExport(token, tab);
      setNotice('CSV export started.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to export CSV.');
    }
  };

  if (!token) {
    return (
      <main className={styles.page}>
        <div className={styles.backdropGrid} aria-hidden="true" />
        <motion.div
          className={styles.floatPanelOne}
          aria-hidden="true"
          animate={{ y: [0, -10, 0], rotate: [0, 1.5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className={styles.floatPanelTwo}
          aria-hidden="true"
          animate={{ y: [0, 12, 0], rotate: [0, -1.5, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.section
          className={styles.loginShell}
          aria-label="Admin login"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div className={styles.brand} variants={fadeUp}>
            <motion.span
              className={styles.brandMark}
              animate={{ boxShadow: ['0 10px 28px -12px rgba(15, 76, 129, 0.55)', '0 18px 38px -14px rgba(45, 156, 219, 0.62)', '0 10px 28px -12px rgba(15, 76, 129, 0.55)'] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ShieldCheck aria-hidden="true" />
            </motion.span>
            <span className={styles.brandText}>
              <span className={styles.eyebrow}>Care2Solutions</span>
              <span className={styles.brandName}>Admin Portal</span>
            </span>
          </motion.div>

          <motion.div
            className={[styles.panel, styles.loginCard].join(' ')}
            variants={fadeUp}
            transition={springTransition}
          >
            <div className={styles.loginHeader}>
              <h1 className={styles.loginTitle}>Lead management sign in</h1>
              <p className={styles.muted}>Access contact inquiries, audit quote requests, status workflow, and exports.</p>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  className={styles.error}
                  role="alert"
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                >
                  <AlertCircle aria-hidden="true" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <form className={styles.form} onSubmit={handleLogin}>
              <motion.div className={styles.field} variants={fadeUp}>
                <label htmlFor="admin-username">Username</label>
                <input
                  id="admin-username"
                  className={styles.input}
                  autoComplete="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required
                />
              </motion.div>

              <motion.div className={styles.field} variants={fadeUp}>
                <label htmlFor="admin-password">Password</label>
                <input
                  id="admin-password"
                  className={styles.input}
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </motion.div>

              <motion.button
                className={styles.button}
                type="submit"
                disabled={loginLoading}
                whileHover={!loginLoading ? { y: -2, scale: 1.01 } : undefined}
                whileTap={!loginLoading ? { scale: 0.98 } : undefined}
              >
                {loginLoading ? <Loader2 className={styles.spinIcon} aria-hidden="true" /> : <ShieldCheck aria-hidden="true" />}
                {loginLoading ? 'Signing in...' : 'Sign in'}
              </motion.button>
            </form>
          </motion.div>
        </motion.section>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.backdropGrid} aria-hidden="true" />
      <motion.div
        className={styles.floatPanelOne}
        aria-hidden="true"
        animate={{ y: [0, -8, 0], x: [0, 4, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className={styles.floatPanelTwo}
        aria-hidden="true"
        animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.section
        className={styles.shell}
        aria-label="Admin dashboard"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.header className={styles.topbar} variants={fadeUp}>
          <div>
            <div className={styles.eyebrow}>Lead operations</div>
            <h1 className={styles.pageTitle}>Admin dashboard</h1>
            <p className={styles.muted}>Review new submissions, move records through the sales workflow, and export lead data.</p>
          </div>

          <div className={styles.actions}>
            <motion.button className={styles.secondaryButton} type="button" onClick={() => void loadData()} disabled={loading} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <RefreshCw className={loading ? styles.spinIcon : undefined} aria-hidden="true" />
              Refresh
            </motion.button>
            <motion.button className={styles.secondaryButton} type="button" onClick={handleExport} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Download aria-hidden="true" />
              Export CSV
            </motion.button>
            <motion.button className={styles.secondaryButton} type="button" onClick={handleLogout} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <LogOut aria-hidden="true" />
              Sign out
            </motion.button>
          </div>
        </motion.header>

        <motion.div className={styles.statsGrid} aria-label="Lead summary" variants={staggerContainer}>
          {metrics.map((metric) => (
            <motion.div
              className={[styles.panel, styles.stat].join(' ')}
              key={metric.label}
              variants={fadeUp}
              whileHover={{ y: -4, boxShadow: '0 24px 55px -28px rgba(15, 76, 129, 0.36)' }}
              transition={springTransition}
            >
              <div className={styles.statLabel}>{metric.label}</div>
              <motion.div
                className={styles.statValue}
                key={`${metric.label}-${metric.value}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                {metric.value}
              </motion.div>
              <div className={styles.statHint}>{metric.hint}</div>
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.div
              className={styles.error}
              role="alert"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
            >
              <AlertCircle aria-hidden="true" />
              {error}
            </motion.div>
          )}

          {notice && (
            <motion.div
              className={styles.success}
              role="status"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
            >
              <ShieldCheck aria-hidden="true" />
              {notice}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div className={[styles.panel, styles.workspace].join(' ')} variants={fadeUp} transition={springTransition}>
          <div className={styles.toolbar}>
            <div className={styles.tabs} role="tablist" aria-label="Admin lead type">
              <motion.button
                className={[styles.tab, tab === 'inquiries' ? styles.tabActive : ''].join(' ')}
                type="button"
                role="tab"
                aria-selected={tab === 'inquiries'}
                onClick={() => handleTabChange('inquiries')}
                whileTap={{ scale: 0.98 }}
              >
                <Inbox aria-hidden="true" />
                Inquiries
                {tab === 'inquiries' && <motion.span className={styles.tabGlow} layoutId="adminTabGlow" />}
              </motion.button>
              <motion.button
                className={[styles.tab, tab === 'audit-quotes' ? styles.tabActive : ''].join(' ')}
                type="button"
                role="tab"
                aria-selected={tab === 'audit-quotes'}
                onClick={() => handleTabChange('audit-quotes')}
                whileTap={{ scale: 0.98 }}
              >
                <ClipboardList aria-hidden="true" />
                Audit quotes
                {tab === 'audit-quotes' && <motion.span className={styles.tabGlow} layoutId="adminTabGlow" />}
              </motion.button>
            </div>

            <div className={styles.filters}>
              <select
                className={styles.select}
                aria-label="Filter by status"
                value={status}
                onChange={(event) => {
                  setStatus(event.target.value as StatusFilter);
                  setPage(1);
                }}
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option} value={option}>{formatStatus(option)}</option>
                ))}
              </select>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                className={styles.loading}
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className={styles.spinner} aria-label="Loading records" />
              </motion.div>
            ) : activeItems.length === 0 ? (
              <motion.div
                className={styles.empty}
                key="empty"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
              >
                <div>
                  <motion.span
                    className={styles.emptyIcon}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <FileText aria-hidden="true" />
                  </motion.span>
                  <h2 className={styles.loginTitle}>No records found</h2>
                  <p className={styles.muted}>Try another status filter or refresh once new leads arrive.</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={`${tab}-${status}-${page}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.24 }}
              >
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Lead</th>
                      <th>Contact</th>
                      <th>Details</th>
                      <th>Created</th>
                      <th>Status</th>
                      <th>Update</th>
                    </tr>
                  </thead>
                  <motion.tbody variants={staggerContainer} initial="hidden" animate="visible">
                    {activeItems.map((record, index) => (
                      <motion.tr
                        key={record.id}
                        variants={fadeUp}
                        custom={index}
                        whileHover={{ backgroundColor: 'rgba(15, 76, 129, 0.035)' }}
                        transition={springTransition}
                      >
                        <td className={styles.primaryCell}>
                          <div className={styles.name}>{getPrimaryName(record)}</div>
                          <div className={styles.subtext}>{getRecordContext(record)}</div>
                        </td>
                        <td>
                          <div className={styles.name}>{record.email}</div>
                          <div className={styles.subtext}>{record.phone}</div>
                        </td>
                        <td>
                          <p className={styles.message}>{getRecordMessage(record)}</p>
                        </td>
                        <td>
                          <div className={styles.subtext}>{formatDate(record.createdAt)}</div>
                        </td>
                        <td>
                          <StatusBadge status={record.status} />
                        </td>
                        <td>
                          <div className={styles.rowActions}>
                            <select
                              className={styles.select}
                              aria-label={`Update status for ${getPrimaryName(record)}`}
                              value={record.status}
                              disabled={updatingId === record.id}
                              onChange={(event) => void handleStatusChange(record, event.target.value as LeadStatus)}
                            >
                              {LEAD_STATUSES.map((option) => (
                                <option key={option} value={option}>{formatStatus(option)}</option>
                              ))}
                            </select>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </motion.tbody>
                </table>
              </div>

              <div className={styles.mobileCards}>
                {activeItems.map((record) => (
                  <motion.article
                    className={styles.leadCard}
                    key={record.id}
                    variants={fadeUp}
                    whileHover={{ y: -3 }}
                    transition={springTransition}
                  >
                    <div className={styles.leadCardHeader}>
                      <div>
                        <div className={styles.name}>{getPrimaryName(record)}</div>
                        <div className={styles.subtext}>{getRecordContext(record)}</div>
                      </div>
                      <StatusBadge status={record.status} />
                    </div>
                    <div className={styles.leadMeta}>
                      <div className={styles.subtext}>{record.email} · {record.phone}</div>
                      <p className={styles.message}>{getRecordMessage(record)}</p>
                      <div className={styles.subtext}>{formatDate(record.createdAt)}</div>
                    </div>
                    <select
                      className={styles.select}
                      aria-label={`Update status for ${getPrimaryName(record)}`}
                      value={record.status}
                      disabled={updatingId === record.id}
                      onChange={(event) => void handleStatusChange(record, event.target.value as LeadStatus)}
                    >
                      {LEAD_STATUSES.map((option) => (
                        <option key={option} value={option}>{formatStatus(option)}</option>
                      ))}
                    </select>
                  </motion.article>
                ))}
              </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className={styles.pagination}>
            <div className={styles.pageInfo}>
              Page {activeData.page} of {activeData.totalPages} · {activeData.total} total records
            </div>
            <div className={styles.pagerButtons}>
              <motion.button
                className={styles.secondaryButton}
                type="button"
                disabled={loading || page <= 1}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Previous
              </motion.button>
              <motion.button
                className={styles.secondaryButton}
                type="button"
                disabled={loading || page >= activeData.totalPages}
                onClick={() => setPage((current) => current + 1)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Next
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.section>
    </main>
  );
}
