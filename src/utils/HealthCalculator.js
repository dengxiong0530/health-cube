
import { round } from '@/utils/common'

// src/utils/HealthCalculator.js
export class HealthCalculator {
  constructor(heightCm, weightKg, age, gender, waist, hip) {
    this.height = heightCm;
    this.weight = weightKg;
    this.age = age;
    this.gender = gender;
    this.waist = waist;
    this.hip = hip;
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

  // BMR 计算
  getBmr() {
    let bmr;
    if (gender === 2) {
      bmr = 88.362 + (13.397 * this.weight) + (4.799 * this.height) - (5.677 * this.age);
    } else {
      bmr = 447.593 + (9.247 * this.weight) + (3.098 * this.height) - (4.330 * this.age);
    }

    return {
      name: 'BMR',
      value: bmr,
      unit: 'kcal/day',
      interpretation: this._interpretBmr(bmr)
    };
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

  _getWhrCategory(whr) {
    if (this.gender === 2) {
      if (whr <= 0.90) return { tag: 'Normal', tagClass: 'medium' };
      if (whr < 1.00) return { tag: 'Moderate Risk', tagClass: 'high' };
      return { tag: 'High Risk', tagClass: 'obese' };
    } else {
      if (whr <= 0.85) return { tag: 'Normal', tagClass: 'medium' };
      if (whr < 0.90) return { tag: 'Moderate Risk', tagClass: 'high' };
      return { tag: 'High Risk', tagClass: 'obese' };

    }
  }

  _getAbsiCategory(absi) {
    if (absi < -0.868) return { tag: 'Very Low', tagClass: 'lowLess' };
    if (absi < -0.272) return { tag: 'Low Risk', tagClass: 'low' };
    if (absi < 0.229) return { tag: 'Average', tagClass: 'medium' };
    if (absi < 0.798) return { tag: 'High Risk', tagClass: 'high' };
    return { tag: 'Very High', tagClass: 'obese' };


  }

  // 私有方法：BMI 分类
  _getBmiCategory(bmi) {
    if (bmi < 18.5) return { tag: 'Underweight', tagClass: 'low' };
    if (bmi < 25) return { tag: 'Normal', tagClass: 'medium' };
    if (bmi < 30) return { tag: 'Overweight', tagClass: 'high' };
    return { tag: "Obesity", tagClass: 'obese' };

  }

  // 私有方法：解释 BMR 结果
  _interpretBmr(bmr) {
    if (bmr < 1200) return '低基础代谢';
    if (bmr < 1800) return '中等基础代谢';
    return '高基础代谢';
  }
}