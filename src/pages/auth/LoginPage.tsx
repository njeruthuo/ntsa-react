import { useState } from "react";
import { Key, Person } from "@/components/iconjsx";
import { loginLogo } from "@/assets/icons";
import { useLoginUserMutation } from "@/state/reducers/auth/authApi";

const LoginPage = () => {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ username, password });
    try {
      await loginUser({ username, password }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-[calc(100vh-95.9863px)] flex justify-center items-center">
      <div className="shadow-lg border-2 w-1/3 p-8">
        <div className="login-card">
          <div className="flex justify-center">
            <span className="text-[12rem]">
              <img src={loginLogo} alt="Login Logo" />
            </span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group py-1">
              <div className="flex place-items-center space-x-1">
                <Person />
                <input
                  className="border-2 w-full bg-gray-200 rounded-xs p-2"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group py-1">
              <div className="flex place-items-center space-x-1">
                <Key />
                <input
                  className="border-2 w-full bg-gray-200 rounded-xs p-2"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className=" flex justify-center text-white">
              <button
                disabled={isLoading}
                type="submit"
                className="login-btn px-8 py-1 rounded-sm mt-3 bg-[#1B1C4C]"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
