
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { EyeIcon, EyeOffIcon, Loader } from "lucide-react";

type AuthMode = "signin" | "signup";

const LoginForm = () => {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, signUp } = useAuth();

  const toggleMode = () => {
    setMode(mode === "signin" ? "signup" : "signin");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "signin") {
        const { error } = await signIn(email, password);
        if (error) throw error;
      } else {
        const { error } = await signUp(email, password);
        if (error) throw error;
        else {
          toast({
            title: "Check your email",
            description: "We sent you a confirmation link to complete your sign up.",
          });
        }
      }
    } catch (error: any) {
      toast({
        title: "Authentication error",
        description: error.message || "An error occurred during authentication",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6 bg-white rounded-lg shadow-md">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-bonusly-purple mb-1">
          {mode === "signin" ? "Welcome Back" : "Create an Account"}
        </h1>
        <p className="text-sm text-gray-500">
          {mode === "signin"
            ? "Sign in to access your account"
            : "Sign up to get started with Bonusly"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOffIcon className="h-4 w-4" />
              ) : (
                <EyeIcon className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <Button className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" /> Please wait...
            </>
          ) : mode === "signin" ? (
            "Sign In"
          ) : (
            "Sign Up"
          )}
        </Button>

        <div className="text-center text-sm">
          {mode === "signin" ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={toggleMode}
            className="text-bonusly-purple font-medium hover:underline"
          >
            {mode === "signin" ? "Sign Up" : "Sign In"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
