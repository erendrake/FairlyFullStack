import { useEffect, useState } from 'react';
import './App.css';

function HotDogStandList() {
    const [hotDogStands, setHotDogStands] = useState([]);
    const [selectedStand, setSelectedStand] = useState(null);
    const [newAmenity, setNewAmenity] = useState('');
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        // Make an API call to fetch hot dog stands data
        fetch('http://localhost:5000/api/v1/hotDogHunt/')
            .then((response) => response.json())
            .then((responseData) => {
                // Assuming the API response is an array of hot dog stands
                setHotDogStands(responseData.data);
            })
            .catch((error) => {
                console.error('Error fetching hot dog stands:', error);
            });
    }, []);

    const handleStandClick = (standId) => {
        // Make an API call to fetch details for the selected hot dog stand
        fetch(`http://localhost:5000/api/v1/hotDogHunt/${standId}`)
            .then((response) => response.json())
            .then((data) => {
                setSelectedStand(data);
            })
            .catch((error) => {
                console.error('Error fetching hot dog stand details:', error);
            });
    };

    const handleAddAmenity = () => {
        if (newAmenity.trim() !== '') {
            setSelectedStand((prevStand) => ({
                ...prevStand,
                amenities: [...(prevStand.amenities || []), { description: newAmenity }],
            }));
            setNewAmenity('');
        }
    };

    const handleDeleteAmenity = (amenityId) => {
        setSelectedStand((prevStand) => {
            const updatedAmenities = (prevStand.amenities || []).filter((amenity) => amenity.id !== amenityId);
            return {
                ...prevStand,
                amenities: updatedAmenities,
            };
        });
    };

    const handleSaveAmenities = () => {
        if (selectedStand) {
            const standId = selectedStand.id;
            const updatedAmenities = selectedStand.amenities || [];
            // Make a PUT request to update amenities
            fetch(`http://localhost:5000/api/v1/hotDogHunt/${standId}/amenities`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amenities: updatedAmenities }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Amenities updated:', data);
                    setEditMode(false);
                })
                .catch((error) => {
                    console.error('Error updating amenities:', error);
                });
        }
    };

    return (
        <div>
            <h1>Hot Dog Stands</h1>
            <ul>
                {hotDogStands.map((stand) => (
                    <li key={stand.id} onClick={() => handleStandClick(stand.id)}>
                        {stand.name}
                    </li>
                ))}
            </ul>
            {selectedStand && (
                <div>
                    <h2>Selected Stand Details</h2>
                    <p>Name: {selectedStand.name}</p>
                    <p>Address: {selectedStand.address}</p>
                    <div>
                        <h3>Amenities</h3>
                        {editMode ? (
                            <div>
                                <ul>
                                    {selectedStand.amenities &&
                                        selectedStand.amenities.map((amenity) => (
                                            <li key={amenity.id}>
                                                {amenity.description}{' '}
                                                <button onClick={() => handleDeleteAmenity(amenity.id)}>Delete</button>
                                            </li>
                                        ))}
                                </ul>
                                <input
                                    type="text"
                                    placeholder="Add Amenity"
                                    value={newAmenity}
                                    onChange={(e) => setNewAmenity(e.target.value)}
                                />
                                <button onClick={handleAddAmenity}>Add</button>
                            </div>
                        ) : (
                            <ul>
                                {selectedStand.amenities &&
                                    selectedStand.amenities.map((amenity) => (
                                        <li key={amenity.id}>{amenity.description}</li>
                                    ))}
                            </ul>
                        )}
                        <button onClick={handleSaveAmenities}>Save</button>
                        <button onClick={() => setEditMode(!editMode)}>
                            {editMode ? 'Cancel' : 'Edit'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default HotDogStandList;
