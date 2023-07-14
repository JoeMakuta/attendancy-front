import React from "react";

import { Card, Col, Row, Statistic } from "antd";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { IconType } from "react-icons/lib";
import { ICard } from "@/types/global";

const MyCard = ({ title, value, icon, status, suffix }: ICard) => (
  <Row gutter={16}>
    <Col span={12}>
      <Card
        bordered={false}
        size="small"
        className={
          status ? `bg-secondary_color/50 w-64` : `bg-[#B73131]/30 w-64 `
        }
      >
        <Statistic
          title={title}
          value={value}
          precision={0}
          valueStyle={{ color: status ? "#3f8600" : "#000" }}
          prefix={icon}
          suffix={suffix}
        />
      </Card>
    </Col>
  </Row>
);

export default MyCard;
