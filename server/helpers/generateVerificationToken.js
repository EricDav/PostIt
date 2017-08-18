const generateCode = () => {
  const generatedCode = Math.floor(Math.random() * 10000000);
  return generatedCode.toString();
};

export default generateCode;
