import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/profiles');
        setProfiles(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching profiles. Please try again later.');
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner-border animate-spin border-4 border-blue-500 rounded-full h-12 w-12"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 font-semibold">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Recommended Profiles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.length === 0 ? (
          <p className="col-span-3 text-center text-gray-500">No profiles found</p>
        ) : (
          profiles.map((profile) => (
            <div key={profile._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src={profile.personalInformation?.profileImage || 'https://via.placeholder.com/150'}
                alt={profile.personalInformation?.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{profile.personalInformation?.name}</h2>
                <p className="text-gray-500">{profile.personalInformation?.age} years old</p>
                <p className="text-gray-600">{profile.personalInformation?.location}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
