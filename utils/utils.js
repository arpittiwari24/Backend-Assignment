
const validateUrl = (url) => {
    const pattern = /^(http|https):\/\/[^ "]+$/;
    return pattern.test(url);
  };

export default validateUrl;