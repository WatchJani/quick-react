import React, { useEffect, useState } from 'react';
import { fetchReports, updateReportStatus } from '../api/api';

const ReportList = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadReports = async () => {
        try {
            const data = await fetchReports();
            setReports(data);
        } catch (err) {
            console.error('Error loading reports:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (reportId, newStatus) => {
        try {
            await updateReportStatus(reportId, newStatus);
            setReports(prev => prev.filter(r => r.report_id !== reportId)); // remove locally
        } catch (err) {
            console.error(`Error updating report status to ${newStatus}:`, err);
        }
    };

    useEffect(() => {
        loadReports();
    }, []);

    if (loading) return <p>Loading reports...</p>;

    return (
        <div>
            <h2>Reports Management</h2>
            {reports.length === 0 ? (
                <p>No pending reports.</p>
            ) : (
                <ul>
                    {reports.map(report => (
                        <li key={report.report_id}>
                            <p><strong>Type:</strong> {report.type}</p>
                            <p><strong>Reason:</strong> {report.reason}</p>
                            <p><strong>Date:</strong> {new Date(report.date_reported).toLocaleString()}</p>
                            <p><strong>Status:</strong> {report.status}</p>

                            <button onClick={() => handleStatusChange(report.report_id, 'approved')}>
                                Approve
                            </button>
                            <button onClick={() => handleStatusChange(report.report_id, 'rejected')}>
                                Reject
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ReportList;