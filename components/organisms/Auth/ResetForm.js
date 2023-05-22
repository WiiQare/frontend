import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import OnboardingScreen from "../../molecules/OnboardingScreen";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import MenuHolder from "../../atoms/MenuHolder";
import { useFormik } from "formik";
import * as yup from "yup";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import LoadingButton from "../../atoms/Loader/LoadingButton";
import Toast from "../../atoms/Toast";
import { resetPassword } from "../../../lib/helper";

function ResetForm() {
  const matches = useMediaQuery("(max-width: 992px)");
  const [onboardingIsEnd, setOnboardingIsEnd] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showcPassword, setShowcPassword] = React.useState(false);
  const [state, setState] = useState({ type: 0, message: "" });
  const router = useRouter();
  const { token } = router.query;

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowcPassword = () => setShowcPassword((show) => !show);

  React.useEffect(() => {
    setOnboardingIsEnd(localStorage.getItem("onboardingIsEnd") || "");
  }, []);

  const newChangePassword = useMutation(resetPassword, {
    onSuccess: (res) => {
      if (res.code) {
        setState({ type: 2, message: res.message ?? res.description });
        setTimeout(() => {
          setState({ type: 0, message: "" });
        }, 3000);
      } else {
        setState({
          type: 1,
          message: "Mot de passe réinitialoser avec succès",
        });

        setTimeout(() => {
          router.push("/login");
        }, 2500);
      }
    },
  });

  const onSubmit = async (values) => {
    if (Object.keys(values).length == 0) return console.log("Pas de données");
    newChangePassword.mutate({ ...values, resetPasswordToken: token });
  };

  const closeToast = () => {
    setState({ type: 0, message: "" });
  };

  const ValidationSchema = yup.object().shape({
    password: yup.string().required("Mot de passe est un champ obligatoire"),
    confirmPassword: yup
      .string()
      .required("Veuillez confirmer votre mot de passe")
      .oneOf(
        [yup.ref("password"), null],
        "Le deux mot de passe ne correspondent pas"
      ),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: ValidationSchema,
    onSubmit,
  });

  const renderError = (message) => (
    <p className="text-xs text-red-600 font-light flex items-center gap-1 px-1">
      {message}
    </p>
  );

  const formHolder = (
    <>
      <div className="form-holder">
        <MenuHolder href="/register" label="S'INSCRIRE" />
        <div className="signin-signup-form">
          <div className="flex flex-col md:w-3/4 w-full border-opacity-50 gap-4">
            <div className="form-items !w-full !max-w-full flex flex-col items-center mx-auto">
              <div className="md:w-3/4 mx-auto">
                {state.type > 0 ? (
                  state.type == 2 ? (
                    <Toast
                      type={"danger"}
                      message={state.message}
                      close={closeToast}
                    />
                  ) : state.type == 1 ? (
                    <Toast
                      type={"success"}
                      message={state.message}
                      close={closeToast}
                    />
                  ) : (
                    <></>
                  )
                ) : (
                  <></>
                )}
                <div className="form-title">Créer un nouveau mot de passe</div>
                <Box sx={{ mb: 3, mt: 2 }}></Box>
                <form
                  id="signinform"
                  className=""
                  onSubmit={formik.handleSubmit}
                >
                  <Stack spacing={2}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel htmlFor="outlined-basic1">
                        Nouveau mot de passe
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-basic1"
                        label="Nouveau mot de passe"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        {...formik.getFieldProps("password")}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                    {formik.errors.password && formik.touched.password ? (
                      renderError(formik.errors.password)
                    ) : (
                      <></>
                    )}

                    <FormControl fullWidth variant="outlined">
                      <InputLabel htmlFor="outlined-basic1">
                        Confirmez Mot de passe
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-basic1"
                        label="Confirmez Mot de passe"
                        name="confirmPassword"
                        type={showcPassword ? "text" : "password"}
                        {...formik.getFieldProps("confirmPassword")}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowcPassword}
                              edge="end"
                            >
                              {showcPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                    {formik.errors.confirmPassword &&
                    formik.touched.confirmPassword ? (
                      renderError(formik.errors.confirmPassword)
                    ) : (
                      <></>
                    )}

                    <Box>
                      <Button
                        size="large"
                        variant="contained"
                        type="submit"
                        className="disabled:bg-gray-200"
                      >
                        {newChangePassword.isLoading ? (
                          <LoadingButton />
                        ) : (
                          "Changer le mot de passe"
                        )}
                      </Button>
                    </Box>
                  </Stack>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {matches && !onboardingIsEnd ? (
        <OnboardingScreen
          onStartClick={() => {
            if (typeof window !== "undefined") {
              localStorage.setItem("onboardingIsEnd", "onboardingIsEnd");
            }
            setOnboardingIsEnd("onboardingIsEnd");
          }}
        />
      ) : (
        formHolder
      )}
    </>
  );
}

export default ResetForm;
