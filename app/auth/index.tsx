"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RegisterPage from "@/auth/register/page";
import LoginPage from "@/auth/login/page";

export default function AuthLanding() {
  const [show, setShow] = useState<"register" | "login">("register");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const registered = localStorage.getItem("registered");

    if (token && role === "Admin") {
      router.replace("/admin/dashboard");
    } else if (token) {
      router.replace("/");
    } else if (registered) {
      setShow("login");
    } else {
      setShow("register");
    }
  }, []);

  return show === "register" ? <RegisterPage /> : <LoginPage />;
}
