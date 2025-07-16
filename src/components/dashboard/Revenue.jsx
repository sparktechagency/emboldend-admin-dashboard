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
          padding: '10px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <p style={{ color: '#336C79' }}>
            <strong>${payload[0].value.toLocaleString()}</strong>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className='w-full'>
      <Card
        className=" border border-primary"
        title={<Title level={5}>Total Revenue</Title>}
      >
        {isLoading ? (
          <div className='h-[300px] flex justify-center items-center'><Skeleton active /></div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data?.data || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#336C79"
                strokeWidth={2}
                dot={{ r: 5 }}
                name="Monthly Revenue"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </Card>
    </div>
  );
};

export default Revenue;