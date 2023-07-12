import React from "react";

import { Card, Col, Row, Statistic } from "antd";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";

const MyCard: React.FC = () => (
  <Row gutter={16}>
    <Col span={12}>
      <Card bordered={true} className="bg-secondary_color/50 w-52">
        <Statistic
          title="Presences"
          value={11.28}
          precision={2}
          valueStyle={{ color: "#3f8600" }}
          prefix={<FiArrowUp />}
          suffix="%"
        />
      </Card>
    </Col>
  </Row>
);

export default MyCard;
