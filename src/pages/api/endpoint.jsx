import Headers from "./Header";
import { ProcessAPI, Const } from "../../../utils/Constant";

const getToken = () => {
  return typeof window !== "undefined" ? localStorage.getItem("token") : null;
};

export const register = async (body) => {
  const res = await fetch(
    Const.Link + `api/auth/signup`,
    new Headers("POST", body)
  );
  return ProcessAPI(res);
};
export const login = async (body) => {
  const res = await fetch(
    Const.Link + `api/auth/login`,
    new Headers("POST", body)
  );
  return ProcessAPI(res);
};
export const createCar = async (body) => {
  const auth = getToken();
  const res = await fetch(Const.Link + "api/cars", {
    headers: {
      Authorization: auth ? `Bearer ${auth}` : "",
    },
    method: "POST",
    body: body,
  });
  return res.json();
};
export const allList = async () => {
  const res = await fetch(Const.Link + `api/cars`, new Headers("GET"));
  return ProcessAPI(res);
};
export const getCar = async (id) => {
  const res = await fetch(Const.Link + `api/cars/${id}`, new Headers("GET"));
  return ProcessAPI(res);
};

export const editCar = async (id,body) => {
  const auth = getToken();
  const res = await fetch(Const.Link + `api/cars/${id}`, {
    headers: {
      Authorization: auth ? `Bearer ${auth}` : "",
    },
    method: "PUT",
    body: body,
  });
  return res.json();
};


export const deleteCar = async (id) => {
  const res = await fetch(
    Const.Link + `api/cars/${id}`,
    new Headers("DELETE")
  );
  return ProcessAPI(res);
};
