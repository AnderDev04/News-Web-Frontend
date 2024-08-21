import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { GetCategories } from "../../api/category";
import { NewPostAPI } from "../../api/news";


export default function NewPost() {
    const [open, setOpen] = useState(false);
    const {register, handleSubmit} = useForm();
    
    const handleOpen = () => {
        setOpen(!open);
    }

    
    const {data:Categories} = useQuery({
        queryKey: ['categories'],
        queryFn: ()=>GetCategories()
    })

    const onSubmit = async (data:any) => {
        const Formdata = new FormData();
        Formdata.append('title', data.title);
        Formdata.append('description', data.description);
        Formdata.append('content', data.content);
        Formdata.append('category', data.category);
        Formdata.append('image', data.image[0]);

        const res = await NewPostAPI(Formdata);
        if(res){
            handleOpen();
        }
    }

  return (
    <div>
        <button onClick={()=>handleOpen()} className=" bg-yellow-600  text-gray-100 rounded-lg p-1">
            Crear Post
        </button>
        <div className={`fixed inset-0 z-10 ${open ? '' : 'hidden'} bg-gray-500 bg-opacity-75`} aria-hidden="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center  w-full sm:mt-0 sm:text-left">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Post</h3>
                    <div className="mt-2">
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
                                    {Categories && Categories?.map((category:any)=>(
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
                                        onClick={handleOpen}
                                        className="inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-yellow-600 rounded-md shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                                    >
                                        Crear
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

  )
}
