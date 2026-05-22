import PageMeta from "../components/common/PageMeta";

export default function DeviceManagement() {
  return (
    <>
      <PageMeta
        title="高压开关设备管理 - 高压开关设备局部放电智能诊断平台"
        description="高压开关设备管理页面"
      />

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          高压开关设备管理
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          管理和监控高压开关设备状态
        </p>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <div className="rounded-xl bg-gray-50 dark:bg-gis-dark-800 border border-gray-200 dark:border-gis-dark-600 p-8 shadow-theme-md">
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-20 h-20 rounded-xl bg-gis-cyan-500/10 flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-gis-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                高压开关设备管理
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
                设备列表、设备详情、维护记录、设备配置等功能将在此页面展示
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}