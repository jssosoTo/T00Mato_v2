import { useState } from 'react';
import Card from '../../components/Card';
import {
  PieChartOutlined,
  DotChartOutlined,
  AimOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import styles from './index.module.css';
import moment from 'moment';
import Segment from '../../components/Segment';
import DemoHeatmap from '../../components/DemoHeatMap';
import { Column, Line, Pie } from '@ant-design/plots';

const data = [
  { type: '分类一', value: 27 },
  { type: '分类二', value: 25 },
  { type: '分类三', value: 18 },
  { type: '分类四', value: 15 },
  { type: '分类五', value: 10 },
  { type: '其他', value: 5 },
  { type: '其他', value: 5 },
  { type: '其他2', value: 5 },
  { type: '其他1', value: 5 },
  { type: '其他3', value: 5 },
  { type: '其他4', value: 5 },
  { type: '其他5', value: 5 },
  { type: '其他6', value: 5 },
  { type: '其他', value: 5 },
  { type: '其他', value: 5 },
  { type: '其他', value: 5 },
  { type: '其他', value: 5 },
  { type: '其他', value: 5 },
];
const config = {
  appendPadding: 10,
  data,
  angleField: 'value',
  colorField: 'type',
  radius: 0.75,
  label: {
    type: 'spider',
    labelHeight: 28,
    content: '{name}\n{percentage}',
  },
  interactions: [
    {
      type: 'element-selected',
    },
    {
      type: 'element-active',
    },
  ],
};

const columnData = [
  {
    type: '家具家电',
    sales: 38,
  },
  {
    type: '粮油副食',
    sales: 52,
  },
  {
    type: '生鲜水果',
    sales: 61,
  },
  {
    type: '美容洗护',
    sales: 145,
  },
  {
    type: '母婴用品',
    sales: 48,
  },
  {
    type: '进口食品',
    sales: 38,
  },
  {
    type: '食品饮料',
    sales: 38,
  },
  {
    type: '家庭清洁',
    sales: 38,
  },
];
const columnConfig = {
  data: columnData,
  xField: 'type',
  yField: 'sales',
  label: {
    // 可手动配置 label 数据标签位置
    position: 'middle',
    // 'top', 'bottom', 'middle',
    // 配置样式
    style: {
      fill: '#FFFFFF',
      opacity: 0.6,
    },
  },
  xAxis: {
    label: {
      autoHide: true,
      autoRotate: false,
    },
  },
  meta: {
    type: {
      alias: '类别',
    },
    sales: {
      alias: '销售额',
    },
  },
};

const lineData = [
  {
    year: '1991',
    value: 3,
  },
  {
    year: '1992',
    value: 4,
  },
  {
    year: '1993',
    value: 3.5,
  },
  {
    year: '1994',
    value: 5,
  },
  {
    year: '1995',
    value: 4.9,
  },
  {
    year: '1996',
    value: 6,
  },
  {
    year: '1997',
    value: 7,
  },
  {
    year: '1998',
    value: 9,
  },
  {
    year: '1999',
    value: 13,
  },
];
const lineConfig = {
  data: lineData,
  xField: 'year',
  yField: 'value',
  label: {},
  point: {
    size: 5,
    shape: 'diamond',
    style: {
      fill: 'white',
      stroke: '#5B8FF9',
      lineWidth: 2,
    },
  },
  tooltip: {
    showMarkers: false,
  },
  state: {
    active: {
      style: {
        shadowBlur: 4,
        stroke: '#000',
        fill: 'red',
      },
    },
  },
  interactions: [
    {
      type: 'marker-active',
    },
  ],
};

function DataPage() {
  const [focusTimeActiveKey, setFocusTimeActiveKey] = useState<0 | 1 | 2 | 3>(
    0
  );

  return (
    <div className="flex-1 flex justify-center item-center auto-scroll pt-1">
      <div className="flex flex-column main-container-xs h-full gap-11">
        <DemoHeatmap />
        <Card
          title={
            <div
              className="flex item-center"
              style={{
                gap: '2rem',
              }}
            >
              <span style={{ fontSize: '3rem' }}>累计专注</span>
              <AimOutlined style={{ fontSize: '3.6rem' }} />
            </div>
          }
          action={<PieChartOutlined />}
        >
          <div className="flex justify-around item-center">
            <div className={styles.Item}>
              <h4>次数</h4>
              <div className={styles.CountShow}>
                <span>3</span>
              </div>
            </div>
            <div className={styles.Item}>
              <h4>时长</h4>
              <div className={styles.CountShow}>
                <span>3</span>
                <span className={styles.minuteShow}>分钟</span>
              </div>
            </div>
            <div className={styles.Item}>
              <h4>日均时长</h4>
              <div className={styles.CountShow}>
                <span>3</span>
              </div>
            </div>
          </div>
        </Card>
        <Card
          title={
            <div
              className="flex item-center"
              style={{
                gap: '2rem',
              }}
            >
              <span style={{ fontSize: '3rem' }}>今日专注</span>
              <DotChartOutlined style={{ fontSize: '3.6rem' }} />
            </div>
          }
          action={<div className={`${styles.experiment} breath-light`}></div>}
        >
          <div className="flex justify-around item-center">
            <div className={styles.Item}>
              <h4>次数</h4>
              <div className={styles.CountShow}>
                <span>3</span>
              </div>
            </div>
            <div className={styles.Item}>
              <h4>时长</h4>
              <div className={styles.CountShow}>
                <span>3</span>
                <span className={styles.minuteShow}>分钟</span>
              </div>
            </div>
            <div className={styles.Item}>
              <h4>放弃次数</h4>
              <div className={styles.CountShow}>
                <span>3</span>
              </div>
            </div>
          </div>
        </Card>
        <Card
          title={
            <div
              className="flex item-center"
              style={{
                gap: '2rem',
              }}
            >
              <span style={{ fontSize: '3rem' }}>
                专注时长分布 {moment().format('YYYY-MM-DD')}
              </span>
            </div>
          }
          action={
            <div className="flex gap-5">
              <div className="cursor-pointer">
                <LeftOutlined />
              </div>
              <div className="cursor-pointer">
                <RightOutlined />
              </div>
            </div>
          }
        >
          <Segment
            activeKey={focusTimeActiveKey}
            onClick={setFocusTimeActiveKey}
            selections={['日', '周', '月', '自定义']}
            width="max-content"
            className={styles.Segment}
          />
          <Pie {...config} />
          <div className="flex gap-3 justify-center">
            <div>总计：{6}分钟</div>
            <div style={focusTimeActiveKey === 0 ? { display: 'none' } : {}}>
              本周日均：{1}分钟
            </div>
          </div>
        </Card>
        <Card
          title={
            <div
              className="flex item-center"
              style={{
                gap: '2rem',
              }}
            >
              <span style={{ fontSize: '3rem' }}>
                本月专注时段分布 {moment().format('YYYY-MM')}
              </span>
            </div>
          }
          action={
            <div className="flex gap-5">
              <div className="cursor-pointer">
                <LeftOutlined />
              </div>
              <div className="cursor-pointer">
                <RightOutlined />
              </div>
            </div>
          }
        >
          <Column {...columnConfig} />
        </Card>
        <Card
          title={
            <div
              className="flex item-center"
              style={{
                gap: '2rem',
              }}
            >
              <span style={{ fontSize: '3rem' }}>
                月度数据 {moment().format('YYYY-MM')}
              </span>
            </div>
          }
          action={
            <div className="flex gap-5">
              <div className="cursor-pointer">
                <LeftOutlined />
              </div>
              <div className="cursor-pointer">
                <RightOutlined />
              </div>
            </div>
          }
        >
          <Line {...lineConfig} />
        </Card>
      </div>
    </div>
  );
}

export default DataPage;
