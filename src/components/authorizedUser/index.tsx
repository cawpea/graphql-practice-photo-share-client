import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-apollo";
import { gql } from "apollo-boost";
import { ROOT_QUERY } from "../../App";

const GITHUB_AUTH_MUTATION = gql`
  mutation githubAuth($code: String!) {
    githubAuth(code: $code) {
      token
    }
  }
`;

export const AuthorizedUser: FC = () => {
  const navigate = useNavigate();
  const [isSigningIn, setSigningIn] = useState<boolean>(false);
  const [githubAuthMutation] = useMutation(GITHUB_AUTH_MUTATION, {
    update: (cache, { data }) => {
      console.log("update", data);
      localStorage.setItem(`github-auth-token`, data.githubAuth.token);
      setSigningIn(true);
    },
    refetchQueries: [{ query: ROOT_QUERY }],
  });

  const requestCode = () => {
    const clientId = "0ed0924c4c2512563c17";
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user`;
  };

  useEffect(() => {
    if (window.location.search.match(/code=/)) {
      setSigningIn(true);
      const code = window.location.search.replace("?code=", "");
      navigate("/", { replace: true });
      githubAuthMutation({ variables: { code } });
    }
  }, [githubAuthMutation, navigate]);

  return (
    <button type="button" onClick={() => requestCode()} disabled={isSigningIn}>
      Sign In with GitHub
    </button>
  );
};
