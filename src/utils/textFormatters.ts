export const convert_to_normal_text = (str: string) => {
  if (typeof str !== 'string' || str === '') return '';
  return str
    .split('_')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
};
