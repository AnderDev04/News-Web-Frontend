import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { UserType } from "./types";

// Componente para el incio de sesión
export default function Login() {
    const [loading, setLoading] = useState(false);

    // Funcion para la alerta de inicio de sesión
    function AlertSignInStatus(status: string) {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                if (status === 'Success!') {
                    resolve(status);
                } else {
                    reject(status);
                }
            }, 600);
        });

        toast.promise(
            promise,{
                pending: 'Iniciando sesion... 🕐',
                success: 'Inicio de sesión exitoso! 🎉',
                error: 'Fallo en las credenciales 😢'
            },
            {autoClose: 500,}
        )
    }

    const signIn = useSignIn();

    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit = async (data: UserType) => {
        const User = data;
        setLoading(true);
        try {
            const res = await loginUser(User);
            if (res) {
                signIn({
                    auth: {
                        token: res.access,
                        type: "Bearer"
                    }
                });
                localStorage.setItem('AuthToken', res.access);
                AlertSignInStatus('Success!')
                setTimeout(() => {
                    window.location.replace("/");
                    setLoading(false);
                }
                ,1850);
            }
        } catch (error: string | any) {
            if (error.response || error.response.status === 500 || error.response.status === 401) {
                AlertSignInStatus('Error!')
            }
            setLoading(false);
        }
    };

    const notify = () => toast.error("Email is required");

    useEffect(() => {
        if (errors.email?.type === "required" ) {
            notify();
        }
    }, [errors.email]);

    return (
        <>
            <ToastContainer />
            <section className="absolute top-0 z-[-2] h-screen w-full  bg-neutral-200   items-center p-10 justify-center flex ">
                <form onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)} className="flex flex-col gap-2">
                    <img src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png" className="w-20 h-20 mx-auto"
                     alt="" />
                    <h1 className="text-2xl mt-5 text-black font-bold">
                        Iniciar sesión
                    </h1>
                    <p className="text-gray-700 mb-2 font-semibold"> 
                        Ingresa tus credenciales para acceder a la plataforma
                    </p>
                    <label className="flex flex-col gap-2 w-full text-black"> Email:
                        <input type="email" {...register("email", { required: true })} autoComplete="email" className="rounded-lg px-2 py-2 focus:outline-blue-900 focus:text-gray-700 bg-transparent border border-gray-400" placeholder="Ingrese su email" />
                    </label>
                    <label className="flex flex-col gap-2 w-full text-black">  Contraseña:
                        <input type="password" {...register("password", { required: true })} autoComplete="password" className="rounded-lg px-2 py-2 focus:outline-blue-900 focus:text-gray-700 bg-transparent border border-gray-400" placeholder="Ingrese su password"/>
                    </label>
                    <button className={`${loading ? 'bg-yellow-700/70':'bg-yellow-600'} text-white rounded-md w-full mt-2 px-5 py-2`} disabled={loading}>
                        {
                            loading ? <div className='flex justify-center items-center'>
                                <div className='animate-spin duration-700 rounded-full h-5 w-5 border-b-2 border-white'></div>
                            </div>
                            : 'Continue'
                            }
                        </button>
                </form>
            </section>
        </>
    );
}
