export const SceneryLight = () => {
    return (
        <group>
            <ambientLight
                intensity={ 0.7 } />
            <directionalLight
                castShadow
                position={ [0, 10, 0] }
                intensity={ 2.5 }
                shadow-mapSize-height={ 1024 }
                shadow-mapSize-width={ 1024 }
                shadow-camera-far={ 50 }
                shadow-camera-left={ -10 }
                shadow-camera-right={ 10 }
                shadow-camera-top={ 10 }
                shadow-camera-bottom={ -10 }
            />
        </group>
    );
}