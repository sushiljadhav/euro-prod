"use client"

import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

import { Link } from "@nextui-org/react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { FaUser, FaLock } from "react-icons/fa"
// import { FaS } from "react-icons/fa6"

import Wrapper from "../../common/Wrapper"
import ButtonUI from "../../UISandbox/Button/ButtonUI"
import CheckBoxUI from "../../UISandbox/CheckBox/CheckBoxUI"
import { InputManager } from "../../UISandbox/Input/InputManager"
import InputUI from "../../UISandbox/Input/InputUI"
import LeftPanel from "../components/LeftPanel"
import { type ISignInProps } from "@/src/@types/Auth/signIn.types"
import { setUserData } from "@/src/app/store/auth/authSlice"
import { type ILoginInForm } from "@/src/model/Auth/ILogin"
import {
  type IInputBehavior,
  type ISubmitError,
} from "@/src/model/IInputBehavior"
import { HttpClient } from "@/src/utils/api"

// eslint-disable-next-line @typescript-eslint/naming-convention
const SignIn: React.FC<ISignInProps> = ({ login_id, password }) => {
  const [isFormValid, setIsFormValid] = useState(false)
  const [submitClick, setSubmitClick] = useState(false)
  const [isBtnDisabled, setIsBtnDisabled] = useState<boolean>(false)
  const [formState, setFormState] = useState<ILoginInForm>({
    login_id: "",
    password: "",
  })
  const dispatch = useDispatch()
  const router = useRouter()

  const [errors, setErrors] = useState({
    login_id: { error: false, msg: "" },
    password: { error: false, msg: "" },
  })

  const [isOtpClick, setIsOtpClick] = useState<boolean>(false)
  const [timer, setTimer] = useState<number | null>(null)
  const [isChecked, setIsChecked] = useState<boolean>(false) // State for checkbox

  // Validation logic
  const validateField = (
    name: string,
    value: string,
    field: IInputBehavior
  ): ISubmitError => {
    const inputManager = new InputManager(field.validationType)
    return inputManager.validate(value)
  }
  const validateFormForCTA = (fieldName: string, value: string): void => {
    const validationErrors = { ...errors }

    if (fieldName === "login_id" && formState.login_id !== "") {
      validationErrors.login_id = validateField("login_id", value, login_id)
    }

    if (fieldName === "password" && formState.password !== "") {
      validationErrors.password = validateField("password", value, password)
    }

    setErrors(validationErrors)

    const allFieldsValid = Object.values(validationErrors).every(
      (field) => !field.error
    )
    if (formState.password !== "" && formState.login_id !== "") {
      setIsFormValid(allFieldsValid)
    }
  }
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
    const { name, value } = event.target
    validateFormForCTA(name, value)
  }

  const handleValidation = (): void => {
    if (formState.login_id !== undefined && formState.password !== undefined) {
      const validationErrors = {
        login_id: validateField("login_id", formState.login_id, login_id),
        password: validateField("password", formState.password, password),
      }
      setErrors(validationErrors)
    }
  }

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault()
    handleValidation()
    setSubmitClick(true)
  }
  const handleCheckBox = (event: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(event.target.checked)

    if (event.target.checked) {
      setIsChecked(true)
    } else {
      setIsChecked(false)
    }
  }
  const handleOtp = (event: React.MouseEvent): void => {
    console.log("on OTP click")
    // timer Start
    setIsOtpClick(true)
    setTimer(60) // Start a 2-minute countdown (120 seconds)
    // timer End
    event.preventDefault()
    const validationErrors = {
      login_id: validateField("login_id", formState.login_id, login_id),
    }
    setErrors((prevState) => ({
      ...prevState,
      login_id: {
        error: validationErrors.login_id.error,
        msg: validationErrors.login_id.msg,
      },
    }))
  }
  useEffect(() => {
    if (isFormValid && isChecked) {
      setIsBtnDisabled(true)
    } else {
      setIsBtnDisabled(false)
    }
  }, [isFormValid, isChecked])

  useEffect(() => {
    if (!errors.login_id.error && isOtpClick) {
      const fetchOtp = async (): Promise<void> => {
        const data = ""
        try {
          const config = {
            method: "get",
            maxBodyLength: Infinity,
            url: `http://ultimateerp.in:5000/api/logins/${formState.login_id}/generate-otp`,
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImxvZ2luX2lkIjoiRU1QSFlTSTUzMVZKSjJCWFRNUjIiLCJtb2JpbGUiOiI5MTk4NzA1NTg3MzYiLCJlbWFpbCI6InN1c2hpbGo3NkBnbWFpbC5jb20iLCJsb2dpbl90eXBlX2lkIjoiRSJ9LCJpYXQiOjE3MjUwNDU3MzAsImV4cCI6MTcyNTEzMjEzMH0.4u3-Y-5qOErDqMSG7hekKnO9zx5-8_Y8YB-aJRb8YoQ",
            },
            data,
          }

          axios
            .request(config)
            .then((response) => {
              console.log(JSON.stringify(response.data))
            })
            .catch((error) => {
              console.log(error)
            })
        } catch (error) {
          console.error("Failed to Get OTP:", error)
        } finally {
          setIsOtpClick(false)
        }
      }

      void fetchOtp()
    }
  }, [errors, isOtpClick])

  useEffect(() => {
    const performSignIn = async (): Promise<void> => {
      if (submitClick) {
        const allFieldsValid = Object.values(errors).every(
          (field) => !field.error
        )
        setIsFormValid(allFieldsValid)

        if (isFormValid) {
          try {
            const apiCall = new HttpClient({
              url: "api/logins/signin",
              body: formState,
              headers: {
                "Content-Type": "application/json",
              },
            })

            const response = await apiCall.post()

            if (response.data.success === true) {
              const userData = {
                login_name: response.data.payload?.login_name,
                mobile: response.data.payload?.mobile,
                email: response.data.payload?.email,
                login_type_id: response.data.payload?.login_type_id,
              }
              dispatch(setUserData(userData))
              router.push("/dashboard")
            }
          } catch (error) {
            console.error("Failed to submit form:", error)
          } finally {
            setSubmitClick(false) // Reset submitClick state
          }
        }
      }
    }
    void performSignIn()
  }, [errors, submitClick, isFormValid, formState, dispatch, router])
  // Timer Logic Start
  useEffect(() => {
    if (isFormValid) {
      setIsBtnDisabled(true)
    }
  }, [isFormValid])
  useEffect(() => {
    if (timer !== null && timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => (prev !== null ? prev - 1 : null))
      }, 1000)
      return () => {
        clearInterval(countdown)
      }
    }
  }, [timer])
  const renderOtpText = (): string => {
    if (timer !== null && timer > 0) {
      const minutes = Math.floor(timer / 60)
      const seconds = timer % 60
      return `Please wait for ${minutes}:${seconds < 10 ? `0${seconds}` : seconds} before requesting a new OTP.`
    }
    return "Via Whatsapp OTP"
  }
  // Timer Logic End
  return (
    <Wrapper>
      <LeftPanel></LeftPanel>
      <div className="w-full max-w-[816px] rounded-r-[10px] bg-white pb-[77px] pt-[52px]">
        <div className="mx-auto w-full max-w-[580px]">
          <div className="mb-6 font-robotoFont text-5xl font-bold leading-[52px] tracking-tight text-black">
            Welcome Back! 👋
          </div>
          <p className="mb-8 text-lg">
            Please enter your credential to proceed with your booking or to
            manage your account
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <div className="mb-4 flex w-full justify-between gap-4">
                <div className="w-full">
                  <InputUI
                    startContent={
                      <FaUser className="mr-1 text-primary"></FaUser>
                    }
                    {...login_id}
                    name="login_id"
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    value={formState.login_id}
                    submitError={errors.login_id}
                    size="md"
                  />
                </div>
              </div>
            </div>
            <div className="mb-8">
              <div className="relative mb-4 flex w-full justify-between gap-4">
                <div className="w-full">
                  <InputUI
                    startContent={
                      <FaLock className="mr-1 text-primary"></FaLock>
                    }
                    {...password}
                    name="password"
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    value={formState.password}
                    submitError={errors.password}
                    size="md"
                  />
                </div>
                {/* Timer Start */}
                {timer !== null && timer > 0 ? (
                  <span className="absolute -top-px right-0 text-xs font-bold text-[#555c64]">
                    {renderOtpText()}
                  </span>
                ) : (
                  <Link
                    onClick={handleOtp}
                    className="absolute -top-px right-0 cursor-pointer text-xs font-bold text-[#006fee] hover:underline"
                  >
                    {renderOtpText()}
                  </Link>
                )}
                {/* Timer End */}
              </div>
            </div>
            <div className="mb-7 flex items-center justify-between">
              <div className="flex items-center">
                <div className="left-0 top-0 inline-flex size-6 flex-col items-start justify-start">
                  <CheckBoxUI onCheckBoxClick={handleCheckBox} />
                </div>
                <span className="ml-1 text-sm font-normal leading-tight tracking-tight text-black">
                  I have read and agree to the{" "}
                </span>
                <span className="ml-1 cursor-pointer text-sm font-medium leading-tight tracking-tight text-primary underline hover:no-underline">
                  Terms & Conditions
                </span>
              </div>
              <Link className="cursor-pointer text-medium font-bold text-[#006FEE] hover:underline">
                Forgot Password
              </Link>
            </div>
            <div className="mb-8 flex flex-col items-center justify-between">
              <div className="mb-4 w-full">
                <ButtonUI
                  type="submit"
                  className="w-full"
                  isDisabled={!isBtnDisabled}
                >
                  Log In
                </ButtonUI>
              </div>
            </div>
          </form>
          <div className="flex items-center justify-center">
            <div className="text-sm font-normal leading-tight tracking-tight text-gray-800">
              {"Don't"} you have an account ?
            </div>
            <div className="ml-1.5 cursor-pointer text-sm font-bold leading-tight tracking-tight text-primary hover:underline">
              Sign Up
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default SignIn
