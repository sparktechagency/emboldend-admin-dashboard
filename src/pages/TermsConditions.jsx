import { Button, message } from "antd";
import JoditEditor from "jodit-react";
import React, { useEffect, useMemo, useRef, useState } from "react"; // Added useEffect
import { useNavigate } from "react-router-dom";
import { useCreateTermConditionsMutation, useGetTermConditionsQuery } from '../features/Rule/RuleApi';

const TermsConditions = () => {
  const router = useNavigate();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  console.log(content)

  const [isLoading, setIsLoading] = useState(false);
  const [createTerms] = useCreateTermConditionsMutation();
  const { data } = useGetTermConditionsQuery();

  // Add useEffect to set initial content when data is loaded
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

  const handleSaveTermsConditions = async () => {
    setIsLoading(true);
    try {
      const response = await createTerms({ content: JSON.stringify(content), type: "terms" }).unwrap();
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
          <h3 className="text-xl font-medium text-primary pb-5">Terms And Conditions</h3>
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
        onClick={handleSaveTermsConditions}
      >
        {isLoading ? "Updating..." : "Update"}
      </Button>
    </section>
  );
};

export default TermsConditions;