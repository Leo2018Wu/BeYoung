/**
 *
 * @param {字典数组} data
 * @param {需要翻译的code} code
 */
const getDictName = (data, code) => {
  const target = data.find(item => item.code === code);
  if (target) {
    return target.name;
  }
};
module.exports = {
  getDictName,
};
