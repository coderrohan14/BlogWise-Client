import React, { useEffect } from "react";
import { useLoaderData, Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import styles from "./Layout.module.css";
import { useDispatch } from "react-redux";
import {
  useGetTokenQuery,
  useLazyGetUserInfoQuery,
} from "../../app/api/authApiSlice";
import { setUserInfo } from "../../app/features/userSlice";

const Layout = () => {
  const dispatch = useDispatch();
  const { data } = useGetTokenQuery();
  const [getUser, { data: userInfo, isLoading }] = useLazyGetUserInfoQuery();
  useEffect(() => {
    if (data && data.success) {
      getUser(data.user.userID);
    }
  }, [data]);
  useEffect(() => {
    if (userInfo) {
      dispatch(setUserInfo(userInfo));
    }
  }, [userInfo]);
  return (
    <div className={styles.layoutStyle}>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
