const initSocket = () => {
    try {
        const ws = new WebSocket('ws://localhost:3000/ws');
        
        ws.onerror = (error) => {
            console.log('WebSocket error, falling back to HTTP');
        };
        
        return ws;
    } catch (error) {
        console.log('WebSocket initialization failed, falling back to HTTP');
        return null;
    }
}; 