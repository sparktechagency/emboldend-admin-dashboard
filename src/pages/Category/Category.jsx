import { useState, useEffect } from "react";
import { MdTune } from "react-icons/md";
import { Select, ConfigProvider, Spin, message } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import CustomLoading from "../../components/CustomLoading";
import SingleMeal from "../../components/meal/SingleMeal";
import {
  useCreateCategoryMutation,
  useGetCategoryQuery,
} from "../../features/category/categoryApi";
import { IoMdClose } from "react-icons/io";

const { Option } = Select;

const theme = {
  components: {
    Select: {
      activeOutlineColor: "none",
      activeBorderColor: "none",
      hoverBorderColor: "none",
    },
  },
};

const Category = () => {
  const [dropdown, setDropdown] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [errors, setErrors] = useState({
    categoryName: "",
    file: "",
  });


  const {
    data: category,
    isLoading: categoryLoading,
    error: categiryError,
    refetch
  } = useGetCategoryQuery(dropdown , { refetchOnFocus: true, refetchOnReconnect: true });

  const [createCategory, { isLoading }] = useCreateCategoryMutation(undefined , { refetchOnFocus: true, refetchOnReconnect: true });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        setErrors({
          ...errors,
          file: "Please select a valid image file (JPEG, PNG, JPG)",
        });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, file: "File size must be less than 5MB" });
        return;
      }

      setSelectedFile(file);
      setErrors({ ...errors, file: "" });

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      categoryName: "",
      file: "",
    };

    // Validate category name
    if (!categoryName.trim()) {
      newErrors.categoryName = "Category name is required";
      isValid = false;
    } else if (categoryName.trim().length < 2) {
      newErrors.categoryName = "Category name must be at least 2 characters";
      isValid = false;
    } else if (categoryName.trim().length > 50) {
      newErrors.categoryName = "Category name must be less than 50 characters";
      isValid = false;
    }

    // Validate file
    if (!selectedFile) {
      newErrors.file = "Please select an image";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const formData = new FormData();
      formData.append(
        "data",
        JSON.stringify({ name: categoryName, status: "active" })
      );
      formData.append("image", selectedFile);

      try {
        const response = await createCategory(formData).unwrap();
        resetForm();
        setIsModalOpen(false);
        await refetch();
        message.success("Category created successful")
      } catch (error) {

        // Check for duplicate key error
        if (error?.data?.message?.includes("duplicate key error")) {
          setErrors({
            ...errors,
            categoryName:
              "A category with this name already exists. Please use a different name.",
          });
        } else {
          // Handle other types of errors
          alert(
            "An error occurred while creating the category. Please try again."
          );
        }
      }
    }
  };

  const resetForm = () => {
    setCategoryName("");
    setSelectedFile(null);
    setPreviewUrl(null);
    setErrors({
      categoryName: "",
      file: "",
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  if (categiryError)
    return (
      <p className="text-center text-red-500">Error: {categiryError.message}</p>
    );

  return (
    <div className="w-full mt-7">
      {/* Main Content */}
      <div className="flex items-center justify-end p-4">
        <ConfigProvider theme={theme}>
          <Select
            value={dropdown}
            size="large"
            style={{ minWidth: 150 }}
            onChange={(value) => setDropdown(value)}
            prefix={<MdTune className="text-xl text-gray-600" />}
          >
            <Option value="all">All</Option>
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
          </Select>
        </ConfigProvider>

        <button
          className="px-6 py-2 ml-4 font-semibold text-white rounded-md bg-primary"
          onClick={() => setIsModalOpen(true)}
        >
          Create New Category
        </button>
      </div>

      {categoryLoading ? (
        <CustomLoading />
      ) : categiryError && categiryError?.status === 404 ? (
        <div className="p-6 text-center rounded-2xl">
          <h2 className="text-2xl font-semibold text-gray-800">
            Meals Not Found
          </h2>
          <p className="mt-2 text-gray-600">{categiryError?.data?.message}</p>
        </div>
      ) : category?.data?.category.length > 0 ? (
        <div className="grid grid-cols-1 gap-10 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {category?.data?.category
            ?.filter((item) => {
              if (dropdown === "all") return true;
              return item.status === dropdown;
            })
            ?.map((item) => (
              <SingleMeal key={item._id} items={item} />
            ))}
        </div>
      ) : (
        <div className="p-6 text-center rounded-2xl">
          <h2 className="text-2xl font-semibold text-gray-800">
            No Meals Available
          </h2>
        </div>
      )}

      {/* Modal using Framer Motion */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-gray-800 bg-opacity-70"
              onClick={closeModal}
            />

            {/* Modal Container - This ensures perfect centering */}
            <div className="fixed inset-0 z-50 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen px-4">
                {/* Modal Content */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="relative w-full max-w-md p-6 mx-auto bg-white rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close button */}
                  <button
                    className="absolute text-gray-500 transition-colors top-4 right-4 hover:text-gray-700"
                    onClick={closeModal}
                  >
                    <IoMdClose size={24} />
                  </button>

                  <div className="text-center">
                    {/* Image Preview Circle */}
                    <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 rounded-full bg-yellow-50">
                      {previewUrl ? (
                        <img
                          src={previewUrl}
                          alt="Category preview"
                          className="object-contain rounded-full w-14 h-14"
                        />
                      ) : (
                        <div className="flex items-center justify-center rounded-full w-14 h-14">
                          <svg
                            viewBox="0 0 24 24"
                            fill="#E7A74E"
                            width="100%"
                            height="100%"
                          >
                            <path d="M3,3H21a1,1,0,0,1,1,1V20a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V4A1,1,0,0,1,3,3M7.5,10A1.5,1.5,0,1,0,6,8.5,1.5,1.5,0,0,0,7.5,10M22,8V6L15,11,9,8,0,14V16L9,10,15,13Z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-5">
                    {/* Category Name */}
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-800">
                        Category Name
                      </label>
                      <input
                        type="text"
                        value={categoryName}
                        onChange={(e) => {
                          setCategoryName(e.target.value);
                          if (e.target.value.trim()) {
                            setErrors({ ...errors, categoryName: "" });
                          }
                        }}
                        placeholder="Enter Your Category Name"
                        className={`w-full px-4 py-2 border border-primary rounded focus:outline-none focus:ring-1 
                          ${
                            errors.categoryName
                              ? "border-red-500 focus:ring-red-500"
                              : "border-gray-300 focus:ring-primary"
                          }`}
                      />
                      {errors.categoryName && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.categoryName}
                        </p>
                      )}
                    </div>

                    {/* Category Picture */}
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-800">
                        Category Picture
                      </label>
                      <div
                        className={`flex items-center w-full px-2 py-2 border border-primary rounded 
                        ${errors.file ? "border-red-500" : "border-gray-300"}`}
                      >
                        <label
                          htmlFor="fileInput"
                          className="px-3 py-1 text-sm border rounded cursor-pointer hover:bg-gray-50"
                        >
                          Choose File
                        </label>
                        <span className="max-w-xs ml-2 text-sm text-gray-500 truncate">
                          {selectedFile ? selectedFile.name : "No file Chosen"}
                        </span>
                        <input
                          id="fileInput"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </div>
                      {errors.file && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.file}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      onClick={handleSubmit}
                      className="w-full py-3 mt-4 font-medium text-white transition-colors rounded bg-amber-600 hover:bg-amber-700"
                    >
                      {isLoading ? <Spin size="small" /> : "Done"}
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Category;
