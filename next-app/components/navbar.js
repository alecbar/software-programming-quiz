// Navbar

const Navbar = () => {
    return(
        <nav className="bg-indigo-100 font-semibold text-indigo-900 flex justify-between">
            <a href="/" className="my-auto p-2">Software Engineering Quiz</a>
            <a href="signup" className="text-white font-semibold bg-indigo-600 w-28  m-2 py-2 px-6 rounded-md">Sign Up</a>
        </nav>
    )
};

export default Navbar;