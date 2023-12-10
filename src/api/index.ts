import axios from "axios";
import React from "react";

interface LoginPropsType {
  email: string;
  password: string;
}

interface SignUpPropsType {
  name: string;
  email: string;
  password: string;
}

interface StatuesPropsType {
  place?: string;
  howLong?: string;
  what?: string;
}

export const loginUser = async ({ email, password }: LoginPropsType) => {
  try {
    const response = await axios.post(
      "http://192.168.219.194:8088/user/login",
      {
        email,
        password,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return { success: false, message: "로그인에 실패하였습니다." };
  }
};

export const signUp = async ({ name, email, password }: SignUpPropsType) => {
  try {
    const response = await axios.post(
      "http://192.168.219.194:8088/user/signup",
      {
        name,
        email,
        password,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return { success: false, message: "회원가입에 실패하였습니다." };
  }
};

export const getUser = async () => {
  try {
    const response = await axios.get("http://192.168.219.194:8088/user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return { success: false, message: "유저 정보 호출에 실패하였습니다." };
  }
};

export const deleteUser = async () => {
  try {
    const response = await axios.delete("http://192.168.219.194:8088/user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return { success: false, message: "유저 탈퇴에 실패하였습니다." };
  }
};

export const getMembers = async (teamId: number) => {
  try {
    const response = await axios.get(
      `http://192.168.219.194:8088/belong/${teamId}/user`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "멤버 리스트 호출에 실패하였습니다.",
    };
  }
};

export const getGroups = async () => {
  try {
    const response = await axios.get(
      `http://192.168.219.194:8088/belong/team`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "그룹 리스트 호출에 실패하였습니다.",
    };
  }
};

export const createGroup = async (name: string) => {
  try {
    const response = await axios.post(
      "http://192.168.219.194:8088/team",
      {
        name,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return { success: false, message: "그룹 생성에 실패하였습니다." };
  }
};

export const deleteGroup = async (teamId: number) => {
  try {
    const response = await axios.delete(
      `http://192.168.219.194:8088/team/${teamId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "그룹 삭제에 실패하였습니다.",
    };
  }
};

export const joinGroup = async (teamId: number) => {
  try {
    const response = await axios.post(
      `http://192.168.219.194:8088/team/${teamId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return { success: false, message: "그룹 참가에 실패하였습니다." };
  }
};

export const setStatus = async ({ place, howLong, what }: StatuesPropsType) => {
  try {
    const response = await axios.put(
      `http://192.168.219.194:8088/user/status`,
      {
        place,
        howLong,
        what,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return { success: false, message: "상태 변경에 실패하였습니다." };
  }
};

export const getPreset = async () => {
  try {
    const response = await axios.get("http://192.168.219.194:8088/preset", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return { success: false, message: "프리셋 리스트 호출에 실패하였습니다." };
  }
};

export const createPreset = async ({
  place,
  howLong,
  what,
}: StatuesPropsType) => {
  try {
    const response = await axios.post(
      `http://192.168.219.194:8088/preset`,
      {
        place,
        howLong,
        what,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return { success: false, message: "프리셋 생성에 실패하였습니다." };
  }
};
