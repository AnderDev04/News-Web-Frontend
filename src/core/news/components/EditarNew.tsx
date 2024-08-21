import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { GetCategories } from '../../api/category';
import { GetNewsById, UpdatePostAPI } from '../../api/news';

export default function EditPost() {
    const { id } = useParams();
    const queryClient = useQueryClient();
    const { register, handleSubmit, setValue } = useForm();
    const [open, setOpen] = useState(false);

    const { data: postData, isLoading: postLoading, isError: postError } = useQuery({
        queryKey: ['post', id],
        queryFn: () => GetNewsById(id || '' as any),
        enabled: !!id // Fetch only if id exists
    });

    const { data: categories, isLoading: categoriesLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: () => GetCategories()
    });

    const mutation = useMutation({
        mutationFn: (formData) => UpdatePostAPI(id as any, formData),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['post', id]
            });
            handleClose();
        }
    });

    useEffect(() => {
        if (postData) {
            setValue('title', postData.title);
            setValue('description', postData.description);
            setValue('content', postData.content);
            setValue('category', postData.category.id);
        }
    }, [postData, setValue]);

    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    const onSubmit = async (data: any) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('content', data.content);
        formData.append('category', data.category);
        if (data.image.length) {
            formData.append('image', data.image[0]);
        }

        mutation.mutate(formData as any);
    };

    if (postLoading || categoriesLoading) return <div>Loading...</div>;
    if (postError) return <div>Error loading post data.</div>;

    return (
        <div>
            <button onClick={handleOpen} className="bg-yellow-600 text-gray-100 rounded-lg text-sm p-2">
                Edit Post
            </button>
            <div className={`fixed inset-0 z-10 ${open ? '' : 'hidden'} bg-gray-500 bg-opacity-75`} aria-hidden="true">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center w-full sm:mt-0 sm:text-left">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Post</h3>
                                        <div className="mt-2 text-black">
                                            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                                                <div className="mb-4">
                                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                                                    <input type="text" {...register("title")} id="title" placeholder="Title" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"/>
                                                </div>
                                                <div className="mb-4">
                                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                                    <textarea {...register("description")} id="description" placeholder="Description" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"/>
                                                </div>
                                                <div className="mb-4">
                                                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
                                                    <textarea {...register("content")} id="content" placeholder="Content" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"/>
                                                </div>
                                                <div className="mb-4">
                                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                                                    <select {...register("category")} id="category" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm">
                                                        {categories?.map((category : any) => (
                                                            <option key={category.id} value={category.id}>{category.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="mb-4">
                                                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                                                    <input type="file" {...register("image")} id="image" placeholder="Image" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"/>
                                                </div>
                                                <div className="flex justify-end space-x-4 p-5">
                                                    <button
                                                        type="button"
                                                        onClick={handleClose}
                                                        className="inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-yellow-600 rounded-md shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                                                    >
                                                        Save Changes
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
