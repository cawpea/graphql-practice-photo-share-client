import { FC, useState, useEffect } from "react";

export const AuthorizedUser: FC = () => {
  const [isSigningIn, setSigningIn] = useState<boolean>(false);

  const requestCode = () => {
    const clientId = "0ed0924c4c2512563c17";
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user`;
  };

  useEffect(() => {
    if (window.location.search.match(/code=/)) {
      setSigningIn(true);
      const code = window.location.search.replace("?code=", "");
      alert(code);
    }
  }, []);

  return (
    <button type="button" onClick={() => requestCode()} disabled={isSigningIn}>
      Sign In with GitHub
    </button>
  );
};
