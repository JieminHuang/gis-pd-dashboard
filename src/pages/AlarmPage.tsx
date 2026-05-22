import PageMeta from "../components/common/PageMeta";
import AlertPanel from "../components/gis/AlertPanel";

export default function AlarmPage() {
  return (
    <>
      <PageMeta
        title="告警管理 - 高压开关设备局部放电智能诊断平台"
        description="告警管理页面"
      />

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          告警管理
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          管理和处理设备告警信息
        </p>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 xl:col-span-8">
          <AlertPanel />
        </div>

        <div className="col-span-12 xl:col-span-4">
          <div className="rounded-xl bg-gray-50 dark:bg-gis-dark-800 border border-gray-200 dark:border-gis-dark-600 p-6 shadow-theme-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              告警统计
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-gis-red-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">严重告警</span>
                </div>
                <span className="text-lg font-bold text-gis-red-500">2</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-gis-yellow-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">警告告警</span>
                </div>
                <span className="text-lg font-bold text-gis-yellow-500">3</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-gis-cyan-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">信息告警</span>
                </div>
                <span className="text-lg font-bold text-gis-cyan-500">5</span>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gis-dark-600">
                <span className="text-sm text-gray-600 dark:text-gray-300">总计</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">10</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}