"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BiTrash, BiCheck, BiUserX, BiLinkExternal, BiImage } from 'react-icons/bi';
import Link from 'next/link';

export default function AdminClient({ reports: initialReports, config: initialConfig }: { reports: any[]; config: any }) {
  const [reports, setReports] = useState(initialReports);
  const [config, setConfig] = useState(initialConfig);
  const router = useRouter();

  const handleUpdateConfig = async () => {
    const newName = prompt('Enter site name:', config.siteName);
    const newLogo = prompt('Enter logo URL:', config.logo);
    
    if (newName || newLogo) {
      try {
        const res = await fetch('/api/admin/config', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ siteName: newName, logo: newLogo }),
        });
        if (res.ok) {
          const data = await res.json();
          setConfig(data);
          router.refresh();
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleAction = async (reportId: string, action: string) => {
    // Implement resolution/deletion logic here
    alert(`Action ${action} on report ${reportId}`);
  };

  return (
    <div className="space-y-8">
      {/* Site Config Section */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Site Configuration</h2>
          <button 
            onClick={handleUpdateConfig}
            className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-sm font-semibold rounded-xl transition-colors"
          >
            Update Settings
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-zinc-50 dark:bg-zinc-800/30 rounded-2xl flex items-center gap-4">
            <div className="h-12 w-12 bg-white dark:bg-zinc-900 rounded-xl flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
               <img src={config.logo} alt="Logo" className="max-h-8 max-w-8" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-zinc-400">Current Logo</p>
              <p className="text-sm font-medium dark:text-white truncate max-w-[200px]">{config.logo}</p>
            </div>
          </div>
          <div className="p-4 bg-zinc-50 dark:bg-zinc-800/30 rounded-2xl flex items-center gap-4">
             <div className="h-12 w-12 bg-white dark:bg-zinc-900 rounded-xl flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
               <span className="font-bold text-green-600">Aa</span>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-zinc-400">Site Name</p>
              <p className="text-sm font-medium dark:text-white">{config.siteName}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reports Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Pending Reports</h2>
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800">
                  <th className="p-4 text-[10px] font-bold uppercase text-zinc-400">Reporter</th>
                  <th className="p-4 text-[10px] font-bold uppercase text-zinc-400">Reason</th>
                  <th className="p-4 text-[10px] font-bold uppercase text-zinc-400">Target</th>
                  <th className="p-4 text-[10px] font-bold uppercase text-zinc-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {reports.map((report: any) => (
                  <tr key={report._id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-colors">
                    <td className="p-4">
                      <p className="font-semibold text-zinc-900 dark:text-white text-sm">{report.reporter.name}</p>
                      <p className="text-xs text-zinc-500">{report.reporter.ugNumber}</p>
                    </td>
                    <td className="p-4 text-sm text-zinc-600 dark:text-zinc-400">
                      {report.reason}
                    </td>
                    <td className="p-4">
                      {report.reportedPost ? (
                        <Link href={`/`} className="text-green-600 hover:underline flex items-center gap-1 text-sm font-medium">
                           View Post <BiLinkExternal />
                        </Link>
                      ) : (
                        <Link href={`/profile/${report.reportedUser?._id}`} className="text-green-600 hover:underline flex items-center gap-1 text-sm font-medium">
                           View Profile <BiLinkExternal />
                        </Link>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                          <button onClick={() => handleAction(report._id, 'resolve')} className="p-2 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-lg hover:bg-green-100 dark:hover:bg-green-800/40 transition-colors" title="Resolve">
                              <BiCheck />
                          </button>
                          <button onClick={() => handleAction(report._id, 'delete')} className="p-2 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-lg hover:bg-red-100 dark:hover:bg-red-800/40 transition-colors" title="Delete Content">
                              <BiTrash />
                          </button>
                          <button onClick={() => handleAction(report._id, 'ban')} className="p-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors" title="Ban User">
                              <BiUserX />
                          </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {reports.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-zinc-500">No pending reports.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
