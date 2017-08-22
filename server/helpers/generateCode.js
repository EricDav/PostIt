const generateCode = () => {
  const number = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const alpha = ['a', 'B', 'c', 'D', 'e', 'F', 'g', 'H', 'i', 'J', 'k', 'L', 'm',
    'N', 'o', 'P', 'q', 'R', 's', 'T', 'u', 'V', 'w', 'X', 'y', 'Z'];
  const char = ['@', '%', '?', '+', '-', '$', '#'];
  let secretCode = '';
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].forEach((num) => {
    if (num < 3 || num > 8) {
      secretCode = `${secretCode}${number[Math.floor(Math.random() * 10)]}`;
    } else if (num > 2 && num < 7) {
      secretCode = `${secretCode}${alpha[Math.floor(Math.random() * 26)]}`;
    } else {
      secretCode = `${secretCode}${char[Math.floor(Math.random() * 7)]}`;
    }
  });
  return secretCode;
};

export default generateCode;
