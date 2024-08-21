import { useQuery } from "@tanstack/react-query";
import { DeleteNews, GetNews } from "../../api/news";
import { Link } from "react-router-dom";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

export default function ListNews() {

    const {data:newsData} = useQuery({
        queryKey: ['news'],
        queryFn: ()=>GetNews()
    })

    const token = useAuthHeader();

    const DeleteFunc = async (id:any) => {
        const res = await DeleteNews(id);
        if(res){
            window.location.reload();
        }
    }

    

    return (
        <div className="px-20 mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {newsData && newsData?.map((news:any) => (
                    <div  key={news.id} className="border-l relative h-max border-gray-400 max-2xl:flex-col flex justify-between  items-center overflow-hidden pl-5">
                        <Link className="p-6" to={`detalle/${news.id}/`}>
                            <h2 className="text-2xl text-black font-semibold mb-2">{news.title}</h2>
                            <p className="text-gray-600 text-sm mb-4">{news.description.slice(0,120)}...</p>
                            <div className="text-sm text-gray-500">
                                {news.created_at.split('T')[0]}
                            </div>
                        </Link>
                        <Link to={`detalle/${news.id}/`} className="w-full ">
                            <img className="w-full object-cover" src={`http://127.0.0.1:8000/${news.image}`} alt={news.title} />
                        </Link>
                        {
                            token ? <div className="absolute right-0 -top-2">
                                <button className="bg-red-500 z-30 text-white px-2 text-xs py-1 rounded-lg" onClick={()=>DeleteFunc(news.id)}>Delete</button>
                            </div> : ''
                        }
                    </div>
                ))}
            </div>
        </div>
    );
}
