import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { verifyAccount } from "@/store/auth-slice";
import { toast } from "@/components/ui/use-toast";

export default function VerifyAccount() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    const verifyToken = async () => {
      try {
        if (!token) {
          throw new Error("No verification token provided");
        }
        dispatch(verifyAccount(token)).then((data) => {
          if (data?.payload?.success) {
            toast({
              title: data?.payload?.message,
            });
          } else {
            navigate("/auth/login", {
              state: { error: "Email verification failed" },
            });
            toast({
              title: data?.payload?.message,
              variant: "destructive",
            });
          }
        });
      } catch (error) {
        navigate("/auth/login", {
          state: { error: "Email verification failed" },
        });
      }
    };

    verifyToken();
  }, [token]);

  useEffect(() => {
    if (!token) {
      navigate("/auth/login", {
        state: { error: "Invalid verification link" },
      });
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
    </div>
  );
}
