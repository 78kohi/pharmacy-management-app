/* eslint-disable react/prop-types */
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, X } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router"
import { toast } from "sonner"
import { authApi } from "@/lib/api"
import { z } from "zod"
import { useAuth } from "@/hooks/AuthProvider"

export function SignupForm({
  className,
  ...props
}) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "", password: ""
  })
  const [errors, setErrors] = useState({});
  const { login } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token")
    if(token) login(token)
  }, [])

  const formSchema = z.object({
    username: z.string()
      .min(3, "Username must be at least 3 characters long")
      .max(20, "Username cannot exceed 20 characters")
      .regex(/^[a-zA-Z0-9_]/, "Username can only contain letters, numbers, and underscores"),
    password: z.string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[0-9]/, "Password must contain at least one number")
  })

  const handleSignup = async (e) => {
    const toastId = toast.loading("Registering...")
    try {
      e.preventDefault()

      const validated = formSchema.safeParse(credentials)
      if(validated.success){
        const response = await authApi.register(credentials)

        if(response.error) {
          toast.error(response.error, { id: toastId })
          return
        } else {
          const loginResponse = await authApi.login(credentials);
          if(loginResponse.token){
            login(loginResponse.token)
            toast.success("Registered Successfully!", { id: toastId })
          }
        }

      } else {
        setErrors(validated.error.flatten().fieldErrors)
        console.log(validated.error.flatten())
      }
    } catch (err) {
      toast.error(err || "Something went wrong", { id: toastId })
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSignup} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col">
                <h1 className="font-semibold text-lg">Create your account</h1>
                <p className="text-muted-foreground text-sm">
                  Enter your details below to create to your account
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="johndoe"
                  required
                  value={credentials.username}
                  onChange={(e) =>
                    setCredentials((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                />
                {errors.username && (
                  <span>
                    {errors.username.map((error) => (
                      <span className="flex gap-1 items-center" key={error}>
                        <X className="size-3 text-red-600" />
                        <p className="text-sm leading-tight text-red-600 flex-col">
                          {error}
                        </p>
                      </span>
                    ))}
                  </span>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={passwordVisible ? "text" : "password"}
                    required
                    value={credentials.password}
                    onChange={(e) =>
                      setCredentials((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                  />
                  <Button
                    as="button"
                    type="button"
                    variant="eye"
                    className="absolute top-1/2 right-2 transform -translate-y-1/2"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? <Eye /> : <EyeOff />}
                  </Button>
                </div>
                {errors.password && (
                  <span>
                    {errors.password.map((error) => (
                      <span className="flex gap-1 items-center" key={error}>
                        <X className="size-3 text-red-600" />
                        <p className="text-sm leading-tight text-red-600 flex-col">
                          {error}
                        </p>
                      </span>
                    ))}
                  </span>
                )}
              </div>
              <Button type="submit" className="w-full">
                Register
              </Button>
              <div className="text-center text-sm">
                have an account?{" "}
                <Link to="/login" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="https://placehold.co/500x600"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
