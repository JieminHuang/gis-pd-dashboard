import PageMeta from "../components/common/PageMeta";

export default function SettingPage() {
  return (
    <>
      <PageMeta
        title="系统设置 - 高压开关设备局部放电智能诊断平台"
        description="系统设置页面"
      />

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          系统设置
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          配置系统参数和用户偏好设置
        </p>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 xl:col-span-6">
          <div className="rounded-xl bg-gray-50 dark:bg-gis-dark-800 border border-gray-200 dark:border-gis-dark-600 p-6 shadow-theme-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              基本设置
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">平台名称</label>
                <input
                  type="text"
                  defaultValue="高压开关设备局部放电智能诊断平台"
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gis-dark-700 border border-gray-200 dark:border-gis-dark-600 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-gis-cyan-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">自动刷新间隔</label>
                <select className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gis-dark-700 border border-gray-200 dark:border-gis-dark-600 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-gis-cyan-500/50">
                  <option>5秒</option>
                  <option>10秒</option>
                  <option>30秒</option>
                  <option>1分钟</option>
                  <option>5分钟</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">告警通知</label>
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-100 dark:bg-gis-dark-700">
                  <span className="text-sm text-gray-600 dark:text-gray-300">启用告警推送</span>
                  <button className="w-10 h-5 rounded-full bg-gis-cyan-500 relative transition-colors">
                    <span className="absolute top-1 right-1 w-3 h-3 rounded-full bg-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 xl:col-span-6">
          <div className="rounded-xl bg-gray-50 dark:bg-gis-dark-800 border border-gray-200 dark:border-gis-dark-600 p-6 shadow-theme-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              用户设置
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">用户名</label>
                <input
                  type="text"
                  defaultValue="管理员"
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gis-dark-700 border border-gray-200 dark:border-gis-dark-600 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-gis-cyan-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">邮箱地址</label>
                <input
                  type="email"
                  defaultValue="admin@gis-diagnosis.com"
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gis-dark-700 border border-gray-200 dark:border-gis-dark-600 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-gis-cyan-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">密码</label>
                <input
                  type="password"
                  defaultValue="********"
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gis-dark-700 border border-gray-200 dark:border-gis-dark-600 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-gis-cyan-500/50"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12">
          <div className="rounded-xl bg-gray-50 dark:bg-gis-dark-800 border border-gray-200 dark:border-gis-dark-600 p-6 shadow-theme-md">
            <div className="flex justify-end gap-3">
              <button className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gis-dark-700 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gis-dark-600 transition-colors">
                取消
              </button>
              <button className="px-4 py-2 rounded-lg bg-gis-cyan-500 text-white text-sm font-medium hover:bg-gis-cyan-600 transition-colors">
                保存设置
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}