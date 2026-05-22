import PageMeta from "../components/common/PageMeta";
import AiDiagnosisCard from "../components/gis/AiDiagnosisCard";

export default function DiagnosisPage() {
  return (
    <>
      <PageMeta
        title="AI智能诊断 - 高压开关设备局部放电智能诊断平台"
        description="AI智能诊断页面"
      />

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          AI智能诊断
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          基于人工智能的设备故障诊断分析
        </p>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <AiDiagnosisCard />
        </div>

        <div className="col-span-12 xl:col-span-6">
          <div className="rounded-xl bg-gray-50 dark:bg-gis-dark-800 border border-gray-200 dark:border-gis-dark-600 p-6 shadow-theme-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              诊断历史
            </h3>
            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center justify-between p-3 rounded-lg bg-gray-100 dark:bg-gis-dark-700">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">诊断记录 #{item}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">2024-01-15 14:30:00</p>
                  </div>
                  <span className="px-2 py-1 rounded-full bg-gis-green-500/20 text-gis-green-500 text-xs font-medium">
                    正常
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-12 xl:col-span-6">
          <div className="rounded-xl bg-gray-50 dark:bg-gis-dark-800 border border-gray-200 dark:border-gis-dark-600 p-6 shadow-theme-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              诊断模型
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-100 dark:bg-gis-dark-700">
                <span className="text-sm text-gray-700 dark:text-gray-300">模型版本</span>
                <span className="text-sm font-medium text-gis-cyan-500">v2.1.0</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-100 dark:bg-gis-dark-700">
                <span className="text-sm text-gray-700 dark:text-gray-300">准确率</span>
                <span className="text-sm font-medium text-gis-green-500">98.5%</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-100 dark:bg-gis-dark-700">
                <span className="text-sm text-gray-700 dark:text-gray-300">训练数据</span>
                <span className="text-sm font-medium text-gis-purple-500">100K+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}