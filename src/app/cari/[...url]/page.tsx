"use client";
import FloatingButton from '@/components/button/FloatingButton';
import { CookpadRecipeResponse, GenerativeResponse } from '@/type/recipe';
import { fetcher } from '@/utils/network';
import Image from 'next/image';
import useSWR from 'swr'

type Param={
    params:{
        url:string[]
    }
}
export default function Index({params}:Param){
    const parsedURL=params.url.join("/")
    
    const { data, error, isLoading } = useSWR<CookpadRecipeResponse>(`/api/cookpad/${parsedURL}`, fetcher)
    console.log(data)
 
    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>
    if(!data) return 'no Data'
    return (
        <div className='min-h-screen max-w-screen-2xl mx-auto p-10 relative'>
            <FloatingButton/>
            <h1 className='text-center'>{data?.nama_makanan}</h1>
            
            <div className='flex w-full h-[400px] relative mx-auto mt-5'>
                    <Image src={data.img} fill alt={data?.nama_makanan} objectFit='cover'/>
            </div>

            <div className='mt-10'>
                <h2>Bahan baku</h2>
                <ul className='mt-4'>
                    {data.bahan_baku.map((el:string)=>(
                    <li key={el}>{el}</li>
                    ))}
                </ul>

            </div>

            <div className='mt-10'>
                <h2>Cara Pembuatan</h2>
                <ul className='mt-4'>
                    {data.langkah_pembuatan.map((el:string)=>(
                    <li key={el}>{el}</li>
                    ))}
                </ul>

            </div>

        </div>
    )
}