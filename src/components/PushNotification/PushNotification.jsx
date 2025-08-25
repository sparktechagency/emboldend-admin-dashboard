import { Underline } from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Button, message, Select } from 'antd';
import { useEffect, useState } from 'react';
import { MdFormatListBulleted } from "react-icons/md";
import { VscListOrdered } from "react-icons/vsc";
import { useGetBussinessOwnerQuery, useSendNotificationMutation } from '../../features/notification/notification';

export default function PushNotification() {
  const [title, setTitle] = useState('');
  const [businessOwner, setBusinessOwner] = useState(undefined);
  const [content, setContent] = useState('');
  const [mounted, setMounted] = useState(false);
  const { data: getBusinessOwner, isLoading: loadingBusinessOwner } = useGetBussinessOwnerQuery({ limit: 10000 });
  const [PushNotification, { isLoading: PushNotificationLoading }] = useSendNotificationMutation();

  // Create business owner options with "All" option at the top
  const businessOwnerOptions = [
    { value: 'all', label: 'All Business Owners' },
    ...(getBusinessOwner?.data?.map(item => ({
      value: item._id,
      label: item.name
    })) || [])
  ];

  // Handle SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  // Tiptap Editor Setup
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          HTMLAttributes: {
            class: "list-disc pl-5",
          },
        },
        orderedList: {
          keepMarks: true,
          HTMLAttributes: {
            class: "list-decimal pl-5",
          },
        },
      }),
      Underline,
    ],
    content: content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setContent(html);
    },
    editorProps: {
      attributes: {
        class: "focus:outline-none p-4 min-h-[180px] md:min-h-[240px] max-h-[320px] overflow-y-auto bg-white text-gray-800",
      },
    },
  });

  const handleCancel = () => {
    console.log('Cancel button clicked');
    // Reset form
    setTitle('');
    setBusinessOwner(undefined);
    setContent('');
    editor?.commands.clearContent();
  };

  const handleSend = async () => {
    let notificationData;

    if (businessOwner === 'all') {
      // Send to all business owners - no receiver field needed
      notificationData = {
        title: title,
        message: content
      };
    } else {
      // Send to specific business owner
      notificationData = {
        title: title,
        message: content,
        receiver: businessOwner
      };
    }
    try {
      const response = await PushNotification(notificationData).unwrap();
      message.success(response.message)
      setTitle('');
      setBusinessOwner(undefined);
      setContent('');
      editor?.commands.clearContent();
    } catch (error) {
      console.log(error.data.message)
    }
    // Here you would typically make an API call to send the notification
    // Example:
    // sendPushNotification(notificationData);
  };

  return (
    <div className="bg-white flex flex-col gap-4 md:gap-5 border mt-4 md:mt-10 rounded-lg p-4 md:p-6 shadow-sm w-full max-w-6xl mx-auto">
      <h1 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">Send Push Notification</h1>

      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
        <label className="block font-medium w-full sm:w-24">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Write Your Title Here"
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500 h-10"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
        <label className="block font-medium w-full sm:w-24">Business Owner</label>
        <Select
          placeholder={loadingBusinessOwner ? "Loading business owners..." : "Select Business Owner"}
          className="w-full h-[40px]"
          value={businessOwner}
          onChange={(value) => setBusinessOwner(value)}
          options={businessOwnerOptions}
          loading={loadingBusinessOwner}
          disabled={loadingBusinessOwner}
          suffixIcon={<span className="text-gray-400">▼</span>}
          getPopupContainer={trigger => trigger.parentNode}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4">
        <label className="block font-medium w-full sm:w-24 mt-2">Body</label>
        <div className="flex-1 border border-gray-300 rounded">
          {/* Toolbar */}
          <div className="flex flex-wrap gap-1 px-1 py-2 border-b bg-gray-50 border-gray-200">
            <button
              type="button"
              onClick={() => editor?.chain().focus().toggleBold().run()}
              className={`px-3 py-1 md:px-4 md:py-2 cursor-pointer rounded ${editor?.isActive("bold")
                ? "bg-blue-700 text-white"
                : "hover:bg-gray-200"
                }`}
            >
              <strong className="text-sm md:text-base">B</strong>
            </button>
            <button
              type="button"
              onClick={() =>
                editor?.chain().focus().toggleItalic().run()
              }
              className={`px-3 py-1 md:px-4 md:py-2 cursor-pointer rounded ${editor?.isActive("italic")
                ? "bg-blue-700 text-white"
                : "hover:bg-gray-200"
                }`}
            >
              <em className="text-sm md:text-base">I</em>
            </button>
            <button
              type="button"
              onClick={() =>
                editor?.chain().focus().toggleUnderline().run()
              }
              className={`px-3 py-1 md:px-4 md:py-2 cursor-pointer rounded ${editor?.isActive("underline")
                ? "bg-blue-700 text-white"
                : "hover:bg-gray-200"
                }`}
            >
              <u className="text-sm md:text-base">U</u>
            </button>
            <button
              type="button"
              onClick={() =>
                editor?.chain().focus().toggleBulletList().run()
              }
              className={`px-2 py-1 md:px-3 md:py-2 cursor-pointer rounded ${editor?.isActive("bulletList")
                ? "bg-blue-700 text-white"
                : "hover:bg-gray-200"
                }`}
            >
              <MdFormatListBulleted size={18} className="md:w-5 md:h-5" />
            </button>
            <button
              type="button"
              onClick={() =>
                editor?.chain().focus().toggleOrderedList().run()
              }
              className={`px-2 py-1 md:px-3 md:py-2 cursor-pointer rounded ${editor?.isActive("orderedList")
                ? "bg-blue-700 text-white"
                : "hover:bg-gray-200"
                }`}
            >
              <VscListOrdered size={18} className="md:w-5 md:h-5" />
            </button>
          </div>

          {/* Editor */}
          {mounted ? (
            <EditorContent editor={editor} />
          ) : (
            <div className="min-h-[180px] md:min-h-[240px] p-4 bg-gray-50 animate-pulse" />
          )}
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 mt-4 md:mt-6">
        <Button
          className="h-10 bg-gray-100 text-gray-600 border border-gray-300 rounded w-full sm:w-auto"
          onClick={handleCancel}
          block={window.innerWidth < 640}
        >
          Cancel
        </Button>
        <Button
          className="h-10 text-white border-none rounded w-full sm:w-auto"
          loading={PushNotificationLoading}
          onClick={handleSend}
          type="primary"
          disabled={!title || !businessOwner || !content}
          block={window.innerWidth < 640}
        >
          Send
        </Button>
      </div>
    </div>
  );
}