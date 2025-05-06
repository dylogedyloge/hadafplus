import React from "react";
import { Layout } from "antd";

const { Content } = Layout;

const MainLayout = ({ children }) => {
  return (
    <Layout className="min-h-screen">
      <Content className="p-2 sm:p-4 md:p-6">{children}</Content>
    </Layout>
  );
};

export default MainLayout;
