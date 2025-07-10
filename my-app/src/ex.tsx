import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

type LoginForm = {
  email: string;
  password: string;
};

export function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (data.email === "test@example.com" && data.password === "password123") {
        toast.success("Successfully logged in! 🎉");
        setTimeout(() => navigate("/"), 2000);
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      toast.error("Invalid email or password! 🚫");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-300">Email</label>
              <Input
                type="email"
                placeholder="Enter your email"
                disabled={isLoading}
                {...register("email")}
                className="bg-gray-900/50"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-300">Password</label>
              <Input
                type="password"
                placeholder="Enter your password"
                disabled={isLoading}
                {...register("password")}
                className="bg-gray-900/50"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
