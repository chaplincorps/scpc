'use client'

import DashboardLogic from "./DashboardLogic";
import { useLogout } from "@/hooks/useLogout";

export default function DashboardView() {
    const {user, dashboardData, dashboardError, handleRefresh} = DashboardLogic();
    const { isLoggingOut } = useLogout();

    // Show error state
    if (dashboardError && !dashboardData) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <div className="mb-4 text-red-600">
                        <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-lg font-semibold">Error Loading Dashboard</p>
                        <p className="mt-1 text-sm text-gray-500">{dashboardError}</p>
                    </div>
                    <button
                        onClick={handleRefresh}
                        className="px-4 py-2 text-white transition-colors bg-[#006699] rounded-md hover:bg-[#005588]"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        )
    }

    // If no user, don't show anything - let the auth redirect handle it
    if (!user) {
        return null;
    }

    return (
           <div className="min-h-screen p-4 bg-gradient-to-br from-gray-50 to-blue-50 md:p-6">
                  <div className="mx-auto max-w-7xl">
                     {/* Application ID Section - Full Width */}
                     <div className="bg-[#006699] text-white rounded-xl shadow-lg p-4 md:p-6 mb-6 animate-fade-in">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                           <div className="flex-1">
                           <h1 className="mb-2 text-2xl font-bold md:text-3xl">SCPC Application Portal</h1>
                           <p className="text-base text-blue-100 md:text-lg">
                              Special Chaplain Peace Corps - Track your application progress
                           </p>
                           </div>
                           <div className="p-4 text-center bg-[#ffffff] rounded-lg bg-opacity-20 backdrop-blur-sm md:text-right">
                           <p className="mb-1 text-sm text-[#006699]">Application ID</p>
                           <p className="text-lg font-bold md:text-xl text-[#706699]">{user.application_id || 'SCPC012345'}</p>
                           </div>
                        </div>
                     </div>
                  </div>
           </div>
    );
}