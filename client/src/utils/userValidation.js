export const storeToken = (serverRes) => {
  let token = serverRes.data.token;
  const myExp = new Date(new Date().getTime() + 161 * 60 * 60);
  localStorage.setItem(
    "userValidation",
    JSON.stringify({
      username: serverRes.data.username,
      token,
      expiration: myExp.toISOString(),
    })
  );
};

export const clearLocalStorage = () =>
  localStorage.removeItem("userValidation");
