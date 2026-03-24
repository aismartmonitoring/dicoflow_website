'use client';

import { useState, useCallback } from 'react';
import { siteConfig } from '@/config/site-config';
import { Lock, Download, RefreshCw, LogOut, Search } from 'lucide-react';
import type { Enquiry } from '@/lib/types';

export default function AdminPage() {
  const [apiKey, setApiKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const fetchEnquiries = useCallback(async (key: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/admin/enquiries`, {
        headers: { 'x-api-key': key },
      });
      if (!res.ok) throw new Error(res.status === 401 ? 'Invalid API key' : 'Failed to fetch');
      const data = await res.json();
      setEnquiries(data.enquiries || []);
      setIsAuthenticated(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) fetchEnquiries(apiKey.trim());
  };

  const handleExportCsv = () => {
    window.open(`/api/admin/enquiries?format=csv&key=${encodeURIComponent(apiKey)}`, '_blank');
  };

  const filtered = enquiries.filter((e) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      e.fullName.toLowerCase().includes(q) ||
      e.organization.toLowerCase().includes(q) ||
      e.email.toLowerCase().includes(q) ||
      e.interestedTier.toLowerCase().includes(q)
    );
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <div className="flex items-center justify-center mb-6">
              <div className="w-14 h-14 rounded-xl bg-slate-900 flex items-center justify-center">
                <Lock className="w-7 h-7 text-white" />
              </div>
            </div>
            <h1 className="text-xl font-bold text-slate-900 text-center mb-1">Admin Access</h1>
            <p className="text-sm text-slate-500 text-center mb-6">
              Enter your API key to view enquiries
            </p>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter ADMIN_API_KEY"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                autoFocus
              />
              {error && <p className="text-xs text-red-500 text-center">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Authenticate'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-slate-900">{siteConfig.company.name} — Enquiry Dashboard</h1>
            <p className="text-sm text-slate-500">{enquiries.length} total enquiries</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchEnquiries(apiKey)}
              className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={handleExportCsv}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <Download className="w-4 h-4" /> Export CSV
            </button>
            <button
              onClick={() => { setIsAuthenticated(false); setApiKey(''); setEnquiries([]); }}
              className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-red-100 hover:text-red-600 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, org, email, tier..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">#</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Date</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Name</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Organization</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Email</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Phone</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Tier</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Branches</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-12 text-sm text-slate-400">
                      {search ? 'No enquiries match your search' : 'No enquiries yet'}
                    </td>
                  </tr>
                ) : (
                  filtered.map((e, i) => (
                    <tr key={e.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 text-xs text-slate-400">{i + 1}</td>
                      <td className="py-3 px-4 text-xs text-slate-600">
                        {new Date(e.timestamp).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-slate-900">{e.fullName}</td>
                      <td className="py-3 px-4 text-sm text-slate-600">{e.organization}</td>
                      <td className="py-3 px-4 text-sm text-slate-600">{e.email}</td>
                      <td className="py-3 px-4 text-sm text-slate-600">{e.phone || '—'}</td>
                      <td className="py-3 px-4">
                        {e.interestedTier ? (
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-sky-50 text-sky-700">{e.interestedTier}</span>
                        ) : (
                          <span className="text-xs text-slate-400">—</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-600">{e.branchCount}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          e.status === 'new' ? 'bg-emerald-50 text-emerald-700' :
                          e.status === 'contacted' ? 'bg-amber-50 text-amber-700' :
                          'bg-slate-100 text-slate-500'
                        }`}>
                          {e.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
