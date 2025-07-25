/**
 * 处理体重数据，提取所需的统计信息和图表数据（带容错处理）
 * @param {Array} data - 原始体重数据数组（可能为非数组类型）
 * @returns {Object} 处理后的各项数据
 */
export function processWeightData(data) {
  // 关键：先校验data是否为数组，不是则转为空数组（避免"not iterable"错误）
  const validData = Array.isArray(data) ? data : [];

  // 1. 复制数据并按日期排序（确保按时间顺序排列）
  const sortedData = [...validData].sort((a, b) => {
    // 额外容错：如果数据项没有day字段，避免排序报错
    const dateA = a.day ? new Date(a.day) : new Date(0);
    const dateB = b.day ? new Date(b.day) : new Date(0);
    return dateA - dateB;
  });

  // 2. 提取x轴数据（日期）和系列数据（体重）
  const xAxisData = sortedData.map(item => item.day || ''); // 容错：无day时用空字符串
  const seriesData = sortedData.map(item => {
    // 容错：确保weight是数字（非数字时用null）
    return typeof item.weight === 'number' && !isNaN(item.weight) ? item.weight : null;
  }).filter(weight => weight !== null); // 过滤无效的体重值

  // 3. 计算最小体重和最大体重（只处理有效数字）
  const minWeight = seriesData.length > 0 ? Math.min(...seriesData) : null;
  const maxWeight = seriesData.length > 0 ? Math.max(...seriesData) : null;

  // 4. 数据总条数（基于有效数据）
  const days = validData.length;

  // 5. 计算体重变化（最早记录 - 最晚记录，只处理有效数据）
  let weightChange = null;
  if (sortedData.length >= 2) {
    const firstValid = sortedData.find(item => typeof item.weight === 'number' && !isNaN(item.weight));
    const lastValid = sortedData.slice().reverse().find(item => typeof item.weight === 'number' && !isNaN(item.weight));
    
    if (firstValid && lastValid) {
      weightChange = Number((lastValid.weight - firstValid.weight).toFixed(1));
    }
  }

  return {
    xAxisData,
    seriesData,
    minWeight,
    maxWeight,
    days,
    weightChange
  };
}
