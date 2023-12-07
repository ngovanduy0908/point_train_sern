import ApiUtils from "utils/api/api";

const replaceValue = (value) => {
  return value ? value : 0;
};

export const getInfoForPhieuDiem = async (query) => {
  try {
    const res = await ApiUtils.get(`/students/phieu/info-and-point?${query}`);
    const newValue = {
      ...res.data,
      gvAbandon: replaceValue(res.data.gvAbandon),
      gvAchievementCity: replaceValue(res.data.gvAchievementCity),
      gvAchievementSchool: replaceValue(res.data.gvAchievementSchool),
      gvAdvise: replaceValue(res.data.gvAdvise),
      gvBonus: replaceValue(res.data.gvBonus),
      gvCitizen: replaceValue(res.data.gvCitizen),
      gvDiemTBHK: replaceValue(res.data.gvDiemTBHK),
      gvFullActive: replaceValue(res.data.gvFullActive),
      gvIrresponsible: replaceValue(res.data.gvIrresponsible),
      gvIrresponsibleMonitor: replaceValue(res.data.gvIrresponsibleMonitor),
      gvMonitor: replaceValue(res.data.gvMonitor),
      gvNCKH1: replaceValue(res.data.gvNCKH1),
      gvNCKH2: replaceValue(res.data.gvNCKH2),
      gvNCKH3: replaceValue(res.data.gvNCKH3),
      gvNoAtivities: replaceValue(res.data.gvNoAtivities),
      gvNoCard: replaceValue(res.data.gvNoCard),
      gvNoCultural: replaceValue(res.data.gvNoCultural),
      gvNoFullStudy: replaceValue(res.data.gvNoFullStudy),
      gvNoPayFee: replaceValue(res.data.gvNoPayFee),
      gvNoProtect: replaceValue(res.data.gvNoProtect),
      gvNoRegulation: replaceValue(res.data.gvNoRegulation),
      gvNote: replaceValue(res.data.gvNote),
      gvOlympic1: replaceValue(res.data.gvOlympic1),
      gvOlympic2: replaceValue(res.data.gvOlympic2),
      gvOlympic3: replaceValue(res.data.gvOlympic3),
      gvOlympic4: replaceValue(res.data.gvOlympic4),
      gvOnTime: replaceValue(res.data.gvOnTime),
      gvPositiveLove: replaceValue(res.data.gvPositiveLove),
      gvPositiveStudy: replaceValue(res.data.gvPositiveStudy),
      gvRightRule: replaceValue(res.data.gvRightRule),
      gvUnTrueTime: replaceValue(res.data.gvUnTrueTime),
      gvWarn: replaceValue(res.data.gvWarn),

      ltAbandon: replaceValue(res.data.ltAbandon),
      ltAchievementCity: replaceValue(res.data.ltAchievementCity),
      ltAchievementSchool: replaceValue(res.data.ltAchievementSchool),
      ltAdvise: replaceValue(res.data.ltAdvise),
      ltBonus: replaceValue(res.data.ltBonus),
      ltCitizen: replaceValue(res.data.ltCitizen),
      ltDiemTBHK: replaceValue(res.data.ltDiemTBHK),
      ltFullActive: replaceValue(res.data.ltFullActive),
      ltIrresponsible: replaceValue(res.data.ltIrresponsible),
      ltIrresponsibleMonitor: replaceValue(res.data.ltIrresponsibleMonitor),
      ltMonitor: replaceValue(res.data.ltMonitor),
      ltNCKH1: replaceValue(res.data.ltNCKH1),
      ltNCKH2: replaceValue(res.data.ltNCKH2),
      ltNCKH3: replaceValue(res.data.ltNCKH3),
      ltNoAtivities: replaceValue(res.data.ltNoAtivities),
      ltNoCard: replaceValue(res.data.ltNoCard),
      ltNoCultural: replaceValue(res.data.ltNoCultural),
      ltNoFullStudy: replaceValue(res.data.ltNoFullStudy),
      ltNoPayFee: replaceValue(res.data.ltNoPayFee),
      ltNoProtect: replaceValue(res.data.ltNoProtect),
      ltNoRegulation: replaceValue(res.data.ltNoRegulation),
      ltNote: replaceValue(res.data.ltNote),
      ltOlympic1: replaceValue(res.data.ltOlympic1),
      ltOlympic2: replaceValue(res.data.ltOlympic2),
      ltOlympic3: replaceValue(res.data.ltOlympic3),
      ltOlympic4: replaceValue(res.data.ltOlympic4),
      ltOnTime: replaceValue(res.data.ltOnTime),
      ltPositiveLove: replaceValue(res.data.ltPositiveLove),
      ltPositiveStudy: replaceValue(res.data.ltPositiveStudy),
      ltRightRule: replaceValue(res.data.ltRightRule),
      ltUnTrueTime: replaceValue(res.data.ltUnTrueTime),
      ltWarn: replaceValue(res.data.ltWarn),

      point_monitor: replaceValue(res.data.point_monitor),
      point_teacher: replaceValue(res.data.point_teacher),
    };
    console.log("new value: ", newValue);
    return newValue;
  } catch (error) {
    console.log("error: ", error);
  }
};
