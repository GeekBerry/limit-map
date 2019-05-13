function sleepMs(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 并发执行
 * 依赖 javascript 以下特性:
 *  [-1] + 1 === NaN
 *  NaN || -Infinity === -Infinity
 *  Math.max(-Infinity, 1) === 1
 *
 * @param array {[]} 参数列表
 * @param func {function} 函数
 * @param limit {Number} 并发量, array 太长时建议明确 limit 参数.
 * @param qps {Number} 每秒最大发射数量
 * @param deltaMs {Number} 最短发射间隔
 * @return {Promise<[Object|Error, ...]>}
 */
async function limitMap(array, func, { limit = Infinity, qps = Infinity, deltaMs = 0 } = {}) {
  let index = 0;
  const emitTimeArray = []; // 发射时间列表

  let error;
  const results = [];

  async function worker() {
    while (!error && index < array.length) {
      const i = index;
      index += 1;

      const now = Date.now();

      // 最小 limit 限制时间, 距前 qps 个发射至少 1000 毫秒.
      const minLimitTime = emitTimeArray[emitTimeArray.length - qps] + 1000 || -Infinity;

      // 最小 delay 间隔时间, 距前 1 个发射至少 deltaMs 毫秒.
      const minDelayTime = emitTimeArray[emitTimeArray.length - 1] + deltaMs || -Infinity;

      const emitTime = Math.max(minLimitTime, minDelayTime, now);
      emitTimeArray.push(emitTime);
      await sleepMs(emitTime - now);

      results[i] = await func(array[i], i, array);
    }
  }

  const workers = [];
  for (let i = 0; i < Math.min(limit, array.length); i += 1) {
    workers.push(worker());
  }

  try {
    await Promise.all(workers);
  } catch (e) { // 抓住第一个 error
    error = e;
    throw e;
  }

  return results;
}

module.exports = limitMap;
module.exports.sleepMs = sleepMs;
