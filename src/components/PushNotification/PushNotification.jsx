import { Button, Select } from 'antd';
import JoditEditor from 'jodit-react';
import { useMemo, useState } from 'react';

export default function PushNotification() {
  const [title, setTitle] = useState('');
  const [institute, setInstitute] = useState(undefined);
  const [content, setContent] = useState('');

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Type your notification content...",
      height: 300,
      buttons: ['bold', 'italic', 'underline', 'ul', 'ol', 'indent', 'outdent'],
      showPlaceholder: true,
      toolbarSticky: false,
      toolbarAdaptive: false
    }),
    []
  );

  // Demo data for institutes
  const instituteOptions = [
    { value: 'institute1', label: 'Institute One' },
    { value: 'institute2', label: 'Institute Two' },
    { value: 'institute3', label: 'Institute Three' },
    { value: 'institute4', label: 'Institute Four' },
    { value: 'institute5', label: 'Institute Five' },
  ];

  const handleCancel = () => {
    console.log('Cancel button clicked');
  };

  const handleSend = () => {
    console.log('Sending notification:', { title, institute, content });
  };

  return (
    <div className="bg-white flex flex-col gap-5 border mt-10 rounded-lg p-6 shadow-sm max-w-6xl ">
      <h1 className="text-xl font-semibold mb-6">Send Push Notification</h1>

      <div className="flex items-center gap-4 mb-4">
        <label className="block font-medium w-24">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Write Your Title Here"
          className="flex-1 border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500 h-10"
        />
      </div>

      <div className="flex items-center gap-4 mb-4">
        <label className="block font-medium w-24">Institute</label>
        <Select
          placeholder="Select Institute"
          className="flex-1 h-[40px]"
          value={institute}
          onChange={(value) => setInstitute(value)}
          options={instituteOptions}
          suffixIcon={<span className="text-gray-400">▼</span>}
          getPopupContainer={trigger => trigger.parentNode}
        />
      </div>

      <div className="flex gap-4 mb-4">
        <label className="block font-medium w-24 mt-2">Body</label>
        <div className="flex-1 border border-gray-300 rounded">
          <JoditEditor
            value={content}
            config={config}
            tabIndex={1}
            onChange={newContent => setContent(newContent)}
          />
        </div>
      </div>

      <div className="flex justify-end mt-6 space-x-2">
        <Button
          className="px-6 h-10 bg-gray-100 text-gray-600 border border-gray-300 rounded"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          className="px-6 h-10 bg-teal-500 text-white border-none rounded"
          onClick={handleSend}
          type="primary"
        >
          Send
        </Button>
      </div>
    </div>
  );
}