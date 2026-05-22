import PageMeta from "../components/common/PageMeta";

export default function DataReportPage() {
  return (
    <>
      <PageMeta
        title="数据报表 - 高压开关设备局部放电智能诊断平台"
        description="数据报表页面"
      />

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          数据报表
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          查看和导出设备监测数据报表
        </p>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 xl:col-span-6">
          <div className="rounded-xl bg-gray-50 dark:bg-gis-dark-800 border border-gray-200 dark:border-gis-dark-600 p-6 shadow-theme-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              日报表
            </h3>
            <div className="flex items-center justify-center py-8">
              <div className="w-16 h-16 rounded-xl bg-gis-cyan-500/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-gis-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
            </div>
            <button className="w-full mt-4 py-2 rounded-lg bg-gis-cyan-500/10 text-gis-cyan-500 text-sm font-medium hover:bg-gis-cyan-500/20 transition-colors">
              生成日报
            </button>
          </div>
        </div>

        <div className="col-span-12 xl:col-span-6">
          <div className="rounded-xl bg-gray-50 dark:bg-gis-dark-800 border border-gray-200 dark:border-gis-dark-600 p-6 shadow-theme-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              周报表
            </h3>
            <div className="flex items-center justify-center py-8">
              <div className="w-16 h-16 rounded-xl bg-gis-purple-500/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-gis-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                  <line x1="3" y1="14" x2="21" y2="14" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </div>
            </div>
            <button className="w-full mt-4 py-2 rounded-lg bg-gis-purple-500/10 text-gis-purple-500 text-sm font-medium hover:bg-gis-purple-500/20 transition-colors">
              生成周报
            </button>
          </div>
        </div>

        <div className="col-span-12 xl:col-span-6">
          <div className="rounded-xl bg-gray-50 dark:bg-gis-dark-800 border border-gray-200 dark:border-gis-dark-600 p-6 shadow-theme-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              月报表
            </h3>
            <div className="flex items-center justify-center py-8">
              <div className="w-16 h-16 rounded-xl bg-gis-green-500/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-gis-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                  <line x1="3" y1="14" x2="21" y2="14" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="22" x2="21" y2="22" />
                </svg>
              </div>
            </div>
            <button className="w-full mt-4 py-2 rounded-lg bg-gis-green-500/10 text-gis-green-500 text-sm font-medium hover:bg-gis-green-500/20 transition-colors">
              生成月报
            </button>
          </div>
        </div>

        <div className="col-span-12 xl:col-span-6">
          <div className="rounded-xl bg-gray-50 dark:bg-gis-dark-800 border border-gray-200 dark:border-gis-dark-600 p-6 shadow-theme-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              自定义报表
            </h3>
            <div className="flex items-center justify-center py-8">
              <div className="w-16 h-16 rounded-xl bg-gis-yellow-500/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-gis-yellow-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <path d="M16 3h5v5M4 20h5v-5M20 20h-5v-5M16 11h5v5M4 3h5v5" />
                </svg>
              </div>
            </div>
            <button className="w-full mt-4 py-2 rounded-lg bg-gis-yellow-500/10 text-gis-yellow-500 text-sm font-medium hover:bg-gis-yellow-500/20 transition-colors">
              创建自定义报表
            </button>
          </div>
        </div>
      </div>
    </>
  );
}