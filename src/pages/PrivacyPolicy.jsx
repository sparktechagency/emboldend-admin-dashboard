import { Underline } from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Button, Grid, message } from 'antd';
import { useEffect, useRef, useState } from "react";
import { MdFormatListBulleted } from "react-icons/md";
import { VscListOrdered } from "react-icons/vsc";
import { useCreatePrivacyPolicyMutation, useGetPrivacyPolicyQuery } from '../features/Rule/RuleApi';

const { useBreakpoint } = Grid;

const PrivacyPolicy = () => {
  const [description, setDescription] = useState("");
  const [mounted, setMounted] = useState(false);

  // Responsive breakpoints
  const screens = useBreakpoint();

  // API hooks
  const { data: getTerm, isLoading: getTermLoading, refetch } = useGetPrivacyPolicyQuery();
  const [createTerm, { isLoading: TermLoading }] = useCreatePrivacyPolicyMutation();

  // Add refs to track editor state and prevent unnecessary updates
  const editorInitialized = useRef(false);
  const isUpdatingContent = useRef(false);
  const lastCursorPosition = useRef({ from: 0, to: 0 });
  const hasLoadedInitialContent = useRef(false);

  // Handle SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  // Set initial content from API when data is loaded
  useEffect(() => {
    if (getTerm?.data?.content && !hasLoadedInitialContent.current) {
      let content = getTerm.data.content;

      // Remove quotes if present and handle various quote types
      if (typeof content === 'string') {
        content = content.replace(/^["']|["']$/g, '');
      }

      setDescription(content);
      hasLoadedInitialContent.current = true;

      // Reset editor initialization flag to allow content update
      if (editor && !editorInitialized.current) {
        editorInitialized.current = false;
      }
    }
  }, [getTerm?.data?.content]);

  // Handle save button click
  const handleSave = async () => {
    try {
      const payload = {
        content: description,
        type: "privacy"
      };

      const result = await createTerm(payload).unwrap();

      if (result.success) {
        message.success(result?.data?.message || "Privacy Policy saved successfully");
        // Refetch the data after successful save
        refetch();
      } else {
        message.error(result?.data?.message || "Failed to save privacy policy");
      }
    } catch (err) {
      message.error(err?.data?.message || "An error occurred while saving privacy policy");
      console.error("Save error:", err);
    }
  };

  // Tiptap Editor Setup with fixed cursor position handling
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
    content: description,
    immediatelyRender: false, // Prevent SSR hydration issues
    onUpdate: ({ editor }) => {
      // Prevent recursive updates
      if (isUpdatingContent.current) return;

      // Store cursor position before processing
      const { from, to } = editor.state.selection;
      lastCursorPosition.current = { from, to };

      const html = editor.getHTML();
      setDescription(html);
    },
    editorProps: {
      attributes: {
        class: `focus:outline-none p-3 sm:p-4 min-h-[200px] sm:min-h-[240px] max-h-[300px] sm:max-h-[240px] overflow-y-auto bg-white text-gray-800 text-sm sm:text-base`,
      },
    },
    // Add onSelectionUpdate to track cursor position
    onSelectionUpdate: ({ editor }) => {
      if (!isUpdatingContent.current) {
        const { from, to } = editor.state.selection;
        lastCursorPosition.current = { from, to };
      }
    },
  });

  // Fixed useEffect to prevent cursor jumping and handle initial content loading
  useEffect(() => {
    if (editor && description && !editorInitialized.current) {
      // Initial setup - set content and mark as initialized
      editor.commands.setContent(description, false, {
        preserveWhitespace: "full",
      });
      editorInitialized.current = true;
    } else if (editor && editorInitialized.current && !isUpdatingContent.current) {
      // Only update if the content is actually different
      const currentContent = editor.getHTML();
      if (currentContent !== description && description) {
        isUpdatingContent.current = true;

        // Store current cursor position
        const { from, to } = editor.state.selection;

        editor.commands.setContent(description, false, {
          preserveWhitespace: "full",
        });

        // Restore cursor position after content update
        setTimeout(() => {
          try {
            editor.commands.setTextSelection({
              from: Math.min(from, editor.state.doc.content.size),
              to: Math.min(to, editor.state.doc.content.size),
            });
          } catch (e) {
            // Fallback: just focus the editor
            editor.commands.focus();
          }
          isUpdatingContent.current = false;
        }, 0);
      }
    }
  }, [description, editor]);

  // Handle dark mode change
  useEffect(() => {
    if (editor) {
      const updateClasses = () => {
        const editorWrapper = document.querySelector(".tiptap-editor-wrapper");
        if (editorWrapper) {
          editorWrapper.className = `tiptap-editor-wrapper rounded-lg border border-gray-300`;
        }
        const content = editor.view.dom;
        content.className = `bg-white text-gray-800 p-3 sm:p-4 h-[300px] sm:h-[400px] overflow-y-auto focus:outline-none text-sm sm:text-base`;
      };
      updateClasses();
    }
  }, [editor]);

  return (
    <>
      <style jsx global>{`
        .tiptap-editor-wrapper {
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          overflow: hidden;
          transition: border-color 0.2s;
        }
        .tiptap-editor-wrapper .ProseMirror {
          padding: 0.5rem;
          outline: none;
          line-height: 1.6;
          font-size: 0.875rem;
        }
        @media (min-width: 640px) {
          .tiptap-editor-wrapper .ProseMirror {
            font-size: 1rem;
          }
        }
        .tiptap-editor-wrapper .ProseMirror::-webkit-scrollbar {
          width: 6px;
        }
        @media (min-width: 640px) {
          .tiptap-editor-wrapper .ProseMirror::-webkit-scrollbar {
            width: 8px;
          }
        }
        .tiptap-editor-wrapper .ProseMirror::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        .tiptap-editor-wrapper .ProseMirror::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        .tiptap-editor-wrapper .ProseMirror::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        .tiptap-editor-wrapper .ProseMirror {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 #f1f5f9;
        }
      `}</style>

      <div className={`transition-colors duration-200 text-gray-900`}>
        <div className="w-full mt-3 sm:mt-5">
          <div
            className={`rounded-lg sm:rounded-xl shadow-md sm:shadow-lg border-0 overflow-hidden bg-white border-gray-200`}
          >
            <div className={`py-3 sm:py-4 px-3 sm:p-6 bg-gray-50`}>
              {/* Description Editor */}
              <div className="mb-4 sm:mb-6">
                <div className="tiptap-editor-wrapper">
                  {/* Toolbar */}
                  <div
                    className={`flex flex-wrap gap-1 px-1 py-2 border-b bg-gray-50 border-gray-200`}
                  >
                    <button
                      type="button"
                      onClick={() => editor?.chain().focus().toggleBold().run()}
                      className={`px-3 py-1 sm:px-4 sm:py-2 cursor-pointer rounded text-xs sm:text-sm ${editor?.isActive("bold")
                        ? "bg-blue-700 text-white"
                        : "hover:bg-gray-200"
                        }`}
                    >
                      <strong>B</strong>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        editor?.chain().focus().toggleItalic().run()
                      }
                      className={`px-3 py-1 sm:px-4 sm:py-2 cursor-pointer rounded text-xs sm:text-sm ${editor?.isActive("italic")
                        ? "bg-blue-700 text-white"
                        : "hover:bg-gray-200"
                        }`}
                    >
                      <em>I</em>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        editor?.chain().focus().toggleUnderline().run()
                      }
                      className={`px-3 py-1 sm:px-4 sm:py-2 cursor-pointer rounded text-xs sm:text-sm ${editor?.isActive("underline")
                        ? "bg-blue-700 text-white"
                        : "hover:bg-gray-200"
                        }`}
                    >
                      <u>U</u>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        editor?.chain().focus().toggleBulletList().run()
                      }
                      className={`px-2 py-1 sm:px-3 sm:py-2 cursor-pointer rounded text-xs sm:text-sm ${editor?.isActive("bulletList")
                        ? "bg-blue-700 text-white"
                        : "hover:bg-gray-200"
                        }`}
                    >
                      <MdFormatListBulleted size={screens.xs ? 16 : 20} />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        editor?.chain().focus().toggleOrderedList().run()
                      }
                      className={`px-2 py-1 sm:px-3 sm:py-2 cursor-pointer rounded text-xs sm:text-sm ${editor?.isActive("orderedList")
                        ? "bg-blue-700 text-white"
                        : "hover:bg-gray-200"
                        }`}
                    >
                      <VscListOrdered size={screens.xs ? 16 : 20} />
                    </button>
                  </div>

                  {/* Editor */}
                  {mounted ? (
                    <EditorContent editor={editor} />
                  ) : (
                    <div className="min-h-[300px] sm:min-h-[400px] p-4 bg-gray-50 animate-pulse border border-gray-200 rounded-lg" />
                  )}
                </div>
              </div>
              <Button
                type="primary"
                onClick={handleSave}
                loading={TermLoading}
                disabled={TermLoading || getTermLoading}
                size={screens.xs ? "small" : "middle"}
                className="w-full sm:w-auto"
              >
                {getTermLoading ? 'Loading...' : 'Save Privacy Policy'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;