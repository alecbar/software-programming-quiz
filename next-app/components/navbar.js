import { useSession, signIn, signOut } from 'next-auth/react'

const Navbar = () => {
    const { data: session } = useSession()
    return (
        <nav className="bg-indigo-100 font-semibold text-indigo-900 flex justify-between">
            <a href="/" className="my-auto p-2">Software Engineering Quiz</a>
            {session &&
                <div className="py-4">
                    <a onClick={() => signOut()} className="text-white font-semibold bg-indigo-600 w-28  m-2 py-2 px-6 rounded-md">Logout</a>
                    <a href="profile" className="text-white font-semibold bg-indigo-600 w-28  m-2 py-2 px-6 rounded-md">Profile</a>
                </div>
            }
            {!session &&
                <a onClick={() => signIn('cognito', { callbackUrl: `${window.location.origin}/profile` })} className="text-white font-semibold bg-indigo-600 w-28  m-2 py-2 px-6 rounded-md">Login</a>
            }
           
        </nav>
    )
};

export default Navbar;