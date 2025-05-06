import React from "react";
import { Layout } from "antd";

const { Content } = Layout;

const MainLayout = ({ children }) => {
  return (
    <Layout className="min-h-screen">
      <Content className="p-6">{children}</Content>
    </Layout>
  );
};

export default MainLayout;
