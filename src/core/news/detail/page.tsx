import { useParams } from 'react-router-dom';
import TemplateLayout from '../../layout';
import { useQuery } from '@tanstack/react-query';
import { GetNewsById } from '../../api/news';

export default function DetailPage() {
    const { id } = useParams();

    const { data: post, isLoading, isError } = useQuery({
        queryKey: ['news', id],
        queryFn: () => GetNewsById(id || '' as any),
        enabled: !!id,  // Solo ejecuta la consulta si `id` está disponible
    });

    if (isLoading) {
        return (
            <TemplateLayout>
                <div className="flex justify-center items-center h-screen">
                    <div className="text-lg font-semibold text-gray-700">Loading...</div>
                </div>
            </TemplateLayout>
        );
    }

    if (isError) {
        return (
            <TemplateLayout>
                <div className="flex justify-center items-center h-screen">
                    <div className="text-lg font-semibold text-red-500">Failed to load post</div>
                </div>
            </TemplateLayout>
        );
    }

    if (!post) {
        return (
            <TemplateLayout>
                <div className="flex justify-center items-center h-screen">
                    <div className="text-lg font-semibold text-gray-500">Post not found</div>
                </div>
            </TemplateLayout>
        );
    }

    return (
        <TemplateLayout>
            <div className="max-w-4xl mx-auto p-16 ">
                <div className="relative mb-6">
                    <img
                        src={`http://127.0.0.1:8000/${post.image}`}
                        alt={post.title}
                        className="w-full h-64 object-cover rounded-t-lg"
                    />
                    <h1 className="absolute inset-x-0 bottom-4 text-4xl font-extrabold text-white text-center bg-gray-800 bg-opacity-50 py-2 rounded-lg">
                        {post.title}
                    </h1>
                </div>
                <div className="text-sm text-gray-500 mb-4">
                    <span>Posted on {new Date(post.date).toLocaleDateString()}</span>
                </div>
                <div className="text-gray-800 leading-relaxed">
                    {post.content}
                </div>
            </div>
        </TemplateLayout>
    );
}
