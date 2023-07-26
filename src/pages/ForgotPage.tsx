import { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import AuthContext from "../context/Context";

type Inputs = {
  password: string;
  repassword: string;
};

const ForgotPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { changePassword, isAuthenticated } = useContext(AuthContext);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (data.repassword !== data.password) {
      return Swal.fire({
        title: "The mail is not the same",
        icon: "warning",
        confirmButtonText: "Back",
      });
    }

    // Envio de datos al servidor con api
    if (isAuthenticated) {
      changePassword({
        password: data.password,
      });
    }
    let timerInterval: number | undefined;
    Swal.fire({
      icon: "success",
      title: "Your password change was successful",
      html: "I will close in <b></b> milliseconds.",
      timer: 3000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const b: HTMLElement | null =
          Swal.getHtmlContainer()!.querySelector("b");
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft();
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        navigate("/");
      }
    });
  };

  const [showPassword, setShowPassword] = useState("password");
  const [clickShowRePassword, setClickShowRePassword] = useState(true);

  const [showPasswordRepeat, setShowPasswordRepeat] = useState("password");
  const [clickShowRePasswordRepeat, setClickShowRePasswordRepeat] =
    useState(true);

  const handleShowPassword = () => {
    if (showPassword === "password") {
      setShowPassword("text");
    } else {
      setShowPassword("password");
    }

    if (showPassword === "password") {
      setClickShowRePassword(false);
    } else {
      setClickShowRePassword(true);
    }
  };

  const handleShowPasswordRepeat = () => {
    if (showPasswordRepeat === "password") {
      setShowPasswordRepeat("text");
    } else {
      setShowPasswordRepeat("password");
    }

    if (showPasswordRepeat === "password") {
      setClickShowRePasswordRepeat(false);
    } else {
      setClickShowRePasswordRepeat(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div
        className="border-2 border-white-400 rounded-lg"
        style={{ padding: "32px" }}
      >
        <picture className="flex justify-center">
          <img
            src="https://res.cloudinary.com/dqut4ajgf/image/upload/v1690389154/Logo-padlock-front_qldyhl.png"
            width="150px"
            height="150px"
            alt="NO FUNCIONA"
          />
        </picture>
        <div>
          <h2
            style={{ fontSize: "24px", fontWeight: "bold", margin: "24px 0" }}
          >
            Change password
          </h2>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "normal",
              margin: "24px 0",
              textAlign: "center",
            }}
          >
            Fill in the form with the <br /> new password and submit it.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="mb-3" style={{ position: "relative" }}>
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            {clickShowRePassword ? (
              <span
                style={{ position: "absolute", top: "40px", right: "10px" }}
              >
                <PiEyeClosedBold onClick={handleShowPassword} />
              </span>
            ) : (
              <span
                style={{ position: "absolute", top: "40px", right: "10px" }}
              >
                <PiEyeBold onClick={handleShowPassword} />
              </span>
            )}
            <input
              type={showPassword}
              placeholder="Enter password"
              id="password"
              className="border border-purple-600 rounded-lg focus:border-purple-900 block w-full p-2"
              style={{ outline: "none", backgroundColor: "transparent" }}
              {...register("password", {
                required: "This input is required",
                pattern: {
                  message: "Incorrect password.",
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                },
              })}
            />
            {errors.password && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="mb-3" style={{ position: "relative" }}>
            <label htmlFor="re-password" className="block mb-1">
              Repeat password
            </label>
            {clickShowRePasswordRepeat ? (
              <span
                style={{ position: "absolute", top: "40px", right: "10px" }}
              >
                <PiEyeClosedBold onClick={handleShowPasswordRepeat} />
              </span>
            ) : (
              <span
                style={{ position: "absolute", top: "40px", right: "10px" }}
              >
                <PiEyeBold onClick={handleShowPasswordRepeat} />
              </span>
            )}

            <input
              type={showPasswordRepeat}
              placeholder="Enter password"
              id="re-password"
              className="border border-purple-600 rounded-lg focus:border-purple-900 block w-full p-2"
              style={{ outline: "none", backgroundColor: "transparent" }}
              {...register("repassword", {
                required: "This input is required",
              })}
            />
            {errors.repassword && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {errors.repassword.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 rounded-lg px-5 py-2 text-center mt-2"
          >
            Send change
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPage;
