import PageMeta from "../../components/common/PageMeta";
import AiDiagnosisCard from "../../components/gis/AiDiagnosisCard";
import HealthIndex from "../../components/gis/HealthIndex";
import RealtimeWaveform from "../../components/gis/RealtimeWaveform";
import AlertPanel from "../../components/gis/AlertPanel";

export default function Home() {
  return (
    <>
      <PageMeta
        title="高压开关设备局部放电智能诊断平台"
        description="高压开关设备局部放电智能诊断平台 - 实时监测与AI诊断"
      />

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          高压开关设备局部放电智能诊断平台
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          实时监测设备状态，AI智能诊断，保障电力设备安全运行
        </p>
      </div>

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12">
          <HealthIndex />
        </div>

        <div className="col-span-12 xl:col-span-8">
          <RealtimeWaveform />
        </div>

        <div className="col-span-12 xl:col-span-4">
          <AlertPanel />
        </div>

        <div className="col-span-12">
          <AiDiagnosisCard />
        </div>
      </div>
    </>
  );
}