import { Button, message } from "antd";
import JoditEditor from "jodit-react";
import React, { useEffect, useMemo, useRef, useState } from "react"; // Add useEffect
import { useNavigate } from "react-router-dom";
import { useCreatePrivacyPolicyMutation, useGetPrivacyPolicyQuery } from '../features/Rule/RuleApi';

const PrivacyPolicy = ({ placeholder }) => {
  const router = useNavigate();
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [createprivacy, { isLoading: createIsloading }] = useCreatePrivacyPolicyMutation();
  const { data, isLoading: getPrivacyLoading } = useGetPrivacyPolicyQuery();

  // Load existing privacy policy content when data is fetched
  useEffect(() => {
    if (data?.data?.content) {
      setContent(data.data.content.replace(/"/g, '').trim());
    }
  }, [data]);

  // Configuration object for Jodit Editor with memoization
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "",
      height: 500,
      buttons: ['bold', 'italic', 'underline', 'ul', 'ol', 'indent', 'outdent', 'image'],
      showPlaceholder: true,
      toolbarSticky: false,
      toolbarAdaptive: false
    }),
    []
  );

  const handleSavePrivacyPolicy = async () => {
    setIsLoading(true);
    try {
      const response = await createprivacy({ content: JSON.stringify(content), type: "privacy" }).unwrap();
      message.success("Privacy Policy Updated Successfully");
    } catch (error) {
      message.error("Failed to update Privacy Policy");
      console.error("Error updating privacy policy:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="border p-4 rounded-lg mt-10 shadow">
      <div className="">
        <div className="py-3 rounded">
          <h3 className="text-xl font-medium text-primary pb-5">Privacy and Policy</h3>
        </div>
      </div>

      <div className="mb-6">
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          tabIndex={1}
          onBlur={(newContent) => setContent(newContent)}
          onChange={(newContent) => setContent(newContent)}
        />
      </div>

      <Button
        loading={isLoading}
        type="primary"
        size="large"
        htmlType="submit"
        onClick={handleSavePrivacyPolicy}
      >
        {isLoading || createIsloading ? "Updating..." : "Update"}
      </Button>
    </section>
  );
};

export default PrivacyPolicy;