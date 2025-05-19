import { Card, Typography } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const { Title } = Typography;


const revenueData = [
  { month: 'Jan', revenue: 12000 },
  { month: 'Feb', revenue: 15000 },
  { month: 'Mar', revenue: 18000 },
  { month: 'Apr', revenue: 22000 },
  { month: 'May', revenue: 28000 },
  { month: 'Jun', revenue: 38750 },
  { month: 'Jul', revenue: 35000 },
  { month: 'Aug', revenue: 30000 },
  { month: 'Sep', revenue: 25000 },
  { month: 'Oct', revenue: 22000 },
  { month: 'Nov', revenue: 20000 },
  { month: 'Dec', revenue: 22000 }
];


const Revenue = () => {

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
          {/* <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>{label}</p> */}
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
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
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
      </Card>
    </div>
  );
};

export default Revenue;