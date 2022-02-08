import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'

const Navbar = () => {
    const { data: session } = useSession()
    return (
        <nav className="bg-indigo-100 font-semibold text-indigo-900 flex justify-between">
            <Link href="/">
                <a className="my-auto p-2">Software Engineering Quiz</a>
            </Link>
            {session &&
                <div className="py-4">
                    <button onClick={() => signOut()} className="text-white text-md leading-1 font-semibold bg-indigo-600 py-2 px-4 mx-2 rounded-md">Logout</button>
                    <Link href="/profile">
                        <a className="text-white text-md leading-1 font-semibold bg-indigo-600 py-2 px-4 mx-2 rounded-md inline-block">Profile</a>
                    </Link>
                </div>
            }
            {!session &&
                <div className="py-4">
                    <button onClick={() => signIn('cognito', { callbackUrl: `${window.location.origin}/profile` })} className="text-white text-md leading-1 font-semibold bg-indigo-600 py-2 px-4 mx-2 rounded-md inline-block">Login</button>
                </div>
            }
           
        </nav>
    )
};

export default Navbar;