
import { round } from '@/utils/common'

// src/utils/HealthCalculator.js
export class HealthCalculator {
  constructor(heightCm, weightKg, age, gender, waist, hip, neck) {
    this.height = heightCm;
    this.weight = weightKg;
    this.age = age;
    this.gender = gender;
    this.waist = waist;
    this.hip = hip;
    this.neck = neck
  }

  getNavyBodyFat() {
    let nbf = 0;
    if (this.gender === 1) {
      nbf = 495 / (1.29579 - 0.35004 * Math.log10(this.waist + this.hip - this.neck) + 0.22100 * Math.log10(this.height)) - 450
    } else {
      nbf = 495 / (1.0324 - 0.19077 * Math.log10(this.waist - this.neck) + 0.15456 * Math.log10(this.height)) - 450
    }

    return {
      name: 'BodyFat',
      tagValue: round(nbf, 2),
      ...this._getNavyBodyFatCategory(nbf)
    }
  }





  // BMI 计算
  getBmi() {
    const bmi = round((this.weight / ((this.height / 100) ** 2)), 2);
    return {
      name: 'BMI',
      tagValue: bmi,
      ...this._getBmiCategory(bmi)
    };
  }

  getIdealWeight() {
    if (this.gender === 1) {
      return { name: 'IdealWeight', tagValue: round((this.height - 70) * 0.6, 2) + ' kg' }
    } else {
      return { name: 'IdealWeight', tagValue: round((this.height - 80) * 0.7, 2) + ' kg' }
    }
  }

  getHeartRate() {
    // if (!this.age) {
    //   return null;
    // }
    const mhr = 220 - this.age;

    const lhr = mhr * 0.6;
    const hhr = mhr * 0.8;
    //  console.log( round(lhr) +'~' + round(hhr))
    return {
      name: 'TargetHeartRate',
      tagValue: round(lhr, 1) + '~' + round(hhr, 1)
    }
  }



  getABSI() {
    const bmi = round((this.weight / ((this.height / 100) ** 2)), 2);
    const absi = round((this.waist / 100) / (Math.pow(bmi, 2 / 3) * Math.pow((this.height / 100), 1 / 2)), 4);
    return {
      name: 'ABSI',
      tagValue: absi,
      ...this._getAbsiCategory(absi)
    };
  }

  getWaistToHip() {
    const whr = round(this.waist / this.hip, 2);
    return {
      name: 'WHR',
      tagValue: whr,
      ...this._getWhrCategory(whr)
    };
  }


  _getNavyBodyFatCategory(nbf) {
    if (this.gender === 2) {

      if (nbf <= 10) return { tag: 'Low', tagClass: 'low', tagName: "Low" };
      if (nbf < 20) return { tag: 'Normal', tagClass: 'medium', tagName: "Normal" };
      if (nbf < 30) return { tag: 'High', tagClass: 'high', tagName: "High" };
      return { tag: 'Very High', tagClass: 'obese', tagName: "VeryHigh" };
    } else {
      if (nbf < 20) return { tag: 'Low', tagClass: 'low', tagName: "Low" };
      if (nbf < 30) return { tag: 'Normal', tagClass: 'medium', tagName: "Normal" };
      if (nbf < 39) return { tag: 'High', tagClass: 'high', tagName: "High" };
      return { tag: 'Very High', tagClass: 'obese', tagName: "Very High" };
    }
  }

  _getWhrCategory(whr) {
    if (this.gender === 2) {
      if (whr <= 0.90) return { tag: 'Normal', tagClass: 'medium', tagName: "Normal" };
      if (whr < 1.00) return { tag: 'Moderate Risk', tagClass: 'high', tagName: "Moderate" };
      return { tag: 'High Risk', tagClass: 'obese', tagName: "High" };
    } else {
      if (whr <= 0.85) return { tag: 'Normal', tagClass: 'medium', tagName: "Normal" };
      if (whr < 0.90) return { tag: 'Moderate Risk', tagClass: 'high', tagName: "Moderate" };
      return { tag: 'High Risk', tagClass: 'obese', tagName: "High" };

    }
  }

  _getAbsiCategory(absi) {
    if (absi < -0.868) return { tag: 'Very Low', tagClass: 'lowLess', tagName: "VeryLow" };
    if (absi < -0.272) return { tag: 'Low Risk', tagClass: 'low', tagName: "LowRisk" };
    if (absi < 0.229) return { tag: 'Average', tagClass: 'medium', tagName: "Average" };
    if (absi < 0.798) return { tag: 'High Risk', tagClass: 'high', tagName: "HighRisk" };
    return { tag: 'Very High', tagClass: 'obese', tagName: "VeryHigh" };


  }

  // 私有方法：BMI 分类
  _getBmiCategory(bmi) {
    if (bmi < 18.5) return { tag: 'Underweight', tagClass: 'low', tagName: "Under" };
    if (bmi < 25) return { tag: 'Normal', tagClass: 'medium', tagName: "Normal" };
    if (bmi < 30) return { tag: 'Overweight', tagClass: 'high', tagName: "Over" };
    return { tag: "Obesity", tagClass: 'obese', tagName: "Obesity" };

  }

}