/**
 *
 * @param {字典数组} data
 * @param {需要翻译的code} code
 */
export const getDictName = (data, code) => {
  const target = data.find(item => item.code === code);
  if (target) {
    return target.name;
  } else {
    return '未知字典';
  }
};
