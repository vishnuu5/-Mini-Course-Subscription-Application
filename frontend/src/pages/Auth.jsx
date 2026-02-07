import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useToast, Toast } from "../components/Toast";

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { login, signup, loading } = useAuth();
  const navigate = useNavigate();
  const { toast, showToast, hideToast } = useToast();

  const demoUsers = [
    { email: "user1@example.com", password: "password123", name: "user1" },
    { email: "user2@example.com", password: "password123", name: "user2" },
    { email: "demo@example.com", password: "password123", name: "Demo User" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
      showToast(
        isLogin ? "Login successful!" : "Signup successful!",
        "success",
      );
      navigate("/");
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  const useDemoCredentials = (user) => {
    setEmail(user.email);
    setPassword(user.password);
    setName(user.name);
  };

  const demoUserButtons = demoUsers.map((user) => (
    <button
      key={user.email}
      type="button"
      onClick={() => useDemoCredentials(user)}
      className="w-full text-left px-4 py-3 text-sm bg-bg-primary border border-border rounded hover:bg-bg-tertiary transition cursor-pointer mb-3 last:mb-0"
    >
      <span className="font-medium text-text-primary">{user.email}</span>
      <span className="text-text-secondary ml-2">({user.password})</span>
    </button>
  ));

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-secondary flex items-center justify-center p-4">
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}

      <div className="bg-bg-primary rounded-2xl shadow-xl border border-border p-12 w-full max-w-lg py-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-text-primary mb-4">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-lg text-text-secondary">
            {isLogin
              ? "Sign in to your account"
              : "Join our learning community"}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-text-primary mb-3">
                Name (Optional)
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-5 py-3.5 border border-border rounded-xl bg-bg-secondary text-text-primary focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-300"
                placeholder="Enter your name"
              />
            </div>
          )}
          <div className="mb-6">
            <label className="block text-sm font-medium text-text-primary mb-3">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-5 py-3.5 border border-border rounded-xl bg-bg-secondary text-text-primary focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-300"
              placeholder="your@email.com"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-text-primary mb-3">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-5 py-3.5 border border-border rounded-xl bg-bg-secondary text-text-primary focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-300"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary to-primary-dark text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 cursor-pointer mt-8 mb-4"
          >
            {loading ? "Loading..." : isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>
        <div className="p-6 bg-bg-secondary border border-border rounded-xl mt-8 mb-6">
          <p className="text-sm font-bold text-text-primary uppercase tracking-wide mb-4">
            Demo Credentials:
          </p>
          <div>{demoUserButtons}</div>
        </div>
        <div className="text-center pt-4">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary hover:text-primary-dark font-semibold transition-colors duration-300 text-lg"
          >
            {isLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account? Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
