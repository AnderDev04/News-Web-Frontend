import { useQuery } from "@tanstack/react-query";
import { DeleteNewsFull, GetNewsDeleted } from "../api/news";

export default function GestorPage() {
    const { data: deletedNews, isLoading, isError } = useQuery({
        queryKey: ['news-deleted'],
        queryFn: () => GetNewsDeleted()
    });

    const handleDelete = async (id:any) => {
        try {
            await DeleteNewsFull(id);
            window.location.reload();
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    if (isLoading) return <div className="text-center text-gray-500">Loading...</div>;
    if (isError) return <div className="text-center text-red-500">Error loading data.</div>;

    return (
        <div className="max-w-5xl mx-auto p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Deleted Posts</h1>
            <ul className="space-y-4">
                {deletedNews?.map((post:any) => (
                    <li key={post.id} className="flex items-center justify-between p-4 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
                            <p className="text-sm text-gray-600 mt-1">{post.description}</p>
                        </div>
                        <button
                            onClick={() => handleDelete(post.id)}
                            className="ml-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                        >
                            Delete Permanently
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
