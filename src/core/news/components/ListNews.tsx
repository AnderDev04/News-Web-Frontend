import { useQuery } from "@tanstack/react-query";
import { GetNews } from "../../api/news";
import { Link } from "react-router-dom";

export default function ListNews() {

    const {data:newsData} = useQuery({
        queryKey: ['news'],
        queryFn: ()=>GetNews()
    })
    

    return (
        <div className="px-20 mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {newsData && newsData?.map((news:any) => (
                    <Link to={'#'} key={news.id} className="border-l border-gray-400 flex justify-between  items-center overflow-hidden pl-5">
                        <div className="p-6">
                            <h2 className="text-2xl text-black font-semibold mb-2">{news.title}</h2>
                            <p className="text-gray-600 text-sm mb-4">{news.content}</p>
                            <div className="text-sm text-gray-500">
                                {news.created_at.split('T')[0]}
                            </div>
                        </div>
                        <img className="w-full h-32 object-cover" src={`http://127.0.0.1:8000/${news.image}`} alt={news.title} />
                    </Link>
                ))}
            </div>
        </div>
    );
}
