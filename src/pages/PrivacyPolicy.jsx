import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import { Button, message } from "antd";
import { useUpdateSettingsMutation } from "../features/settings/settingApi";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = ({ placeholder }) => {
  const router = useNavigate();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [updateSettings] = useUpdateSettingsMutation();

  // Configuration object for Jodit Editor with memoization
   const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typing your privacy policy...",
      height: 500,
      buttons: ['bold', 'italic', 'underline', 'ul', 'ol', 'indent', 'outdent' , 'image'],
      showPlaceholder: true,
      toolbarSticky: false,
      toolbarAdaptive: false
    }),
    []
  );

  const handleSavePrivacyPolicy = async () => {
    setIsLoading(true);
    try {
      // Replace with your actual API call
      const response = await updateSettings({privacyPolicy:JSON.stringify(content)}).unwrap();
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
        {isLoading ? "Updating..." : "Update"}
      </Button>
    </section>
  );
};

export default PrivacyPolicy;
