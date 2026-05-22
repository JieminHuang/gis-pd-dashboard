import PageMeta from "../components/common/PageMeta";
import RealtimeWaveform from "../components/gis/RealtimeWaveform";

export default function MonitorPage() {
  return (
    <>
      <PageMeta
        title="局部放电监测 - 高压开关设备局部放电智能诊断平台"
        description="局部放电实时监测页面"
      />

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          局部放电监测
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          实时监测高压开关设备局部放电信号
        </p>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <RealtimeWaveform />
        </div>

        <div className="col-span-12">
          <div className="rounded-xl bg-gray-50 dark:bg-gis-dark-800 border border-gray-200 dark:border-gis-dark-600 p-6 shadow-theme-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              监测参数
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="rounded-lg bg-gray-100 dark:bg-gis-dark-700 p-4 border border-gray-200 dark:border-gis-dark-600">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">采样率</p>
                <p className="text-xl font-bold text-gis-cyan-500">1 MS/s</p>
              </div>
              <div className="rounded-lg bg-gray-100 dark:bg-gis-dark-700 p-4 border border-gray-200 dark:border-gis-dark-600">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">分辨率</p>
                <p className="text-xl font-bold text-gis-cyan-500">16 位</p>
              </div>
              <div className="rounded-lg bg-gray-100 dark:bg-gis-dark-700 p-4 border border-gray-200 dark:border-gis-dark-600">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">通道数</p>
                <p className="text-xl font-bold text-gis-cyan-500">4 通道</p>
              </div>
              <div className="rounded-lg bg-gray-100 dark:bg-gis-dark-700 p-4 border border-gray-200 dark:border-gis-dark-600">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">运行状态</p>
                <p className="text-xl font-bold text-gis-green-500">正常</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}