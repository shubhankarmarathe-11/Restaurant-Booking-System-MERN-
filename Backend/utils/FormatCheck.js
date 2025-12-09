const ValidateEmail = async (email) => {
  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return false;
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const ValidatePassword = async (password) => {
  try {
    if (String(password).length >= 8) return true;
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export { ValidateEmail, ValidatePassword };
