"use client";
import CommonForm from "@/components/common/Form";
import { toast } from "@/components/ui/use-toast";
import { resetPasswordControls } from "@/config";
import { resetPassword } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

const initialState = {
  password: "",
  repeatPassword: "",
};

const ResetPassword = () => {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  function onSubmit(event) {
    event.preventDefault();
    dispatch(resetPassword({ ...formData, token })).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        navigate("/auth/login");
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Reset password
        </h1>
      </div>
      <CommonForm
        formControls={resetPasswordControls}
        buttonText={"Reset"}
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

export default ResetPassword;
