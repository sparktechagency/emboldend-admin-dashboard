import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Divider, Input, message, Modal, Select, Spin } from 'antd';
import { useState } from 'react';
import { useCreateSubscriptionPlanMutation, useDeleteSubscriptionPlanByIDMutation, useGetSubscriptionPlansQuery, useUpdateSubscriptionPlanByIDMutation } from '../../features/SubscriptionPlan/SubscriptionPlanApi';

const { Option } = Select;
const { TextArea } = Input;

const SubscriptionManagement = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [planName, setPlanName] = useState('');
  const [pricePerEmployee, setPricePerEmployee] = useState('');
  const [description, setDescription] = useState('');
  const [billingCycle, setBillingCycle] = useState('');
  const [currency, setCurrency] = useState('');
  const [isUnionized, setIsUnionized] = useState(false);
  const [discount, setDiscount] = useState('');
  const [discountValue, setDiscountValue] = useState('');
  const [planFeatures, setPlanFeatures] = useState([]);

  // API hooks
  const { data: subscriptionPlans, isLoading, error, refetch } = useGetSubscriptionPlansQuery();
  const [updatePlan, { isLoading: isUpdating }] = useUpdateSubscriptionPlanByIDMutation();
  const [deletePlan] = useDeleteSubscriptionPlanByIDMutation();
  const [createPlan, { isLoading: isCreating }] = useCreateSubscriptionPlanMutation();

  // Helper function to format plan data for display
  const formatPlanForDisplay = (plan) => {
    const features = [];

    if (plan.description) features.push(plan.description);
    features.push(`Billing cycle: ${plan.billingCycle}`);
    features.push(`Unionized: ${plan.isUnionized ? 'Yes' : 'No'}`);
    features.push(`Currency: ${plan.currency}`);

    if (plan.discount && plan.discountValue) {
      features.push(`Discount: ${plan.discountValue} ${plan.discount}`);
    }

    return {
      ...plan,
      id: plan._id,
      name: plan.planName,
      price: `$${plan.pricePerEmployee}`,
      billingPeriod: plan.billingCycle === 'MONTH' ? 'month' : 'year',
      billingInfo: `Per employee, billed ${plan.billingCycle === 'MONTH' ? 'monthly' : 'annually'}.`,
      features: features,
      icon: getIconForPlan(plan.planName)
    };
  };

  // Helper function to get icon based on plan name
  const getIconForPlan = (planName) => {
    if (planName.includes('BASIC') || planName.includes('NON_UNIONIZED')) {
      return <img src="/icons/plan1.png" alt="" />;
    } else if (planName.includes('BUSINESS') || planName.includes('UNIONIZED_MONTHLY')) {
      return <img src="/icons/plan2.png" alt="" />;
    } else {
      return <img src="/icons/plan3.png" alt="" />;
    }
  };

  // Get formatted plans for display
  const displayPlans = subscriptionPlans?.data ? subscriptionPlans.data.map(formatPlanForDisplay) : [];

  const showModal = (plan) => {
    setEditingPlan(plan);
    setPlanName(plan.planName);
    setPricePerEmployee(plan.pricePerEmployee);
    setDescription(plan.description || '');
    setBillingCycle(plan.billingCycle);
    setCurrency(plan.currency);
    setIsUnionized(plan.isUnionized);
    setDiscount(plan.discount || '');
    setDiscountValue(plan.discountValue || '');

    // Convert plan data to features for editing
    const features = [];
    if (plan.description) features.push(plan.description);
    features.push(`Billing cycle: ${plan.billingCycle}`);
    features.push(`Unionized: ${plan.isUnionized ? 'Yes' : 'No'}`);
    features.push(`Currency: ${plan.currency}`);

    setPlanFeatures(features);
    setIsModalVisible(true);
  };

  const showCreateModal = () => {
    setIsCreateModalVisible(true);

  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsCreateModalVisible(false);
    setEditingPlan(null);
    resetForm();
  };

  const resetForm = () => {
    setPlanName('');
    setPricePerEmployee('');
    setDescription('');
    setBillingCycle('');
    setCurrency('');
    setIsUnionized(false);
    setDiscount('');
    setDiscountValue('');
    setPlanFeatures([]);
  };

  const handleSave = async () => {
    try {
      const updateData = {
        planName,
        pricePerEmployee: Number(pricePerEmployee),
        description,
        billingCycle,
        currency,
        isUnionized,
        discount,
        discountValue: discountValue ? Number(discountValue) : undefined
      };

      await updatePlan({
        id: editingPlan._id,
        data: updateData
      }).unwrap();

      message.success('Plan updated successfully');
      refetch();
      setIsModalVisible(false);
      resetForm();
    } catch (error) {
      message.error('Failed to update plan');
      console.error('Update error:', error);
    }
  };

  const handleCreate = async () => {
    try {
      const createData = {
        planName,
        pricePerEmployee: Number(pricePerEmployee),
        description,
        billingCycle,
        currency,
        isUnionized,
        discount,
        discountValue: discountValue ? Number(discountValue) : undefined
      };

      await createPlan(createData).unwrap();
      refetch();

      message.success('Plan created successfully');
      setIsCreateModalVisible(false);
      resetForm();
    } catch (error) {
      message.error(error?.data?.message);
      console.error('Create error:', error);
    }
  };

  const handleDelete = async (planId) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this plan?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await deletePlan(planId).unwrap();
          refetch();
          message.success('Plan deleted successfully');
        } catch (error) {
          message.error('Failed to delete plan');
          console.error('Delete error:', error);
        }
      }
    });
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

  if (isLoading) return <div className="flex justify-center items-center h-64"><Spin size="small" /></div>;
  if (error) return <div className="text-red-500 text-center">{error?.data?.message}</div>;

  return (
    <div className="p-6 mt-5 border">
      {displayPlans.length < 4 && <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: "10px" }}>
        <Button type="primary" onClick={showCreateModal}>
          Create a Plan
        </Button>
      </div>}

      {
        displayPlans.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="text-xl text-gray-600 mb-4">No plan available</div>
          </div>
        ) : (
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
              {displayPlans.map((plan) => (
                <Card
                  key={plan.id}
                  className="rounded-lg w-full h-full shadow-md hover:shadow-lg transition-shadow duration-300"
                  extra={
                    <div className="flex gap-2">
                      <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => showModal(plan)}
                        className="hover:text-blue-500"
                      />
                      <Button
                        type="text"
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(plan.id)}
                        className="hover:text-red-500"
                      />
                    </div>
                  }
                >
                  <div className="flex flex-col items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 mb-4">
                      {plan.icon}
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

                  {/* <Button
                    type="primary"
                    block
                    className="h-12"
                  >
                    Choose Plan
                  </Button> */}
                </Card>
              ))}
            </div>
          </div>
        )
      }


      {/* Edit Plan Modal */}
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
            loading={isUpdating}
          >
            Save
          </Button>,
        ]}
        width={800}
      >
        {editingPlan && (
          <div className="flex">
            <div className="w-full pr-4">
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
                <label className="block text-gray-700 text-lg font-semibold mb-2">Is Unionized</label>
                <Checkbox
                  checked={isUnionized}
                  onChange={(e) => setIsUnionized(e.target.checked)}
                >
                  {isUnionized ? 'Yes' : 'No'}
                </Checkbox>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-lg font-semibold mb-2">
                  Price Per Employee
                </label>
                <Input
                  type="number"
                  value={pricePerEmployee}
                  onChange={(e) => setPricePerEmployee(e.target.value)}
                  placeholder="Enter price per employee"
                  className="w-full"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-lg font-semibold mb-2">
                  Billing Cycle
                </label>
                <select
                  value={billingCycle}
                  onChange={(e) => setBillingCycle(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="MONTH">Monthly</option>
                  <option value="YEAR">Yearly</option>
                </select>
              </div>


              <div>
                <label className="block text-gray-700 text-lg font-semibold mb-2">Discount</label>
                <Select
                  value={discount || undefined}
                  onChange={setDiscount}
                  className="w-full"
                  placeholder="Select discount type"
                  allowClear
                >
                  <Option value="MONTHS_FREE">MONTHS_FREE</Option>
                </Select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-lg font-semibold mb-2">
                  Currency
                </label>
                <Input
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  placeholder="Enter currency (e.g., USD)"
                  className="w-full"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-lg font-semibold mb-2">
                  Description
                </label>
                <Input.TextArea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter plan description"
                  className="w-full"
                  rows={3}
                />
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Create Plan Modal */}
      <Modal
        title="Create New Plan"
        open={isCreateModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="create"
            type="primary"
            onClick={handleCreate}
            loading={isCreating}
          >
            Create
          </Button>,
        ]}
        width={800}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 text-lg font-semibold mb-2">Plan Name</label>
            <Select
              value={planName || undefined} // Use undefined instead of empty string for placeholder to show
              onChange={setPlanName}
              className="w-full"
              placeholder="Select plan name"
              allowClear
            >
              <Option value="UNIONIZED_MONTHLY">UNIONIZED_MONTHLY</Option>
              <Option value="UNIONIZED_YEARLY">UNIONIZED_YEARLY</Option>
              <Option value="NON_UNIONIZED_MONTHLY">NON_UNIONIZED_MONTHLY</Option>
              <Option value="NON_UNIONIZED_YEARLY">NON_UNIONIZED_YEARLY</Option>
            </Select>
          </div>

          <div>
            <label className="block text-gray-700 text-lg font-semibold mb-2">Is Unionized</label>
            <Checkbox
              checked={isUnionized}
              onChange={(e) => setIsUnionized(e.target.checked)}
            >
              {isUnionized ? 'Yes' : 'No'}
            </Checkbox>
          </div>

          <div>
            <label className="block text-gray-700 text-lg font-semibold mb-2">Billing Cycle</label>
            <Select
              value={billingCycle || undefined}
              onChange={setBillingCycle}
              className="w-full"
              placeholder="Select billing cycle"
              allowClear
            >
              <Option value="MONTH">Month</Option>
              <Option value="YEAR">Year</Option>
            </Select>
          </div>

          <div>
            <label className="block text-gray-700 text-lg font-semibold mb-2">Price Per Employee</label>
            <Input
              type="number"
              value={pricePerEmployee}
              onChange={(e) => setPricePerEmployee(e.target.value)}
              placeholder="Enter price per employee"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-lg font-semibold mb-2">Discount</label>
            <Select
              value={discount || undefined}
              onChange={setDiscount}
              className="w-full"
              placeholder="Select discount type"
              allowClear
            >
              <Option value="MONTHS_FREE">MONTHS_FREE</Option>
            </Select>
          </div>

          <div>
            <label className="block text-gray-700 text-lg font-semibold mb-2">Discount Value</label>
            <Input
              type="number"
              value={discountValue}
              onChange={(e) => setDiscountValue(e.target.value)}
              placeholder="Enter discount value"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-lg font-semibold mb-2">Currency</label>
            <Select
              value={currency || undefined}
              onChange={setCurrency}
              className="w-full"
              placeholder="Select currency"
              showSearch
              allowClear
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {[
                "AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN",
                "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BRL",
                "BSD", "BTN", "BWP", "BYN", "BZD", "CAD", "CDF", "CHF", "CLP", "CNY",
                "COP", "CRC", "CUC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD",
                "EGP", "ERN", "ETB", "EUR", "FJD", "FKP", "FOK", "GBP", "GEL", "GGP",
                "GHS", "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG",
                "HUF", "IDR", "ILS", "IMP", "INR", "IQD", "IRR", "ISK", "JEP", "JMD",
                "JOD", "JPY", "KES", "KGS", "KHR", "KID", "KMF", "KRW", "KWD", "KYD",
                "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LYD", "MAD", "MDL", "MGA",
                "MKD", "MMK", "MNT", "MOP", "MRU", "MUR", "MVR", "MWK", "MXN", "MYR",
                "MZN", "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN",
                "PGK", "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF",
                "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLE", "SLL", "SOS",
                "SRD", "SSP", "STN", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP",
                "TRY", "TTD", "TVD", "TWD", "TZS", "UAH", "UGX", "USD", "UYU", "UZS",
                "VES", "VND", "VUV", "WST", "XAF", "XCD", "XOF", "XPF", "YER", "ZAR",
                "ZMW", "ZWL"
              ].map(curr => (
                <Option key={curr} value={curr}>{curr}</Option>
              ))}
            </Select>
          </div>

          <div>
            <label className="block text-gray-700 text-lg font-semibold mb-2">Description</label>
            <TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter plan description"
              rows={4}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SubscriptionManagement;