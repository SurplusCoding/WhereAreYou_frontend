import axios from "axios";

interface LoginPropsType {
  email: string;
  password: string;
}

interface SignUpPropsType {
  name: string;
  email: string;
  password: string;
}

export const loginUser = async ({ email, password }: LoginPropsType) => {
  try {
    const response = await axios.post("http://10.150.151.54:8088/user/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return { success: false, message: "로그인에 실패하였습니다." };
  }
};

export const signUp = async ({ name, email, password }: SignUpPropsType) => {
  try {
    const response = await axios.post("http://10.150.151.54:8088/user/signup", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return { success: false, message: "회원가입에 실패하였습니다." };
  }
};
