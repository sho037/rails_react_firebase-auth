import { useState } from "react";

import { useLocation } from "react-router-dom";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  // ユーザー登録処理
  const handleSignUp = async () => {
    if (password !== passwordConfirmation) {
      alert("パスワードとパスワード（確認）が一致しません");
      return;
    }

    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      // ユーザー登録が完了したら、ホーム画面に遷移する
      location.pathname = "/";
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
    </div>
  );
};

export default SignUp;
