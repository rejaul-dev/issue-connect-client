"use client";
import { login } from "@/features/auth/userSlice";
import { useAxiosPost } from "@/hooks/useAxiosPost";
import { roleRouter } from "@/utils/roleRouter";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Loading from "./Loading";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type Inputs = {
  email: string;
  password: string;
};

const UserLoginForm = () => {
  const router = useRouter();
  const { axiosPost, isLoading, error } = useAxiosPost();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  // Submit handler
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const res = await axiosPost("/api/users/auth/login", { ...data });
    if (res) {
      dispatch(login(res));

      const userRole = res.user.role;

      roleRouter(userRole, router);
    }
  };
  return (
    <div className="border-2 p-4 rounded-2xl">
      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            {...register("email", { required: true })}
            className="paragraph ring-2 ring-muted-foreground"
          />
          {errors.email && (
            <p className="text-red-500">Email field is required</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="Password"
            {...register("password", { required: true })}
            className="paragraph ring-2 ring-muted-foreground"
          />
          {errors.email && (
            <p className="text-red-500">Email field is required</p>
          )}
        </div>

        <div className="mt-4">
          <Button type="submit" className="uppercase">
            {isLoading ? (
              <>
                <Loading />
                Signing in
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </div>

        <div className="mt-4">
          {error && (
            <p className="bg-rose-500/20 rounded-lg p-3 border w-full border-red-500 text-sm">
              {error}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserLoginForm;
