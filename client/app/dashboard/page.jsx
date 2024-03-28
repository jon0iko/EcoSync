'use client'


const Dashboard = () => {
    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/auth/logout', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status == 200) {
                //redirect to a new page
                window.location.href = '/auth/login';
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
        
    };

    return (
        <div>
        <div>
            <h1 className="flex justify-center text-6xl m-5 p-5">Dashboard</h1>
        </div>

        <div className="flex justify-center mt-5 p-5">
            <button
                type="submit"
                className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
                onClick={handleLogout}>
                Logout
            </button>
        </div>
        </div>
    );
}


export default Dashboard;