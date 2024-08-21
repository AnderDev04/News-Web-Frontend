import { useQuery } from "@tanstack/react-query"
import { GetCategories } from "../../api/category"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';



export default function Navbar() {
    
    const {data:Categories} = useQuery({
        queryKey: ['categories'],
        queryFn: ()=>GetCategories()
    })
    

    return (
        <div className='w-full flex items-center  justify-center gap-10 bg-white h-14'>
            <div>
                <button>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5 mt-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                </button>
            </div>
            <div className="flex items-center gap-5 border-r-2 w-1/2 border-l-2 border-yellow-300 px-10">
                <Swiper modules={[Autoplay]} autoplay={{delay:1500}}
                    spaceBetween={50} loop={true}
                    slidesPerView={5}>
                    {Categories && Categories?.map((category:any)=>(
                        <SwiperSlide key={category.id} className="font-medium text-sm hover:cursor-pointer">
                            <div>
                                {category.name}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div>
                <button className="font-semibold flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                    Iniciar Sesion
                </button>
            </div>
        </div>
    )
    }
