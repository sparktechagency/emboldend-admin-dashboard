import { Card, Skeleton, Typography } from 'antd';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useGetTotalRevenueQuery } from '../../features/dashboard/dashboardApi';
const { Title } = Typography;

const Revenue = () => {
  const { data, isLoading } = useGetTotalRevenueQuery();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: '#fff',
          padding: '8px 12px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          fontSize: '12px',
          maxWidth: '200px'
        }}>
          <p style={{
            color: '#336C79',
            margin: 0,
            fontWeight: 'bold'
          }}>
            ${payload[0].value.toLocaleString()}
          </p>
          <p style={{
            color: '#666',
            margin: '4px 0 0 0',
            fontSize: '11px'
          }}>
            {label}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className='w-full'>
      <Card
        className="border border-primary"
        title={
          <Title
            level={5}
            className="!mb-0 !text-sm sm:!text-base"
          >
            Total Revenue
          </Title>
        }
        bodyStyle={{
          padding: '12px 16px',
          '@media (max-width: 768px)': {
            padding: '8px 12px'
          }
        }}
      >
        {isLoading ? (
          <div className='h-[250px] sm:h-[300px] flex justify-center items-center'>
            <Skeleton active />
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <ResponsiveContainer
              width="100%"
              height={261}
              minWidth={300}
            >
              <LineChart
                data={data?.data || []}
                margin={{
                  top: 10,
                  right: 10,
                  left: 0,
                  bottom: 10,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11 }}
                  interval="preserveStartEnd"
                  angle={window.innerWidth < 768 ? -45 : 0}
                  textAnchor={window.innerWidth < 768 ? 'end' : 'middle'}
                  height={window.innerWidth < 768 ? 60 : 30}
                />
                <YAxis
                  tick={{ fontSize: 11 }}
                  width={40}
                  tickFormatter={(value) =>
                    window.innerWidth < 768
                      ? `$${(value / 1000).toFixed(0)}k`
                      : `$${value.toLocaleString()}`
                  }
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{
                    fontSize: '12px',
                    paddingTop: '10px'
                  }}
                  iconSize={10}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#336C79"
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                  name="Monthly Revenue"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Revenue;