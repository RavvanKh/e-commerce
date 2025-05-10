"use client";
import CommonForm from "@/components/common/Form";
import { toast } from "@/components/ui/use-toast";
import { forgotPasswordControls } from "@/config";
import { sendForgotPasswordMail } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  email: "",
};

const ForgotPassword = () => {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(sendForgotPasswordMail(formData)).then(() => {
      toast({
        title: "Password reset email sent",
      });
      navigate("/auth/login");
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Forgot password
        </h1>
      </div>
      <CommonForm
        formControls={forgotPasswordControls}
        buttonText={"Continue"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
      <div className="text-right text-sm">
        <Link to="/auth/login" className="text-primary hover:underline">
          Go back?
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
