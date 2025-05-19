import { useState } from 'react';
import { Modal, Input, Button, Card, Divider } from 'antd';
import { EditOutlined, PlusOutlined, MinusOutlined, ThunderboltOutlined, BookOutlined, AppstoreOutlined } from '@ant-design/icons';

const SubscriptionManagement = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [planName, setPlanName] = useState('');
  const [planFeatures, setPlanFeatures] = useState([]);

  const plans = [
    {
      id: 1,
      name: 'Basic plan',
      price: '$10',
      billingPeriod: 'mth',
      billingInfo: 'Billed annually.',
      icon: <ThunderboltOutlined />,
      features: [
        'Access to all basic features',
        'Basic reporting and analytics',
        'Up to 10 individual users',
        '20GB individual data each user',
        'Basic chat and email support'
      ]
    },
    {
      id: 2,
      name: 'Business plan',
      price: '$20',
      billingPeriod: 'mth',
      billingInfo: 'Billed annually.',
      icon: <BookOutlined />,
      features: [
        '200+ integrations',
        'Advanced reporting and analytics',
        'Up to 20 individual users',
        '40GB individual data each user',
        'Priority chat and email support'
      ]
    },
    {
      id: 3,
      name: 'Enterprise plan',
      price: '$40',
      billingPeriod: 'mth',
      billingInfo: 'Billed annually.',
      icon: <AppstoreOutlined />,
      features: [
        'Advanced custom fields',
        'Audit log and data history',
        'Unlimited individual users',
        'Unlimited individual data',
        'Personalised+priority service'
      ]
    }
  ];

  const showModal = (plan) => {
    setEditingPlan(plan);
    setPlanName(plan.name);
    setPlanFeatures([...plan.features]);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingPlan(null);
  };

  const handleSave = () => {
    // Here you would typically update your state or make an API call
    console.log('Saving plan:', { ...editingPlan, name: planName, features: planFeatures });
    setIsModalVisible(false);
  };

  const addFeature = () => {
    setPlanFeatures([...planFeatures, '']);
  };

  const removeFeature = (index) => {
    const newFeatures = [...planFeatures];
    newFeatures.splice(index, 1);
    setPlanFeatures(newFeatures);
  };

  const updateFeature = (index, value) => {
    const newFeatures = [...planFeatures];
    newFeatures[index] = value;
    setPlanFeatures(newFeatures);
  };

  return (
    <div className=" p-6 mt-5">
      <div className="max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              extra={
                <Button 
                  type="text" 
                  icon={<EditOutlined />} 
                  onClick={() => showModal(plan)}
                  className="hover:text-blue-500"
                />
              }
            >
              <div className="flex flex-col items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 mb-4">
                  {plan.id === 1 ? <img src="/icons/plan1.png" alt="" /> : plan.id === 2 ?<img src="/icons/plan2.png" alt="" /> : <img src="/icons/plan3.png" alt="" />}
                </div>
                <h3 className="text-teal-600 text-xl font-medium">{plan.name}</h3>
              </div>
              
              <div className="text-center mb-4">
                <div className="flex items-center justify-center">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-600">/{plan.billingPeriod}</span>
                </div>
                <p className="text-gray-500 text-sm">{plan.billingInfo}</p>
              </div>
              
              <Divider className="my-4" />
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="text-green-500 mr-2 mt-1">✓</div>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                type="primary" 
                block 
                className="h-12"
              >
                Choose Plan
              </Button>
            </Card>
          ))}
        </div>
      </div>

      <Modal
        title="Change Plan Details"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button 
            key="save" 
            type="primary" 
            onClick={handleSave}

          >
            Save
          </Button>,
        ]}
        width={800}
      >
        {editingPlan && (
          <div className="flex">
            <div className="w-1/2 pr-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-lg font-semibold mb-2">
                  Change Plan Name
                </label>
                <Input
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                  placeholder="Enter plan name"
                  className="w-full"
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-gray-700 text-lg font-semibold">
                    Change Subscription Feature
                  </label>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={addFeature}
                    shape="circle"
                    className=""
                  />
                </div>
                <div className="space-y-3">
                  {planFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Input
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        className="flex-grow mr-2"
                      />
                      <Button
                        type="default"
                        icon={<MinusOutlined />}
                        onClick={() => removeFeature(index)}
                        shape="circle"
                        className="flex-shrink-0 hover:text-red-500 hover:border-red-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="w-1/2 pl-4">
              <Card className="border shadow-sm">
                <div className="flex flex-col items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 mb-4">
                     {editingPlan.id === 1 ? <img src="/icons/plan1.png" alt="" /> : editingPlan.id === 2 ?<img src="/icons/plan2.png" alt="" /> : <img src="/icons/plan3.png" alt="" />}
                  </div>
                  <h3 className="text-teal-600 text-xl font-medium">{planName}</h3>
                </div>
                
                <div className="text-center mb-4">
                  <div className="flex items-center justify-center">
                    <span className="text-4xl font-bold">{editingPlan.price}</span>
                    <span className="text-gray-600">/{editingPlan.billingPeriod}</span>
                  </div>
                  <p className="text-gray-500 text-sm">{editingPlan.billingInfo}</p>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {planFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="text-green-500 mr-2 mt-1">✓</div>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  type="primary" 
                  block 
                  className=" h-12"
                >
                  Choose Plan
                </Button>
              </Card>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SubscriptionManagement;