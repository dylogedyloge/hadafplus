import React from "react";
import { Layout } from "antd";

const { Header, Content } = Layout;

const MainLayout = ({ children }) => {
  return (
    <Layout className="min-h-screen">
      <Header className="bg-white shadow-md">
        <h1 className="text-2xl font-bold">My App</h1>
      </Header>
      <Content className="p-6">{children}</Content>
    </Layout>
  );
};

export default MainLayout;
