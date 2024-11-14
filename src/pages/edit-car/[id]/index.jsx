import React, { useState, useEffect } from 'react';
import { XCircle, Upload } from 'lucide-react';
import Header from '@/components/header';
import { editCar, getCar } from "../../api/endpoint";
import { useRouter } from 'next/router';

const ImageUploadForm = () => {
  const router = useRouter();
  const { id } = router.query;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);         
  const [newImages, setNewImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newTag, setNewTag] = useState('');

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleTagAdd = () => {
    if (newTag.trim() !== '') {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleTagRemove = (index) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
  };

  const handleImageUpload = (e) => {
    setNewImages([...newImages, ...Array.from(e.target.files)]);
  };

  const handleImageRemove = (index, isNew = false) => {
    if (isNew) {
      const updatedNewImages = [...newImages];
      updatedNewImages.splice(index, 1);
      setNewImages(updatedNewImages);
    } else {
      const updatedImages = [...images];
      updatedImages.splice(index, 1);
      setImages(updatedImages);
    }
  };

  const getCarData = async () => {
    try {
      const res = await getCar(id);
      if (res) {
        setTitle(res.title);
        setDescription(res.description);
        setTags(res.tags);
        setImages(res.images); // Set existing image URLs
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (id) getCarData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tags', tags.join(','));

    // Append new images as files
    newImages.forEach((image) => formData.append('images', image));
    
    try {
      await editCar(id, formData);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      router.push("/");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleTagAdd();
    }
  };

  return (
    <>
    <Header/>
    <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-gray-800 rounded-lg" enctype="multipart/form-data">
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          rows={4}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Tags</label>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleTagRemove(index)}
                className="ml-2 -mr-1 h-4 w-4 rounded-full inline-flex items-center justify-center text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-200 focus:outline-none"
              >
                <XCircle className="h-3 w-3" />
              </button>
            </div>
          ))}
          <div className="flex items-center">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={handleKeyDown}
              className="px-2 py-1 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              placeholder="Add a tag"
            />
            <button
              type="button"
              onClick={handleTagAdd}
              className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-200 focus:outline-none"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="images" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
          Images
        </label>
        <div className="flex items-center">
          <label
            htmlFor="images"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-600"
          >
            <Upload className="mr-2 h-5 w-5" />
            Upload Images
          </label>
          <input
            type="file"
            id="images"
            multiple
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
        <div className="mt-2 grid grid-cols-4 gap-4">
        {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image} // Use URL directly for existing images
                  alt={`Image ${index}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleImageRemove(index)}
                  className="absolute top-2 right-2 p-1 rounded-full bg-gray-800 text-white hover:bg-gray-700 focus:outline-none"
                >
                  <XCircle className="h-4 w-4" />
                </button>
              </div>
            ))}
            {newImages.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image)} // Use createObjectURL for new files
                  alt={`New Image ${index}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleImageRemove(index, true)}
                  className="absolute top-2 right-2 p-1 rounded-full bg-gray-800 text-white hover:bg-gray-700 focus:outline-none"
                >
                  <XCircle className="h-4 w-4" />
                </button>
              </div>
            ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
            type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-600"
        >
            {!loading ? "Save" : "Loading..."}
        </button>
        <button
            onClick={()=>{router.push("/")}}
          type="button"
          className="ml-2 inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        >
          Cancel
        </button>
      </div>
    </form>
    </>
  );
};

export default ImageUploadForm;